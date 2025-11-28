'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Camera, UserPlus, Settings } from 'lucide-react';

const navigation = [
  { name: 'Clock In/Out', href: '/', icon: Camera },
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Enroll Employee', href: '/admin/enroll', icon: UserPlus },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-72 flex-col bg-gradient-to-b from-card via-card to-card/50 border-r border-border/50 shadow-xl">
      {/* Logo */}
      <div className="flex h-20 items-center border-b border-border/50 px-6 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
            <Camera className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="heading-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Attendance
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-6">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-4 rounded-xl px-4 py-3.5 transition-all duration-300 group',
                isActive
                  ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg scale-105'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:scale-102'
              )}
            >
              <div className={cn(
                'p-2 rounded-lg transition-colors',
                isActive 
                  ? 'bg-white/20' 
                  : 'bg-muted/50 group-hover:bg-primary/10'
              )}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="body-large font-semibold">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border/50 p-6 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="text-center space-y-2">
          <p className="body-small font-semibold text-muted-foreground">
            Powered by FACEIO
          </p>
          <p className="body-small text-muted-foreground/70">
            Secure Facial Authentication
          </p>
        </div>
      </div>
    </div>
  );
}