require "test_helper"

class ProductsControllerTest < ActionDispatch::IntegrationTest
  setup do
      @admin = users(:admin_user)
      @user = users(:normal_user)
      @product = products(:one) 
  end

  test "dovrebbe bloccare accesso senza login" do
    post products_url, params: { product: { name: "Test" } }, as: :json
    assert_response :unauthorized
  end

  test "admin dovrebbe vedere la lista prodotti" do
    post session_url, params: { email_address: @admin.email_address, password: "password" }
    
    get products_url 
    assert_response :success
    
    assert_match "application/json", @response.media_type
  end

  test "admin può creare un prodotto" do
    post session_url, params: { email_address: @admin.email_address, password: "password" }

    assert_difference("Product.count") do
      post products_url, params: { 
        product: { name: "Nuovo", price: 50, description: "Test" } 
      }, as: :json
    end

    assert_response :created 
  end
end