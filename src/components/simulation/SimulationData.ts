import { ModuleType } from "@/components/ModuleSelector";

export interface Task {
  id: string;
  name: string;
  outlet: string;
  assignee: string;
  status: "done" | "pending" | "missed";
  time?: string;
  deadline?: string;
  hasProof: boolean;
  proofType?: "photo" | "note";
  proofNote?: string;
}

export interface Outlet {
  id: string;
  name: string;
  completionRate: number;
  pendingTasks: number;
  totalTasks: number;
  manager?: string;
}

export interface PerformanceData {
  day: string;
  completion: number;
  tasks: number;
}

export interface SimulationConfig {
  businessName: string;
  businessSubtitle: string;
  location: string;
  outlets: Outlet[];
  tasks: Task[];
  role: string;
  performance: PerformanceData[];
}

const weeklyPerformance: PerformanceData[] = [
  { day: "Mon", completion: 72, tasks: 48 },
  { day: "Tue", completion: 78, tasks: 48 },
  { day: "Wed", completion: 85, tasks: 48 },
  { day: "Thu", completion: 82, tasks: 48 },
  { day: "Fri", completion: 91, tasks: 48 },
  { day: "Sat", completion: 88, tasks: 48 },
  { day: "Sun", completion: 83, tasks: 48 },
];

const restaurantConfig: SimulationConfig = {
  businessName: "SpiceRoute Foods",
  businessSubtitle: "Multi-Store Ops",
  location: "Bengaluru, India",
  role: "Owner",
  performance: weeklyPerformance,
  outlets: [
    { id: "1", name: "Indiranagar", completionRate: 92, pendingTasks: 1, totalTasks: 12, manager: "Rajesh" },
    { id: "2", name: "Koramangala", completionRate: 75, pendingTasks: 3, totalTasks: 12, manager: "Suresh" },
    { id: "3", name: "Whitefield", completionRate: 100, pendingTasks: 0, totalTasks: 12, manager: "Kumar" },
    { id: "4", name: "HSR Layout", completionRate: 58, pendingTasks: 5, totalTasks: 12, manager: "Anil" },
  ],
  tasks: [
    { id: "1", name: "Morning hygiene checklist", outlet: "Indiranagar", assignee: "Rajesh", status: "done", time: "7:30 AM", deadline: "Before 08:00 AM", hasProof: true, proofType: "photo" },
    { id: "2", name: "Cold storage temperature log", outlet: "Indiranagar", assignee: "Rajesh", status: "done", time: "7:45 AM", deadline: "Before 08:00 AM", hasProof: true, proofType: "note", proofNote: "All fridges at 4°C. Freezer at -18°C. ✓" },
    { id: "3", name: "Inventory count - vegetables", outlet: "Indiranagar", assignee: "Meena", status: "done", time: "8:00 AM", deadline: "Before 09:00 AM", hasProof: true, proofType: "photo" },
    { id: "4", name: "Opening checklist", outlet: "Indiranagar", assignee: "Rajesh", status: "pending", deadline: "Before 09:30 AM", hasProof: false },
    { id: "5", name: "Deep clean fryer", outlet: "Indiranagar", assignee: "Meena", status: "pending", deadline: "Before 09:00 AM", hasProof: false },
    { id: "6", name: "Morning hygiene checklist", outlet: "Koramangala", assignee: "Suresh", status: "done", time: "7:40 AM", deadline: "Before 08:00 AM", hasProof: true, proofType: "photo" },
    { id: "7", name: "Cold storage temperature log", outlet: "Koramangala", assignee: "Suresh", status: "pending", deadline: "Before 08:00 AM", hasProof: false },
    { id: "8", name: "Inventory count", outlet: "Koramangala", assignee: "Priya", status: "missed", deadline: "Before 09:00 AM", hasProof: false },
    { id: "9", name: "Opening checklist", outlet: "Koramangala", assignee: "Suresh", status: "pending", deadline: "Before 09:30 AM", hasProof: false },
    { id: "10", name: "Morning hygiene checklist", outlet: "Whitefield", assignee: "Kumar", status: "done", time: "7:25 AM", deadline: "Before 08:00 AM", hasProof: true, proofType: "photo" },
    { id: "11", name: "Cold storage temperature log", outlet: "Whitefield", assignee: "Kumar", status: "done", time: "7:35 AM", deadline: "Before 08:00 AM", hasProof: true, proofType: "note", proofNote: "Checked at 7:35 AM. All units normal." },
    { id: "12", name: "Inventory count", outlet: "Whitefield", assignee: "Asha", status: "done", time: "8:10 AM", deadline: "Before 09:00 AM", hasProof: true, proofType: "photo" },
    { id: "13", name: "Morning hygiene checklist", outlet: "HSR Layout", assignee: "Anil", status: "done", time: "8:15 AM", deadline: "Before 08:00 AM", hasProof: true, proofType: "photo" },
    { id: "14", name: "Cold storage temperature log", outlet: "HSR Layout", assignee: "Anil", status: "missed", deadline: "Before 08:00 AM", hasProof: false },
    { id: "15", name: "Opening checklist", outlet: "HSR Layout", assignee: "Anil", status: "pending", deadline: "Before 09:30 AM", hasProof: false },
    { id: "16", name: "Inventory count", outlet: "HSR Layout", assignee: "Nisha", status: "pending", deadline: "Before 09:00 AM", hasProof: false },
  ],
};

