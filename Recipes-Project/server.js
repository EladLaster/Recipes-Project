require('dotenv').config();

const PORT = process.env.PORT;

const express = require("express");
const morgan = require("morgan");
const { errorHandling } = require("./middlewares/errorHandling");
const recipeRoute = require("./routes/recipeRoute");
const userRoute = require("./routes/userRoute");
const userFavoriteRoute = require("./routes/userFavoriteRoute");
const app = express();

app.use(express.json());

morgan.token("date", () => new Date().toISOString());
app.use(morgan(":method :url :status :response-time ms - :date"));

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.use('/auth', userRoute)

app.use('/api/users/favorites', userFavoriteRoute);

app.use('/api/recipes', recipeRoute);

app.use(errorHandling);

app.listen(PORT,()=>{
    console.log(`server running on port: ${PORT}`);
})