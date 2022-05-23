
// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `SavedFootprints` array in User.js
const footprintSchema = new Schema({
  platform: {
    type: String,
    required: true,
    trim: true,
  },
  identity: {
    type: String,
    required: true,
    trim: true,
  },
  // saved footprint id from GoogleBooks
  footprintId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  createaccoutAt: {
    type: Date,
    //required: true,
    get: (timestamp) => dateFormat(timestamp),
  },
  createcodesAt: {
    type: Date,
    //required: true,
    get: (timestamp) => dateFormat(timestamp),
  },
  backupAt: {
    type: Date,
    //required: true,
    get: (timestamp) => dateFormat(timestamp),
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },

  /* profile: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
    },
  ],
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ]*/
});

