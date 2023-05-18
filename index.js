const express = require('express')

const app = express()

//parse Json using express 
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

const port = 8000


let movies = [
    {
        id: '1',
        title: 'Inception',
        director: 'Christopher Nolan',
        release_date: '2010-07-16'
    },
    {
        id: '2',
        title: 'The Iriahman',
        director: 'Martin Scorseso',
        release_date: '2019-09-27'
    },
]

// get the movie list in the form of JSON
app.get('/movie', (req, res) => {
    res.json(movies)
})

//add movie to the list
app.post('/movie', (req, res) => {
    const movie = req.body
    console.log(movie)
    movies.push(movie)
    res.send('Movie is added to the list')
})

//Search for a movie in the list
app.get('/movie/:id', (req, res) => {
    const id = req.params.id

    for(let movie of movies) {
        if(movie.id === id) {
            res.json(movie)
            return
        }
    }

    res.status(404).send('Movie not found')
})

//remove/delete movie from list
app.delete('/movie/:id', (req, res) => {
    const id = req.params.id

    movies = movies.filter((movie)=> {
        if(movie.id !== id) {
            return true
        }
        return false
    })

    res.send('Movie is deleted')
})


//set server to listen at port
app.listen(port, () => console.log(`Server listening at port ${port}`))