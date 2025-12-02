import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="fixed top-0 right-0 left-0 h-16 bg-card border-b border-border z-50 px-4">
      <div className="h-full flex items-center justify-between gap-4 max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Поиск видео..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border focus-visible:ring-primary"
            />
            <Icon
              name="Search"
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
          </div>
          <Button variant="outline" size="icon" className="flex-shrink-0">
            <Icon name="Mic" size={20} />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Icon name="Bell" size={20} />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground border-0">
              3
            </Badge>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>ИП</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline">Мой канал</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Профиль</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Icon name="User" size={16} className="mr-2" />
                <span>Мой канал</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon name="Settings" size={16} className="mr-2" />
                <span>Настройки</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon name="BarChart3" size={16} className="mr-2" />
                <span>Аналитика</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Icon name="LogOut" size={16} className="mr-2" />
                <span>Выйти</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
