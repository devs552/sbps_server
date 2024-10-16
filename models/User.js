const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
<<<<<<< HEAD
  firstName: { type: String, required: true },  // Changed to camelCase for consistency
  lastName: { type: String, required: true },   // Changed to camelCase for consistency
  userName: { type: String, required: true },
  authtype: { 
    type: Number, 
    required: true,
    enum: [0, 1],  // Assuming 0 for manual registration, 1 for social login (modify as per your logic)
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

=======
  firstname: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  authtype: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true }); 
>>>>>>> 04a69ebb558c4573901308209de7806805023681
module.exports = mongoose.model('User', userSchema);
