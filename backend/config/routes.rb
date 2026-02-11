Rails.application.routes.draw do
  # Rotte pubbliche
  resources :products
  resource :session
  resources :passwords, param: :token
  resources :orders, only: [:create, :index, :show]

  # Rotte Admin (Namespace)
  namespace :admin do
    resources :users
    resources :products
    resources :orders
  end
end