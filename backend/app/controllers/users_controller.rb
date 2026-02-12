class UsersController < ::ApplicationController
  before_action :ensure_admin

  def index
    render json: User.all.select(:id, :email_address, :role, :created_at)
  end
end
