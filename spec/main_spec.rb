# frozen_string_literal: true

require File.expand_path("../spec_helper.rb", __FILE__)

describe "Questions API" do
  describe "#index" do
    it "a valid schema" do
      get "/questions"

      response_body = JSON.parse(last_response.body)

      expect(response_body).to match_response_schema("questions")
    end

    it "provide all the questions" do
      get "/questions"

      expect(last_response.status).to eq(200)
    end

    context "no limit param supplied" do
      it "limits the questions to 100 by default" do
        get "/questions"

        response_body = JSON.parse(last_response.body)

        expect(last_response.status).to eq(200)
        expect(response_body.size).to eq(100)
      end
    end

    context "limit param supplied" do
      it "limits the questions to the provided param" do
        get "/questions", "limit": "2"

        response_body = JSON.parse(last_response.body)

        expect(last_response.status).to eq(200)
        expect(response_body.size).to eq(2)
      end
    end
  end

  describe "#show" do
    it "returns a single question" do
      get "/questions/1"

      response_body = JSON.parse(last_response.body)

      expect(last_response.status).to eq(200)
      expect(response_body).to include("id" => 1,
                                       "title" => "What is 1754 - 3936?",
                                       "answer" => "-2182",
                                       "distractors" => %w(3176 6529 6903))
    end
  end

  describe "#create" do
    it "returns a single question" do
      post "/questions", new_question_params

      response_body = JSON.parse(last_response.body)

      expect(last_response.status).to eq(201)
      expect(response_body).to include("id" => 4001,
                                       "title" => "What's your favorite color?",
                                       "answer" => "red",
                                       "distractors" => %w(orange green blue))
    end
  end

  describe "#edit" do
    it "edits a single question" do
      patch "/questions/1", updated_question_params

      response_body = JSON.parse(last_response.body)

      expect(last_response.status).to eq(200)
      expect(response_body).to include("id" => 1,
                                       "title" => "What's an update?",
                                       "answer" => "Changing a Question",
                                       "distractors" => %w(3176 6529 6903))
    end
  end

  private

  def new_question_params
    {
      "title" => "What's your favorite color?",
      "answer" => "red",
      "distractors" => %w(orange green blue)
    }
  end

  def updated_question_params
    {
      "title" => "What's an update?",
      "answer" => "Changing a Question",
    }
  end
end
