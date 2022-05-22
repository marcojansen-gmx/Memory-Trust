import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_FOOTPRINT } from '../utils/queries';
import Auth from '../utils/auth'
import ReactionList from '../components/ReactionList';
import { Link } from 'react-router-dom';
import ReactionForm from '../components/ReactionForm';

const SingleFootprint = props => {
  const { id: footprintId } = useParams();

  const { loading, data } = useQuery(QUERY_FOOTPRINT, {
    variables: { id: footprintId }
  });
  
  const thought = data?.thought || {};
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div>
        <div className="card mb-3">
          <p className="card-header">
          <Link
                to={`/profile/${thought.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
            >
                {thought.username}
            </Link>{' '}
            thought on {thought.createdAt}
          </p>
          <div className="card-body">
            <p>{thought.footprintText}</p>
          </div>
        </div>
        {thought.reactionCount > 0 && <ReactionList reactions={thought.reactions} />}
        {Auth.loggedIn() && <ReactionForm footprintId={thought._id} />}
      </div>
  );
};

export default SingleFootprint;