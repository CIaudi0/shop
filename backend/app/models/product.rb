class Product < ApplicationRecord
    has_many :order_items, dependent: :destroy
    
    validates :title, presence: true
    validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
    validates :original_price, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
end
