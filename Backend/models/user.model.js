const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      required: true,
      trim: true,
    },

    email:{
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password:{
      type: String,
      required: true,
    },

    role:{
      type: String,
      enum: ["student", "club_admin", "college_admin", "super_admin"],
      default: "student",
    },

    collegeId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      default: null,
    },

    clubs:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Club",
      },
    ],

    followedClubs:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Club",
      },
    ],

    notifications: [
      {
        clubId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Club",
        },
        eventId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Event",
        },
        message: {
          type: String,
          required: true,
        },
        isRead: {
          type: Boolean,
          default: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    isActive:{
      type: Boolean,
      default: true,
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model("User", userSchema);
