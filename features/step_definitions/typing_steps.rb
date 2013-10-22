Given(/^I run the program with "(.*?)"$/) do |command|
  @io = StringIO.new
  @app = Typist.new(command, @io)
end

Given(/^I enter the "(.*?)" words$/) do |command|
  @app.interpret(@app.task)
end

Then(/^I should see the amount of "(.*?)" correct  words$/) do |command|
  @io.rewind
  @io.read.chop.should == command
end

