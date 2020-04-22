import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function ListItem(props) {
  let repo = props.value;
  return (
    <div>
      <li>
        <h3>
          <a href={repo.gitUrl}> {repo.repoName} </a>
        </h3>
        <a>Author: </a>
        <span>{repo.userName} </span>
        <a>Stars: </a>
        <span>{repo.stars} </span>
        <a>Forks: </a>
        <span>{repo.forks} </span>
        <a>Watchers: </a>
        <span>{repo.watchers} </span>
        <a>Created: </a>
        <span>{moment(repo.createdOn).fromNow()}</span>
      </li>
    </div>
  );
}
ListItem.propTypes = {
  repos: PropTypes.array,
};

export default ListItem;
