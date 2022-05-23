import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const ADD_FOOTPRINT = gql`
  mutation addFootprint($footprintText: String!, $platForm: String!, $passWord: String!) {
    addFootprint(footprintText: $footprintText, platForm: $platForm, passWord: $passWord) {
      _id
      footprintText
      platForm
      passWord
      createdAt
      username
      reactionCount
      reactions {
        _id
      }
    }
  }
`;

export const ADD_REACTION = gql`
  mutation addReaction($footprintId: ID!, $reactionBody: String!) {
    addReaction(footprintId: $footprintId, reactionBody: $reactionBody) {
      _id
      reactionCount
      reactions {
        _id
        reactionBody
        createdAt
        username
      }
    }
  }
`;

/* export const REMOVE_FOOTPRINT = gql`
  mutation removeFootprint($footprintText: String!, $platForm: String!, $passWord: String!) {
    removeFootprint(footprintText: $footprintText, platForm: $platForm, passWord: $passWord) {
      _id
      footprintText
      platForm
      passWord
      createdAt
      username
      reactionCount
      reactions {
        _id
      }
    }
  }
`;*/