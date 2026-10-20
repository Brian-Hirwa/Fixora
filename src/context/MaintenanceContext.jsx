import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_REQUESTS } from '../data/initialData';

const MaintenanceContext = createContext(null);

const STORAGE_KEY = 'fixora_maintenance_requests_v1';
const ROLE_KEY = 'fixora_active_role_v1';
const AUTH_KEY = 'fixora_admin_auth_v1';

export function MaintenanceProvider({ children }) {
  const [requests, setRequests] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Could not read localStorage for Fixora", e);
    }
    return INITIAL_REQUESTS;
  });

  // Admin authentication state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true';
    } catch (e) {
      return false;
    }
  });

  const [showLoginModal, setShowLoginModal] = useState(false);

  // Current active portal persona: 'student' or 'admin'
  const [currentRole, setCurrentRole] = useState(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_KEY) === 'true';
      const savedRole = localStorage.getItem(ROLE_KEY);
      if (savedAuth && savedRole === 'admin') {
        return 'admin';
      }
    } catch (e) {}
    return 'student'; // Default is student view!
  });

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [toast, setToast] = useState(null);

  // Sync role and auth to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ROLE_KEY, currentRole);
      localStorage.setItem(AUTH_KEY, isAdminAuthenticated ? 'true' : 'false');
    } catch (e) {}
  }, [currentRole, isAdminAuthenticated]);

  // Sync requests to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  }, [requests]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const loginAdmin = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === 'fixora@gmail.com' && password === 'fixora123') {
      setIsAdminAuthenticated(true);
      setCurrentRole('admin');
      setShowLoginModal(false);
      showToast('Admin authentication successful. Welcome!', 'success');
      return { success: true };
    } else {
      return {
        success: false,
        error: 'Invalid email or password. Use fixora@gmail.com / fixora123'
      };
    }
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setCurrentRole('student');
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch (e) {}
    showToast('Logged out of Admin Console', 'info');
  };

  const setRole = (role) => {
    if (role === 'admin') {
      if (isAdminAuthenticated) {
        setCurrentRole('admin');
        showToast('Switched to Facilities Admin Console', 'info');
      } else {
        // Prompt login modal!
        setShowLoginModal(true);
      }
    } else {
      setCurrentRole('student');
      showToast('Switched to Student & Public Portal', 'info');
    }
  };

  const addRequest = (newReq) => {
    const nextIdNum = 2000 + requests.length + 1;
    const createdRequest = {
      id: `REQ-${nextIdNum}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      assignedTo: 'Unassigned',
      reportedBy: newReq.reportedBy || (currentRole === 'admin' ? 'Facilities Admin' : 'Student / Teacher'),
      imageUrl: newReq.imageUrl || null,
      ...newReq
    };

    setRequests(prev => [createdRequest, ...prev]);
    showToast(`Request ${createdRequest.id} created successfully!`, 'success');
    return createdRequest;
  };

  const updateStatus = (id, newStatus) => {
    setRequests(prev =>
      prev.map(req => {
        if (req.id === id) {
          return { ...req, status: newStatus };
        }
        return req;
      })
    );

    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest(prev => ({ ...prev, status: newStatus }));
    }

    showToast(`Status for ${id} updated to "${newStatus}"`, 'info');
  };

  const assignWorker = (id, workerName) => {
    setRequests(prev =>
      prev.map(req => {
        if (req.id === id) {
          return { ...req, assignedTo: workerName };
        }
        return req;
      })
    );

    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest(prev => ({ ...prev, assignedTo: workerName }));
    }

    showToast(`Assigned ${id} to ${workerName}`, 'info');
  };

  const deleteRequest = (id) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest(null);
    }
    showToast(`Request ${id} deleted`, 'warning');
  };

  const resetToSampleData = () => {
    setRequests(INITIAL_REQUESTS);
    localStorage.removeItem(STORAGE_KEY);
    showToast('Reset to original sample data', 'info');
  };

  // Summary statistics
  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'Pending').length,
    approved: requests.filter(r => r.status === 'Approved').length,
    inProgress: requests.filter(r => r.status === 'In Progress').length,
    completed: requests.filter(r => r.status === 'Completed').length
  };

  // True only if current role is admin AND authenticated
  const isAdmin = currentRole === 'admin' && isAdminAuthenticated;

  return (
    <MaintenanceContext.Provider
      value={{
        requests,
        stats,
        currentRole,
        setRole,
        isAdmin,
        isAdminAuthenticated,
        showLoginModal,
        setShowLoginModal,
        loginAdmin,
        logoutAdmin,
        addRequest,
        updateStatus,
        assignWorker,
        deleteRequest,
        resetToSampleData,
        selectedRequest,
        setSelectedRequest,
        toast,
        setToast,
        showToast
      }}
    >
      {children}
    </MaintenanceContext.Provider>
  );
}

export function useMaintenance() {
  const ctx = useContext(MaintenanceContext);
  if (!ctx) {
    throw new Error('useMaintenance must be used within MaintenanceProvider');
  }
  return ctx;
}
