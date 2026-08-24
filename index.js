const express = require("express");
const app = express();
const { userInfo } = require("os");
const port = 8080;
const path = require("path");
app.use(express.urlencoded({ extended:true}));
const { v4 :uuidv4 } = require("uuid");
uuidv4();
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));
app.listen(port, () => {
    console.log("app is listening")
});


let blogs = [
    {
        id : uuidv4(),
        username : "Sahib",
        heading : "hi there",
        content : "bdddbjwehdg"
    },
    {
        id : uuidv4(),
        username : "Sukhmani",
        heading : "hi there",
        content :"ndwheydhwerd"
    },
]

app.get("/blogs", (req,res) => {
    res.render("index.ejs", {blogs});
});

app.get("/blogs/new", (req,res) => {
    res.render("new.ejs");
});

app.post("/blogs", (req,res) => {
    let {username,content} = req.body;
    let id = uuidv4();
    blogs.push({id,username,content});
    res.redirect("/blogs");
});

app.get("/blogs/:id", (req,res) =>  {
    let {id} = req.params;
    let blog = blogs.find((b) => id === b.id);
    res.render("show.ejs", {blog});
});

app.patch("/blogs/:id", (req,res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let blog = blogs.find((b) => id === b.id);
    blog.content = newContent;
    res.redirect("/blogs");
});

app.get("/blogs/:id/edit", (req,res) => {
    let {id} = req.params;
    let blog = blogs.find((b) => id === b.id);
    res.render("edit.ejs", {blog});
});

app.delete("/blogs/:id",(req,res) =>{
    let {id} =req.params;
    blogs = blogs.filter((b) => id !== b.id);
    res.redirect("/blogs")
})