require 'open-uri'
require 'json'
require 'nokogiri'

result = JSON.parse(open("http://api.ihackernews.com/page").read)
links = Array.new
result["items"].each do |item| 
  links << item["url"] if /http/.match(item["url"])
end

puts links

wordlist = Array.new
open("words.txt").each_line do |word|
  wordlist.push word.chop()
end

result = ""
links.each do |link|
  puts "Opening #{link}"
  doc = Nokogiri::HTML(open(link))
  result += doc.xpath("//text()").to_s
  puts result
end

out = Hash.new(0)
result.split(" ").each do |word|
  out[word] += 1 if wordlist.include?(word)
end
puts "finally sorting"
out = out.sort_by { |k,v| v }.reverse

puts "Writing to file"
line = 0
file_number = 0
while(file_number < 5) do 
  File.open("#{file_number}.txt", 'w') do |file|
    while(line < 100 + 100*file_number) do
      file.puts(out[line][0])
      line += 1
    end
  end
  file_number += 1
end


