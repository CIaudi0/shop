class User < ApplicationRecord
  has_secure_password
  has_many :sessions, dependent: :destroy
  has_many :orders, dependent: :destroy
  
  normalizes :email_address, with: ->(e) { e.strip.downcase }

  before_create :set_default_role

  def admin?
    role == 'admin'
  end

  private
  def set_default_role
    self.role ||= 'user'
  end
  
end