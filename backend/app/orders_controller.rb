module Admin
  class OrdersController < ::AdminController
    def index
      render json: Order.includes(:user, :order_items).all.order(created_at: :desc), 
             include: [:user, :order_items]
    end
  end
end