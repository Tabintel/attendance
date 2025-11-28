'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { AttendanceRecord } from '@/lib/types/schema';
import { formatTime, formatAttendanceStatus, formatHours } from '@/lib/formatters';
import { Search } from 'lucide-react';

interface AttendanceTableProps {
  records: AttendanceRecord[];
}

export function AttendanceTable({ records }: AttendanceTableProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecords = records.filter(record =>
    record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time':
        return 'text-success';
      case 'late':
        return 'text-warning';
      case 'absent':
        return 'text-error';
      default:
        return 'text-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          placeholder="Search by name or employee ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 h-12 text-base bg-card/50 backdrop-blur-sm border-border/50 focus:border-primary shadow-sm"
        />
      </div>

      <div className="rounded-xl border border-border/50 overflow-hidden shadow-lg bg-card/50 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Clock In</TableHead>
              <TableHead>Clock Out</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total Hours</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No records found
                </TableCell>
              </TableRow>
            ) : (
              filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.employeeId}</TableCell>
                  <TableCell>{record.employeeName}</TableCell>
                  <TableCell>
                    {record.clockInTime ? formatTime(record.clockInTime) : '-'}
                  </TableCell>
                  <TableCell>
                    {record.clockOutTime ? formatTime(record.clockOutTime) : '-'}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                      record.status === 'on-time' ? 'bg-success/10 text-success' :
                      record.status === 'late' ? 'bg-warning/10 text-warning' :
                      record.status === 'absent' ? 'bg-error/10 text-error' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        record.status === 'on-time' ? 'bg-success' :
                        record.status === 'late' ? 'bg-warning' :
                        record.status === 'absent' ? 'bg-error' :
                        'bg-muted-foreground'
                      }`}></div>
                      {formatAttendanceStatus(record.status)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {record.totalHours > 0 ? formatHours(record.totalHours) : '-'}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}