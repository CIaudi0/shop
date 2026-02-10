class ApplicationController < ActionController::Base
  include ActionController::Cookies 
  
  include Authentication
  skip_before_action :verify_authenticity_token
  allow_browser versions: :modern
end