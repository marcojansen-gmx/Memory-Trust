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
  
  const footprint = data?.footprint || {};
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div>
        <div className="card mb-3">
          <p className="card-header">
          <Link
                to={`/profile/${footprint.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
            >
                {footprint.username}
            </Link>{' '}
            footprint on {footprint.createdAt}
          </p>
          <div className="card-body">
            <p><strong>Platform: </strong> {footprint.platForm}</p>
            <p><strong>More about this: </strong> {footprint.footprintText}</p>
          </div>
        </div>
        {footprint.reactionCount > 0 && <ReactionList reactions={footprint.reactions} />}
        {Auth.loggedIn() && <ReactionForm footprintId={footprint._id} />}
      </div>
  );
};

export default SingleFootprint;
