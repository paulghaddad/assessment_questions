# frozen_string_literal: true

class RecordNotFoundError < StandardError
  def initialize(id)
    message = "A Question with id #{id} was not found!"
    super(message)
  end
end
