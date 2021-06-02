const express = require("express");
const app = express();
const start = require("./config/start.js");
const routes = require("./routes")

require("./config/express.js")(app);
require("./config/mongoose.js")();
app.use(routes);

app.listen(start.dev.port, () => console.log(`Server started at port ${start.dev.port}`));
