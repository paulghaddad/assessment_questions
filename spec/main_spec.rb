require File.expand_path('../spec_helper.rb', __FILE__)

describe 'Question API' do
  it 'should show hello world' do
    get '/'

    expect(last_response.status).to eq(200)
    expect(last_response.body).to eq('Hello world!')
  end
end
