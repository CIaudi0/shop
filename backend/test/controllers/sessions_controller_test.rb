require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:normal_user) 
  end


  test "create with valid credentials" do
    post session_path, params: { email_address: @user.email_address, password: "password" }

    assert_response :ok 
    
    assert_not_nil cookies[:session_token]
  end

  test "create with invalid credentials" do
    post session_path, params: { email_address: @user.email_address, password: "wrong" }

    assert_response :unauthorized
    assert_nil cookies[:session_token]
  end

  test "destroy" do
    post session_path, params: { email_address: @user.email_address, password: "password" }
    
    delete session_path

    assert_response :success
    assert_empty cookies[:session_token]
  end
end