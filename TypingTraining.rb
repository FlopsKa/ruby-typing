#!/usr/bin/env ruby

class TypingTraining
  def initialize(filename)
    @words_per_task = 5
    @filename = filename
    @wordlist = Array.new

    open(@filename).each do |word|
      @wordlist << word.chop()
    end
    @wordlist.shuffle!
  end

  def show_task(num)
    word_count = num*@words_per_task
    while(word_count < @words_per_task*(num+1))
      print "#{@wordlist[word_count]} " 
      word_count += 1
    end
    puts
  end

  def input_words(num)
    input = $stdin.gets.chomp()
    puts check_input(input,num)
  end

  def check_input(input, num)
    input = input.split(" ")
    word_count = num*@words_per_task
    right_words = 0
    input.each do |word|
      right_words += 1 if word == @wordlist[word_count]
      word_count += 1
    end
    right_words
  end
end

typing_training = TypingTraining.new(ARGV[0] || "0.txt")
typing_training.show_task(0)
typing_training.input_words(0)
typing_training.show_task(1)
typing_training.input_words(1)
typing_training.show_task(2)
typing_training.input_words(2)

