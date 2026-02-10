# Pulisce tutto
OrderItem.destroy_all
Order.destroy_all
Product.destroy_all
User.destroy_all

# 1. Crea Utente Test
user = User.create!(
  email_address: "test@shop.com",
  password: "password",
  password_confirmation: "password"
)
puts "Utente creato: test@shop.com / password"

# 2. Crea Prodotti
Product.create!([
  {
    title: "Laptop Ultra",
    description: "Potente e leggero",
    price: 999.00,
    original_price: 1200.00,
    sale: true,
    thumbnail: "https://placehold.co/400"
  },
  {
    title: "Cuffie Bluetooth",
    description: "Bassissimi consumi",
    price: 49.90,
    original_price: 49.90,
    sale: false,
    thumbnail: "https://placehold.co/400"
  },
  {
    title: "Monitor 4K",
    description: "Nitidezza incredibile",
    price: 299.00,
    original_price: 350.00,
    sale: true,
    thumbnail: "https://placehold.co/400"
  }
])
puts "Creati #{Product.count} prodotti."