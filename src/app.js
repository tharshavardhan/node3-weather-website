const path = require('path')
const express = require('express');
const hbs = require('hbs')
const port = process.env.PORT || 8000
const app = express();
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// Define path for express congif
const publicDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')



//setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)

hbs.registerPartials(partialPath)
//Setup static directory to serve
app.use(express.static(publicDirectory))


app.get("", (req, res) => {
    res.render('index', {
        title: "Weather App"
    })
})

app.get("/about", (req, res) => {
    res.render('about', {
        title: "About App"
    })
})

app.get("/help", (req, res) => {
    res.render('help', {
        helpText: "this is some helpful text ",
        title: 'Help Page'
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'address is mandatory'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }) => {


        forecast(latitude, longitude, (error, forecastData) => {
            console.log(forecastData)
            res.send({
                forecast: forecastData,
                location
            })
        })
    })
    // res.send({
    //     forecast: "aaaa",
    //     location: "bangalore"
    // })
})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'please add search query'
        })
    }
    console.log(req.query)
    console.log(req.params)
    res.send({
        products: []
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        errorMessage: 'this is a 404 page',
        title: '404'
    })
})

app.listen(port, () => {
    console.log("server is up on port 8000")
})