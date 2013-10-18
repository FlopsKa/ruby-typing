require 'open-uri'
require 'json'

result = JSON.parse(open("http://api.ihackernews.com/page").read)

result["items"].each do |item| 
  puts item["url"]
end
