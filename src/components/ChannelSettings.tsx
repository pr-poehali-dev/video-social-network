import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default function ChannelSettings() {
  const [channelName, setChannelName] = useState('Мой канал');
  const [description, setDescription] = useState('Добро пожаловать на мой канал!');
  const [email, setEmail] = useState('user@example.com');
  
  const [notifications, setNotifications] = useState({
    newSubscriber: true,
    comments: true,
    likes: false,
    mentions: true,
    recommendations: false,
  });

  const [privacy, setPrivacy] = useState({
    showSubscriptions: true,
    showLiked: false,
    showHistory: false,
    allowComments: true,
  });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Настройки канала</h1>
        <p className="text-muted-foreground">Управляйте своим каналом и настройками</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
          <TabsTrigger value="profile" className="gap-2">
            <Icon name="User" size={16} />
            <span className="hidden sm:inline">Профиль</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Icon name="Bell" size={16} />
            <span className="hidden sm:inline">Уведомления</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="gap-2">
            <Icon name="Shield" size={16} />
            <span className="hidden sm:inline">Приватность</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="gap-2">
            <Icon name="Settings" size={16} />
            <span className="hidden sm:inline">Аккаунт</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Информация о канале</CardTitle>
              <CardDescription>
                Настройте название, описание и изображение вашего канала
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/placeholder.svg" alt={channelName} />
                  <AvatarFallback className="text-2xl">{channelName[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" className="gap-2">
                    <Icon name="Upload" size={16} />
                    Загрузить фото
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Рекомендуем изображение 800x800px
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="channelName">Название канала</Label>
                  <Input
                    id="channelName"
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    placeholder="Введите название канала"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Расскажите о своем канале"
                    rows={4}
                  />
                  <p className="text-sm text-muted-foreground">
                    {description.length} / 500 символов
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="channelUrl">URL канала</Label>
                  <div className="flex gap-2">
                    <Input
                      id="channelUrl"
                      value="videohub.com/@mychannel"
                      readOnly
                      className="flex-1"
                    />
                    <Button variant="outline" size="icon">
                      <Icon name="Copy" size={16} />
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-end gap-3">
                <Button variant="outline">Отмена</Button>
                <Button className="gap-2">
                  <Icon name="Save" size={16} />
                  Сохранить изменения
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Статистика канала</CardTitle>
              <CardDescription>Основные показатели вашего канала</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Users" size={16} />
                    <span className="text-sm">Подписчики</span>
                  </div>
                  <p className="text-2xl font-bold">12.5K</p>
                  <Badge variant="secondary" className="gap-1">
                    <Icon name="TrendingUp" size={12} />
                    +245
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Video" size={16} />
                    <span className="text-sm">Видео</span>
                  </div>
                  <p className="text-2xl font-bold">87</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Eye" size={16} />
                    <span className="text-sm">Просмотры</span>
                  </div>
                  <p className="text-2xl font-bold">1.2M</p>
                  <Badge variant="secondary" className="gap-1">
                    <Icon name="TrendingUp" size={12} />
                    +12K
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="ThumbsUp" size={16} />
                    <span className="text-sm">Лайки</span>
                  </div>
                  <p className="text-2xl font-bold">89K</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Уведомления</CardTitle>
              <CardDescription>
                Управляйте тем, какие уведомления вы хотите получать
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Icon name="UserPlus" size={16} className="text-muted-foreground" />
                      <Label htmlFor="newSubscriber">Новые подписчики</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Уведомления о новых подписках на ваш канал
                    </p>
                  </div>
                  <Switch
                    id="newSubscriber"
                    checked={notifications.newSubscriber}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, newSubscriber: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Icon name="MessageSquare" size={16} className="text-muted-foreground" />
                      <Label htmlFor="comments">Комментарии</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Новые комментарии к вашим видео
                    </p>
                  </div>
                  <Switch
                    id="comments"
                    checked={notifications.comments}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, comments: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Icon name="ThumbsUp" size={16} className="text-muted-foreground" />
                      <Label htmlFor="likes">Лайки</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Когда кто-то ставит лайк вашему видео
                    </p>
                  </div>
                  <Switch
                    id="likes"
                    checked={notifications.likes}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, likes: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Icon name="AtSign" size={16} className="text-muted-foreground" />
                      <Label htmlFor="mentions">Упоминания</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Когда вас упоминают в комментариях
                    </p>
                  </div>
                  <Switch
                    id="mentions"
                    checked={notifications.mentions}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, mentions: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Icon name="Sparkles" size={16} className="text-muted-foreground" />
                      <Label htmlFor="recommendations">Рекомендации</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Персональные рекомендации видео
                    </p>
                  </div>
                  <Switch
                    id="recommendations"
                    checked={notifications.recommendations}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, recommendations: checked })
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button className="gap-2">
                  <Icon name="Save" size={16} />
                  Сохранить настройки
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Приватность</CardTitle>
              <CardDescription>
                Контролируйте, какую информацию видят другие пользователи
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Icon name="Users" size={16} className="text-muted-foreground" />
                      <Label htmlFor="showSubscriptions">Показывать подписки</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Другие могут видеть ваши подписки
                    </p>
                  </div>
                  <Switch
                    id="showSubscriptions"
                    checked={privacy.showSubscriptions}
                    onCheckedChange={(checked) =>
                      setPrivacy({ ...privacy, showSubscriptions: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Icon name="ThumbsUp" size={16} className="text-muted-foreground" />
                      <Label htmlFor="showLiked">Показывать понравившиеся</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Другие могут видеть видео, которые вам понравились
                    </p>
                  </div>
                  <Switch
                    id="showLiked"
                    checked={privacy.showLiked}
                    onCheckedChange={(checked) =>
                      setPrivacy({ ...privacy, showLiked: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Icon name="History" size={16} className="text-muted-foreground" />
                      <Label htmlFor="showHistory">Показывать историю</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Другие могут видеть вашу историю просмотров
                    </p>
                  </div>
                  <Switch
                    id="showHistory"
                    checked={privacy.showHistory}
                    onCheckedChange={(checked) =>
                      setPrivacy({ ...privacy, showHistory: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Icon name="MessageSquare" size={16} className="text-muted-foreground" />
                      <Label htmlFor="allowComments">Разрешить комментарии</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Пользователи могут комментировать ваши видео
                    </p>
                  </div>
                  <Switch
                    id="allowComments"
                    checked={privacy.allowComments}
                    onCheckedChange={(checked) =>
                      setPrivacy({ ...privacy, allowComments: checked })
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button className="gap-2">
                  <Icon name="Save" size={16} />
                  Сохранить настройки
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Настройки аккаунта</CardTitle>
              <CardDescription>Управление учетной записью и безопасностью</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Пароль</Label>
                  <div className="flex gap-2">
                    <Input id="password" type="password" value="••••••••" readOnly />
                    <Button variant="outline">Изменить</Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold">Двухфакторная аутентификация</h3>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">Включить 2FA</p>
                    <p className="text-sm text-muted-foreground">
                      Дополнительная защита вашего аккаунта
                    </p>
                  </div>
                  <Button variant="outline">Настроить</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold text-destructive">Опасная зона</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Icon name="Download" size={16} />
                    Экспортировать данные
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2 text-destructive hover:text-destructive">
                    <Icon name="Trash2" size={16} />
                    Удалить аккаунт
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
