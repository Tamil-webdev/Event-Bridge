const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema(
  {
    title:{
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    description:{
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },
    clubId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
    },
    collegeId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },
    eventDate:{
      type: Date,
      required: true,
    },
    eventTime:{
      type: String,
      default: "",
    },
    image:{
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsivFXjBkO-IGIGNVc1gkDF0lWEMyGRjdGQw&s",
    },

    createdBy:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true,
    },

    isPublished:{
      type: Boolean,
      default:true,
    },
  },
  {
    timestamps:true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
