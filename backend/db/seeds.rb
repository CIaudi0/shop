# Pulisce tutto
OrderItem.destroy_all
Order.destroy_all
Product.destroy_all
User.destroy_all

# 1. Crea Utente Test
user = User.create!([
  {
    email_address: "test@shop.com",
    password: "password",
    password_confirmation: "password",
    role: "user"
  },
  {
    email_address: "admin@admin.com",
    password: "password",
    password_confirmation: "password",
    role: "admin"
  },
])

# 2. Crea Prodotti
Product.create!([
  {
    title: "Laptop Ultra",
    description: "Potente e leggero",
    price: 999.00,
    original_price: 1200.00,
    sale: true,
    thumbnail: "https://laptopmedia.com/wp-content/uploads/2024/02/3-43-scaled-e1708551086479.jpg"
  },
  {
    title: "Cuffie Bluetooth",
    description: "Bassissimi consumi",
    price: 49.90,
    original_price: 49.90,
    sale: false,
    thumbnail: "https://m.media-amazon.com/images/I/71RcvaLndCL._AC_SL1500_.jpg"
  },
  {
    title: "Monitor 4K",
    description: "Nitidezza incredibile",
    price: 299.00,
    original_price: 350.00,
    sale: true,
    thumbnail: "https://www.bhphotovideo.com/images/images2000x2000/dell_u2718q_ultrasharp_27_4k_1352128.jpg"
  }
])
puts "Creati #{Product.count} prodotti."