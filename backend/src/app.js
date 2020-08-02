const express = require("express");
const cors = require('cors')
const PORT = process.env.PORT || 4000;

const app = express();

// middlewares
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "Welcome to @juanjosevega99 application." });
});

// routes
require("./routes/cars")(app);
require("./routes/users")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});