const React = require('react');

import Question from './question.jsx';

export default class Questions extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div>
          <p>Question (Click on the question for its answer and distractors)</p>
        </div>
        <div className="container-fluid">
          {Object.keys(this.props.questions).map(question => {
            return <Question key={question}
              onQuestionChange={this.props.onQuestionChange}
              onShowQuestion={this.props.onShowQuestion}
              question={this.props.questions[question]} />
          })}
        </div>
      </div>
    )
  }
}
