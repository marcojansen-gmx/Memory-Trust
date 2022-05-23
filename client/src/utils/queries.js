import gql from 'graphql-tag';

export const QUERY_FOOTPRINTS = gql`
  query footprints($username: String) {
    footprints(username: $username) {
      _id
      footprintText
      platForm
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_FOOTPRINT = gql`
  query footprint($id: ID!) {
    footprint(_id: $id) {
      _id
      footprintText
      platForm
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      footprints {
        _id
        footprintText
        platForm
        createdAt
        reactionCount
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      friendCount
      footprints {
        _id
        footprintText
        platForm
        createdAt
        reactionCount
        reactions {
          _id
          createdAt
          reactionBody
          username
        }
      }
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;