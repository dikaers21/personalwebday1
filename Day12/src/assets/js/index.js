const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
    res.send('Hello URRAHHHH')
})

app.get('/', home)
app.get('/contact', contact)


function home(req, res) {
    res.render('index')
}

function contact(req, res) {
    res.render('contact')
}

app.listen(port, () => {

    console.log(`server berjalan di server ${port}`)
})