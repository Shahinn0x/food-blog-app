const express=require("express")
const app = express()
const dotenv=require("dotenv").config()
const connectDB=require("./config/connectionDB")
const cors=require("cors")

const PORT = process.env.PORT || 3000
connectDB()
app.use(express.json())
app.use(cors())

app.use("/recipe",require("./routes/recipe.route"))
app.listen(PORT,(err)=>{
    console.log(`app is listening on port ${PORT}`)
})