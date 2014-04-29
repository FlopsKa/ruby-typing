require 'active_support/json'
require 'ar_result_calculations'

get "/" do
  erb :main
end

get "/words" do
  content_type 'application/json'
  { :words => Word.all.shuffle }.to_json
end

post "/words" do
  content_type 'application/json'
  puts params
  Test.create(:wpm => params['wpm'],
              :words_total => params['right_words'],
              :keystrokes_total => params['keystrokes']).save
  alldata = Test.all
  newdata = Test.last(50)
  {
    :avg_wpm => newdata.average('wpm').to_s,
    :count => alldata.count,
    :sum_words => alldata.sum('words_total'),
    :sum_keystrokes => alldata.sum('keystrokes_total'),
    :median => newdata.median(:wpm, :already_sorted => false)
  }.to_json
end
