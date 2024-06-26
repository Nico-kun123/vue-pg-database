# ВЗАИМОДЕЙСТВИЕ С БАЗОЙ ДАННЫХ ЧЕРЕЗ САЙТ (Vue.js + Express.js + PostgreSQL)

> **Примечание:** Этот проект НЕ требует постоянных обновлений кода.

> **Статус Проекта:**
> 🟩 Активен

## 📑Содержание

1. [Цели и Задачи](#-цели-и-задачи)
2. [Основная работа](#основная-работа)

   а) [Главная страница](#главная-страница)

   - [Добавление новой категории товаров](#добавление-новой-категории-товаров)
   - [Добавление нового товара](#добавление-нового-товара)
   - [Удаление товара по его ID](#удаление-товара-по-его-id)

   б) [Страница "products"](#страница-products)

    - [Поиск товара по критериям](#поиск-товара-по-критериям)

   в) [Страница "categories"](#страница-categories)

4. [Стек технологий](#-стек-технологий)
5. [Установка](#-установка)

---

# ❗ Цели и задачи

Необходимо создать оконное приложение (можно веб-приложение) "Склад" (используя любой язык программирования), которое будет подключаться к серверу PostgreSQL и конкретно к базе данных Northwind. В приложении необходимо вывести все данные из таблицы products и categories, а также настроить возможность работы с этими данными.

Функционал:
1) В категории необходимо иметь возможность только создавать новую категорию продуктов.
2) Необходимо создать функцию добавления нового продукта, удаления старого продукта (по id номеру), поиска продукта (продуктов) по нескольким параметра:

    - по category_id (номеру категории);
    - по product_name (названию продукта);
    - по количеству продуктов units_in_stock (больше или меньше определенного значения).

---

# Основная работа

Сайт состоит из трёх страниц:

- **Главная страница**. Здесь представлены задачи данной работы. Также здесь прописан функционал для добавления и удаления товара, добавления новой категории товаров.
- **Страница с таблицей "products"**. Показать таблицу с товарами. Таблицу можно сортировать по столбцам (по алфавиту). На этой странице реализован функционал поиска товаров по параметрам (category_id, product_name и больше/меньше, чем количество units_in_stock).
- **Страница с таблицей "categories"**. Показать таблицу с категориями товаров. Таблицу можно сортировать по столбцам (по алфавиту).

## Главная страница

> **Примечание**: Оранжевым цветом отмечены обязательные для заполнения поля. Для данной работы была реализована примитивная валидация данных форм (без доп. библиотек).

Главная страница сайта:

![Главная страница](https://github.com/Nico-kun123/vue-pg-database/assets/77405288/0cdf8ec9-5e91-4dc7-9518-f8ff4eac4687)

В случае, если валидация полей не прошла, будет выведен alert с сообщением об ошибке. Также в консоли браузера это сообщение дублируется.

### Добавление новой категории товаров

Для того, чтобы добавить новую категорию товаров, нужно заполнить поле "Название категории". Поле "Описание категории" не обязательно для заполнения:

![Новая категория](https://github.com/Nico-kun123/vue-pg-database/assets/77405288/dee96a0f-f935-4f59-b903-cac93e08e278)

Если валидация данных прошла успешно, то результат можно будет посмотреть на странице с таблицей "categories".

### Добавление нового товара

Для того, чтобы добавить новый товар, нужно заполнить поля "Название товара", "ID поставщика", "ID категории товаров" и "discontinued (0 или 1)". Остальные поля не обязательны для заполнения:

![Новый товар](https://github.com/Nico-kun123/vue-pg-database/assets/77405288/c8931116-ebe1-42be-b0b7-0543c5263680)

Если валидация данных прошла успешно, то результат можно будет посмотреть на странице с таблицей "products". ID добавленного товара вычисляется автоматически (максимальный индекс + 1).

### Удаление товара по его ID

Форма для удаления товара по ID содержит только одно поле:

![Удаление товара](https://github.com/Nico-kun123/vue-pg-database/assets/77405288/fc0223a8-878e-4524-8d9e-ab3227c6a882)

Если валидация данных прошла успешно, то результат можно будет посмотреть на странице с таблицей "products". Товара с введённым ID быть не должно в результате отправки формы.

## Страница "products"

При переходе на данную страницу будет произведён запрос на чтение данных из БД (таблица "products"):

![Товары](https://github.com/Nico-kun123/vue-pg-database/assets/77405288/82ea6fdf-e33a-4826-a88f-fbbea8758dd7)

### Поиск товара по критериям

Пользователь должен выбрать критерий поиска, чтобы появились другие поля формы.

Например, ниже представлен результат поиска товаров с категорией товаров №3:

![категория товаров](https://github.com/Nico-kun123/vue-pg-database/assets/77405288/2fa73197-79f1-431b-a9b2-1ee5c77bc643)

А здесь представлен результат поиска товаров с названием "Chai":

![название товара](https://github.com/Nico-kun123/vue-pg-database/assets/77405288/7803ceb8-3068-437e-94a3-9b66d1d634c4)

А здесь представлен результат поиска товаров со значением units_in_stock>200 штук:

![Больше200](https://github.com/Nico-kun123/vue-pg-database/assets/77405288/29177107-3d5f-4226-92cd-f0a5a672a36c)

А здесь представлен результат поиска товаров со значением units_in_stock<5 штук:

![Меньше5](https://github.com/Nico-kun123/vue-pg-database/assets/77405288/326eec62-01ff-4c19-90f3-19a2c27f471f)

## Страница "categories"

При переходе на данную страницу будет произведён запрос на чтение данных из БД (таблица "categories"):

![Категории](https://github.com/Nico-kun123/vue-pg-database/assets/77405288/d1b75219-40f7-493d-a693-9c44dbcc3630)

---

# 💻 Стек технологий

В проекте был использован следующий стек технологий:

- [HTML](https://developer.mozilla.org/ru/docs/Learn/HTML/Introduction_to_HTML)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Vue.js](https://vuejs.org)
- [Vue Router](https://router.vuejs.org)
- [Git](https://git-scm.com/)
- [Vite.js](https://vitejs.dev)
<!-- - [gh-pages (Github Pages)](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) -->
- [EJS](https://ejs.co)
- [Express.js](https://expressjs.com/ru/)
- [PostgreSQL](https://www.postgresql.org)
- [Axios](https://axios-http.com/ru/docs/intro)
- [concurrently](https://www.npmjs.com/package/concurrently)
- [nodemon](https://nodemon.io)

---

# ⏬ Установка

Клонируем удалённый репозиторий на локальную машину:

```markdown
git clone https://github.com/Nico-kun123/vue-pg-database
```

Устанавливаем все необходимые компоненты:

```markdown
cd vue-pg-database
npm install
```

Содержание <code>package.json</code>:

```json
{
  "name": "northwind-app",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "concurrently 'npm:dev:frontend' 'npm:dev:backend'",
    "dev:frontend": "vite",
    "dev:backend": "nodemon server/index.js",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.6.7",
    "ejs": "^3.1.9",
    "express": "^4.18.3",
    "pg": "^8.11.3",
    "vue": "^3.4.15",
    "vue-router": "^4.2.5"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.3",
    "concurrently": "^8.2.2",
    "nodemon": "^3.1.0",
    "vite": "^5.0.11"
  }
}
```

В проекте есть следующие разделы:

- **dependencies**: Это пакеты, необходимые для работы приложения.
- **devDependencies**: Это пакеты, которые нужны только для разработки и тестирования приложения. Они не будут включены в окончательную сборку приложения.

В проекте есть следующие скрипты:

- **"dev"**. Этот скрипт запускает сервер разработки Vite на локальной машине;
- **"dev:frontend"** и **"dev:backend"**. Запуск только клиентской и серверной части сайта.
- **"build"**. Этот скрипт используется для сборки проекта для production. Он минимизирует и оптимизирует код для лучшей производительности в production;
- **"preview"**. Этот скрипт предназначен для предварительного просмотра собранного проекта. Он запускает сервер, который позволяет увидеть, как он будет выглядеть и работать в production;
<!-- - **"deploy"**. Этот скрипт сначала собирает проект, а затем развертывает его на "GitHub Pages". -->

❗ Чтобы запустить сайт, нужно просто запустить скрипт <code>"dev"</code> и перейти на <http://localhost:3000>.

---

## Автор

Кудрявцев Николай (Электронная почта: nicolay.kudryavtsev@gmail.com)
