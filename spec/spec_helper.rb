# frozen_string_literal: true

require "rack/test"
require "rspec"

ENV["RACK_ENV"] = "test"

require File.expand_path("../../app/main.rb", __FILE__)
require "json_matchers/rspec"

module RSpecMixin
  include Rack::Test::Methods
  def app() Sinatra::Application end
end

RSpec.configure { |c| c.include RSpecMixin }
