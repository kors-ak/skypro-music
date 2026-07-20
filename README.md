# SkyPro Music

_Учебный проект по frontend-разработке_

Веб-приложение для прослушивания музыки с персональным аккаунтом пользователя.  
Сервис позволяет просматривать каталог треков, управлять воспроизведением через встроенный плеер, добавлять композиции в избранное и изучать тематические подборки.

## Функциональность

### Авторизация и регистрация

- Регистрация нового пользователя.
- Авторизация существующего пользователя.
- Выход из аккаунта.
- Валидация данных форм.
- Обработка ошибок при работе с аккаунтом.

### Каталог музыки

- Просмотр доступных треков.
- Отображение информации о композициях:
  - название трека;
  - исполнитель;
  - альбом;
  - длительность.

### Музыкальный плеер

Встроенный аудиоплеер с возможностями:

- воспроизведение и постановка трека на паузу;
- перемотка композиции;
- переключение между треками;
- повтор текущего трека;
- случайное воспроизведение треков (Shuffle);
- отображение текущего прогресса воспроизведения.

### Избранное

- Добавление треков в избранное.
- Удаление треков из избранного.
- Просмотр списка понравившихся композиций.

### Подборки

- Просмотр готовых музыкальных подборок.
- Работа с коллекциями треков по категориям.

### Дополнительные возможности

- Отображение состояния загрузки.
- Навигация между страницами приложения.
- Страница 404 для несуществующих маршрутов.

## Технологии

- HTML5
- CSS3
- TypeScript
- Next.js
- CSS Modules
- REST API
- ESLint
- Prettier
- Git
- GitHub

## Установка и запуск

### Клонирование репозитория

```bash
git clone https://github.com/kors-ak/skypro-music.git
```

### Установка зависимостей

```bash
npm install
```

### Запуск проекта

```bash
npm run dev
```

Приложение будет доступно по адресу:

```text
http://localhost:3000
```




## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
