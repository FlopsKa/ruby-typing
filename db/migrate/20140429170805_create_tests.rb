class CreateTests < ActiveRecord::Migration
  def change
    create_table :tests do |t|
      t.integer :wpm
      t.integer :words_total
      t.integer :keystrokes_total

      t.timestamps
    end
  end
end
