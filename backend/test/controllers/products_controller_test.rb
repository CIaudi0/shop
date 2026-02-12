require "test_helper"

module Admin
  class ProductsControllerTest < ActionDispatch::IntegrationTest
    setup do
      @admin = users(:admin_user)
      @user = users(:normal_user)
      @product = products(:one)
    end

    test "dovrebbe bloccare accesso senza login" do
      post admin_products_url, params: { product: { title: "Test" } }, as: :json
      
      assert_response :unauthorized
    end

    test "admin dovrebbe vedere la lista prodotti" do
      # Login
      post session_url, params: { email_address: @admin.email_address, password: "password" }
      
      # Richiesta alla rotta ADMIN
      get admin_products_url
      
      assert_response :success
      
      # Verifica che sia JSON
      assert_match "application/json", @response.media_type
    end

    test "admin può creare un prodotto" do
      # Login
      post session_url, params: { email_address: @admin.email_address, password: "password" }

      assert_difference("Product.count") do
        # POST alla rotta ADMIN
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