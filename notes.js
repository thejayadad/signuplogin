/**
 <-setup->start with a open directory on your machine
open it in vs code as this will store our entire project
once setup, add a directory name backen & frontend both in the root of the project
type the short cut control j to open the terminal. 
 type:npm init -y
this generates a package.json
we will go ahead and add packages needed for the project
npm i bcryptjs cloudinary cookie-parser cors dotenv express jsonwebtoken mongoose
for realtime updates on the server, lets add nodemon
npm i nodemon -D
reviewing the package.json we see the installed dependencies 

for this project well use the module approach to access the dependencies

add:
  "type": "module",

in the scripts object, remove test and replace it with dev

value will be:

nodemon backend/server.js

in the backend directory add a file name server.js

this serves as the main file for the backend

now in the terminal run

npm run dev

we see the server is running and the text listening on port


import express from "express"
import dotenv from "dotenv"

dotenv.config()
const app = express()

const PORT = process.env.PORT || 5001

app.listen(PORT, console.log(`listening on port ${PORT}`))

<-setup database->

lib folder
connect to db

 */