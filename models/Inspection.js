const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  id: String,
  type: String,
  name: String,
  photos: [{
    url: String,
    timestamp: Date,
    metadata: Object
  }]
});

const inspectionSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  propertyAddress: {
    street: String,
    city: String,
    state: String,
    zip: String
  },
  moveInDate: Date,
  status: { 
    type: String, 
    enum: ['draft', 'completed'], 
    default: 'draft' 
  },
  rooms: [roomSchema],
  totalPhotos: { 
    type: Number, 
    default: 0 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Inspection', inspectionSchema);