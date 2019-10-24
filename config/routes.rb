Rails.application.routes.draw do
  Rails.application.routes.draw do
    devise_for :users
    root 'messages#index'
    resources :users, only: [:edit, :update]
    resouuces :groups, only:[:new, :create, :edit, :update]
  end
end
