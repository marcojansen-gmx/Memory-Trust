// import the GraphQL tagged template function
const { gql } = require('apollo-server-express');

// create typeDefs
const typeDefs = gql`
    type Footprint {
        _id: ID
        footprintText: String
        createdAt: String
        username: String
        reactionCount: Int
        reactions: [Reaction]
    }
    type Reaction {
        _id: ID
        reactionBody: String
        createdAt: String
        username: String
    }
    type User {
        _id: ID
        username: String
        email: String
        friendCount: Int
        footprints: [Footprint]
        friends: [User]
    }
    type Query {
        me: User
        users: [User]
        user(username: String!): User
        footprints(username: String): [Footprint]
        footprint(_id: ID!): Footprint
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addFootprint(footprintText: String!): Footprint
        addReaction(footprintId: ID!, reactionBody: String!): Footprint
        addFriend(friendId: ID!): User
    }
    type Auth {
        token: ID!
        user: User
    }
`;

// export typeDefs
module.exports = typeDefs;