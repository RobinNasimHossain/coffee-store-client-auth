const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const colors = require("colors");
const app = express();

// Set environment variables
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

const URI = process.env.URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    const collectionDB = client.db("CoffeeDB").collection("Coffee-Store");
    const usercollection = client.db("CoffeeDB").collection("users");
    // Check if the collection has any items, and insert default items if empty
    const coffeeCount = await collectionDB.countDocuments();
    if (coffeeCount === 0) {
      const coffeeItems = [
        {
          name: "Espressos",
          chef: "John Doe",
          taste: "Strong and bold",
          photo: "https://i.ibb.co/XVBCmrr/2.png",
          details: "A classic espresso with a rich and bold flavor.",
          supplier: "Espresso Co.",
          category: "Espresso",
        },
        {
          name: "Latte",
          chef: "Jane Smith",
          taste: "Creamy and smooth",
          photo: "https://i.ibb.co/XVBCmrr/2.png",
          details: "A smooth combination of espresso and steamed milk.",
          supplier: "Latte Artisans",
          category: "Milk-based",
        },
        {
          name: "Cappuccino",
          chef: "Mike Johnson",
          taste: "Foamy and balanced",
          photo: "https://i.ibb.co/XVBCmrr/2.png",
          details: "Espresso with a rich layer of foamed milk.",
          supplier: "Cappuccino Corner",
          category: "Foamy",
        },
        {
          name: "Americano",
          chef: "Emily Clark",
          taste: "Rich and full-bodied",
          photo: "https://i.ibb.co/XVBCmrr/2.png",
          details: "Espresso with hot water for a lighter, smoother taste.",
          supplier: "Americano Hub",
          category: "Black Coffee",
        },
        {
          name: "Mocha",
          chef: "David Wilson",
          taste: "Sweet and chocolaty",
          photo: "https://i.ibb.co/XVBCmrr/2.png",
          details: "Espresso with steamed milk and chocolate syrup.",
          supplier: "Chocolate Beans",
          category: "Chocolate-based",
        },
        {
          name: "Flat White",
          chef: "Sarah Brown",
          taste: "Creamy with a velvety texture",
          photo: "https://i.ibb.co/XVBCmrr/2.png",
          details: "Espresso with steamed milk and a thin layer of foam.",
          supplier: "Flat White Co.",
          category: "Milk-based",
        },
      ];

      // Insert the default coffee items into the collection
      await collectionDB.insertMany(coffeeItems);
      console.log("Default coffee items added!".green);
    }

    // Send a ping to confirm a successful connection
    app.post("/coffee", async (req, res) => {
      const newCoffee = req.body;
      const result = await collectionDB.insertOne(newCoffee);
      res.send(result);

      console.log(newCoffee);
    });

    app.get("/coffee", async (req, res) => {
      const result = await collectionDB.find().toArray();
      res.send(result);
    });
    app.get("/coffee/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id),
      };

      const coffee = await collectionDB.findOne(query);

      res.send(coffee);
    });
    app.delete("/coffee/:id", async (req, res) => {
      const filter = { _id: new ObjectId(req.params.id) };

      const result = await collectionDB.deleteOne(filter);
      res.send(result);
    });

    app.put("/coffee/:id", async (req, res) => {
      const filter = { _id: new ObjectId(req.params.id) };
      const updateDoc = { $set: req.body };
      const options = { upsert: true };
      const result = await collectionDB.updateOne(filter, updateDoc, options);
      res.send(result);
      console.log(req.body);
    });
    // user api
    app.post("/users", async (req, res) => {
      const user = req.body;

      try {
        // Hash the password
        const saltRounds = 10; // Higher numbers increase hashing time but improve security
        user.password = await bcrypt.hash(user.password, saltRounds);

        // Save the user to the database
        const result = await usercollection.insertOne(user);
        res.send(result);
      } catch (error) {
        console.error("Error hashing password:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

    // end of users
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!".rainbow
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Coffee making server is running");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.rainbow);
});
