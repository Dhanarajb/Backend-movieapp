const express = require("express");
const users = require("./models/users");
const cors = require('cors')
require("./db/conn");
const datas = require('./db/db.json')
const { json } = require("express");
const app = express();
const port = process.env.PORT || 5400;
const path = require('path')

app.use(express.json());
app.use(cors())

//read
app.get("/", (req, resp) => {
  resp.send(datas);
});

// create a new users


//add
app.post('/add-movie', async (req, resp) => {
  let product = new users(req.body);
  let result = await product.save()
  resp.send(result)
})

//delete
app.delete("/product/:id", async (req, resp) => {
  // resp.send(req.params.id)    //get exact id // using this id we can delete the data
  const result = await users.deleteOne({ _id: req.params.id })
  resp.send(result)
})

// update
app.put("/product/:id", async (req, resp) => {
  let result = await users.updateOne(
      { _id: req.params.id },
      {
          $set: req.body
      }
  )
  resp.send(result)
})

// login logout
app.post('/register', async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();   //to store in db
  result = result.toObject();   //result conver to object
  delete result.password;
  Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
          resp.send({ result: "Try after some time" })
      }
      resp.send({ result, auth: token })
  })
})


app.post("/login", async (req, resp) => {
  console.log(req.body)
  if (req.body.password && req.body.email) {
      let user = await User.findOne(req.body).select("-password");
      // user ? (resp.send(user) ):(resp.send({ result: "No user found" }))
      if (user) {
          Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
              if (err) {
                  resp.send({ result: "Try after some time" })
              }
              resp.send({ user, auth: token })
          })

      } else {
          resp.send({ result: "No user found" })
      }
  }
  else {
      resp.send({ result: "No user found" })
  }

  // resp.send(user)
})
// server static assests if in production
// if(process.env.NODE_ENV==='production'){
//   app.use(express.static('homework-app'));
//   app.get('*',(req,resp)=>{
//     resp.sendFile(path.resolve(__dirname,'homework-app','build','index.html'))
//   })
// }

app.listen(port, () => {
  console.log(`connection is setup at ${port}`);
});
