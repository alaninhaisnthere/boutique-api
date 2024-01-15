const express = require("express");
const app = express();
const cors = require("cors");
const imageRoutes = require("./routes/imageRoutes");
const homeRoutes = require("./routes/homeRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/images", imageRoutes);
app.use("/api/user", userRoutes);
app.use("/api/", homeRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});