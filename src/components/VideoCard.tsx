import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface VideoCardProps {
  title: string;
  channel: string;
  views: string;
  timestamp: string;
  duration: string;
  thumbnail: string;
  channelAvatar?: string;
  verified?: boolean;
}

export default function VideoCard({
  title,
  channel,
  views,
  timestamp,
  duration,
  thumbnail,
  channelAvatar,
  verified = false,
}: VideoCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative video-thumbnail mb-3">
        <img
          src={thumbnail}
          alt={title}
          className="w-full aspect-video object-cover rounded-lg"
        />
        <Badge className="absolute bottom-2 right-2 bg-black/80 text-white border-0 hover:bg-black/80">
          {duration}
        </Badge>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/60 backdrop-blur-sm rounded-full p-4">
            <Icon name="Play" size={32} className="text-white" />
          </div>
        </div>
      </div>
      
      <div className="flex gap-3">
        <Avatar className="w-9 h-9 flex-shrink-0">
          <AvatarImage src={channelAvatar} alt={channel} />
          <AvatarFallback>{channel[0]}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>{channel}</span>
            {verified && (
              <Icon name="BadgeCheck" size={14} className="text-primary" />
            )}
          </div>
          
          <div className="text-xs text-muted-foreground">
            {views} • {timestamp}
          </div>
        </div>
      </div>
    </div>
  );
}
