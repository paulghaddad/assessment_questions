# frozen_string_literal: true

class Question
  attr_reader :id, :title, :answer, :distractors

  def initialize(**attributes)
    @id = attributes[:id]
    @title = attributes[:title]
    @answer = attributes[:answer]
    @distractors = attributes[:distractors]
  end
end
