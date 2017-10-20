const React = require('react');

import { Button, Modal, ListGroupItem } from 'react-bootstrap';

export default class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    let baseState = {title: '', answer: '', distractors: new Array(3), showModal: false};
    this.state = Object.assign(baseState, props.question);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
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
    console.log('Submitted!', this.state.title, this.state.answer, this.state.distractors, this.state.id);
    event.preventDefault();
    this.close();
    this.props.onQuestionChange(this.state.title, this.state.answer, this.state.distractors, this.state.id);
  }

  render() {
    return (
      <div className="container-fluid" style={{textAlign: "right"}}>
        <Button
          bsStyle="primary"
          bsSize="small"
          onClick={this.open}
        >
          {this.props.action} Question
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.action} Question</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form  onSubmit={this.handleSubmit} >
              <input  type="hidden" name="questionId" value={this.state.id} />

              <div className="form-group">
                <label>Title</label>
                <input type='text' name='title' className="form-control" value={this.state.title} onChange={this.handleInputChange} />
              </div>

              <div className="form-group">
                <label>Answer</label>
                <input type='text' name='answer' className="form-control" value={this.state.answer} onChange={this.handleInputChange} />
              </div>

              <div className="form-group">
                <label>Distractor 1</label>
                <input type='text' name='distractor_1' className="form-control" value={this.state.distractor_1} onChange={this.handleInputChange} />
              </div>

              <div className="form-group">
                <label>Distractor 2</label>
                <input type='text' name='distractor_2' className="form-control" value={this.state.distractor_2} onChange={this.handleInputChange} />
              </div>

              <div className="form-group">
                <label>Distractor 3</label>
                <input type='text' name='distractor_3' className="form-control" value={this.state.distractor_3} onChange={this.handleInputChange} />
              </div>

              <div className="form-group">
                <input type='submit' value='Submit' />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
