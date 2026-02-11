class AdminController < ApplicationController
  before_action :ensure_admin

  private
  def ensure_admin
    unless Current.user&.admin?
      render json: { error: "Accesso negato. Richiesto ruolo Admin." }, status: :forbidden
    end
  end
end