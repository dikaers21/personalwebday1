const express = require('express')
const path = require('path')
const app = express()
const port = 5000
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const { Query } = require('pg')
const sequelize = new Sequelize(config.development)
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')


app.set("view engine", "hbs")
app.set("views", path.join(__dirname, 'src/views'))


app.use(express.static('src/assets'))
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    name: "Data",
    secret: 'rahasiasekali',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))


app.get('/', home)
app.get('/myproject', myProject)
app.post('/delete/:id', deleteProject)

app.get('/project', project)
app.post('/project', addProject)

app.get('/update-project/:id', updateProjectView)
app.post('/update-project', updateProject)

app.get('/register', registerView)
app.post('/register', register)

app.get('/login', loginView)
app.post('/login', login)

app.get('/contact', contact)
app.get('/project-details/:id', projectDetails)





function home(req, res) {
    // const id = 4

    // const query = `SELECT * FROM projects WHERE id=${id}`
    // const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    // console.log("Ini data profile", obj)

    // res.render('index', { data: obj[0], user: req.session.user })
    res.render('index')
}

function project(req, res) {
    res.render('project')
}

async function addProject(req, res) {
    const { title, content } = req.body
    const image = "atlas.jpg"

    // console.log("Title :", title)
    // console.log("Content :", content)

    // const dataProject = { title, content }

    // data.unshift(dataProject)
    const query = `INSERT INTO projects(name,description,image) VALUES ('${title}', '${content}','${image}')`
    const obj = await sequelize.query(query, { type: QueryTypes.INSERT })

    console.log("data berhasil di input", obj)
    res.redirect('myproject')
}

async function updateProjectView(req, res) {
    const { id } = req.params

    // const dataFilter = data[parseInt(id)]
    // dataFilter.id = parseInt(id)
    const query = `SELECT * FROM projects WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })

    res.render('update-project', { data: obj[0] })
}

async function updateProject(req, res) {
    const { title, content, id } = req.body

    console.log("Id :", id)
    console.log("Title :", title)
    console.log("Content :", content)

    // data[parseInt(id)] = {
    //     title,
    //     content,
    // }

    const query = `UPDATE projects SET name='${title}', description='${content}' WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.UPDATE })

    console.log("project berhasil di update!", obj)
    res.redirect('myproject')
}

async function myProject(req, res) {
    const query = 'SELECT * FROM projects'
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })
    console.log("ini data projects dari database", obj)

    const isLogin = req.session.isLogin

    res.render('myproject', { data: obj, isLogin })
}

// function addProject(req, res) {
//     const { title, content } = req.body

//     alert("Title :", title)
//     alert("Content :", content)
//     res.redirect('myproject')
// }

async function deleteProject(req, res) {
    const { id } = req.params

    // data.splice(id, 1)
    const query = `DELETE FROM projects WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.DELETE })

    console.log("berhasil delete project", obj)

    res.redirect('/myproject')
}

async function projectDetails(req, res) {
    const { id } = req.params

    const query = `SELECT * FROM projects WHERE id=${id}`
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })


    res.render('project-details', { data: obj[0] })
}

function contact(req, res) {
    res.render('contact')
}

async function register(req, res) {
    const { name, email, password } = req.body

    console.log("Nama:", name)
    console.log("Email:", email)
    console.log("Password:", password)

    const salt = 10

    bcrypt.hash(password, salt, async(err, hash) => {
        if (err) {
            console.error("Password failed to be encrypted!")
            req.flash('danger', 'Register failed : Password failed to encrypted')
            return res.redirect('/register')
        }

        console.log("Hash result :", hash)

        const query = `INSERT INTO users(name,email,password) VALUES ('${name}', '${email}','${hash}')`
        const obj = await sequelize.query(query, { type: QueryTypes.INSERT })
        req.flash('success', 'Register success!')
        res.redirect('/')
    })
}


function registerView(req, res) {
    res.render('register')
}

function loginView(req, res) {
    res.render('login')
}

async function login(req, res) {
    const { email, password } = req.body
    const query = `SELECT * FROM users WHERE email='${email}'`
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT })

    if (!obj.length) {
        console.error("User not registered")
        req.flash('danger', 'Login failed : Email is Wrong!')

        return res.redirect('/login')
    }

    bcrypt.compare(password, obj[0].password, (err, result) => {

        if (err) {
            req.flash('danger', 'Login failed : Internal Server Error!')
            console.error("Login: Internal Server Error!")
            return res.redirect('/')

        }

        if (!result) {
            console.error("Password is wrong!")
            req.flash('danger', 'Login failed : Password is Wrong!')
            return res.redirect('/login')
        }

        console.log('Login Success')
        req.flash('success', 'Login success!')

        req.session.isLogin = true
        req.session.user = {
            name: obj[0].name,
            email: obj[0].email
        }


        res.redirect('/')
    })
}


app.listen(port, () => {

    console.log(`server berjalan di server ${port}`)
})