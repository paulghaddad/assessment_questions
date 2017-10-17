# frozen_string_literal: true

require File.expand_path("../spec_helper.rb", __FILE__)
require File.expand_path("../../app/questions_importer.rb", __FILE__)

describe QuestionImporter do
  describe "#import_csv" do
    it "parses the csv file to a json object" do
      questions_importer = QuestionImporter.new(file: csv_file)

      parsed_questions = questions_importer.import_csv

      expect(parsed_questions).to eq(QUESTIONS_JSON)
    end
  end

  private

  def csv_file
    File.open(File.join(File.dirname(__FILE__), "test_question_dump.csv"))
  end

  QUESTIONS_JSON = <<~JSON.strip
    {\"questions\":[{\"question\":\"What is 1754 - 3936?\",\"answer\":\"-2182\",\"distractors\":[\"3176\",\"6529\",\"6903\"]},{\"question\":\"What is 3009 * 5075?\",\"answer\":\"15270675\",\"distractors\":[\"3572\",\"8772\",\"9415\"]}]}
  JSON
end
