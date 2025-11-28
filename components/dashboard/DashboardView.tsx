'use client';

import { MetricCard } from './MetricCard';
import { AttendanceTable } from './AttendanceTable';
import { DashboardCharts } from './DashboardCharts';
import { mockDashboardMetrics, mockAttendanceRecords, mockChartData } from '@/lib/mock-data';
import { formatPercentage } from '@/lib/formatters';
import { Users, UserCheck, UserX, Clock } from 'lucide-react';

export function DashboardView() {
  const metrics = mockDashboardMetrics;

  return (
    <div className="space-y-8 p-8 bg-gradient-to-br from-background via-background to-muted/10 min-h-screen">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="heading-1 bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
          Attendance Dashboard
        </h1>
        <p className="body-large text-muted-foreground">
          Real-time overview of attendance and performance metrics
        </p>
      </div>

      {/* Metrics Grid - Bento Layout */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="On Time Percentage"
          value={formatPercentage(metrics.onTimePercentage)}
          icon={Clock}
          description="Employees arriving on time"
        />
        <MetricCard
          title="Present Today"
          value={metrics.presentToday}
          icon={UserCheck}
          description="Currently clocked in"
        />
        <MetricCard
          title="Absent Today"
          value={metrics.absentToday}
          icon={UserX}
          description="Not yet arrived"
        />
        <MetricCard
          title="Total Hours This Week"
          value={`${metrics.totalHoursThisWeek}h`}
          icon={Users}
          description="Across all employees"
        />
      </div>

      {/* Charts Section */}
      <DashboardCharts chartData={mockChartData} />

      {/* Attendance Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="heading-3">Today's Attendance Records</h2>
          <div className="text-sm text-muted-foreground">
            {mockAttendanceRecords.length} employees
          </div>
        </div>
        <AttendanceTable records={mockAttendanceRecords} />
      </div>
    </div>
  );
}