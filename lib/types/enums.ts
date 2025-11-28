// Clock status types
export type ClockStatus = 'in' | 'out';

// Attendance status types
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'on-time';

// Employee status types
export type EmployeeStatus = 'active' | 'inactive';

// View types for navigation
export type ViewType = 'kiosk' | 'dashboard' | 'profile' | 'enrollment' | 'settings';

// Chart time periods
export type TimePeriod = 'week' | 'month' | 'year';

// Sort options
export type SortOption = 'name' | 'date' | 'status' | 'hours';

// Filter options
export type FilterOption = 'all' | 'present' | 'absent' | 'late';