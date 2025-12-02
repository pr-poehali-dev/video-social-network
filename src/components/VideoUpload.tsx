import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function VideoUpload() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const [uploadStep, setUploadStep] = useState<'select' | 'uploading' | 'details' | 'complete'>('select');
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  
  const [videoDetails, setVideoDetails] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    visibility: 'public',
    allowComments: true,
    allowRatings: true,
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      toast({
        title: 'Ошибка',
        description: 'Выберите видеофайл',
        variant: 'destructive',
      });
      return;
    }

    const maxSize = 500 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: 'Ошибка',
        description: 'Размер файла не должен превышать 500 МБ',
        variant: 'destructive',
      });
      return;
    }

    setVideoFile(file);
    simulateUpload();
  };

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Ошибка',
        description: 'Выберите изображение',
        variant: 'destructive',
      });
      return;
    }

    setThumbnailFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const simulateUpload = () => {
    setUploadStep('uploading');
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStep('details');
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const handlePublish = () => {
    if (!videoDetails.title.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Введите название видео',
        variant: 'destructive',
      });
      return;
    }

    setUploadStep('complete');
    toast({
      title: 'Видео опубликовано!',
      description: 'Ваше видео успешно загружено и опубликовано',
    });
  };

  const handleReset = () => {
    setUploadStep('select');
    setUploadProgress(0);
    setVideoFile(null);
    setThumbnailFile(null);
    setThumbnailPreview('');
    setVideoDetails({
      title: '',
      description: '',
      category: '',
      tags: '',
      visibility: 'public',
      allowComments: true,
      allowRatings: true,
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Б';
    const k = 1024;
    const sizes = ['Б', 'КБ', 'МБ', 'ГБ'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (uploadStep === 'select') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Загрузить видео</h1>
          <p className="text-muted-foreground">Поделитесь своим контентом с миром</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div
              className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Upload" size={32} className="text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Выберите файл для загрузки</h3>
                  <p className="text-muted-foreground">
                    Или перетащите видеофайл сюда
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center text-sm text-muted-foreground">
                  <Badge variant="secondary">MP4</Badge>
                  <Badge variant="secondary">MOV</Badge>
                  <Badge variant="secondary">AVI</Badge>
                  <Badge variant="secondary">WebM</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Максимальный размер: 500 МБ
                </p>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </CardContent>
        </Card>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Video" size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Качество видео</h4>
                  <p className="text-sm text-muted-foreground">
                    Поддержка до 4K разрешения
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Shield" size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Безопасность</h4>
                  <p className="text-sm text-muted-foreground">
                    Защищенная загрузка файлов
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Zap" size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Быстрая обработка</h4>
                  <p className="text-sm text-muted-foreground">
                    Моментальная публикация
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (uploadStep === 'uploading') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Загрузка видео</h1>
          <p className="text-muted-foreground">Пожалуйста, не закрывайте эту страницу</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Загрузка файла</CardTitle>
            <CardDescription>
              {videoFile?.name} ({formatFileSize(videoFile?.size || 0)})
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Прогресс загрузки</span>
                <span className="font-semibold">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>

            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Icon name="Info" size={16} />
              <span>
                {uploadProgress < 50 && 'Загрузка файла на сервер...'}
                {uploadProgress >= 50 && uploadProgress < 80 && 'Обработка видео...'}
                {uploadProgress >= 80 && 'Почти готово...'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (uploadStep === 'complete') {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="pt-12 pb-12">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="CheckCircle2" size={48} className="text-green-500" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Видео успешно опубликовано!</h2>
                <p className="text-muted-foreground">
                  Ваше видео "{videoDetails.title}" теперь доступно для просмотра
                </p>
              </div>
              <div className="flex gap-3 justify-center pt-4">
                <Button variant="outline" onClick={handleReset}>
                  Загрузить еще
                </Button>
                <Button className="gap-2">
                  <Icon name="Eye" size={16} />
                  Посмотреть видео
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Детали видео</h1>
        <p className="text-muted-foreground">Заполните информацию о вашем видео</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Название видео <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Введите название видео"
                  value={videoDetails.title}
                  onChange={(e) =>
                    setVideoDetails({ ...videoDetails, title: e.target.value })
                  }
                />
                <p className="text-sm text-muted-foreground">
                  {videoDetails.title.length} / 100 символов
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  placeholder="Расскажите о вашем видео"
                  rows={6}
                  value={videoDetails.description}
                  onChange={(e) =>
                    setVideoDetails({ ...videoDetails, description: e.target.value })
                  }
                />
                <p className="text-sm text-muted-foreground">
                  {videoDetails.description.length} / 5000 символов
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Категория</Label>
                <Select
                  value={videoDetails.category}
                  onValueChange={(value) =>
                    setVideoDetails({ ...videoDetails, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Технологии</SelectItem>
                    <SelectItem value="education">Образование</SelectItem>
                    <SelectItem value="entertainment">Развлечения</SelectItem>
                    <SelectItem value="gaming">Игры</SelectItem>
                    <SelectItem value="music">Музыка</SelectItem>
                    <SelectItem value="sports">Спорт</SelectItem>
                    <SelectItem value="news">Новости</SelectItem>
                    <SelectItem value="lifestyle">Образ жизни</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Теги</Label>
                <Input
                  id="tags"
                  placeholder="Введите теги через запятую"
                  value={videoDetails.tags}
                  onChange={(e) =>
                    setVideoDetails({ ...videoDetails, tags: e.target.value })
                  }
                />
                <p className="text-sm text-muted-foreground">
                  Добавьте теги для лучшего поиска (например: react, javascript, tutorial)
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Обложка видео</CardTitle>
              <CardDescription>Выберите привлекательную обложку для вашего видео</CardDescription>
            </CardHeader>
            <CardContent>
              {thumbnailPreview ? (
                <div className="space-y-4">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="w-full aspect-video object-cover rounded-lg"
                  />
                  <Button
                    variant="outline"
                    onClick={() => thumbnailInputRef.current?.click()}
                    className="gap-2"
                  >
                    <Icon name="Upload" size={16} />
                    Изменить обложку
                  </Button>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                  onClick={() => thumbnailInputRef.current?.click()}
                >
                  <Icon name="Image" size={32} className="mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Нажмите для загрузки обложки
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Рекомендуется 1280x720px
                  </p>
                </div>
              )}
              <input
                ref={thumbnailInputRef}
                type="file"
                accept="image/*"
                onChange={handleThumbnailSelect}
                className="hidden"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Настройки публикации</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="visibility">Видимость</Label>
                <Select
                  value={videoDetails.visibility}
                  onValueChange={(value) =>
                    setVideoDetails({ ...videoDetails, visibility: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">
                      <div className="flex items-center gap-2">
                        <Icon name="Globe" size={16} />
                        <span>Публичное</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="unlisted">
                      <div className="flex items-center gap-2">
                        <Icon name="Link" size={16} />
                        <span>По ссылке</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="private">
                      <div className="flex items-center gap-2">
                        <Icon name="Lock" size={16} />
                        <span>Приватное</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allowComments">Комментарии</Label>
                  <p className="text-sm text-muted-foreground">
                    Разрешить комментарии под видео
                  </p>
                </div>
                <Switch
                  id="allowComments"
                  checked={videoDetails.allowComments}
                  onCheckedChange={(checked) =>
                    setVideoDetails({ ...videoDetails, allowComments: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allowRatings">Оценки</Label>
                  <p className="text-sm text-muted-foreground">
                    Разрешить лайки и дизлайки
                  </p>
                </div>
                <Switch
                  id="allowRatings"
                  checked={videoDetails.allowRatings}
                  onCheckedChange={(checked) =>
                    setVideoDetails({ ...videoDetails, allowRatings: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Информация о файле</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Имя файла</span>
                </div>
                <p className="text-sm font-medium truncate">{videoFile?.name}</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Размер</span>
                  <span className="font-medium">{formatFileSize(videoFile?.size || 0)}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Статус</span>
                  <Badge variant="secondary" className="gap-1">
                    <Icon name="CheckCircle2" size={12} />
                    Готово к публикации
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button className="w-full gap-2" size="lg" onClick={handlePublish}>
              <Icon name="Upload" size={16} />
              Опубликовать видео
            </Button>
            <Button variant="outline" className="w-full" onClick={handleReset}>
              Отмена
            </Button>
          </div>

          <Card className="bg-muted/50">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Icon name="Info" size={16} className="mt-0.5 flex-shrink-0" />
                <p>
                  После публикации видео будет обработано и станет доступно для просмотра в течение нескольких минут
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
