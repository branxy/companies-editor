import { nanoid } from "@reduxjs/toolkit"
import { type Company } from "../companies/companiesInitialState"

export interface Worker {
  id: ReturnType<typeof nanoid>
  companyId: Company["id"]
  firstName: string
  lastName: string
  position: string
}

export type Workers = Worker[]

export const workersInitialState: Workers = [
  {
    id: nanoid(),
    companyId: 1,
    firstName: "Иван",
    lastName: "Петров",
    position: "Старший монтажник",
  },
  {
    id: nanoid(),
    companyId: 1,
    firstName: "Александр",
    lastName: "Сидоров",
    position: "Инженер-строитель",
  },
  {
    id: nanoid(),
    companyId: 1,
    firstName: "Екатерина",
    lastName: "Иванова",
    position: "Архитектор",
  },
  {
    id: nanoid(),
    companyId: 1,
    firstName: "Сергей",
    lastName: "Кузнецов",
    position: "Прораб",
  },
  {
    id: nanoid(),
    companyId: 1,
    firstName: "Анна",
    lastName: "Смирнова",
    position: "Монтажник",
  },
  {
    id: nanoid(),
    companyId: 1,
    firstName: "Дмитрий",
    lastName: "Федоров",
    position: "Строитель",
  },
  {
    id: nanoid(),
    companyId: 1,
    firstName: "Ольга",
    lastName: "Морозова",
    position: "Директор",
  },
  {
    id: nanoid(),
    companyId: 1,
    firstName: "Павел",
    lastName: "Николаев",
    position: "Инженер",
  },
  {
    id: nanoid(),
    companyId: 1,
    firstName: "Мария",
    lastName: "Егорова",
    position: "Архитектор",
  },
  {
    id: nanoid(),
    companyId: 1,
    firstName: "Никита",
    lastName: "Козлов",
    position: "Строитель",
  },
  {
    id: nanoid(),
    companyId: 2,
    firstName: "Олег",
    lastName: "Игнатьев",
    position: "Прораб",
  },
  {
    id: nanoid(),
    companyId: 2,
    firstName: "Татьяна",
    lastName: "Волкова",
    position: "Инженер-строитель",
  },
  {
    id: nanoid(),
    companyId: 2,
    firstName: "Артем",
    lastName: "Комаров",
    position: "Строитель",
  },
  {
    id: nanoid(),
    companyId: 2,
    firstName: "Светлана",
    lastName: "Павлова",
    position: "Архитектор",
  },
  {
    id: nanoid(),
    companyId: 2,
    firstName: "Игорь",
    lastName: "Медведев",
    position: "Монтажник",
  },
  {
    id: nanoid(),
    companyId: 2,
    firstName: "Елена",
    lastName: "Соколова",
    position: "Строитель",
  },
  {
    id: nanoid(),
    companyId: 2,
    firstName: "Андрей",
    lastName: "Тихонов",
    position: "Директор",
  },
  {
    id: nanoid(),
    companyId: 2,
    firstName: "Юлия",
    lastName: "Андреева",
    position: "Инженер",
  },
  {
    id: nanoid(),
    companyId: 2,
    firstName: "Владимир",
    lastName: "Сергеев",
    position: "Строитель",
  },
  {
    id: nanoid(),
    companyId: 2,
    firstName: "Марина",
    lastName: "Новикова",
    position: "Архитектор",
  },
  {
    id: nanoid(),
    companyId: 3,
    firstName: "Илья",
    lastName: "Ростов",
    position: "Прораб",
  },
  {
    id: nanoid(),
    companyId: 3,
    firstName: "Наталья",
    lastName: "Ростова",
    position: "Инженер-строитель",
  },
  {
    id: nanoid(),
    companyId: 3,
    firstName: "Вера",
    lastName: "Ростова",
    position: "Строитель",
  },
  {
    id: nanoid(),
    companyId: 3,
    firstName: "Николай",
    lastName: "Ростов",
    position: "Архитектор",
  },
  {
    id: nanoid(),
    companyId: 3,
    firstName: "Наталья",
    lastName: "Ростова",
    position: "Монтажник",
  },
  {
    id: nanoid(),
    companyId: 3,
    firstName: "Петр",
    lastName: "Ростов",
    position: "Строитель",
  },
  {
    id: nanoid(),
    companyId: 3,
    firstName: "Николай",
    lastName: "Болконский",
    position: "Директор",
  },
  {
    id: nanoid(),
    companyId: 3,
    firstName: "Андрей",
    lastName: "Болконский",
    position: "Инженер",
  },
  {
    id: nanoid(),
    companyId: 3,
    firstName: "Марья",
    lastName: "Болконская",
    position: "Строитель",
  },
  {
    id: nanoid(),
    companyId: 3,
    firstName: "Елизавета",
    lastName: "Болконская",
    position: "Архитектор",
  },
  {
    id: nanoid(),
    companyId: 4,
    firstName: "Василий",
    lastName: "Курагин",
    position: "Прораб",
  },
  {
    id: nanoid(),
    companyId: 4,
    firstName: "Ипполит",
    lastName: "Курагин",
    position: "Инженер-строитель",
  },
  {
    id: nanoid(),
    companyId: 4,
    firstName: "Елена",
    lastName: "Курагина",
    position: "Строитель",
  },
  {
    id: nanoid(),
    companyId: 4,
    firstName: "Петр",
    lastName: "Безухов",
    position: "Архитектор",
  },
  {
    id: nanoid(),
    companyId: 4,
    firstName: "Анна",
    lastName: "Друбецкая",
    position: "Монтажник",
  },
  {
    id: nanoid(),
    companyId: 4,
    firstName: "Борис",
    lastName: "Друбецкой",
    position: "Строитель",
  },
  {
    id: nanoid(),
    companyId: 4,
    firstName: "Катерина",
    lastName: "Мамонтова",
    position: "Директор",
  },
  {
    id: nanoid(),
    companyId: 4,
    firstName: "Ольга",
    lastName: "Мамонтова",
    position: "Инженер",
  },
  {
    id: nanoid(),
    companyId: 4,
    firstName: "Софья",
    lastName: "Мамонтова",
    position: "Строитель",
  },
  {
    id: nanoid(),
    companyId: 4,
    firstName: "Марья",
    lastName: "Карагина",
    position: "Архитектор",
  },
  {
    id: nanoid(),
    companyId: 5,
    firstName: "Жюли",
    lastName: "Карагина",
    position: "Прораб",
  },
  {
    id: nanoid(),
    companyId: 5,
    firstName: "Марья",
    lastName: "Долохова",
    position: "Инженер-строитель",
  },
  {
    id: nanoid(),
    companyId: 5,
    firstName: "Федор",
    lastName: "Долохов",
    position: "Строитель",
  },
  {
    id: nanoid(),
    companyId: 5,
    firstName: "Марья",
    lastName: "Ахросимова",
    position: "Архитектор",
  },
  {
    id: nanoid(),
    companyId: 5,
    firstName: "Альфонс",
    lastName: "Берг",
    position: "Монтажник",
  },
  {
    id: nanoid(),
    companyId: 5,
    firstName: "Амалия",
    lastName: "Бурьенн",
    position: "Строитель",
  },
  {
    id: nanoid(),
    companyId: 5,
    firstName: "Василий",
    lastName: "Денисов",
    position: "Директор",
  },
  {
    id: nanoid(),
    companyId: 5,
    firstName: "Платон",
    lastName: "Каратаев",
    position: "Инженер",
  },
  {
    id: nanoid(),
    companyId: 5,
    firstName: "Анна",
    lastName: "Шерер",
    position: "Строитель",
  },
  {
    id: nanoid(),
    companyId: 5,
    firstName: "Петр",
    lastName: "Шиншин",
    position: "Архитектор",
  },
  {
    id: nanoid(),
    companyId: 6,
    firstName: "Наполеон",
    lastName: "Бонапарт",
    position: "Прораб",
  },
  {
    id: nanoid(),
    companyId: 6,
    firstName: "Михаил",
    lastName: "Кутузов",
    position: "Инженер-строитель",
  },
  {
    id: nanoid(),
    companyId: 6,
    firstName: "Петр",
    lastName: "Багратион",
    position: "Строитель",
  },
  {
    id: nanoid(),
    companyId: 6,
    firstName: "Михаил",
    lastName: "Барклай де Толли",
    position: "Архитектор",
  },
  {
    id: nanoid(),
    companyId: 6,
    firstName: "Карл",
    lastName: "Мак",
    position: "Монтажник",
  },
  {
    id: nanoid(),
    companyId: 6,
    firstName: "Александр",
    lastName: "Мишо",
    position: "Строитель",
  },
  {
    id: nanoid(),
    companyId: 6,
    firstName: "Карл",
    lastName: "Пфуль",
    position: "Директор",
  },
  {
    id: nanoid(),
    companyId: 6,
    firstName: "Карл",
    lastName: "Толь",
    position: "Инженер",
  },
  {
    id: nanoid(),
    companyId: 6,
    firstName: "Густав",
    lastName: "Армфельт",
    position: "Строитель",
  },
  {
    id: nanoid(),
    companyId: 6,
    firstName: "Карл",
    lastName: "Багговут",
    position: "Архитектор",
  },
  {
    id: nanoid(),
    companyId: 7,
    firstName: "Александр",
    lastName: "Балашов",
    position: "Прораб",
  },
  {
    id: nanoid(),
    companyId: 7,
    firstName: "Леонтий",
    lastName: "Беннигсен",
    position: "Инженер-строитель",
  },
  {
    id: nanoid(),
    companyId: 7,
    firstName: "Федор",
    lastName: "Буксгевден",
    position: "Строитель",
  },
  {
    id: nanoid(),
    companyId: 7,
    firstName: "Франц",
    lastName: "фон Вейпотер",
    position: "Архитектор",
  },
  {
    id: nanoid(),
    companyId: 7,
    firstName: "Людвиг",
    lastName: "фон Вольцоген",
    position: "Монтажник",
  },
  {
    id: nanoid(),
    companyId: 7,
    firstName: "Иван",
    lastName: "Греков",
    position: "Строитель",
  },
  {
    id: nanoid(),
    companyId: 7,
    firstName: "Петр",
    lastName: "Долгоруков",
    position: "Директор",
  },
  {
    id: nanoid(),
    companyId: 7,
    firstName: "Дмитрий",
    lastName: "Дохтуров",
    position: "Инженер",
  },
  {
    id: nanoid(),
    companyId: 7,
    firstName: "Алексей",
    lastName: "Ермолов",
    position: "Строитель",
  },
  {
    id: nanoid(),
    companyId: 7,
    firstName: "Петр",
    lastName: "Коновницын",
    position: "Архитектор",
  },
  {
    id: nanoid(),
    companyId: 8,
    firstName: "Александр",
    lastName: "Ланжерон",
    position: "Прораб",
  },
  {
    id: nanoid(),
    companyId: 8,
    firstName: "Михаил",
    lastName: "Милорадович",
    position: "Инженер-строитель",
  },
  {
    id: nanoid(),
    companyId: 8,
    firstName: "Василий",
    lastName: "Орлов-Денисов",
    position: "Строитель",
  },
  {
    id: nanoid(),
    companyId: 8,
    firstName: "Игнатий",
    lastName: "Пржибышевский",
    position: "Архитектор",
  },
  {
    id: nanoid(),
    companyId: 8,
    firstName: "Николай",
    lastName: "Раевский",
    position: "Монтажник",
  },
  {
    id: nanoid(),
    companyId: 8,
    firstName: "Николай",
    lastName: "Репнин-Волконский",
    position: "Строитель",
  },
  {
    id: nanoid(),
    companyId: 8,
    firstName: "Павел",
    lastName: "Сухтелен",
    position: "Директор",
  },
  {
    id: nanoid(),
    companyId: 8,
    firstName: "Прохор",
    lastName: "Тимохин",
    position: "Инженер",
  },
  {
    id: nanoid(),
    companyId: 8,
    firstName: "Федор",
    lastName: "Уваров",
    position: "Строитель",
  },
  {
    id: nanoid(),
    companyId: 8,
    firstName: "Александр",
    lastName: "Чернышев",
    position: "Архитектор",
  },
  {
    id: nanoid(),
    companyId: 9,
    firstName: "Иоганн",
    lastName: "фон Шмит",
    position: "Прораб",
  },
  {
    id: nanoid(),
    companyId: 9,
    firstName: "Паисий",
    lastName: "Кайсаров",
    position: "Инженер-строитель",
  },
  {
    id: nanoid(),
    companyId: 9,
    firstName: "Андрей",
    lastName: "Кайсаров",
    position: "Строитель",
  },
  {
    id: nanoid(),
    companyId: 9,
    firstName: "Иван",
    lastName: "Несвицкий",
    position: "Архитектор",
  },
  {
    id: nanoid(),
    companyId: 9,
    firstName: "Карл",
    lastName: "Шуберт",
    position: "Монтажник",
  },
  {
    id: nanoid(),
    companyId: 9,
    firstName: "Александр",
    lastName: "Розен",
    position: "Строитель",
  },
  {
    id: nanoid(),
    companyId: 9,
    firstName: "Огюстен",
    lastName: "Бельяр",
    position: "Директор",
  },
  {
    id: nanoid(),
    companyId: 9,
    firstName: "Жан-Батист",
    lastName: "Бессьер",
    position: "Инженер",
  },
  {
    id: nanoid(),
    companyId: 9,
    firstName: "Луи",
    lastName: "Даву",
    position: "Строитель",
  },
  {
    id: nanoid(),
    companyId: 9,
    firstName: "Луи",
    lastName: "де Коленкур",
    position: "Архитектор",
  },
  {
    id: nanoid(),
    companyId: 10,
    firstName: "Жанн",
    lastName: "Ланн",
    position: "Прораб",
  },
  {
    id: nanoid(),
    companyId: 10,
    firstName: "Иоахим",
    lastName: "Мюрат",
    position: "Инженер-строитель",
  },
  {
    id: nanoid(),
    companyId: 10,
    firstName: "Никола",
    lastName: "Удино",
    position: "Строитель",
  },
  {
    id: nanoid(),
    companyId: 10,
    firstName: "Луи",
    lastName: "Бертье",
    position: "Архитектор",
  },
  {
    id: nanoid(),
    companyId: 10,
    firstName: "Жерар",
    lastName: "Дюрок",
    position: "Монтажник",
  },
  {
    id: nanoid(),
    companyId: 10,
    firstName: "Жан",
    lastName: "Рапп",
    position: "Строитель",
  },
  {
    id: nanoid(),
    companyId: 10,
    firstName: "Доминик",
    lastName: "Ларрей",
    position: "Директор",
  },
  {
    id: nanoid(),
    companyId: 10,
    firstName: "Мамелюк",
    lastName: "Раза",
    position: "Инженер",
  },
  {
    id: nanoid(),
    companyId: 10,
    firstName: "Винсент",
    lastName: "Боссе",
    position: "Строитель",
  },
  {
    id: nanoid(),
    companyId: 10,
    firstName: "Алексей",
    lastName: "Аракчеев",
    position: "Архитектор",
  },
]
