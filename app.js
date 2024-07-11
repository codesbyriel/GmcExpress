const express = require('express');

const { engine } = require('express-handlebars');
const mongoose = require('mongoose');
const type = require('mongoose/lib/schema/operators/type');

const app = express()

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.urlencoded());

const blogModel = mongoose.model('Blogs', blogSchema);
const userModel = mongoose.model('Users', userSchema);


const middlewares = function (req, res, next) {
    console.log(req)
    next();
}
//middleware - function that has access to the request (made by a client) and response object

//for the route to procews urlencoded information
//built-in middleware

const blogSchema = new mongoose.Schema({
    title: {
        require: true,
        type: String
    },
    content: {
        require: true,
        type: String
    },
    author: {
        type: String,
        default: "Jay"
    },
    tags: {
        require: true,
        type: [String]
    },
    comments: {
        require: true,
        type: Array
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    }
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        require: true
    },
    dateOfBirth: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

app.use(express.urlencoded());

app.get('/', function (request, response) {
    response.render('index')
})

app.get('/blogs', function (request, response) {
    response.render('blogs', {
        layout: 'blogs'
    })
})

app.get('/about', function (request, response) {
    response.render('about', {
        layout: 'about'
    })
})

app.get('/signupmenu', function (request, response) {
    response.render('signupmenu', {
        layout: 'signup'
    })
})

app.post('/blogs/create-blog', async function (request, response) {
    console.log(request.body);

    const title_body = request.body.title;
    const content_body = request.body.content;
    const tags_body = request.body.tags;

    if (title_body === "" || content_body === "" || tags_body.length === 0) {
        response.send("Please Fill in The Fricking Fields");
    }

    const blog_created = await blogModel.create({
        title: title_body,
        content: content_body,
        tags: tags_body
    });

    console.log(blog_created);
})

app.post('/signup/create-account', async function (req, res) {
    console.log(req.body);

    const username_body = req.body.username;
    const email_body = req.body.email;
    const password_body = req.body.password;
    const dateOfBirth_body = req.body.dateOfBirth;

    if (username_body === " " || email_body === " " || password_body === " " || dateOfBirth_body === " ") {
        res.send("Please fill in the missing  details");
    }

    const user_created = await userModel.create({
        username: username_body,
        email: email_body,
        password: password_body,
        dateOfBirth: dateOfBirth_body
    })

    console.log(user_created);
})

app.listen(5000, function () {
    console.log("The server is running on PORT 5000")
});

const CONNECTION_URL = 'mongodb+srv://LiamStark:Stark404@liamstark.fsrjuwo.mongodb.net/?retryWrites=true&w=majority&appName=LiamStark'

mongoose.connect(CONNECTION_URL)
    .then(() => {
        console.log('MONGODB CONNECTION SUCCESSFUL');
    })
    .catch((error) => {
        console.log(error);
    })