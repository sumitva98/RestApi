const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "sumit",
        content: "I love coding"
    },
    {
        id: uuidv4(),
        username: "Sourav",
        content: "Hard work is important for success"
    },
    {
        id: uuidv4(),
        username: "abhishek",
        content: "Reading is more important than listening"
    },
    {
        id: uuidv4(),
        username: "Sonu",
        content: "Happy coding"
    }
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ username, content, id });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});

app.get('/posts/:id/edit', (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});

app.patch('/posts/:id', (req, res) => {
    let { id } = req.params;
    let { username, content } = req.body;
    let post = posts.find((p) => p.id === id);
    
    if (post) {
        post.username = username; // Update username if needed
        post.content = content; // Update content
        res.redirect('/posts');
    } else {
        res.status(404).json({ message: `Post with ID ${id} not found.` });
    }
});

// DELETE route to remove a post by ID and redirect to /posts
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    const postIndex = posts.findIndex((p) => p.id === id);

    if (postIndex >= 0) {
        posts.splice(postIndex, 1);
        res.redirect("/posts");
    } else {
        res.status(404).json({ message: `Post with ID ${id} not found.` });
    }
});

// DELETE route to remove a post by ID and redirect to /posts
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    const postIndex = posts.findIndex((p) => p.id === id);

    if (postIndex >= 0) {
        posts.splice(postIndex, 1);
        res.redirect('/posts');
    } else {
        res.status(404).json({ message: `Post with ID ${id} not found.` });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
