class GroupsController < ApplicationController

    def index
      @groups = Group.all
    end

    def new
      @group = Group.new
      @group.users << current_user
    end
  
    def create

      @group = Group.new(group_params)

      if @group.save
        redirect_to root_path, notice: 'グループを作成しました' 
      else          #validationでエラーが起こった時の処理がこっち
        render :new #renderは指定された名前のビューのみを表示
      end

    end
  
    def edit
      @group = Group.find(params[:id])
    end
  
    def update 
      @group = Group.update(group_params)
      redirect_to root_path, notice: 'グループを編集しました'

    end

    private
    def group_params
      params.require(:group).permit(:name, {:user_ids => []})
    end

end
