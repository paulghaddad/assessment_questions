# frozen_string_literal: true

require File.expand_path("../spec_helper.rb", __FILE__)
require File.expand_path("../../app/question_store.rb", __FILE__)

describe QuestionStore do
  describe "#initialize" do
    it "creates the question data store" do
      question_model = QuestionStore.new(question_data)

      questions = question_model.all

      expect(questions.first).to respond_to(:id, :title, :answer, :distractors)
    end
  end

  describe "#all" do
    it "returns all the questions" do
      question_model = QuestionStore.new(question_data)

      questions = question_model.all

      expect(questions.size).to eq(2)
    end
  end

  describe "#find" do
    it "returns a single question" do
      question_model = QuestionStore.new(question_data)

      question = question_model.find(1)

      expect(question).to have_attributes(id: 1,
                                          title:  "What is 1754 - 3936?",
                                          answer: "-2182",
                                          distractors: %w(3176 6529 6903))
    end
  end

  describe "#create" do
    it "creates a new question" do
      question_model = QuestionStore.new(question_data)

      question = question_model.create(new_question_params)

      expect(question).to have_attributes(id: 3,
                                          title: "What is 2+2?",
                                          answer: "4",
                                          distractors: %w(1 2 3))
    end
  end

  describe "#update" do
    context "id exists" do
      it "updates an existing question" do
        question_model = QuestionStore.new(question_data)

        question = question_model.update(updated_question_params)

        expect(question).to have_attributes(id: 1,
                                            title: "What is 3 + 3?",
                                            answer: "9",
                                            distractors: %w(1 2 3))
      end
    end

    context "id does not exist" do
      it "raises a RecordNotFound Exception" do
        question_model = QuestionStore.new(question_data)

        expect { question_model.update("id" => -1000) }.to raise_exception(RecordNotFoundError)
      end
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

  def new_question_params
    {
      "title" => "What is 2+2?",
      "answer" => "4",
      "distractors" => %w(1 2 3)
    }
  end

  def updated_question_params
    {
      "id" => "1",
      "title" => "What is 3 + 3?",
      "answer" => "9",
      "distractors" => %w(1 2 3)
    }
  end
end
