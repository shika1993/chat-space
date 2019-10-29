class MessagesController < ApplicationController
  before_action :set_group


  def index
    @name = Group.find_by(id: params[:group_id]).name
    @message = Message.new
  end

  def create

  end

  private

  def message_params
    params.require(:message).permit(:text, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

 

end
