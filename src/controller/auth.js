import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../model/user.js";
import { WalletEvent } from "../model/walletEvent.js";

import { signupSchema, signinSchema, onrampSchema } from "../types/auth.js";

// Signup
export async function signup(req, res) {
  try {
    const { username, password } = signupSchema.parse(req.body);

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({
        error: "Username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
      balance: 0,
    });

    return res.status(201).json({
      id: user._id,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
}

// Signin
export async function signin(req, res) {
  try {
    const { username, password } = signinSchema.parse(req.body);

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET,
    );

    return res.json({ token });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
}

// Add fake balance
export async function onramp(req, res) {
  try {
    const { amount } = onrampSchema.parse(req.body);

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $inc: { balance: amount } },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    await WalletEvent.create({
      userId: req.userId,
      tx_type: "onramp",
      amount,
    });

    return res.json({
      balance: user.balance,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
}

// Profile
export async function getProfile(req, res) {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    return res.json(user);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
}

// Wallet history
export async function getTransactions(req, res) {
  try {
    const transactions = await WalletEvent.find({
      userId: req.userId,
    });

    return res.json(transactions);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
}
