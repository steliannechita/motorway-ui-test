"use strict"

const app = require("express")()
const images = require("./src/images.json")
const NodeCache = require("node-cache")

const cache = new NodeCache({ stdTTL: 60 * 60 }) // Set cache expiration to 1 hour

const randomInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const transformedImages = images.map(
  ({ id, alt_description, url, user: { profile_image, name } }) => ({
    id,
    altDescription: alt_description,
    url,
    user: {
      profileImage: profile_image,
      name,
    },
  })
)

app.get("/images", ({ query }, res) => {
  const limit = query.limit ? parseInt(query.limit) : null

  // Check if the data is already in the cache
  const cachedData = cache.get("images")
  if (cachedData) {
    // Serve data from cache
    const cachedImages = limit ? cachedData.slice(0, limit) : cachedData
    return res.status(200).json(cachedImages)
  }

  // If data is not in the cache, fetch it
  const resImages = limit
    ? transformedImages.slice(0, limit)
    : transformedImages

  // Store data in the cache
  cache.set("images", resImages)

  setTimeout(() => {
    return res.status(200).json(resImages)
  }, randomInterval(500, 1500))
})

app.listen(5000, () => {
  process.stdout.write("Server is available on http://localhost:5000/\n")
})
