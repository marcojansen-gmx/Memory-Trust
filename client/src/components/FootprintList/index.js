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
            {footprint.username}
                <Link to={`/footprint/${footprint._id}`}
                                style={{ fontWeight: 700 }}
                                className="text-light">      
                  <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                      <span>{footprint.platForm}</span>
                      {(
                        <button
                          className="btn btn-sm btn-danger ml-auto"
                          //onClick={() => handleremoveFootprint(footprint.platForm)}
                        >
                          X
                        </button>
                      )}
                  </h4>
                </Link>{' '}
            footprint on {footprint.createdAt}
          </div>))}
            {/* <div className="card-body">
                <Link to={`/footprint/${footprint._id}`}>
                    <p><strong>Platform: </strong>{footprint.platForm}</p>
                    <p><strong>More about it: </strong>{footprint.footprintText}</p>
                    <p className="mb-0">
                    Reactions: {footprint.reactionCount} || Click to{' '}
                    {footprint.reactionCount ? 'see' : 'start'} the discussion!
                    </p>
                </Link>
        </div> */}
    </div>
  );
};

export default FootprintList;