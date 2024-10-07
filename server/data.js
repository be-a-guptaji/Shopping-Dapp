const Product = require("./model/product");
const Review = require("./model/Rating"); // Import the Review model
const mongoose = require("mongoose");
const fetch = require('node-fetch'); // Import fetch (install if needed with `npm install node-fetch`)

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/dapp', { useNewUrlParser: true, useUnifiedTopology: true });
}
main().then(() => console.log("Connected to MongoDB")).catch((err) => console.log("Error:", err));

async function initdb() {
    const url = "https://fakestoreapi.com/products";
    const response = await fetch(url);
    const data = await response.json();

    // Process each product
    const productsWithReviews = await Promise.all(
        data.map(async (item) => {
            // Create and save the corresponding review from `rating` object
            const review = new Review({
                rate: item.rating.rate,
                count: item.rating.count
            });

            const savedReview = await review.save(); // Save the review and get its ObjectId

            // Create the product object, linking the review's ObjectId
            return {
                title: item.title,
                price: item.price,
                description: item.description,
                category: item.category,
                image: item.image,
                rating: savedReview._id // Link the ObjectId of the saved review
            };
        })
    );

    // Insert all products with associated reviews into the database
    Product.insertMany(productsWithReviews)
        .then((res) => console.log("Data inserted successfully:", res))
        .catch((err) => console.log("Error inserting data:", err));
}

initdb().then((res) => {
    console.log("Initialization complete:", res);
}).catch((err) => {
    console.log("Error during initialization:", err);
});
