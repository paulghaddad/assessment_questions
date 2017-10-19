const React = require('react');

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
    this.state = { showDetailsOn: false };
  }

  showQuestion(question) {
    this.setState(prevState => ({
      showDetailsOn: !prevState.showDetailsOn
    }));

  }

  render() {
    return (
      <li>
        {this.props.question.title}
        {this.state.showDetailsOn &&
          <QuestionDetails question={this.props.question} />
        }
        <button onClick={this.showQuestion.bind(null, this.props.question)}>Details</button>
      </li>
    )
  }
}

module.exports = Question
