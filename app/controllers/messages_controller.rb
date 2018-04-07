class MessagesController < ApplicationController
  def index
    @message = Message.new
  end

  def create
    @message = Message.new(messages_params)
    @message.save
  end

  private

  def messages_params
    params.require(:messages).permit(:body, :image, :user_id, :group_id)
  end
end
