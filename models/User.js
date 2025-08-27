const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  name: String,
  subscription: {
    status: { 
      type: String, 
      enum: ['trial', 'active', 'expired'], 
      default: 'trial' 
    },
    stripeCustomerId: String,
    expiresAt: Date
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);