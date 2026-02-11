module Admin
  class ProductsController < ::AdminController
    def index
      render json: Product.all.order(created_at: :desc)
    end
  end
end