const salonConfig: SimulationConfig = {
  businessName: "Glow & Style",
  businessSubtitle: "Beauty Chain Ops",
  location: "Bengaluru, India",
  role: "Owner",
  performance: weeklyPerformance,
  outlets: [
    { id: "1", name: "Jayanagar", completionRate: 88, pendingTasks: 2, totalTasks: 16, manager: "Priya" },
    { id: "2", name: "BTM Layout", completionRate: 94, pendingTasks: 1, totalTasks: 16, manager: "Kavitha" },
    { id: "3", name: "Marathahalli", completionRate: 75, pendingTasks: 4, totalTasks: 16, manager: "Rekha" },
  ],
  tasks: [
    { id: "1", name: "Station sanitization", outlet: "Jayanagar", assignee: "Priya", status: "done", time: "9:00 AM", deadline: "Before 09:30 AM", hasProof: true, proofType: "photo" },
    { id: "2", name: "Equipment sterilization", outlet: "Jayanagar", assignee: "Sneha", status: "done", time: "9:15 AM", deadline: "Before 09:30 AM", hasProof: true, proofType: "photo" },
    { id: "3", name: "Product inventory check", outlet: "Jayanagar", assignee: "Priya", status: "pending", deadline: "Before 10:00 AM", hasProof: false },
    { id: "4", name: "Appointment list review", outlet: "BTM Layout", assignee: "Kavitha", status: "done", time: "9:05 AM", deadline: "Before 09:30 AM", hasProof: true, proofType: "note", proofNote: "12 appointments today. 3 hair color, 5 haircuts, 4 facials." },
    { id: "5", name: "Station sanitization", outlet: "Marathahalli", assignee: "Rekha", status: "done", time: "9:30 AM", deadline: "Before 09:30 AM", hasProof: true, proofType: "photo" },
    { id: "6", name: "Product inventory check", outlet: "Marathahalli", assignee: "Rekha", status: "missed", deadline: "Before 10:00 AM", hasProof: false },
  ],
};

const retailConfig: SimulationConfig = {
  businessName: "Urban Essentials",
  businessSubtitle: "Retail Chain Ops",
  location: "Bengaluru, India",
  role: "Operations Manager",
  performance: weeklyPerformance,
  outlets: [
    { id: "1", name: "Phoenix Mall", completionRate: 100, pendingTasks: 0, totalTasks: 10, manager: "Ramesh" },
    { id: "2", name: "Forum Mall", completionRate: 80, pendingTasks: 2, totalTasks: 10, manager: "Sunita" },
    { id: "3", name: "Mantri Mall", completionRate: 90, pendingTasks: 1, totalTasks: 10, manager: "Vijay" },
  ],
  tasks: [
    { id: "1", name: "Morning stock count", outlet: "Phoenix Mall", assignee: "Ramesh", status: "done", time: "9:30 AM", deadline: "Before 10:00 AM", hasProof: true, proofType: "photo" },
    { id: "2", name: "Display arrangement", outlet: "Phoenix Mall", assignee: "Ramesh", status: "done", time: "9:45 AM", deadline: "Before 10:00 AM", hasProof: true, proofType: "photo" },
    { id: "3", name: "Cash float verification", outlet: "Forum Mall", assignee: "Sunita", status: "pending", deadline: "Before 10:00 AM", hasProof: false },
    { id: "4", name: "Morning stock count", outlet: "Mantri Mall", assignee: "Vijay", status: "done", time: "9:20 AM", deadline: "Before 10:00 AM", hasProof: true, proofType: "note", proofNote: "All items match. New shipment logged." },
  ],
};

