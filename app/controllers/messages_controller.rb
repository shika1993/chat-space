class MessagesController < ApplicationController
  before_action :set_group


  def index
    @name = Group.find_by(id: params[:group_id]).name
    @message = Message.new
    @messages = @group.messages.includes(:user) #messageテーブルの中からクリックされたグループのidと一致するレコードを取得

  end

  def create
    @message = @group.messages.new(message_params)
 
    if @message.save
      respond_to do |format|
        format.json
        format.html { redirect_to group_messages_path, notice: "メッセージを送信しました" }
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:text, :image, :created_at).merge(user_id: current_user.id)
  end


  def set_group
    @group = Group.find(params[:group_id]) #クリックしたグループのidを持つレコードを取得
  end
 

end