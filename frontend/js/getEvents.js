
const apiUrl = `http://localhost:3000/events`;


const requestOptions = {
    method: 'GET',
    headers: {
        "accept": "application/json",
    },
};

function setEventData(data) {

    console.log(data['active'].length);
    for (let index = 0; index < data['active'].length; ++index) {

        var event = document.createElement('div');
        event.classList.add('eventcontainer');
        event.onclick = function () {
            var mapid = data['active'][index]['map']['id'];
            location.href = `file:///C:/Alles/Htmlundso/brawlhelper/frontend/Event.html?id=${mapid}`;
        };
        var bgcolour = data['active'][index]['map']['gameMode']['color'];
        event.style = `background-color: ${bgcolour}9C;`

        var imgcontainer = document.createElement('div');
        imgcontainer.classList.add('imagecontainer');

        var eventimg = document.createElement('img');
        eventimg.src = data['active'][index]['map']['imageUrl'];
        eventimg.classList.add('eventimage');

        imgcontainer.appendChild(eventimg);

        event.appendChild(imgcontainer);

        var eventtitle = document.createElement('eventname');
        eventtitle.classList.add('eventdataTxt');
        /*eventtitle.textContent = data['active'][index]['map']['gameMode']['name'];*/

        var eventitletxt = document.createElement('p');
        eventitletxt.textContent = data['active'][index]['map']['gameMode']['name'];
        eventitletxt.style = "line-height: 50px;";

        var maptitletxt = document.createElement('p');
        maptitletxt.classList.add('subp');
        maptitletxt.textContent = data['active'][index]['map']['name'];

        var eventiconcontainer = document.createElement('div');
        eventiconcontainer.style = "position: relative; left: -50%;";

        var eventicon = document.createElement('img');
        eventicon.src = data['active'][index]['map']['gameMode']['imageUrl'];
        eventicon.classList.add('icon1');

        eventiconcontainer.appendChild(eventicon);

        eventtitle.appendChild(eventiconcontainer);
        eventtitle.appendChild(eventitletxt);
        eventtitle.appendChild(maptitletxt);
        event.appendChild(eventtitle);

        document.getElementById('events').appendChild(event);
    }
}

fetch(apiUrl, requestOptions)

    .then(response => {

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        setEventData(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });