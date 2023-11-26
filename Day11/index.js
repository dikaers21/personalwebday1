const express = require('express')
const path = require('path')
const app = express()
const port = 5000

app.set("view engine", "hbs")
app.set("views", path.join(__dirname, 'src/views'))


app.use(express.static('src/assets'))
app.use(express.urlencoded({ extended: false }))


app.get('/home', home)
app.get('/project', project)
app.post('/project', addProject)
app.get('/contact', contact)
app.get('/project-details/:id', projectDetails)
app.get('/myproject', myProject)


function home(req, res) {
    res.render('index')
}

function project(req, res) {
    res.render('project')
}

function addProject(req, res) {
    const title = req.body.title
    const content = req.body.content

    console.log("Title :", title)
    console.log("Content :", content)

    res.redirect('myproject')
}

// function addProject(req, res) {
//     const { title, content } = req.body

//     alert("Title :", title)
//     alert("Content :", content)
//     res.redirect('myproject')
// }

function contact(req, res) {
    res.render('contact')
}

function myProject(req, res) {
    res.render('myproject')
}

function projectDetails(req, res) {
    const id = req.params.id
    const title = "Title 1"
    const content = "Content 1"

    console.log("data id", id)

    const data = {
        id,
        title,
        content
    }

    res.render('project-details', { data })
}

app.listen(port, () => {

    console.log(`server berjalan di server ${port}`)
})