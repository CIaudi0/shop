class ProductsController < ApplicationController
  allow_unauthenticated_access only: %i[index show]
  before_action :set_product, only: %i[show update destroy]

  # GET /products
  def index
    @products = Product.all
    render json: @products
  end

  # GET /products/1
  def show
    render json: @product
  end

  # POST /products
  def create
    @product = Product.new(product_params)

    if @product.save
      render json: @product, status: :created, location: @product
    else
      render json: { errors: @product.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /products/1
  def update
    if @product.update(product_params)
      render json: @product
    else
      render json: { errors: @product.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /products/1
  def destroy
    @product.destroy!
    head :no_content
  end

  private

  def set_product
    @product = Product.find(params.require(:id))
  end

  def product_params
    params.require(:product).permit(:title, :description, :price, :original_price, :sale, :thumbnail)
  end
end
