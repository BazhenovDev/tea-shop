# 🍵 Tea Shop

Интернет-магазин по продаже чая, созданный с использованием Angular. Включает главную страницу со слайдером и аккордеоном, каталог товаров, фильтрацию по поиску и оформление заказа.
[Ссылка на github pages](https://bazhenovdev.github.io/tea-shop/)

## 🔧 Технологии

- **Angular 14**  
- **TypeScript**  
- **RxJS (Subjects, Observables)**  
- **SCSS**  
- **HTML5**

## 🚀 Функционал

- Главная страница со слайдером и аккордеоном  
- Просмотр каталога чая  
- Поиск и фильтрация товаров  
- Оформление заказа
- Лоадер 
- Адаптивная вёрстка

## 🖼️ Скриншоты

_Скриншоты интерфейса:_

<!-- Пример: -->
![Главная страница](https://github.com/BazhenovDev/tea-shop/blob/main/src/assets/images/github/main.jpg)
![Каталог](https://github.com/BazhenovDev/tea-shop/blob/main/src/assets/images/github/catalog.jpg)
![Страница продукта](https://github.com/BazhenovDev/tea-shop/blob/main/src/assets/images/github/product.jpg)
![Оформление заказа](https://github.com/BazhenovDev/tea-shop/blob/main/src/assets/images/github/order.jpg)

## 🛠 Установка и запуск

```bash
# 1. Клонировать репозиторий
git clone https://github.com/BazhenovDev/tea-shop.git
cd tea-shop

# 2. Установить зависимости
npm install

# 3. Запустить проект
ng serve -o

# 4. Перейти в браузере по адресу
http://localhost:4200
```

## 📁 Структура проекта

```text
src/
├── app/
│   ├── components/         # Все компоненты
│   │   ├── common/         # Общие компоненты (хедер, футер и т.д.)
│   │   └── pages/          # Основные страницы (главная, каталог, карточка товара, оформление заказа)
│   ├── services/           # Сервисы (работа с данными, Subject)
│   ├── types/              # Шаблоны типов данных
│   ├── app-routing.module.ts
│   ├── app.component.html
│   └── app.module.ts
└── assets/
    └── images/             # Изображения
```


