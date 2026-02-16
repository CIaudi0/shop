require "test_helper"

module Admin
  class ProductsControllerTest < ActionDispatch::IntegrationTest
    setup do
      @admin = users(:admin_user)
      @user = users(:normal_user)
      @product = products(:one)
    end

    require "test_helper"


    test "should get index" do
      get products_url
      assert_response :success
    end

    test "should show product" do
      get product_url(@product)
      assert_response :success
    end

    test "admin può creare un prodotto" do
      post session_url, params: { email_address: @admin.email_address, password: "password" }

      assert_difference("Product.count") do
        post admin_products_url, params: { 
          product: { 
            title: "Nuovo Prodotto", 
            description: "Descrizione Test",
            price: 50.00,
            original_price: 60.00,    
            sale: false,
            thumbnail: "http://test.com/img.jpg" 
          } 
        }, as: :json
      end

      assert_response :created 
    end
  end
end