import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import User from './models/user_models.js'
import dotenv from "dotenv";
import path from 'path'
import { fileURLToPath } from 'url'

//resolving dirname for es module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname,'client/build')))
app.get('*', (req, res) => res.sendFile(path.join(__dirname,'client/build/index.html')));
dotenv.config();
const PORT = process.env.PORT || 5000

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
      return res.json({ message: 'User already exists' ,toastType:'error'})
    }
    const newUser = new User({
      fname,
      lname,
      email,
      password
    })
    newUser.save()
    return res.json({ message: '🎉 User Created Successfully! Redirecting to login...' ,toastType:'success'})
  
})
})

app.post('/login',async (req, res) => {
  
  const { email, password }  = req.body
  User.findOne({ email:email})
    .then(user => {
      if(user){
            if(user.password === password){
              return res.json({ message: '🎉 Login Successful! Redirecting to dashboard...',toastType:'success'})
            }
            else{
              return res.json({ message: '❌ Login Failed. User does not exist.',toastType:'error' })
            }
      }
      else{
        return res.json({ message: '❌ Login Failed. Incorrect password.',toastType:'error' }) }
    })
  
})
