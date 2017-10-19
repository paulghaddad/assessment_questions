const React = require('react');

const CreateQuestionForm = require('./create_question_form.jsx');

const QuestionDetails = (props) => {
  return (
    <div>
      <p>Answer: {props.question.answer}</p>
        {props.question.distractors.map((distractor, index) => {
          return <p key={index}>Distractor {index + 1}: {distractor}</p>;
        })}
    </div>
  );
};

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.showQuestion = this.showQuestion.bind(this);
    this.editQuestion = this.editQuestion.bind(this);
    this.state = { showDetailsOn: false, showEditOn: false };
  }

  showQuestion(question) {
    this.setState(prevState => ({
      showDetailsOn: !prevState.showDetailsOn
    }));
  }

  editQuestion(question) {
    this.setState(prevState => ({
      showEditOn: !prevState.showEditOn
    }));
  }

  render() {
    return (
      <li>
        {this.props.question.title}
        {this.state.showDetailsOn &&
          <QuestionDetails question={this.props.question} />
        }
        {this.state.showEditOn &&
          <CreateQuestionForm onCreateNewQuestion={this.props.onCreateNewQuestion} question={this.props.question} />
        }
        <button onClick={this.showQuestion.bind(null, this.props.question)}>Details</button>
        <button onClick={this.editQuestion.bind(null, this.props.question)}>Edit</button>
      </li>
    )
  }
}

module.exports = Question
