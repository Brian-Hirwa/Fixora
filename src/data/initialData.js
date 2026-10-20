export const INITIAL_REQUESTS = [
  {
    id: "REQ-2041",
    title: "Water leak under sink in Science Lab 3",
    description: "The right-hand wash station pipe is dripping continuously, causing a small pool of water near chemical storage.",
    location: "Science Lab 3 (West Wing)",
    category: "Plumbing",
    priority: "High",
    status: "In Progress",
    assignedTo: "John Miller (Plumbing)",
    reportedBy: "Dr. Aris Thorne",
    date: "2026-10-19",
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "REQ-2040",
    title: "Gymnasium emergency exit latch jammed",
    description: "North exit door latch does not spring back into lock position. Presents security and fire safety concern.",
    location: "Gymnasium North Exit",
    category: "Other",
    priority: "Critical",
    status: "In Progress",
    assignedTo: "Marcus Vance (Facilities)",
    reportedBy: "Coach Sterling",
    date: "2026-10-19",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "REQ-2039",
    title: "Overhead fluorescent lights flickering rapidly",
    description: "Row 2 light fixture in classroom 204 emits a loud buzzing sound and flickers erratically, disrupting class lectures.",
    location: "Room 204 (2nd Floor)",
    category: "Electrical",
    priority: "Medium",
    status: "Approved",
    assignedTo: "Sarah Davis (Electrical)",
    reportedBy: "Mrs. Clara Higgins",
    date: "2026-10-18",
    imageUrl: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "REQ-2038",
    title: "Ceiling projector not receiving power",
    description: "Audio-visual ceiling projector does not power on even after resetting circuit breaker. Needed for midterm presentations.",
    location: "Media Center & Hall A",
    category: "Equipment",
    priority: "High",
    status: "Pending",
    assignedTo: "Unassigned",
    reportedBy: "David Chen (IT Dept)",
    date: "2026-10-18",
    imageUrl: null
  },
  {
    id: "REQ-2037",
    title: "Damaged study desk and splintered edge",
    description: "Front student desk in Room 108 has a cracked bracket and rough wood splinters along the armrest.",
    location: "Room 108 (Ground Floor)",
    category: "Furniture",
    priority: "Low",
    status: "Completed",
    assignedTo: "Alex Chen (Carpentry)",
    reportedBy: "Mr. Paul Bradley",
    date: "2026-10-17",
    imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "REQ-2036",
    title: "Clogged drinking fountain near cafeteria",
    description: "Drain is backed up and water pressure is overly low. Fountain has been shut off with manual valve temporarily.",
    location: "Cafeteria Main Hallway",
    category: "Plumbing",
    priority: "Medium",
    status: "Completed",
    assignedTo: "John Miller (Plumbing)",
    reportedBy: "Nurse Jackson",
    date: "2026-10-16",
    imageUrl: null
  },
  {
    id: "REQ-2035",
    title: "Chemistry lab fume hood exhaust fan failure",
    description: "Exhaust velocity is below safety standards. Automatic safety alarm sounds after 2 minutes of operation.",
    location: "Chemistry Lab 2B",
    category: "Equipment",
    priority: "Critical",
    status: "Approved",
    assignedTo: "Elena Rostova (Lab Safety)",
    reportedBy: "Prof. Walter Green",
    date: "2026-10-15",
    imageUrl: null
  },
  {
    id: "REQ-2034",
    title: "Loose wall handrail on stairwell C",
    description: "Two anchor bolts have pulled out of drywall on the lower flight of Stairwell C between 1st and 2nd floors.",
    location: "Stairwell C (East Wing)",
    category: "Other",
    priority: "High",
    status: "Pending",
    assignedTo: "Unassigned",
    reportedBy: "Janice Gomez (Security)",
    date: "2026-10-15",
    imageUrl: null
  }
];

export const WORKERS = [
  "Unassigned",
  "John Miller (Plumbing)",
  "Sarah Davis (Electrical)",
  "Alex Chen (Carpentry)",
  "Marcus Vance (Facilities)",
  "Elena Rostova (Lab Safety)"
];

export const CATEGORIES = [
  "Electrical",
  "Plumbing",
  "Furniture",
  "Equipment",
  "Other"
];

export const PRIORITIES = [
  "Low",
  "Medium",
  "High",
  "Critical"
];

export const STATUSES = [
  "Pending",
  "Approved",
  "In Progress",
  "Completed"
];
