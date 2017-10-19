const React = require('react');
const Question = require('./question.jsx');

class Questions extends React.Component {
  render() {
    return (
      <ul>
        {Object.keys(this.props.questions).map(question => {
          return <Question key={question}
                           onCreateNewQuestion={this.props.onCreateNewQuestion}
                           onShowQuestion={this.props.onShowQuestion}
                           question={this.props.questions[question]} />
        })}
      </ul>
    )
  }
}

module.exports = Questions
