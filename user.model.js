const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  orders: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: Number,
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
