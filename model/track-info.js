const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User Schema
const TrackSchema = new Schema({
    trackId:
      [{type: String}],
    trackEmail:{
      type: String,
      required: true
    }

    //user: [{ type: Schema.Types.ObjectId, ref: 'User' }]

  },{ collection: 'tracks' });

  const TrackInfo = module.exports = mongoose.model('TrackInfo', TrackSchema);