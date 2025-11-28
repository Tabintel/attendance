import { AttendanceStatus, ClockStatus, TimePeriod } from './types/enums';

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

export const formatDateTime = (date: Date): string => {
  return `${formatDate(date)} ${formatTime(date)}`;
};

export const formatHours = (hours: number): string => {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}h ${m}m`;
};

export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};

export const formatClockStatus = (status: ClockStatus): string => {
  return status === 'in' ? 'Clocked In' : 'Clocked Out';
};

export const formatAttendanceStatus = (status: AttendanceStatus): string => {
  const statusMap = {
    'present': 'Present',
    'absent': 'Absent',
    'late': 'Late',
    'on-time': 'On Time'
  };
  return statusMap[status];
};

export const formatTimePeriod = (period: TimePeriod): string => {
  const periodMap = {
    'week': 'This Week',
    'month': 'This Month',
    'year': 'This Year'
  };
  return periodMap[period];
};