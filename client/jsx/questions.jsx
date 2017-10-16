const React = require('react');

class Questions extends React.Component {
  render() {
    return (
      <ul>
        {Object.keys(this.props.questions).map(question => {
          return <li key={question}>
            {this.props.questions[question].question}
          </li>
        })}
      </ul>
    )
  }
}

module.exports = Questions
