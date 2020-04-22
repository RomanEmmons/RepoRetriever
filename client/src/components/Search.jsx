import React from 'react';
import $ from 'jquery';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
    };
    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
  }

  onChange(e) {
    this.setState({
      term: e.target.value,
    });
  }

  search() {
    $.ajax({
      method: 'POST',
      url: 'http://localhost:1128/repos',
      data: { name: this.state.term },
    })
      .done(function (msg) {
        console.log('Data Saved: ' + msg);
      })
      .then((result) => {
        this.props.onSearch(this.state.term);
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="label">
            <label>Enter a Github Username:</label>
          </div>
          <input value={this.state.terms} onChange={this.onChange} />
          <button onClick={this.search}> Add Repos </button>
        </form>
      </div>
    );
  }
}

export default Search;
