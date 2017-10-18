# frozen_string_literal: true

require File.expand_path("../spec_helper.rb", __FILE__)
require File.expand_path("../../app/question.rb", __FILE__)

describe Question do
  describe "#initialize" do
    it "is initialized with an id, title, answer and distractors attributes" do
      question = Question.new(id: 1,
                              title: "What is your name?",
                              answer: "Paul",
                              distractors: %w(Bob Joe Mike))

      expect(question).to have_attributes(id: 1,
                                          title: "What is your name?",
                                          answer: "Paul",
                                          distractors: %w(Bob Joe Mike))
    end
  end
end
