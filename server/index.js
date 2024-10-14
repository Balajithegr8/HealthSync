import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import User from './models/user_models.js'
import dotenv from "dotenv";

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config();
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

})
.catch((error) => console.log(`${error} did not connect.`));

app.post('/register', async (req, res) => {

  const { fname,lname, email, password }  = req.body
  User.findOne({ email:email }).then(user => {
    if(user){
      return res.json({ message: 'User already exists' })
    }
    const newUser = new User({
      fname,
      lname,
      email,
      password
    })
    newUser.save()
    return res.json({ message: 'User Created Successfully' })
  
})
})

app.post('/login',async (req, res) => {
  
  const { email, password }  = req.body
  User.findOne({ email:email})
    .then(user => {
      if(user){
        if(user.password === password){
          return res.json({ message: 'Login Successful'})
        }
        else{
          return res.json({ message: 'Login Failed' })
        }
      }
      else{
        return res.json({ message: 'User does not exist' }) }
    })
  
})
