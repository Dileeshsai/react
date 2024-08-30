const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const CustomerModel = require("./Customer")
const app = express()
app.use(cors({
    origin:["https://gym--delta.vercel.app"],
    methods: ["POST","GET"],
    credentials:true
}
));
app.use(express.json())
mongoose.connect("mongodb+srv://dileeshsai007:GuafBJ2XRl01AV2q@cluster0.4nsg6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

app.get("/",(req,res)=>{
    res.json("Hello");
})
app.use((req, res, next) => {
       res.setHeader('Access-Control-Allow-Origin', 'https://gym--delta.vercel.app'); // Replace with your frontend domain
       res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
       res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
       next();
     });
app.post("/login", (req, res) => {
    const {email, password} = req.body;
  CustomerModel.findOne({email : email})
    .then(customers => {
        if(customers) {
            if(customers.password === password){
                res.json("Success")
            }else{
                res.json("The password is incorrect")
            }
        }else{
            res.json("No record existed")
        }
    })
})

app.post("/register", (req, res) => {
  CustomerModel.create(req.body)
    .then(customers => res.json(customers))
    .catch(err => res.json(err))
})



