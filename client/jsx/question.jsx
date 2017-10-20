const React = require('react');

import QuestionForm from './question_form.jsx';

import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

const QuestionDetails = (props) => {
  return (
    <ListGroup>
      <ListGroupItem>Answer: {props.question.answer}</ListGroupItem>
        {props.question.distractors.map((distractor, index) => {
          return <ListGroupItem key={index}>Distractor {index + 1}: {distractor}</ListGroupItem>;
        })}
    </ListGroup>
  );
};

export default class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Panel collapsible header={this.props.question.title}>
        <QuestionDetails question={this.props.question} />
        <QuestionForm onQuestionChange={this.props.onQuestionChange} question={this.props.question} action="Edit" />
      </Panel>
    )
  }
}
