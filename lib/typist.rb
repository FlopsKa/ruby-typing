class Typist
  attr_reader :task
  def initialize(argv, io)
    @stdout = io
    @arguments = argv
    @task = "Those are the words you have to enter right now"
  end
  
  def interpret(words)
    right_words = 0
    task_array = @task.split
    words.split.each do |word|
      right_words += 1 if task_array.include? word
    end
    @stdout.puts right_words
  end
end
