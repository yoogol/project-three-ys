class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.string :group_name
      t.boolean :active
      t.text :current_punishment
      t.integer :num_members

      t.timestamps null: false
    end
  end
end
