# Автосервис — MVP

Демо-сайт автосервиса с лендингом и админ-панелью для презентации потенциальному покупателю бизнеса.

## Возможности

- **Главная страница** — услуги, цены, форма записи, отзывы «2ГИС», контакты
- **Админ-панель** (`/admin`) — заявки клиентов, управление отзывами
- **SQLite** — локальная база, создаётся автоматически при первом запуске
- **Адаптивный дизайн** — телефон, планшет, ПК

## Быстрый старт

```bash
cd "c:\Users\Anechka\Desktop\Cursor Projects\rd_auto_mvp"
npm install
copy .env.example .env.local
npm run dev
```

Откройте в браузере:

- **Сайт:** http://localhost:3000
- **Админка:** http://localhost:3000/admin

### Данные для входа (по умолчанию)

| Поле   | Значение |
|--------|----------|
| Логин  | `admin`  |
| Пароль | `admin`  |

Изменить можно в файле `.env.local`:

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin
SESSION_SECRET=ваша-случайная-строка-минимум-32-символа
```

## Демо для покупателя

### На этом же ПК

```bash
npm run dev
```

### С телефона / другого ПК в одной Wi‑Fi сети

```bash
npm run dev -- -H 0.0.0.0
```

Узнайте IP компьютера (`ipconfig` → IPv4) и откройте на телефоне:

```
http://192.168.x.x:3000
```

### Production-сборка

```bash
npm run build
npm start
```

## Хостинг в РФ (кроме Vercel)

Под MVP c SQLite лучше всего подойдут провайдеры, где можно запускать Docker-контейнер и подключить volume под базу:

- **Amvera** — быстрый деплой из GitHub, удобно для демо
- **Timeweb Cloud** — контейнерный сервис + managed VM
- **Selectel Cloud** — Kubernetes/containers/VM, гибко под рост
- **Yandex Cloud** — App/Container/VM, хороший запас для масштабирования
- **VK Cloud** — облачные VM/контейнеры, тоже подходит для MVP

Практический выбор для "показать покупателю быстро": **Amvera** или **Timeweb Cloud**.

## Прод-деплой через Docker

Проект подготовлен под контейнерный запуск.

### 1) Подготовьте env

```bash
copy .env.example .env
```

Обязательно задайте:

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `SESSION_SECRET` (минимум 32 символа)
- `DATA_DIR` (по умолчанию `data`)

### 2) Локальная проверка как в проде

```bash
docker compose up --build -d
```

Проверка:

- Сайт: `http://localhost:3000`
- Health: `http://localhost:3000/api/health`

Остановка:

```bash
docker compose down
```

### 3) Что важно для облака

- Пробросить порт контейнера `3000`
- Подключить persistent storage/volume в `/app/data`
- Передать переменные окружения из `.env`
- В healthcheck использовать `GET /api/health`

## Структура

```
src/
├── app/                  # Страницы и Server Actions
│   ├── page.tsx          # Лендинг
│   └── admin/            # Админ-панель
├── components/           # UI-компоненты
└── lib/                  # БД, auth, валидация
data/app.db               # SQLite (создаётся автоматически)
```

## Сценарий демонстрации

1. Откройте главную — покажите лендинг и слайдер отзывов 2ГИС
2. Заполните форму записи — заявка сохранится в базу
3. Войдите в `/admin` — покажите новую заявку, смените статус
4. В разделе «Отзывы» добавьте отзыв — он сразу появится на главной

## Стек

Next.js 16 · React 19 · Tailwind CSS 4 · SQLite (better-sqlite3) · Drizzle ORM · iron-session · Zod
