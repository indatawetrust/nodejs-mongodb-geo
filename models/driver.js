const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.Types.ObjectId;

const DriverSchema = new Schema({
  name: String,
  surname: String,
  location: {
    type: { type: String },
    coordinates: []
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

DriverSchema.index({ "location": "2dsphere" });

exports.Driver = mongoose.model('Driver', DriverSchema, 'driver');
