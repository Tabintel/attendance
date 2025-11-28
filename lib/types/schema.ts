import { AttendanceStatus, ClockStatus, EmployeeStatus } from './enums';

// Props types (data passed to components)
export interface KioskViewProps {
  onClockAction: (facialId: string, status: ClockStatus) => Promise<void>;
  currentStatus: ClockStatus | null;
  isLoading: boolean;
}

export interface DashboardViewProps {
  metrics: DashboardMetrics;
  attendanceRecords: AttendanceRecord[];
  chartData: ChartData;
}

export interface EmployeeProfileProps {
  employee: Employee;
  attendanceLog: AttendanceLogEntry[];
  weeklyHours: number;
  monthlyHours: number;
}

export interface EnrollmentFormProps {
  onEnroll: (employeeId: string, employeeName: string) => Promise<void>;
  isLoading: boolean;
}

// Store types (global state data)
export interface AppState {
  currentUser: Employee | null;
  currentView: 'kiosk' | 'dashboard' | 'profile' | 'enrollment' | 'settings';
  clockStatus: ClockStatus | null;
  employees: Employee[];
  attendanceRecords: AttendanceRecord[];
}

export interface Employee {
  id: string;
  facialId: string;
  name: string;
  email: string;
  department: string;
  status: EmployeeStatus;
  enrolledAt: Date;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  clockInTime: Date | null;
  clockOutTime: Date | null;
  date: Date;
  status: AttendanceStatus;
  totalHours: number;
}

export interface AttendanceLogEntry {
  id: string;
  timestamp: Date;
  action: ClockStatus;
  location?: string;
}

export interface DashboardMetrics {
  onTimePercentage: number;
  absentToday: number;
  presentToday: number;
  totalHoursThisWeek: number;
  lateArrivals: number;
}

export interface ChartData {
  dailyAttendance: DailyAttendanceData[];
  latenessTrends: LatenessTrendData[];
}

export interface DailyAttendanceData {
  date: string;
  present: number;
  absent: number;
  late: number;
}

export interface LatenessTrendData {
  date: string;
  lateCount: number;
}