import React from 'react';
import { Link } from 'react-router-dom';

const FootprintList = ({ footprints, title }) => {
  if (!footprints.length) {
    return <h3>No Footprints Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {footprints &&
        footprints.map(footprint => (
          <div key={footprint._id} className="card mb-3">
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
                <Link to={`/footprint/${footprint._id}`}>
                    <p><strong>Platform: </strong>{footprint.platForm}</p>
                    <p><strong>password: </strong> {footprint.passWord}</p>
                    <p><strong>More about it: </strong>{footprint.footprintText}</p>
                    <p className="mb-0">
                    Reactions: {footprint.reactionCount} || Click to{' '}
                    {footprint.reactionCount ? 'see' : 'start'} the discussion!
                    </p>
                </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FootprintList;

/*

  const [removeFootprint, { error }] = useMutation(REMOVE_FOOTPRINT, {
    update(cache, { data: { removeFootprint } }) {
      try {
        cache.writeQuery({
          query: QUERY_FOOTPRINT,
          data: { me: removeFootprint },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleremoveFootprint = async (footprint) => {
    try {
      const { data } = await removeFootprint({
        variables: { footprint },
      });
    } catch (err) {
      console.error(err);
    }
  };


*/