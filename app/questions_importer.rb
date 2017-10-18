# frozen_string_literal: true

require "csv"
require "json"

class QuestionsImporter
  attr_reader :file

  def initialize(file:)
    @file = file
  end

  def import_csv
    questions_data = build_questions

    JSON.generate(questions_data)
  end

  private

  def build_questions
    questions = { questions: [] }

    index = 1
    CSV.parse(file, headers: true, col_sep: "|") do |row|
      question = {
        id: index,
        title: row["question"],
        answer: row["answer"],
        distractors: row["distractors"].split(", ")
      }

      questions[:questions] << question
      index += 1
    end

    questions
  end
end
