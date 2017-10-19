# frozen_string_literal: true

require "sinatra"
require 'sinatra/cross_origin'
require "json"
require "active_support"
require "active_support/core_ext/object/json"
require File.expand_path("../questions_importer.rb", __FILE__)
require File.expand_path("../question_store.rb", __FILE__)

QUESTIONS_LIMIT = 100

configure do
  enable :cross_origin
end

set :expose_headers, ['Content-Type', 'Location', 'Content-Location']

before do
  response["Access-Control-Allow-Origin"] = "*"
  response.headers["Access-Control-Expose-Headers"] = "Location, Content-Location"
end

options "*" do
  response.headers["Allow"] = "GET, POST, OPTIONS"
  response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-User-Email, X-Auth-Token"
  response.headers["Access-Control-Allow-Origin"] = "*"
end

csv_file = File.open(File.join(File.dirname(__FILE__),
                               "code_challenge_question_dump.csv"))
questions_import = QuestionsImporter.new(file: csv_file).import_csv
questions_data_store = QuestionStore.new(JSON.parse(questions_import))

get "/questions" do
  status 200
  content_type :json
  limit = params["limit"] ? Integer(params["limit"]) : QUESTIONS_LIMIT

  questions_data_store.all(limit: limit).to_json
end

get "/questions/:id" do
  status 200
  content_type :json
  questions_data_store.find(params["id"]).to_json
end

post "/questions" do
  request.body.rewind
  params = JSON.parse(request.body.read)
  base_url = "#{request.env['rack.url_scheme']}://#{request.env['HTTP_HOST']}"
  content_type :json
  question = questions_data_store.create(params)
  response.headers['Location'] = "#{base_url}/questions/#{question.id}"
  response.headers['Content-Location'] = "/questions/#{question.id}"
  status 201
end

patch "/questions/:id" do
  status 200
  content_type :json
  questions_data_store.update(params).to_json
end

