import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Cart from './cartModel.js'; 

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cart'
    }
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  // this.password is the password of the user we are trying to find
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.pre("save", async function (next) {
  if (this.cart) {
    return next();
  }
  
  try {
    // Create a new cart
    const cart = await Cart.create({
      user: this._id,
      cartItems: [],
      totalPrice: 0,
    });
    this.cart = cart._id;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

export default User;