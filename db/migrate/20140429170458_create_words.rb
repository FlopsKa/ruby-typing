class CreateWords < ActiveRecord::Migration
  def change
    create_table :words do |t|
      t.string :word
      t.integer :frequency
      t.integer :mistakes

      t.timestamps
    end
  end
end
