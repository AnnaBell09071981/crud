// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class User {
  static #list = []
  constructor(email, login, password) {
    this.email = email
    this.login = login
    this.password = password
    this.id = new Date().getTime()
  }

  verifyPassword = (password) => this.password === password

  static add = (user) => {
    this.#list.push(user)
  }

  static getList = () => this.#list

  static getById = (id) =>
    this.#list.find((user) => user.id === id)

  static deleteById = (id) => {
    const index = this.#list.findIndex(
      (user) => user.id === id,
    )

    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }

  static updateById = (id, { email }) => {
    const user = this.getById(id)

    if (user) {
      this.update(user, data)
      return true
    } else {
      return false
    }
  }

  static update = (user, { email }) => {
    if (email) {
      user.email = email
    }
  }
}

class Product {
  static #list = []
  constructor(name, price, description) {
    this.name = name
    this.price = price
    this.description = description
    this.id = new Date().getTime()
  }

  verifyID = (id) => this.id === id

  static add = (product) => {
    this.#list.push(product)
  }

  static getList = () => this.#list

  static getById = (id) =>
    this.#list.find((product) => product.id === id)

  static deleteById = (id) => {
    const index = this.#list.findIndex(
      (product) => product.id === id,
    )

    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }

  static updateById = (id, { name }) => {
    const product = this.getById(id)

    if (product) {
      this.update(name, data)
      return true
    } else {
      return false
    }
  }

  static update = (product, { id }) => {
    if (id) {
      product.id = id
    }
  }
}

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  const list = User.getList()

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'index',

    data: {
      users: {
        list,
        isEmpty: list.length === 0,
      },
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

router.post('/user-create', function (req, res) {
  const { email, login, password } = req.body

  const user = new User(email, login, password)

  User.add(user)

  console.log(User.getList())

  res.render('success-info', {
    style: 'success-info',
    info: 'Користувач створений',
  })
})

// ============================================================

router.get('/user-delete', function (req, res) {
  const { id } = req.query

  User.deleteById(Number(id))

  res.render('success-info', {
    style: 'success-info',
    info: 'Користувач видалений',
  })
})

// ============================================================

router.post('/user-update', function (req, res) {
  const { email, password, id } = req.body

  let result = false

  const user = User.getById(Number(id))

  if (user.verifyPassword(password)) {
    User.update(user, { email })
    result = true
  }

  res.render('success-info', {
    style: 'success-info',
    info: result
      ? 'Емайл пошта оновлена'
      : 'Сталась помилка',
  })
})

// ============================================================

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-create', function (req, res) {
  // res.render генерує нам HTML сторінку
  const list = Product.getList()

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-create', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'index',

    data: {
      products: {
        list,
        isEmpty: list.length === 0,
      },
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

router.post('/product-create', function (req, res) {
  const { name, price, description } = req.body
  const product = new Product(name, price, description)
  Product.add(product)
  console.log(Product.getList())
  res.render('alert', {
    style: 'alert',
    info: 'Продукт добавлений',
  })
})

// ================================================================

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-list', function (req, res) {
  // res.render генерує нам HTML сторінку
  const list = Product.getList()

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-list', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'index',

    data: {
      products: {
        list,
        isEmpty: list.length === 0,
      },
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-edit', function (req, res) {
  const { id } = req.query

  const product = Product.getById(Number(id))
  Product.add(product)
  console.log(Product.getList())
  res.render('alert', {
    style: 'alert',
    info: 'Товар з таким ID не знайдено',
  })
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer

  // вказуємо назву папки контейнера, в якій знаходяться наші стилі

  // ↑↑ сюди вводимо JSON дані
})

// ============================================================

router.post('/product-edit', function (req, res) {
  const { name, price, description } = req.body

  let result = false

  const product = Product.getById(Number(id))

  if (product.verifyID(id)) {
    Product.update(
      product,
      { name },
      { description },
      { price },
    )
    result = true
  }

  res.render('alert', {
    style: 'alert',
    info: result ? 'Продукт оновлений' : 'Сталась помилка',
  })
})

// ============================================================
// Підключаємо роутер до бек-енду
module.exports = router
