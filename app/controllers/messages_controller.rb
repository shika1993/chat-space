class MessagesController < ApplicationController
  def index
    @groups = Group.all
  end

  def create
  end

  private

  def message_params
end
