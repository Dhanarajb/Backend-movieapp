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