const clinicConfig: SimulationConfig = {
  businessName: "CareFirst Diagnostics",
  businessSubtitle: "Healthcare Ops",
  location: "Bengaluru, India",
  role: "Operations Head",
  performance: weeklyPerformance,
  outlets: [
    { id: "1", name: "MG Road Center", completionRate: 95, pendingTasks: 1, totalTasks: 20, manager: "Dr. Sharma" },
    { id: "2", name: "Sarjapur Center", completionRate: 85, pendingTasks: 3, totalTasks: 20, manager: "Dr. Patel" },
    { id: "3", name: "Electronic City", completionRate: 90, pendingTasks: 2, totalTasks: 20, manager: "Dr. Nair" },
  ],
  tasks: [
    { id: "1", name: "Equipment calibration", outlet: "MG Road Center", assignee: "Dr. Sharma", status: "done", time: "7:00 AM", deadline: "Before 07:30 AM", hasProof: true, proofType: "note", proofNote: "All machines calibrated. Logs updated." },
    { id: "2", name: "Sample collection area prep", outlet: "MG Road Center", assignee: "Nurse Lakshmi", status: "done", time: "7:15 AM", deadline: "Before 07:30 AM", hasProof: true, proofType: "photo" },
    { id: "3", name: "Reagent stock check", outlet: "Sarjapur Center", assignee: "Lab Tech Ravi", status: "pending", deadline: "Before 08:00 AM", hasProof: false },
  ],
};

const hotelConfig: SimulationConfig = {
  businessName: "StayNest Hostels",
  businessSubtitle: "Hospitality Ops",
  location: "Bengaluru, India",
  role: "Owner",
  performance: weeklyPerformance,
  outlets: [
    { id: "1", name: "Koramangala Hub", completionRate: 88, pendingTasks: 3, totalTasks: 25, manager: "Ramu" },
    { id: "2", name: "Indiranagar Hub", completionRate: 92, pendingTasks: 2, totalTasks: 25, manager: "Suresh" },
  ],
  tasks: [
    { id: "1", name: "Room turnover check", outlet: "Koramangala Hub", assignee: "Ramu", status: "done", time: "10:00 AM", deadline: "Before 11:00 AM", hasProof: true, proofType: "photo" },
    { id: "2", name: "Common area cleaning", outlet: "Koramangala Hub", assignee: "Lakshmi", status: "done", time: "9:30 AM", deadline: "Before 10:00 AM", hasProof: true, proofType: "photo" },
    { id: "3", name: "Breakfast service check", outlet: "Indiranagar Hub", assignee: "Suresh", status: "done", time: "8:00 AM", deadline: "Before 08:30 AM", hasProof: true, proofType: "note", proofNote: "All items stocked. Coffee machine working." },
  ],
};

const facilityConfig: SimulationConfig = {
  businessName: "SecureSpace FM",
  businessSubtitle: "Facility Ops",
  location: "Bengaluru, India",
  role: "Operations Manager",
  performance: weeklyPerformance,
  outlets: [
    { id: "1", name: "Tech Park Alpha", completionRate: 95, pendingTasks: 1, totalTasks: 18, manager: "Guard Raju" },
    { id: "2", name: "Business Tower", completionRate: 78, pendingTasks: 4, totalTasks: 18, manager: "Tech Mohan" },
  ],
  tasks: [
    { id: "1", name: "Security round - morning", outlet: "Tech Park Alpha", assignee: "Guard Raju", status: "done", time: "6:00 AM", deadline: "Before 06:30 AM", hasProof: true, proofType: "note", proofNote: "All clear. No incidents." },
    { id: "2", name: "HVAC system check", outlet: "Business Tower", assignee: "Tech Mohan", status: "pending", deadline: "Before 07:00 AM", hasProof: false },
  ],
};

