class CreateWords < ActiveRecord::Migration
  def change
    create_table :words do |t|
      t.string :text
      t.integer :frequency
      t.integer :mistakes

      t.timestamps
    end
    File.open("all_words.txt").each do |w|
      puts w
      Word.create(text: w.chop, frequency: 0, mistakes: 0)
    end
  end
end
