class GroupsController < ApplicationController
  before_action :set_group, only: [:index,:edit,:update]

  def index
    @message = Message.new
    if !current_user.groups.empty?
      @messages = @group.messages.includes(:user)
      @groups = current_user.groups
    end
  end
  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
    ##add current_user
    params[:group][:user_ids].unshift(current_user.id)
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path,notice:"グループを作成しました"
    else
      render"new"
    end
  end

  def edit
  end

  def update
    if @group.update(group_params)
      redirect_to root_path,notice: "グループを編集しました"
    else
      render'edit'
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, { :user_ids => [] })
  end

  def set_group
    if !current_user.groups.empty?
      id = current_user.group_ids
      @group = Group.find(id.last)
    end
  end
end
