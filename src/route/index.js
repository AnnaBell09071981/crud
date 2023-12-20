// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================
class Product {
  static #List = []

  static #count = 0

  constructor(img, title, description, category, price) {
    this.id = ++Product.#count //Генеруємо унікальний id для товару
    this.img = img
    this.title = title
    this.description = description
    this.category = category
    this.price = price
  }

  static add = (
    img,
    title,
    description,
    category,
    price,
  ) => {
    const newProduct = new Product(
      img,
      title,
      description,
      category,
      price,
    )
    this.#List.push(newProduct)
  }

  static getList = () => {
    return this.#List
  }
  static getById = (id) => {
    //Фільтруємо товари, щоб вилучити той, з яким порівнюємо id
    const filteredList = this.#List.filter(
      (product) => product.id !== id,
    )

    //Відсортуємо за допомогою Math.random() та переміщаємо масив

    const shuffledList = filteredList.sort(
      () => Math.random() - 0.5,
    )

    //Повертаємо перші 3 елементи з переміщаного масиву

    return shuffledList.slice(0, 3)
  }
}

Product.add(
  'https://picsum.photos/200/300',
  `Комп'ютер Artline Gaming AMD`,
  `AMD Ryzen S 3600`,
  [
    { id: 1, text: 'Готовий до відправки' },
    { id: 2, text: 'Топ продажів' },
  ],
  27000,
)

Product.add(
  'https://picsum.photos/200/300',
  `Комп'ютер ProLine Workstation (w67p03) Intel Xeon`,
  `Intel Xeon E-2226G`,
  [{ id: 1, text: 'Готовий до відправки' }],
  20000,
)

Product.add(
  'https://picsum.photos/200/300',
  `Комп'ютер ProLine Business Intel Core`,
  `Intel Core E-2226G`,
  [{ id: 2, text: 'Топ продажів' }],
  40000,
)
// ================================================================

// router.get Створює нам один ентпоїнт

// // ↙️ тут вводимо шлях (PATH) до сторінки
// router.get('/', function (req, res) {
//   // res.render генерує нам HTML сторінку

//   // ↙️ cюди вводимо назву файлу з сontainer
//   res.render('index', {
//     // вказуємо назву папки контейнера, в якій знаходяться наші стилі
//     style: 'index',
//   })
//   // ↑↑ сюди вводимо JSON дані
// })

// ================================================================

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-index',

    data: {
      List: Product.getList(),
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/purchase-product', function (req, res) {
  const id = Number(req.query.id)
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-product', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-product',

    data: {
      List: Product.getRandomList(id),
      product: Product.getById(id),
    },
  })
  // ↑↑ сюди вводимо JSON дані
})
// ================================================================

// Підключаємо роутер до бек-енду
module.exports = router
