const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    maxlength: [50, 'Username cannot exceed 50 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  isOwn: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Index for faster queries
chatMessageSchema.index({ timestamp: -1 });

// Virtual for formatted timestamp
chatMessageSchema.virtual('formattedTime').get(function() {
  const now = new Date();
  const diff = Math.floor((now - this.timestamp) / 1000); // difference in seconds

  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  
  return this.timestamp.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
});

// Ensure virtuals are included when converting to JSON
chatMessageSchema.set('toJSON', { virtuals: true });
chatMessageSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('ChatMessage', chatMessageSchema);