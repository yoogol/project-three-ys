class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string :headline
      t.string :lastChangedBy
      t.references :user, index: true, foreign_key: true
      t.datetime :deadline
      t.integer :timeNeeded
      t.integer :yuckiness
      t.string :roommate
      t.boolean :claimedStatus
      t.boolean :completedStatus
      t.datetime :timeCompleted

      t.timestamps null: false
    end
  end
end
