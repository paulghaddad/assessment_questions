# frozen_string_literal: true

require File.expand_path("../spec_helper.rb", __FILE__)
require File.expand_path("../../app/question_store.rb", __FILE__)

describe QuestionStore do
  describe "#initialize" do
    it "creates the question data store" do
      question_model = QuestionStore.new(question_data)

      questions = question_model.all

      expect(questions.size).to eq(2)
      expect(questions.first).to respond_to(:id, :title, :answer, :distractors)
    end
  end

  private

  def question_data
    { "questions" =>
      [
        { "id" => 1,
          "title" => "What is 1754 - 3936?",
          "answer" => "-2182",
          "distractors" => %w(3176 6529 6903) },
        { "id" => 2,
          "title" => "What is 3009 * 5075?",
          "answer" => "15270675",
          "distractors" => %w(3572 8772 9415) }
      ] }
  end
end
