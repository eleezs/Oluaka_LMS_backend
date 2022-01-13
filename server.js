// loading express modules
const  mongoose  = require('mongoose');
const express =  require('express');
const uniqueValidator = require('mongoose-unique-validator');
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path');
const { MongoClient } = require('mongodb');
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded ({extended : false}))


//to load css files and html
app.use(express.static(path.join(__dirname + '/static')));
app.use(express.static(path.join(__dirname + '/views')));


// connect to Db
const uri = process.env.MONGO_URI;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
  console.log("mongodb is connected");
}).catch((error)=>{
  console.log("mongodb not connected");
  console.log(error);
}); 

// mongoose.connect('mongodb://localhost/Oluaka_Db')
//     .then(() => console.log('Connected to Mongodb..'))
//     .catch((err) => console.log('Could not connect to Mongodb.. ', err));

// schema
const regSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
    // unique: true
  },
  sex: {
    type: String,
    required: true
  },
  programs: {
    type: String,
    required: true
  },
  courses: {
    type: String,
    required: true
  }
}); 

// Apply the uniqueValidator plugin to regSchema.
// regSchema.plugin(uniqueValidator);

const studentReg = mongoose.model('studentReg', regSchema);

app.post("/register", async(req, res) => {
  console.log(req.body);
  
  let newStudent = new studentReg(req.body);
  try {
    await newStudent.save();
    console.log('saved')
  }
  catch(err) {
    console.log(err)
  }
    
  
});

//PORT Environment var
const port = +process.env.PORT;
app.listen(port, () => console.log(`listening on port ${port}...`));





