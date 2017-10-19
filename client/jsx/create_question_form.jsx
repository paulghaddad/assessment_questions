const React = require('react');

class CreateQuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: '', answer: '', distractors: new Array(3)};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name.match(/distractor/)) {
      let number = name.match(/\d/)["0"];
      let updatedDistractors = this.state.distractors.slice();

      updatedDistractors[number - 1] = value

      this.setState({
        distractors: updatedDistractors
      });
    } else {
      this.setState({
        [name]: value
      });
    }
  }

  handleSubmit(event) {
    console.log('Submitted!', this.state.title, this.state.answer, this.state.distractors);
    event.preventDefault();
    this.props.onCreateNewQuestion(this.state.title, this.state.answer, this.state.distractors);
  }

  render() {
    return (
      <div>
        <h1>Create a New Question:</h1>

        <form onSubmit={this.handleSubmit} >
          <label>
            Title:
            <input type='text' name='title' value={this.state.title} onChange={this.handleInputChange} />
          </label>
          <label>
            Answer:
            <input type='text' name='answer' value={this.state.answer} onChange={this.handleInputChange} />
          </label>
          <label>
            Distractor 1:
            <input type='text' name='distractor_1' value={this.state.distractor_1} onChange={this.handleInputChange} />
          </label>
          <label>
            Distractor 2:
            <input type='text' name='distractor_2' value={this.state.distractor_2} onChange={this.handleInputChange} />
          </label>
          <label>
            Distractor 3:
            <input type='text' name='distractor_3' value={this.state.distractor_3} onChange={this.handleInputChange} />
          </label>

          <input type='submit' value='Submit' />
        </form>
      </div>
    );
  }
}

module.exports = CreateQuestionForm
