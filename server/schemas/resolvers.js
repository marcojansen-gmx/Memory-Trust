const { User, Footprint } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('footprints')
                .populate('friends');
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        footprints: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Footprint.find(params).sort({ createdAt: -1 });
        },
        footprint: async (parent, { _id }) => {
            return Footprint.findOne({ _id });
        },
        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('friends')
            .populate('footprints')
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
            .populate('friends')
            .populate('footprints')
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user)
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne( { email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials')
            }
            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw) {
                throw new AuthenticationError('Incorrect credentials')
            }
            const token = signToken(user);
            return { token, user };
        },
        addFootprint: async (parent, args, context) => {
            if (context.user) {
                const footprint = await Footprint.create({ ...args, username: context.user.username });
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { footprints: footprint._id } },
                    { new: true }
                );
                return footprint;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        addReaction: async (parent, {footprintId, reactionBody}, context) => {
            if (context.user) {
                const updatedFootprint = await Footprint.findOneAndUpdate(
                    { _id: footprintId} ,
                    { $push: {reactions: { reactionBody, username: context.user.username } } },
                    { new: true, runValidators: true }
                );
                return updatedFootprint;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { friends: friendId } },
                    { new: true }
                ).populate('friends');
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!')
        },
        /*
                removeFootprint: async (parent, args, context) => {
            if (context.user) {
                const footprint = await Footprint.remove({ ...args, username: context.user.username });
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { footprints: footprint._id } },
                    { new: true }
                );
                return footprint;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    */
    }
};

module.exports = resolvers;