const coachingConfig: SimulationConfig = {
  businessName: "BrightPath Academy",
  businessSubtitle: "Education Ops",
  location: "Bengaluru, India",
  role: "Center Head",
  performance: weeklyPerformance,
  outlets: [
    { id: "1", name: "JP Nagar Center", completionRate: 100, pendingTasks: 0, totalTasks: 12, manager: "Teacher Anita" },
    { id: "2", name: "Banashankari Center", completionRate: 83, pendingTasks: 2, totalTasks: 12, manager: "Admin Priya" },
  ],
  tasks: [
    { id: "1", name: "Classroom setup", outlet: "JP Nagar Center", assignee: "Teacher Anita", status: "done", time: "8:30 AM", deadline: "Before 09:00 AM", hasProof: true, proofType: "photo" },
    { id: "2", name: "Attendance system ready", outlet: "Banashankari Center", assignee: "Admin Priya", status: "pending", deadline: "Before 09:00 AM", hasProof: false },
  ],
};

const warehouseConfig: SimulationConfig = {
  businessName: "SwiftStock Logistics",
  businessSubtitle: "Warehouse Ops",
  location: "Bengaluru, India",
  role: "Warehouse Manager",
  performance: weeklyPerformance,
  outlets: [
    { id: "1", name: "Peenya Warehouse", completionRate: 90, pendingTasks: 2, totalTasks: 20, manager: "Supervisor Raj" },
    { id: "2", name: "Bommasandra Hub", completionRate: 85, pendingTasks: 3, totalTasks: 20, manager: "Operator Mani" },
  ],
  tasks: [
    { id: "1", name: "Receiving dock prep", outlet: "Peenya Warehouse", assignee: "Supervisor Raj", status: "done", time: "6:00 AM", deadline: "Before 06:30 AM", hasProof: true, proofType: "photo" },
    { id: "2", name: "Forklift safety check", outlet: "Bommasandra Hub", assignee: "Operator Mani", status: "pending", deadline: "Before 06:30 AM", hasProof: false },
  ],
};

const customConfig: SimulationConfig = {
  businessName: "Your Business",
  businessSubtitle: "Custom Ops",
  location: "Your City, India",
  role: "Owner",
  performance: weeklyPerformance,
  outlets: [
    { id: "1", name: "Location 1", completionRate: 85, pendingTasks: 3, totalTasks: 20, manager: "Team Lead A" },
    { id: "2", name: "Location 2", completionRate: 90, pendingTasks: 2, totalTasks: 20, manager: "Team Lead B" },
    { id: "3", name: "Location 3", completionRate: 75, pendingTasks: 5, totalTasks: 20, manager: "Team Lead C" },
  ],
  tasks: [
    { id: "1", name: "Opening checklist", outlet: "Location 1", assignee: "Team Lead A", status: "done", time: "9:00 AM", deadline: "Before 09:30 AM", hasProof: true, proofType: "photo" },
    { id: "2", name: "Daily inspection", outlet: "Location 2", assignee: "Supervisor", status: "pending", deadline: "Before 10:00 AM", hasProof: false },
    { id: "3", name: "Inventory check", outlet: "Location 3", assignee: "Staff Member", status: "missed", deadline: "Before 10:00 AM", hasProof: false },
  ],
};

export const getSimulationConfig = (moduleType: ModuleType): SimulationConfig => {
  const configs: Record<ModuleType, SimulationConfig> = {
    restaurant: restaurantConfig,
    salon: salonConfig,
    retail: retailConfig,
    clinic: clinicConfig,
    hotel: hotelConfig,
    facility: facilityConfig,
    coaching: coachingConfig,
    warehouse: warehouseConfig,
    custom: customConfig,
  };
  return configs[moduleType];
};
