import bcrypt from "bcryptjs";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

const DEMO_REVIEWS = [
  {
    authorName: "Алексей М.",
    rating: 5,
    text: "Отличный сервис! Починили подвеску на Toyota Camry за один день. Мастера объяснили все детали, цена совпала с озвученной. Рекомендую!",
    reviewDate: "2025-11-12",
  },
  {
    authorName: "Марина К.",
    rating: 5,
    text: "Приезжала на компьютерную диагностику. Всё быстро, без навязывания лишних услуг. Приятная атмосфера и чистая зона ожидания.",
    reviewDate: "2025-10-28",
  },
  {
    authorName: "Дмитрий В.",
    rating: 4,
    text: "Делал ТО на Hyundai Solaris. Качество работ на высоте, единственное — пришлось подождать запчасть полдня. В целом доволен.",
    reviewDate: "2025-09-15",
  },
  {
    authorName: "Игорь С.",
    rating: 5,
    text: "Лучший автосервис в районе. Ремонтировали электрику на BMW — нашли проблему, которую два других сервиса не смогли. Спасибо!",
    reviewDate: "2025-08-03",
  },
  {
    authorName: "Елена П.",
    rating: 5,
    text: "Записалась через сайт — перезвонили через 10 минут. Удобно, прозрачно, машину отдали в срок. Буду обращаться снова.",
    reviewDate: "2025-07-20",
  },
];

export function seedDatabase(db: ReturnType<typeof drizzle<typeof schema>>) {
  const now = new Date().toISOString();
  const username = process.env.ADMIN_USERNAME ?? "admin";
  const password = process.env.ADMIN_PASSWORD ?? "admin";
  const passwordHash = bcrypt.hashSync(password, 12);

  db.insert(schema.users)
    .values({
      username,
      passwordHash,
      role: "admin",
    })
    .run();

  for (const review of DEMO_REVIEWS) {
    db.insert(schema.reviews)
      .values({
        authorName: review.authorName,
        rating: review.rating,
        text: review.text,
        source: "2gis",
        reviewDate: review.reviewDate,
        isVisible: true,
        createdAt: now,
      })
      .run();
  }
}
