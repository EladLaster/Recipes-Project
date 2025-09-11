const express = require("express");
const morgan = require("morgan");
const { errorHandling } = require("./middlewares/errorHandling");
const recipeRoute = require("./routes/recipeRoute");
const userRoute = require("./routes/userRoute");
const app = express();
const PORT = 3030;

app.use(express.json());

morgan.token("date", () => new Date().toISOString());
app.use(morgan(":method :url :status :response-time ms - :date"));

app.use('/auth', userRoute)

app.use('/api/recipes', recipeRoute);

app.use(errorHandling);

app.listen(PORT,()=>{
    console.log(`server run on port: ${PORT}`);
})