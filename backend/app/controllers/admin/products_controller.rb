module Admin
  class ProductsController < ::AdminController
    # GET /admin/products
    def index
      render json: Product.all.order(created_at: :desc)
    end

    # POST /admin/products
    def create
      product = Product.new(product_params)
      if product.save
        render json: product, status: :created
      else
        render json: { error: product.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /admin/products/:id
    def update
      product = Product.find(params[:id])
      if product.update(product_params)
        render json: product
      else
        render json: { error: product.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # DELETE /admin/products/:id
    def destroy
      product = Product.find(params[:id])
      product.destroy
      head :no_content 
    end

    private

    def product_params
      params.require(:product).permit(:title, :description, :price, :originalPrice, :sale, :thumbnail)
    end
  end
end