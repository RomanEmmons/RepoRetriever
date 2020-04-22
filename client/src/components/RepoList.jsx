import React from 'react';
import ListItem from './ListItem.jsx';

const RepoList = (props) => (
  <div>
    <h3>There are {props.repos.length} repos.</h3>
    <ul>
      {props.repos.map((repo, i) => {
        return <ListItem key={i} value={repo} />;
      })}
    </ul>
  </div>
);

export default RepoList;
