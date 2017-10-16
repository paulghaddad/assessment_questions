require 'sinatra'
require 'json'
require 'pry'

file = File.read(File.open(File.join(File.dirname(__FILE__), 'questions.json')))
json = JSON.parse(file)

get '/questions' do
  status 200
  content_type :json
  json.to_json
end
