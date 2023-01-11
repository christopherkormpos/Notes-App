const express = require("express")
const app = express()
const bodyParser = require("body-parser")  //middleware
const cors = require("cors");
app.use(cors())   //middleware
app.use(express.json())  
app .use(bodyParser.urlencoded({extended : true}))  //middleware
const mysql = require("mysql2")

const db = mysql.createPool({
    host:"localhost",               //creates Database connection with user,pw,and which database(table)to use
    user:"root",
    password: "password",
    database: "notesappdb"
})

app.get("/api/get",(req,res)=>{     //API endpoint that gets all notes
    const sqlGet = "SELECT n.id,n.notes_title,n.notes_body,DATE_FORMAT(n.creation_date, '%d %M %Y %H:%i:%s') AS formatedDate , n.category_id, nc.name as category_name, nc.description as category_description FROM notes AS n,notes_categories AS nc WHERE n.category_id = nc.id"
    db.query(sqlGet,(err,result)=>{
        res.send(result)
    })
})


app.post("/api/post", (req,res)=>{  //API endpoint that posts a note
    const {notes_title,notes_body,category_id} = req.body
    const sqlInsert = 'INSERT INTO notes (notes_title , notes_body , creation_date , category_id) VALUES (?,?,sysdate(),?)'
    db.query(sqlInsert, [notes_title,notes_body,category_id],(err,result)=>{
        if(err){
            console.log(err)
        }
    })
})

app.delete("/api/remove/:id", (req,res)=>{  //API endpoint that deletes a specified note (specified by the id from req.params)
    const { id } = req.params
    const sqlRemove = "DELETE FROM notes WHERE id =?"
    db.query(sqlRemove, id ,(err,result)=>{
        if(err){
            console.log(err)
        }
    })
})

app.get("/api/get/:id",(req,res)=>{ //API endpoint that gets a specified note (specified by the id from req.params)
    const {id} = req.params
    const sqlGet = "SELECT * FROM notes WHERE id = ?"
    db.query(sqlGet,[id],(err,result)=>{
        if(err){
            console.log(err)
        }
        res.send(result)
    })
})

app.put("/api/update/:id",(req,res)=>{  //API endpoint that updates a specified note (specified by the id from req.params)
    const {id} = req.params
    const {notes_title,notes_body,category_id} = req.body
    const sqlUpdate = "UPDATE notes SET notes_title = ? , notes_body = ? ,creation_date = sysdate() ,category_id = ? WHERE id =?"
    db.query(sqlUpdate,[notes_title,notes_body,category_id,id],(err,result)=>{
        if(err){
            console.log(err)
        }
        res.send(result)
    })
})

app.get("/api/getcategory",(req,res)=>{     //API endpoint that gets all notes
    const sqlGet = 'SELECT * FROM notes_categories;'
    db.query(sqlGet,(err,result)=>{
        res.send(result)
    })
})

app.listen(5000 , ()=>{     
    console.log("Server running on port 5000") //Simple console to see if the server is running correctly
})
