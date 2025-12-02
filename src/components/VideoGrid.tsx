import VideoCard from './VideoCard';

interface VideoGridProps {
  section: string;
}

export default function VideoGrid({ section }: VideoGridProps) {
  const mockVideos = [
    {
      id: 1,
      title: 'Создание современного веб-приложения с React и TypeScript',
      channel: 'Tech Masters',
      views: '125K просмотров',
      timestamp: '2 дня назад',
      duration: '15:42',
      thumbnail: '/placeholder.svg',
      channelAvatar: '/placeholder.svg',
      verified: true,
    },
    {
      id: 2,
      title: 'Лучшие практики разработки на JavaScript в 2024',
      channel: 'Code Academy',
      views: '89K просмотров',
      timestamp: '5 дней назад',
      duration: '22:18',
      thumbnail: 'https://cdn.poehali.dev/projects/b03416fd-0006-45f5-8d1a-3834ba82294e/files/502674c0-b29d-4cc4-8022-174602599b54.jpg',
      channelAvatar: '/placeholder.svg',
      verified: true,
    },
    {
      id: 3,
      title: 'Полный курс по дизайну интерфейсов для начинающих',
      channel: 'Design Pro',
      views: '234K просмотров',
      timestamp: '1 неделю назад',
      duration: '45:30',
      thumbnail: 'https://cdn.poehali.dev/projects/b03416fd-0006-45f5-8d1a-3834ba82294e/files/ef6006e8-5c70-4862-af80-5cd65915079e.jpg',
      channelAvatar: '/placeholder.svg',
      verified: false,
    },
    {
      id: 4,
      title: 'Как оптимизировать производительность React приложений',
      channel: 'Tech Masters',
      views: '67K просмотров',
      timestamp: '3 дня назад',
      duration: '18:55',
      thumbnail: 'https://cdn.poehali.dev/projects/b03416fd-0006-45f5-8d1a-3834ba82294e/files/001e6449-3ef2-41c1-b222-748dd7efb989.jpg',
      channelAvatar: '/placeholder.svg',
      verified: true,
    },
    {
      id: 5,
      title: 'CSS Grid и Flexbox: Полное руководство',
      channel: 'Frontend School',
      views: '156K просмотров',
      timestamp: '1 месяц назад',
      duration: '32:12',
      thumbnail: 'https://cdn.poehali.dev/projects/b03416fd-0006-45f5-8d1a-3834ba82294e/files/502674c0-b29d-4cc4-8022-174602599b54.jpg',
      channelAvatar: '/placeholder.svg',
      verified: true,
    },
    {
      id: 6,
      title: 'Создание API с Node.js и Express',
      channel: 'Backend Dev',
      views: '92K просмотров',
      timestamp: '2 недели назад',
      duration: '28:44',
      thumbnail: 'https://cdn.poehali.dev/projects/b03416fd-0006-45f5-8d1a-3834ba82294e/files/001e6449-3ef2-41c1-b222-748dd7efb989.jpg',
      channelAvatar: '/placeholder.svg',
      verified: false,
    },
    {
      id: 7,
      title: 'Введение в машинное обучение на Python',
      channel: 'AI Insights',
      views: '312K просмотров',
      timestamp: '3 недели назад',
      duration: '52:20',
      thumbnail: 'https://cdn.poehali.dev/projects/b03416fd-0006-45f5-8d1a-3834ba82294e/files/502674c0-b29d-4cc4-8022-174602599b54.jpg',
      channelAvatar: '/placeholder.svg',
      verified: true,
    },
    {
      id: 8,
      title: 'Анимации в веб-дизайне: от простого к сложному',
      channel: 'Creative Lab',
      views: '78K просмотров',
      timestamp: '4 дня назад',
      duration: '24:16',
      thumbnail: 'https://cdn.poehali.dev/projects/b03416fd-0006-45f5-8d1a-3834ba82294e/files/ef6006e8-5c70-4862-af80-5cd65915079e.jpg',
      channelAvatar: '/placeholder.svg',
      verified: false,
    },
  ];

  const getSectionTitle = () => {
    switch (section) {
      case 'home':
        return 'Главная';
      case 'recommendations':
        return 'Рекомендации для вас';
      case 'subscriptions':
        return 'Новые видео';
      case 'history':
        return 'История просмотров';
      case 'saved':
        return 'Сохраненные видео';
      case 'liked':
        return 'Понравившиеся видео';
      default:
        return 'Видео';
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{getSectionTitle()}</h1>
        <p className="text-muted-foreground">
          {section === 'recommendations' && 'Персональные рекомендации на основе ваших интересов'}
          {section === 'subscriptions' && 'Последние видео от ваших подписок'}
          {section === 'history' && 'Недавно просмотренные видео'}
          {section === 'saved' && 'Видео, сохраненные для просмотра позже'}
          {section === 'liked' && 'Видео, которые вам понравились'}
          {section === 'home' && 'Популярные видео сегодня'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockVideos.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </div>
    </div>
  );
}