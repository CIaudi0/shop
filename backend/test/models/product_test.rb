require "test_helper"

class ProductTest < ActiveSupport::TestCase
  test "il prodotto è valido con tutti gli attributi" do
    product = Product.new(
      title: "Laptop Test",
      description: "Descrizione test",
      price: 100,
      original_price: 120,
      sale: true,
      thumbnail: "https://example.com/img.jpg"
    )
    assert product.valid?
  end

  test "il prodotto non è valido senza titolo" do
    product = Product.new(price: 100)
    refute product.valid?
    assert_not_nil product.errors[:title]
  end

  test "il prezzo deve essere positivo" do
    product = Product.new(title: "Test", price: -10)
    refute product.valid?
    assert_includes product.errors[:price], "must be greater than or equal to 0" 
  end
end
