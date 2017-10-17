# frozen_string_literal: true

require "sinatra"
require "json"

file = File.read(File.open(File.join(File.dirname(__FILE__), "questions.json")))
json = JSON.parse(file)

get "/questions" do
  response["Access-Control-Allow-Origin"] = "*"
  status 200
  content_type :json
  json.to_json
end
