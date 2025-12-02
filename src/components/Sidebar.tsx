import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'recommendations', label: 'Рекомендации', icon: 'TrendingUp' },
    { id: 'subscriptions', label: 'Подписки', icon: 'Users', badge: 3 },
  ];

  const libraryItems = [
    { id: 'history', label: 'История', icon: 'History' },
    { id: 'saved', label: 'Сохраненное', icon: 'Bookmark' },
    { id: 'liked', label: 'Понравилось', icon: 'ThumbsUp' },
    { id: 'settings', label: 'Настройки', icon: 'Settings' },
  ];

  const subscriptions = [
    { id: 'sub1', name: 'Tech Channel', avatar: '/placeholder.svg', hasNew: true },
    { id: 'sub2', name: 'Music Live', avatar: '/placeholder.svg', hasNew: false },
    { id: 'sub3', name: 'Gaming Pro', avatar: '/placeholder.svg', hasNew: true },
    { id: 'sub4', name: 'Vlogs Daily', avatar: '/placeholder.svg', hasNew: false },
  ];

  return (
    <div
      className={cn(
        'fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 z-40',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between p-4 h-16 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Play" size={18} className="text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">VideoHub</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hover:bg-sidebar-accent"
        >
          <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={20} />
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="p-3 space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? 'default' : 'ghost'}
              className={cn(
                'w-full justify-start gap-3',
                activeSection === item.id
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'hover:bg-sidebar-accent'
              )}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon name={item.icon as any} size={20} />
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          ))}
        </div>

        <Separator className="my-3 bg-sidebar-border" />

        <div className="p-3 space-y-1">
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-muted-foreground uppercase px-3 mb-2">
              Библиотека
            </h3>
          )}
          {libraryItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? 'default' : 'ghost'}
              className={cn(
                'w-full justify-start gap-3',
                activeSection === item.id
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'hover:bg-sidebar-accent'
              )}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon name={item.icon as any} size={20} />
              {!isCollapsed && <span className="flex-1 text-left">{item.label}</span>}
            </Button>
          ))}
        </div>

        {!isCollapsed && (
          <>
            <Separator className="my-3 bg-sidebar-border" />
            <div className="p-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase px-3 mb-2">
                Подписки
              </h3>
              <div className="space-y-1">
                {subscriptions.map((sub) => (
                  <Button
                    key={sub.id}
                    variant="ghost"
                    className="w-full justify-start gap-3 hover:bg-sidebar-accent relative"
                  >
                    <div className="relative">
                      <img
                        src={sub.avatar}
                        alt={sub.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      {sub.hasNew && (
                        <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-primary rounded-full border-2 border-sidebar" />
                      )}
                    </div>
                    <span className="flex-1 text-left text-sm truncate">{sub.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </>
        )}
      </ScrollArea>
    </div>
  );
}