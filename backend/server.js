if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const apiKey = process.env.API_KEY
const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const path = require('path');

require('dotenv').config();
const port = 3000;

// use axios and get data from player tag using brawl stars api



app.use(cors());

app.get('/players/:playerTag', (req, res) => {

    playerTag = req.params.playerTag;

    axios({
        method: 'get',
        url: `https://api.brawlstars.com/v1/players/%23${playerTag}`,
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    })
        .then(response => {
            // Handle successful response
            res.send((response.data));
            
        })
        .catch(error => {
            // Handle error
            console.log(error);
            res.send('Player Not Found');
        });

});

app.get('/clubs/:clubTag', (req, res) => {

    clubTag = req.params.clubTag;

    axios({
        method: 'get',
        url: `https://api.brawlstars.com/v1/clubs/%23${clubTag}`,
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    })
        .then(response => {
            // Handle successful response
            res.send((response.data));

        })
        .catch(error => {
            // Handle error
            console.log(error);
            res.send('Club Not Found');
        });

});

app.get('/players/:playerTag/battlelog', (req, res) => {

    playerTag = req.params.playerTag;

    axios({
        method: 'get',
        url: `https://api.brawlstars.com/v1/players/%23${playerTag}/battlelog`,
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    })
        .then(response => {
            // Handle successful response
            res.send((response.data));
        })
        .catch(error => {
            // Handle error
            console.log(error);
            res.send('Player Not Found');
        });

});


app.get('/events', (req, res) => {

    //playerTag = req.params.playerTag;

    axios({
        method: 'get',
        url: `https://api.brawlapi.com/v1/events`,
        headers: {

        }
    })
        .then(response => {
            // Handle successful response
            res.send((response.data));
        })
        .catch(error => {
            // Handle error
            console.log(error);
            res.send('Player Not Found');
        });

});

app.get('/brawlers', (req, res) => {

    //playerTag = req.params.playerTag;

    axios({
        method: 'get',
        url: `https://api.brawlapi.com/v1/brawlers`,
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    })
        .then(response => {
            // Handle successful response
            res.send((response.data));
        })
        .catch(error => {
            // Handle error
            console.log(error);
            res.send('Player Not Found');
        });

});

app.get('/icons', (req, res) => {

    //playerTag = req.params.playerTag;

    axios({
        method: 'get',
        url: `https://api.brawlapi.com/v1/icons`,
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    })
        .then(response => {
            // Handle successful response
            res.send((response.data));
        })
        .catch(error => {
            // Handle error
            console.log(error);
            res.send('Player Not Found');
        });

});

app.get('/events', (req, res) => {

    //playerTag = req.params.playerTag;

    axios({
        method: 'get',
        url: `https://api.brawlapi.com/v1/events`,
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    })
        .then(response => {
            // Handle successful response
            res.send((response.data));
        })
        .catch(error => {
            // Handle error
            console.log(error);
            res.send('Player Not Found');
        });

});


app.get('/', (req, res) => {
    res.send('Send Player Tag in URL')
})

app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`)
})
