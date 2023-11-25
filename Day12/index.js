const express = require('express')
const path = require('path')
const app = express()
const port = 5000

app.set("view engine", "hbs")
app.set("views", path.join(__dirname, 'src/views'))


app.use(express.static('src/assets'))
app.use(express.urlencoded({ extended: false }))


app.get('/', home)
app.get('/myproject', myProject)
app.post('/delete/:id', deleteProject)

app.get('/project', project)
app.post('/project', addProject)

app.get('/update-project/:id', updateProjectView)
app.post('/update-project', updateProject)


app.get('/contact', contact)
app.get('/project-details/:id', projectDetails)


const data = []


function home(req, res) {
    res.render('index')
}

function project(req, res) {
    res.render('project')
}

function addProject(req, res) {
    const { title, content } = req.body

    console.log("Title :", title)
    console.log("Content :", content)

    const dataProject = { title, content }

    data.unshift(dataProject)


    res.redirect('myproject')
}

function updateProjectView(req, res) {
    const { id } = req.params

    const dataFilter = data[parseInt(id)]
    dataFilter.id = parseInt(id)
    res.render('update-project', { data: dataFilter })
}

function updateProject(req, res) {
    const { title, content, id } = req.body

    console.log("Id :", id)
    console.log("Title :", title)
    console.log("Content :", content)

    data[parseInt(id)] = {
        title,
        content,
    }
    res.redirect('myproject')
}






function myProject(req, res) {


    res.render('myproject', { data })
}

// function addProject(req, res) {
//     const { title, content } = req.body

//     alert("Title :", title)
//     alert("Content :", content)
//     res.redirect('myproject')
// }




function deleteProject(req, res) {
    const { id } = req.params

    data.splice(id, 1)
    res.redirect('/myproject')
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

function contact(req, res) {
    res.render('contact')
}


app.listen(port, () => {

    console.log(`server berjalan di server ${port}`)
})