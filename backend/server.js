const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

//enviorment variables setup
dotenv.config({ path: "./src/config/.env" });
const app = express();

//taking all routes
const resourse = require("./src/routes/resourseRoute");
const bench = require("./src/routes/benchRoute");
const upload = require("./src/routes/dashboardRoute");
const search = require("./src/routes/searchRoute");
const user = require("./src/routes/userRoute");
const billed = require("./src/routes/billedRoute");
const resigned = require("./src/routes/resignedRoute");

//using express json to access request response in json format
app.use(express.json());
app.use(cookieParser());

//using all routes
app.use("/api", resourse);
app.use("/api", bench);
app.use("/api", upload);
app.use("/api", search);
app.use("/api", user);
app.use("/api", billed);
app.use("/api", resigned);

//listening server on port 5000
app.listen(process.env.PORT, () => {
  console.log("server is running on 5000");
});
