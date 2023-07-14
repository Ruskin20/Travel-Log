const router = require("express").Router();
const path = require("path");
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

// Serve the client-side application for the root URL
router.use("/", express.static(path.join(__dirname, "../../client/build")));

// Fallback route for all other URLs
router.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
