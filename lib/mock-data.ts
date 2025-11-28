import { Employee, AttendanceRecord, AttendanceLogEntry, DashboardMetrics, ChartData } from './types/schema';

// Mock employees data
export const mockEmployees: Employee[] = [
  {
    id: 'EMP001',
    facialId: 'facial-001',
    name: 'John Smith',
    email: 'john.smith@factory.com',
    department: 'Assembly Line A',
    status: 'active',
    enrolledAt: new Date('2024-01-15')
  },
  {
    id: 'EMP002',
    facialId: 'facial-002',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@factory.com',
    department: 'Quality Control',
    status: 'active',
    enrolledAt: new Date('2024-01-20')
  },
  {
    id: 'EMP003',
    facialId: 'facial-003',
    name: 'Michael Chen',
    email: 'michael.chen@factory.com',
    department: 'Assembly Line B',
    status: 'active',
    enrolledAt: new Date('2024-02-01')
  },
  {
    id: 'EMP004',
    facialId: 'facial-004',
    name: 'Emily Davis',
    email: 'emily.davis@factory.com',
    department: 'Logistics',
    status: 'active',
    enrolledAt: new Date('2024-02-10')
  },
  {
    id: 'EMP005',
    facialId: 'facial-005',
    name: 'Robert Martinez',
    email: 'robert.martinez@factory.com',
    department: 'Maintenance',
    status: 'active',
    enrolledAt: new Date('2024-02-15')
  }
];

// Mock attendance records for today
export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: 'ATT001',
    employeeId: 'EMP001',
    employeeName: 'John Smith',
    clockInTime: new Date(new Date().setHours(7, 55, 0, 0)),
    clockOutTime: null,
    date: new Date(),
    status: 'on-time',
    totalHours: 0
  },
  {
    id: 'ATT002',
    employeeId: 'EMP002',
    employeeName: 'Sarah Johnson',
    clockInTime: new Date(new Date().setHours(8, 10, 0, 0)),
    clockOutTime: null,
    date: new Date(),
    status: 'late',
    totalHours: 0
  },
  {
    id: 'ATT003',
    employeeId: 'EMP003',
    employeeName: 'Michael Chen',
    clockInTime: new Date(new Date().setHours(7, 58, 0, 0)),
    clockOutTime: null,
    date: new Date(),
    status: 'on-time',
    totalHours: 0
  },
  {
    id: 'ATT004',
    employeeId: 'EMP004',
    employeeName: 'Emily Davis',
    clockInTime: null,
    clockOutTime: null,
    date: new Date(),
    status: 'absent',
    totalHours: 0
  },
  {
    id: 'ATT005',
    employeeId: 'EMP005',
    employeeName: 'Robert Martinez',
    clockInTime: new Date(new Date().setHours(7, 50, 0, 0)),
    clockOutTime: null,
    date: new Date(),
    status: 'on-time',
    totalHours: 0
  }
];

// Mock dashboard metrics
export const mockDashboardMetrics: DashboardMetrics = {
  onTimePercentage: 75,
  absentToday: 1,
  presentToday: 4,
  totalHoursThisWeek: 156.5,
  lateArrivals: 1
};

// Mock chart data
export const mockChartData: ChartData = {
  dailyAttendance: [
    { date: 'Mon', present: 45, absent: 5, late: 3 },
    { date: 'Tue', present: 48, absent: 2, late: 2 },
    { date: 'Wed', present: 47, absent: 3, late: 2 },
    { date: 'Thu', present: 46, absent: 4, late: 3 },
    { date: 'Fri', present: 44, absent: 6, late: 4 }
  ],
  latenessTrends: [
    { date: 'Week 1', lateCount: 12 },
    { date: 'Week 2', lateCount: 8 },
    { date: 'Week 3', lateCount: 10 },
    { date: 'Week 4', lateCount: 6 }
  ]
};

// Mock attendance log for an employee
export const mockAttendanceLog: AttendanceLogEntry[] = [
  {
    id: 'LOG001',
    timestamp: new Date(new Date().setHours(7, 55, 0, 0)),
    action: 'in',
    location: 'Main Entrance'
  },
  {
    id: 'LOG002',
    timestamp: new Date(new Date().setHours(12, 0, 0, 0)),
    action: 'out',
    location: 'Main Entrance'
  },
  {
    id: 'LOG003',
    timestamp: new Date(new Date().setHours(12, 30, 0, 0)),
    action: 'in',
    location: 'Main Entrance'
  }
];