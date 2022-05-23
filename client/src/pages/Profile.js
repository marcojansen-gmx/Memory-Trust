import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import Auth from '../utils/auth';

import FootprintList from '../components/FootprintList';
import FriendList from '../components/FriendList';
import FootprintForm from '../components/FootprintForm';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { ADD_FRIEND } from '../utils/mutations';
//import { REMOVE_FOOTPRINT } from '../../utils/mutations';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};

  const [addFriend] = useMutation(ADD_FRIEND);

    {/*const [removeFootprint, { error }] = useMutation(REMOVE_FOOTPRINT, {
    update(cache, { data: { removeFootprint } }) {
      try {
        cache.writeQuery({
          query: QUERY_ME,
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
  };*/}

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if(!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id }
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>
        {userParam && (
          <button className="btn ml-auto" onClick={handleClick}>Add Friend</button>
        )}
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
        <button className="btn btn-sm btn-danger ml-auto"
                //onClick={() => handleremoveFootprint(footprint.platForm)}
                >X
          <FootprintList footprints={user.footprints} title={`${user.username}'s footprints...`} />
          </button>
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>
      <div className="mb-3">{!userParam && <FootprintForm />}</div>
    </div>
  );
};


export default Profile;
