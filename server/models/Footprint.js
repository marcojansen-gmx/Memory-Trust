const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');
const bcrypt = require('bcrypt');

const footprintSchema = new Schema(
  {
    footprintText: {
      type: String,
      required: 'You need to leave a footprint!',
      minlength: 1,
      maxlength: 280
    },
    platForm: {
      type: String,
      required: true,
      trim: true,
    },
    passWord: {
      type: String,
      required: true,
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

//hash user password
footprintSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('passWord')) {
    const saltRounds = 10;
    this.passWord = await bcrypt.hash(this.passWord, saltRounds);
  }

  next();
});

const Footprint = model('Footprint', footprintSchema);

module.exports = Footprint;
