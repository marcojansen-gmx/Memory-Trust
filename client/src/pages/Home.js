import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_FOOTPRINTS, QUERY_ME_BASIC } from '../utils/queries';
import Auth from '../utils/auth';

import FootprintList from '../components/FootprintList';
import FriendList from '../components/FriendList';
import FootprintForm from '../components/FootprintForm';

const Home = () => {
  const { loading, data } = useQuery(QUERY_FOOTPRINTS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const footprints = data?.footprints || [];
  const loggedIn = Auth.loggedIn();
  return (
    <main>
      <div className='flex-row justify-space-between'>
        {loggedIn && (
          <div className="col-12 mb-3">
            <FootprintForm />
          </div>
        )}
        {!loggedIn && (<div>Login for Some Feed for Footprint(s)...</div>)}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          { loading ? (
            <div>Loading...</div>
          ) : (
            loggedIn && <FootprintList footprints={footprints} title="Some Feed for Footprint(s)..." />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
