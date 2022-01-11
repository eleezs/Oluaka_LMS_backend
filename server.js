// loading express modules
const  mongoose  = require('mongoose');
const express =  require('express');
const app = express();
const uniqueValidator = require('mongoose-unique-validator');
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path');
const { MongoClient } = require('mongodb');


app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded ({extended : false}))


//to load css files and html
app.use(express.static(__dirname + '/static'));
// app.use(express.static(path.join(__dirname + '/views')));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/register.html", (req, res) => {
  res.sendFile(path.join(__dirname + "/register.html"));
});

// connect to Db
async function DB_connect () {
  const uri ="mongodb://localhost:27017/Oluaka_Db";

  const client = new MongoClient(uri);

  try {
    // connect to the mongodb cluster
    await client.connect();
    console.log("MongoDB connected Successfully")
  }
  catch(err) {
    console.log("Connection Declined")
  }
  finally {
    await client.close();
  }
}
DB_connect();

// schema
const regSchema = new mongoose.Schema({
  firstname: {
    type :String,
    required: true
  },
  lastname: {
    type :String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  gender: {
    type: String,
    required: true
  },
  programs: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  }
});

// Apply the uniqueValidator plugin to regSchema.
regSchema.plugin(uniqueValidator); 

const studentReg = mongoose.model('studentReg', regSchema);

app.post("/register", (req, res)=>{
  var name = req.body.name;
  var email =req.body.email;
  // var pass = req.body.password;
  // var phone =req.body.phone;
  console.log(name, email)
  console.log('fish')
  // let studentReg = new studentReg (req.body);
  // await studentReg.save();
 
});








//PORT Environment var
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));