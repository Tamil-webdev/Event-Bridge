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

    // Clear existing colleges
    await College.deleteMany({});
    console.log("Cleared existing colleges");

    const colleges = [
      // Chennai - Tamil Nadu
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
      {
        name: "SRM Institute of Science and Technology",
        address: {
          num: 1,
          street: "SRM Nagar",
          area: "Kattankulathur",
          city: "Chennai",
          state: "Tamil Nadu",
          pincode: "603203",
        },
      },
      {
        name: "Anna University",
        address: {
          num: 1,
          street: "Sardar Patel Road",
          area: "Guindy",
          city: "Chennai",
          state: "Tamil Nadu",
          pincode: "600025",
        },
      },
      {
        name: "Saveetha Engineering College",
        address: {
          num: 162,
          street: "Poonamallee Road",
          area: "Kanathur",
          city: "Chennai",
          state: "Tamil Nadu",
          pincode: "602105",
        },
      },
      {
        name: "Vellore Institute of Technology",
        address: {
          num: 1,
          street: "VIT Road",
          area: "Katpadi",
          city: "Vellore",
          state: "Tamil Nadu",
          pincode: "632014",
        },
      },
      // Bangalore - Karnataka
      {
        name: "PESIT South Campus",
        address: {
          num: 1,
          street: "Hosur Road",
          area: "Banashankari",
          city: "Bangalore",
          state: "Karnataka",
          pincode: "560070",
        },
      },
      {
        name: "Ramaiah University of Applied Sciences",
        address: {
          num: 1,
          street: "MSRIT Road",
          area: "MSR Nagar",
          city: "Bangalore",
          state: "Karnataka",
          pincode: "560054",
        },
      },
      {
        name: "RV College of Engineering",
        address: {
          num: 4,
          street: "Sanjayanagar",
          area: "Bangalore",
          city: "Bangalore",
          state: "Karnataka",
          pincode: "560094",
        },
      },
      {
        name: "BMS College of Engineering",
        address: {
          num: 1,
          street: "Bull Temple Road",
          area: "Basavanagudi",
          city: "Bangalore",
          state: "Karnataka",
          pincode: "560019",
        },
      },
      // Mumbai - Maharashtra
      {
        name: "Indian Institute of Technology Bombay",
        address: {
          num: 1,
          street: "Powai",
          area: "Bombay",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400076",
        },
      },
      {
        name: "Veermata Jijabai Technological Institute",
        address: {
          num: 1,
          street: "Matunga",
          area: "Matunga",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400019",
        },
      },
      {
        name: "DJ Sanghvi College of Engineering",
        address: {
          num: 1,
          street: "Vile Parle",
          area: "Vile Parle",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400056",
        },
      },
      // Delhi
      {
        name: "Delhi Technological University",
        address: {
          num: 1,
          street: "Shahbad Daulatpur",
          area: "Main Bawana Road",
          city: "Delhi",
          state: "Delhi",
          pincode: "110042",
        },
      },
      {
        name: "Indira Gandhi Delhi Technical University for Women",
        address: {
          num: 1,
          street: "Vikas Puri",
          area: "New Delhi",
          city: "Delhi",
          state: "Delhi",
          pincode: "110018",
        },
      },
      // Hyderabad - Telangana
      {
        name: "JNTU Hyderabad",
        address: {
          num: 1,
          street: "Kukatpally",
          area: "Hyderabad",
          city: "Hyderabad",
          state: "Telangana",
          pincode: "500085",
        },
      },
      {
        name: "IIIT Hyderabad",
        address: {
          num: 1,
          street: "Gachibowli",
          area: "Hyderabad",
          city: "Hyderabad",
          state: "Telangana",
          pincode: "500032",
        },
      },
      // Pune - Maharashtra
      {
        name: "Pune Institute of Computer Technology",
        address: {
          num: 1,
          street: "Dhankawadi",
          area: "Pune",
          city: "Pune",
          state: "Maharashtra",
          pincode: "411015",
        },
      },
      {
        name: "College of Engineering Pune",
        address: {
          num: 1,
          street: "Shivajinagar",
          area: "Pune",
          city: "Pune",
          state: "Maharashtra",
          pincode: "411005",
        },
      },
      // Kolkata - West Bengal
      {
        name: "Indian Institute of Technology Kharagpur",
        address: {
          num: 1,
          street: "Kharagpur",
          area: "West Medinipur",
          city: "Kolkata",
          state: "West Bengal",
          pincode: "721302",
        },
      },
      {
        name: "Jadavpur University",
        address: {
          num: 1,
          street: "Raja SC Mullick Road",
          area: "Jadavpur",
          city: "Kolkata",
          state: "West Bengal",
          pincode: "700032",
        },
      },
      // Chandigarh
      {
        name: "Chandigarh College of Engineering",
        address: {
          num: 1,
          street: "Chandigarh",
          area: "Sector 26",
          city: "Chandigarh",
          state: "Chandigarh",
          pincode: "160019",
        },
      },
      // Kochi - Kerala
      {
        name: "Cochin University of Science and Technology",
        address: {
          num: 1,
          street: "Kochi",
          area: "Cochin",
          city: "Kochi",
          state: "Kerala",
          pincode: "682022",
        },
      },
      // Ahmedabad - Gujarat
      {
        name: "Nirma University",
        address: {
          num: 1,
          street: "Ahmedabad",
          area: "Sorabad",
          city: "Ahmedabad",
          state: "Gujarat",
          pincode: "382481",
        },
      },
      {
        name: "Dharmsinh Desai University",
        address: {
          num: 1,
          street: "Nadiad",
          area: "Gujarat",
          city: "Nadiad",
          state: "Gujarat",
          pincode: "387001",
        },
      },
    ];

    await College.insertMany(colleges);
    console.log(`✅ ${colleges.length} colleges seeded successfully`);
    process.exit(0);
  })
  .catch((err) => {
    console.error("MongoDB Error:", err.message);
    process.exit(1);
  });
