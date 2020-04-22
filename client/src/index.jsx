import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
    };
    this.getTop25 = this.getTop25.bind(this);
  }

  componentDidMount() {
    this.getTop25();
  }

  getTop25() {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:1128/repos',
      success: (result) => {
        //let res = JSON.parse(result);
        // console.log("result", result);
        this.setState({ repos: result });
      },
      // }).then(result, => {
      //   this.setState({ repos: result, term: "" });
      //   //console.log("state", this.state);
      // });
    });
  }

  onSearch(term) {
    console.log(`${term} was searched`);
    // this.getTop25();
    $.ajax({
      method: 'GET',
      url: 'http://localhost:1128/repos',
      success: (result) => {
        console.log('result from search', result);
        this.setState({});
        this.setState({ repos: result });
      },
    });
  }

  render() {
    return (
      <div>
        <h1>Github Repo Retriever</h1>
        <Search onSearch={this.onSearch.bind(this)} />
        {this.state.repos.length > 0 && <RepoList repos={this.state.repos} />}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
