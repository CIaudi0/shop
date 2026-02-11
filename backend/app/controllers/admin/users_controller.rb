module Admin
  class UsersController < ::AdminController
    def index
      render json: User.all.select(:id, :email_address, :role, :created_at)
    end
  end
end