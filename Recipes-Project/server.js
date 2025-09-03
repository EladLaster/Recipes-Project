const express = require("express");
const { errorHandling } = require("./middlewares/errorHandling");
const recipeRoute = require("./routes/recipeRoute");
const app = express();
const PORT = 3030;

// app.use(express.static(path.join(__dirname, 'Recipes-Project')))

app.use(express.json());
app.use('/api/recipes', recipeRoute);
app.use(errorHandling);

app.listen(PORT,()=>{
    console.log(`server run on port: ${PORT}`);
})