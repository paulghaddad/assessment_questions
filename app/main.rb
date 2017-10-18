# frozen_string_literal: true

require "sinatra"
require "json"
require "active_support"
require "active_support/core_ext/object/json"
require File.expand_path("../questions_importer.rb", __FILE__)
require File.expand_path("../question_store.rb", __FILE__)

csv_file = File.open(File.join(File.dirname(__FILE__),
                               "code_challenge_question_dump.csv"))
questions_import = QuestionsImporter.new(file: csv_file).import_csv
questions_data_store = QuestionStore.new(JSON.parse(questions_import))

get "/questions" do
  response["Access-Control-Allow-Origin"] = "*"
  status 200
  content_type :json
  questions_data_store.all.to_json
end
