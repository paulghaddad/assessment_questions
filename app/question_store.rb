# frozen_string_literal: true

require File.expand_path("../question.rb", __FILE__)

class QuestionStore
  attr_reader :questions

  def initialize(questions_data)
    @questions = build_question_store(questions_data)
  end

  alias_method :all, :questions

  private

  def build_question_store(data)
    data["questions"].inject([]) do |store, question_data|
      store << build_question(question_data)
    end
  end

  def build_question(attributes)
    Question.new(id: attributes["id"],
                 title: attributes["title"],
                 answer: attributes["answer"],
                 distractors: attributes["distractors"])
  end
end
