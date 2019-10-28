class MessagesController < ApplicationController
  
  def index
    @name = Group.find_by(id: params[:group_id]).name
  end

  def create
  end

end
