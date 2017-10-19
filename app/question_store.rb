# frozen_string_literal: true

require File.expand_path("../question.rb", __FILE__)
require File.expand_path("../record_not_found_error.rb", __FILE__)

class QuestionStore
  attr_reader :questions

  def initialize(questions_data)
    @questions = build_question_store(questions_data)
    @current_index = questions.size
  end

  def find(id)
    questions.detect { |q| q.id == Integer(id) }
  end

  def create(params)
    build_question(params.merge("id" => @current_index += 1)).tap do |question|
      @questions << question
    end
  end

  def update(params)
    question = find(params["id"])
    raise RecordNotFoundError.new(params["id"]) unless question

    existing_params = question.instance_values
    params.delete("id")

    updated_attributes = existing_params.merge(params)

    update_question(question, updated_attributes)
  end

  def all(options = {})
    if options[:limit]
      questions.take(options[:limit])
    else
      questions
    end
  end

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

  def update_question(question, attributes)
    attributes.each do |attribute, value|
      question.instance_variable_set("@#{attribute}", value)
    end

    question
  end
end
