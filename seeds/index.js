const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const axios = require("axios");

var mongoDB = "mongodb://localhost:27017/yelp-camp";
mongoose.connect(mongoDB);
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Database Connected"));

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const unsplashAxios = async () => {
  try {
    const apiResp = await axios.get("https://api.unsplash.com/photos/random", {
      params: {
        client_id: "aHqPAJRKjPC0_Lqo70svjfAMlGLDUQq386NsZt9654s",
        collections: 4480516,
      },
    });
    return apiResp.data.urls.small;
  } catch (e) {
    console.log(e);
  }
};

const seedDB = async () => {
  await Campground.deleteMany({});
  // For loop to determine how many records to add
  for (let i = 0; i < 500; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;

    //seed data into Campground
    const camp = new Campground({
      admin: "644c930d4b1b5d92b7ad3f97",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      // images: await unsplashAxios(),
      description: `The Taj Mahal ('Crown of the Palace')[4][5][6] is an Islamic ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, Uttar Pradesh, India. It was commissioned in 1631 by the fifth Mughal emperor, Shah Jahan (r. 1628–1658) to house the tomb of his favourite wife, Mumtaz Mahal; it also houses the tomb of Shah Jahan himself. The tomb is the centrepiece of a 17-hectare (42-acre) complex, which includes a mosque and a guest house, and is set in formal gardens bounded on three sides by a crenellated wall.`,
      price: price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        // {
        //   url: "https://res.cloudinary.com/dbain9pqz/image/upload/v1682911605/YelpCamp/nscs7jlf4d2s26eer5z4.jpg",
        //   filename: "YelpCamp/nscs7jlf4d2s26eer5z4",
        // },
        {
          url: "https://res.cloudinary.com/dbain9pqz/image/upload/v1682911605/YelpCamp/izqbaqykizvynda3habm.webp",
          filename: "YelpCamp/izqbaqykizvynda3habm",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
