import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function MetricCard({ title, value, icon: Icon, description, trend }: MetricCardProps) {
  return (
    <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full -mr-16 -mt-16"></div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
        <CardTitle className="label-large text-muted-foreground uppercase tracking-wide">
          {title}
        </CardTitle>
        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="heading-1 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          {value}
        </div>
        {description && (
          <p className="body-normal text-muted-foreground mt-2 font-medium">
            {description}
          </p>
        )}
        {trend && (
          <div className={`inline-flex items-center gap-1 mt-3 px-3 py-1 rounded-full text-sm font-semibold ${
            trend.isPositive ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
          }`}>
            <span>{trend.isPositive ? '↗' : '↘'}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}