const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const footprintSchema = new Schema(
  {
    footprintText: {
      type: String,
      required: 'You need to leave a footprint!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

footprintSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Footprint = model('Footprint', footprintSchema);

module.exports = Footprint;
