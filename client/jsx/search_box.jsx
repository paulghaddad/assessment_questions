const React = require('react');

import { FormGroup, FormControl } from 'react-bootstrap';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSearch(this.state.value);
  }

  render() {
    return (
      <div style={{width: "30%", textAlign: "left", marginBottom: "3em"}}>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group" type="text" value={this.state.value} onChange={this.handleChange} >
            <input type='text'
                  name='search'
                  className="form-control"
                  value={this.state.value}
                  onChange={this.handleChange}
                  placeholder="Search for a question or answer."
            />
          </div>

          <div className="form-group">
            <input type='submit' value='Search' />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBox;
