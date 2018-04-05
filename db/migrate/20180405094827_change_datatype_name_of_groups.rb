class ChangeDatatypeNameOfGroups < ActiveRecord::Migration[5.0]
  def change
    change_column :groups, :name, :string,null:false,index:true,unique:true
  end
end
