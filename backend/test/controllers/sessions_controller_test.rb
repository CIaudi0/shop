require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:normal_user)
  end

  test "create with valid credentials" do
    post session_url, params: { email_address: @user.email_address, password: "password" }

    assert_response :ok 
    
    # Verifica che il cookie di sessione sia settato 
    assert_not_nil cookies[:session_id] 
  end

  test "create with invalid credentials" do
    post session_url, params: { email_address: @user.email_address, password: "wrong" }

    assert_response :unauthorized 
  end

  test "destroy" do
    # 1. Prima Login
    post session_url, params: { email_address: @user.email_address, password: "password" }
    
    # 2. Poi Logout
    delete session_url

    assert_response :ok
  end
end