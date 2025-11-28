'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFaceIO } from '@/lib/hooks/useFaceIO';
import { ClockStatus } from '@/lib/types/enums';
import { mockEmployees, mockAttendanceRecords } from '@/lib/mock-data';
import { formatTime } from '@/lib/formatters';
import { Camera, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface KioskViewProps {
  faceioPublicId: string;
}

export function KioskView({ faceioPublicId }: KioskViewProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [currentStatus, setCurrentStatus] = useState<ClockStatus | null>(null);
  const [currentEmployee, setCurrentEmployee] = useState<string | null>(null);

  const { isReady, error, authenticateEmployee, clearError } = useFaceIO(faceioPublicId);

  const handleClockAction = async () => {
    if (!isReady) {
      setMessage({ type: 'error', text: 'FACEIO is not ready. Please wait...' });
      return;
    }

    setIsLoading(true);
    setMessage(null);
    clearError();

    try {
      // Authenticate the employee
      const userData = await authenticateEmployee();
      
      // Find employee by facial ID
      const employee = mockEmployees.find(emp => emp.facialId === userData.facialId);
      
      if (!employee) {
        setMessage({ type: 'error', text: 'Employee not found. Please enroll first.' });
        setIsLoading(false);
        return;
      }

      // Check current status
      const attendanceRecord = mockAttendanceRecords.find(rec => rec.employeeId === employee.id);
      const isCurrentlyIn = attendanceRecord?.clockInTime && !attendanceRecord?.clockOutTime;

      const newStatus: ClockStatus = isCurrentlyIn ? 'out' : 'in';
      const action = newStatus === 'in' ? 'clocked in' : 'clocked out';
      
      // Simulate clock action
      setCurrentStatus(newStatus);
      setCurrentEmployee(employee.name);
      
      setMessage({
        type: 'success',
        text: `Welcome ${employee.name}! You have successfully ${action} at ${formatTime(new Date())}`
      });

      // Clear message after 5 seconds
      setTimeout(() => {
        setMessage(null);
        setCurrentEmployee(null);
      }, 5000);

    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: error || 'Authentication failed. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <Card className="w-full max-w-3xl shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-8 pt-12">
          <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
            <Camera className="w-10 h-10 text-primary-foreground" />
          </div>
          <CardTitle className="heading-2 bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
            Facial Recognition Attendance
          </CardTitle>
          <p className="body-large text-muted-foreground mt-3 max-w-md mx-auto">
            Look at the camera to securely clock in or out
          </p>
        </CardHeader>
        <CardContent className="space-y-8 px-8 pb-12">
          {/* Camera Preview Placeholder */}
          <div className="relative aspect-video bg-gradient-to-br from-muted/50 to-muted rounded-2xl flex items-center justify-center border border-border/50 shadow-inner overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="text-center relative z-10">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Camera className="w-12 h-12 text-primary animate-pulse" />
              </div>
              <p className="body-normal text-muted-foreground font-medium">
                Camera will activate automatically
              </p>
              <p className="body-small text-muted-foreground/70 mt-2">
                Ensure good lighting for best results
              </p>
            </div>
          </div>

          {/* Status Message */}
          {message && (
            <div className={`p-6 rounded-xl flex items-start gap-4 fade-in shadow-lg border ${
              message.type === 'success' 
                ? 'bg-gradient-to-r from-success/10 to-success/5 text-success border-success/20' 
                : message.type === 'error' 
                ? 'bg-gradient-to-r from-error/10 to-error/5 text-error border-error/20' 
                : 'bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-primary/20'
            }`}>
              {message.type === 'success' && <CheckCircle className="w-6 h-6 mt-0.5 shrink-0" />}
              {message.type === 'error' && <XCircle className="w-6 h-6 mt-0.5 shrink-0" />}
              <p className="body-large font-semibold">{message.text}</p>
            </div>
          )}

          {/* Clock In/Out Button */}
          <Button
            onClick={handleClockAction}
            disabled={isLoading || !isReady}
            size="lg"
            className={`w-full h-20 text-xl font-bold shadow-xl transition-all duration-300 ${
              currentStatus === 'in' 
                ? 'bg-gradient-to-r from-error to-error/80 hover:from-error/90 hover:to-error/70' 
                : 'bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90'
            } ${isLoading ? 'scale-95' : 'hover:scale-105'}`}
            variant={currentStatus === 'in' ? 'destructive' : 'default'}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Authenticating...
              </>
            ) : currentStatus === 'in' ? (
              <>
                <XCircle className="w-6 h-6" />
                Clock Out
              </>
            ) : (
              <>
                <CheckCircle className="w-6 h-6" />
                Clock In
              </>
            )}
          </Button>

          {/* Current Status Display */}
          {currentEmployee && (
            <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-primary/10 shadow-lg">
              <p className="label-small text-muted-foreground mb-2">Active Session</p>
              <p className="heading-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{currentEmployee}</p>
              <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                <p className="body-small font-semibold">
                  {currentStatus === 'in' ? 'Clocked In' : 'Clocked Out'}
                </p>
              </div>
            </div>
          )}

          {/* Help Text */}
          <div className="text-center pt-4 border-t border-border/50">
            <p className="body-small text-muted-foreground/80">
              Need assistance? Contact your supervisor or IT support
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}