const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const mongoose = require("mongoose");
const College = require("../models/college.model");

console.log("MONGO_URL =>", process.env.MONGO_URL);

if (!process.env.MONGO_URL) {
  throw new Error("MONGO_URL is undefined. Check .env location");
}

mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("MongoDB connected");

    const colleges = [
      {
        name: "Meenakshi Sundararajan Engineering College",
        address: {
          num: 26,
          street: "Arcot Road",
          area: "Kodambakkam",
          city: "Chennai",
          state: "Tamil Nadu",
          pincode: "600024",
        },
      },
      {
        name: "Meenakshi College of Engineering",
        address: {
          num: 12,
          street: "Vembuli Amman Koil Street",
          area: "K.K. Nagar",
          city: "Chennai",
          state: "Tamil Nadu",
          pincode: "600078",
        },
      },
    ];

    await College.insertMany(colleges);
    console.log("Colleges seeded successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.error("MongoDB Error:", err.message);
    process.exit(1);
  });
