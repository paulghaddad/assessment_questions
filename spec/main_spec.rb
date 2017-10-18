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

      response_body = JSON.parse(last_response.body)

      expect(last_response.status).to eq(200)
      expect(response_body.size).to eq(4000)
    end
  end
end
