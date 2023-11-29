const express = require('express')
const path = require('path')
const app = express()
const port = 5000
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const { Query } = require('pg')
const sequelize = new Sequelize(config.development)

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

    res.render('myproject', { data: obj })
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


app.listen(port, () => {

    console.log(`server berjalan di server ${port}`)
})