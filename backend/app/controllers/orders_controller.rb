class OrdersController < ApplicationController
  # utente loggato 
  # allow_unauthenticated_access only: [] 

  def index
    # GET /orders 
    @orders = Current.user.orders.order(created_at: :desc)
    render json: @orders, include: :order_items
  end

  def create
    # POST /orders
    
    ActiveRecord::Base.transaction do
      @order = Current.user.orders.new(
        status: 'pending',
        customer_data: order_params[:customer], 
        # address_data: order_params[:address],   
        total: 0
      )
      
      calculated_total = 0

      # 2. Processiamo gli items
      order_params[:items].each do |item_params|
        product = Product.find(item_params[:id])
        quantity = item_params[:quantity].to_i
        
        price = product.sale ? (product.price || product.original_price) : product.original_price
        
        @order.order_items.build(
          product: product,
          quantity: quantity,
          price: price
        )
        
        calculated_total += price * quantity
      end

      @order.total = calculated_total
      @order.save!
    end

    render json: @order, status: :created, include: :order_items
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  private

  def order_params
    params.permit(:customer => {}, :address => {}, :items => [:id, :quantity])
  end
end