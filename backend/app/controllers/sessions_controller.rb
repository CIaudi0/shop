class SessionsController < ApplicationController
  allow_unauthenticated_access only: %i[ new create ]
  rate_limit to: 10, within: 3.minutes, only: :create, with: -> { render json: { error: "Too many attempts" }, status: :too_many_requests }

  def new
    render json: { message: "Please log in via POST /session" }
  end

  def create
  if user = User.authenticate_by(params.permit(:email_address, :password))
    start_new_session_for user
    render json: { message: "Login effettuato", user: user.slice(:id, :email_address, :role) }
  else
    render json: { error: "Credenziali errate" }, status: :unauthorized
  end
end

  def destroy
    terminate_session
    render json: { message: "Logout successful" }
  end
end