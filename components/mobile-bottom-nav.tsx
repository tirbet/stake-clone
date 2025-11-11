'use client';

import { useState, useEffect } from 'react';
import { usePathname } from '@/i18n/navigation';
import { useIsMobile } from '@/hooks/use-mobile';
import { Home, Activity, PlayCircle, User } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

interface MobileBottomNavProps {
  onItemClick?: (href: string) => void;
}

export function MobileBottomNav({ onItemClick }: MobileBottomNavProps) {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState(pathname);

  useEffect(() => {
    setActiveItem(pathname);
  }, [pathname]);

  if (!isMobile) return null;

  const navItems: NavItem[] = [
    { label: 'Home', icon: <Home size={24} />, href: '/' },
    { label: 'Sports', icon: <Activity size={24} />, href: '/sport' },
    { label: 'Casino', icon: <PlayCircle size={24} />, href: '/casino' },
    { label: 'Account', icon: <User size={24} />, href: '/account' },
  ];

  const handleClick = (href: string) => {
    setActiveItem(href);
    if (onItemClick) onItemClick(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center justify-center text-sm transition-colors duration-200',
              activeItem === item.href
                ? 'text-primary'
                : 'text-muted-foreground'
            )}
          >
            {item.icon}
            <span className="mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
