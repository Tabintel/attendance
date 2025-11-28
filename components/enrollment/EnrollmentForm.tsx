'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFaceIO } from '@/lib/hooks/useFaceIO';
import { CheckCircle, XCircle, Loader2, UserPlus } from 'lucide-react';

interface EnrollmentFormProps {
  faceioPublicId: string;
}

export function EnrollmentForm({ faceioPublicId }: EnrollmentFormProps) {
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { isReady, error, enrollEmployee, clearError } = useFaceIO(faceioPublicId);

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!employeeId || !employeeName) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    if (!isReady) {
      setMessage({ type: 'error', text: 'FACEIO is not ready. Please wait...' });
      return;
    }

    setIsLoading(true);
    setMessage(null);
    clearError();

    try {
      const result = await enrollEmployee(employeeId, employeeName);
      
      setMessage({
        type: 'success',
        text: `Successfully enrolled ${employeeName}! Facial ID: ${result.facialId}`
      });

      // Clear form
      setEmployeeId('');
      setEmployeeName('');

    } catch (err) {
      setMessage({
        type: 'error',
        text: error || 'Enrollment failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-8 pt-12">
          <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
            <UserPlus className="w-10 h-10 text-primary-foreground" />
          </div>
          <CardTitle className="heading-2 bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
            Enroll New Employee
          </CardTitle>
          <CardDescription className="body-large mt-3">
            Register facial biometrics for secure attendance tracking
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-12">
          <form onSubmit={handleEnroll} className="space-y-6">
            <div className="space-y-3">
              <label htmlFor="employeeId" className="label-large text-foreground">
                Employee ID
              </label>
              <Input
                id="employeeId"
                placeholder="e.g., EMP001"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                disabled={isLoading}
                className="h-12 text-base bg-background/50 border-border/50 focus:border-primary shadow-sm"
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="employeeName" className="label-large text-foreground">
                Employee Name
              </label>
              <Input
                id="employeeName"
                placeholder="e.g., John Smith"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                disabled={isLoading}
                className="h-12 text-base bg-background/50 border-border/50 focus:border-primary shadow-sm"
              />
            </div>

            {message && (
              <div className={`p-6 rounded-xl flex items-start gap-4 fade-in shadow-lg border ${
                message.type === 'success' 
                  ? 'bg-gradient-to-r from-success/10 to-success/5 text-success border-success/20' 
                  : 'bg-gradient-to-r from-error/10 to-error/5 text-error border-error/20'
              }`}>
                {message.type === 'success' ? (
                  <CheckCircle className="w-6 h-6 mt-0.5 shrink-0" />
                ) : (
                  <XCircle className="w-6 h-6 mt-0.5 shrink-0" />
                )}
                <p className="body-large font-semibold">{message.text}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || !isReady}
              className="w-full h-14 text-lg font-bold shadow-xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 hover:scale-105"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enrolling...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Start Enrollment Process
                </>
              )}
            </Button>

            <div className="text-center pt-4 border-t border-border/50">
              <p className="body-normal text-muted-foreground">
                The employee will be prompted to position their face in front of the camera
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}