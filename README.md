# Fixora — School Repair & Maintenance Management System

A modern, responsive web application designed for educational institutions to report, triage, track, and manage classroom repairs, equipment failures, plumbing emergencies, and electrical faults.

---

## 🌟 Key Features

1. **Clean Apple-Inspired Aesthetic & Role-Based Architecture**
   - **Role Separation**: Dedicated views for **Students/Staff** vs. **Facilities Administrators**.
   - One-click role toggle in the navigation bar (`🎓 Student View` / `🔒 Admin View`).
   - Palette: Dark Navy Blue (`#0f172a`), Clean Backgrounds (`#ffffff` & `#f8fafc`), Calm Blue (`#2563eb`), and subtle orange highlights.
   - Smooth typography (Inter), rounded cards, subtle shadows, and responsive layout across desktops, tablets, and mobile devices.

2. **🎓 What Students & Ordinary Users See**
   - **Home Overview**: School facilities information, quick problem reporting CTA, and campus maintenance highlights.
   - **Report a Problem**: 30-second form to report classroom issues with photos and sample presets.
   - **Track Campus Repairs**: Dedicated public status board to check on reported issues by Ticket ID or classroom without seeing administrative controls.
   - **Read-Only Progress Modal**: Visual 4-step lifecycle tracker (*Submitted* &rarr; *Approved* &rarr; *In Progress* &rarr; *Completed*).
   - *Protected*: Administrative controls like technician re-assignment, ticket deletion, and status overrides are hidden.

3. **🔒 What Facilities Administrators See**
   - **Admin Console Badge & Top Bar**: Indicator of elevated dispatch permissions.
   - **Executive Dashboard**: High-level KPI metrics, emergency triage alerts (Critical / High), and category volume charts.
   - **Manage & Dispatch Queue**: Complete operational table with inline worker assignment (*John Miller*, *Sarah Davis*, etc.), inline status changes, and deletion capabilities.
   - **Admin Inspection Modal**: Full dispatch controls and status management.

2. **A. Landing Page**
   - Headline: *"A Better Way to Maintain Your School"*
   - Fast access CTA buttons (*"Get Started"* & *"Report a Problem"*).
   - High-level metric highlights and feature breakdown cards.
   - 3-step explanation of the repair lifecycle.
   - Live showcase cards with direct inspection links.

3. **B. Executive Dashboard**
   - 4 Real-time Summary Cards:
     - **Total Requests**
     - **Pending Repairs**
     - **Repairs In Progress**
     - **Completed Repairs**
   - **Category Distribution Visual Chart** (Electrical, Plumbing, Equipment, Furniture, Other).
   - **Safety & Urgency Triage** (Critical & High priority alerts).
   - Recent requests table with quick status filters and single-click detail inspection.

4. **C. Report a Problem Form**
   - Validated input fields: Problem Title, Description, Location/Classroom, Category, Priority Level.
   - Optional photo upload with instant image preview & preset school sample images.
   - Instant persistence to browser `localStorage` and immediate appearance in the dashboard.

5. **D. Manage Requests & Dispatch**
   - Comprehensive searchable table (filters across titles, rooms, IDs, and technicians).
   - Multi-filtering by **Status** (*Pending*, *Approved*, *In Progress*, *Completed*), **Priority** (*Low*, *Medium*, *High*, *Critical*), and **Category**.
   - Sort by Newest, Oldest, or Urgency Priority.
   - Inline status updates and technician assignment (*John Miller*, *Sarah Davis*, *Alex Chen*, *Marcus Vance*, *Elena Rostova*).
   - Deep inspection modal with full issue history and repair dispatch controls.

6. **E. About Fixora**
   - Problem statement: solving fragmented hallway complaints and verbal requests.
   - Core objectives: centralized intake, priority triage, lifecycle tracking, and worker dispatch.
   - Measurable benefits: 70% faster response times, 100% digital audit trail, safer classrooms.

---

## 🚀 How to Run the Website

### Option 1: Quick Launch (Recommended)
Open a terminal in the project folder and run:
```bash
npm run dev
```
Then open your browser at **http://localhost:3000** (or the URL displayed in the terminal).

---

### Option 2: Production Build & Preview
To run the optimized production build:
```bash
npm run build
npm run preview
```

---

### Option 3: Double-Click Batch File (Windows)
Double-click `start.bat` in the `Fixora` folder.

---

## 💾 Data Persistence & Testing

- All actions (new reports, status changes, worker assignments, deletions) are automatically stored in the browser's `localStorage`.
- To reset back to the default demo data at any time, click **"Reset Sample Requests"** in the footer of any page.
