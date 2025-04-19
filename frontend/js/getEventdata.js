
var params = new URLSearchParams(window.location.search);
var id = Number(params.get('id'));
const apiUrl = `https://api.brawlapi.com/v1/maps`;


const requestOptions = {
    method: 'GET',
    headers: {
        "accept": "application/json",
    },
};


function setMapdata(map) {
    document.getElementById('map').textContent = map['name'];
    document.getElementById('gamemode').textContent = map['gameMode']['name'];
    document.getElementById('mapimage').src = map['imageUrl'];
    document.getElementById('enviroment').src = map['environment']['imageUrl'];
    document.getElementById('enviroment').style = "width: 97%;";
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
        console.log(id);
        console.log(data['list'])
        const element = data['list'].find(item => item.id === id);
        console.log(element);
        setMapdata(element);
    })
    .catch(error => {
        console.error('Error:', error);
    });

function setBrawlerRow(element, wr_data) {
    var table = document.getElementById('brawlertable');
    var tr = document.createElement('tr');

    var name_td = document.createElement('td');
    var wr_td = document.createElement('td');
    var ur_td = document.createElement('td');

    name_td.scope = "row"

    name_td.classList.add('cell3');
    wr_td.classList.add('cell3');
    ur_td.classList.add('cell3');

    name_p = document.createElement('namep');

    name_text = document.createElement('ptext');
    name_text.textContent = element['name'];

    var brawlericon = document.createElement('img');
    brawlericon.src = element['imageUrl2'];
    brawlericon.classList.add('brawlericon');

    name_p.appendChild(brawlericon);
    name_p.appendChild(name_text);


    name_td.appendChild(name_p);
    name_td.appendChild(name_p);

    wr_td.textContent = wr_data['winRate'];
    ur_td.textContent = wr_data['useRate'];

    tr.appendChild(name_td);
    tr.appendChild(wr_td);
    tr.appendChild(ur_td);

    table.appendChild(tr)
}

function setbrawlerwinrates(winrate_data, brawler_data) {

    for (let index = 0; index < winrate_data.length; ++index) {
        const element = winrate_data[index];
        var brawler_id = element['brawler'];
        var brawler_id_lst = brawler_id - 16000000;
        if (brawler_id_lst > 55) {
            brawler_id_lst -= 1;
        }
        if (brawler_id_lst < 33) {
            brawler_id_lst += 1;
        }
        brawler_id_lst *= -1;

        brawler_id_lst += brawler_data['list'].length;
        var brawlerelement = brawler_data['list'][brawler_id_lst];

        setBrawlerRow(brawlerelement, element);
        console.log(brawlerelement);
        console.log(element);
        
    } 

    changePage(1);
}



var event_data = undefined;
var winrate_data = undefined;
fetch(`http://localhost:3000/events`, requestOptions)

    .then(response => {

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log("AAAA")
        console.log(data);
        event_data = data['active'].find(item => item['map'].id === id);
        if (event_data == undefined) {
            event_data = data['upcoming'].find(item => item['map'].id === id);
        }
        if (event_data != undefined) {
            console.log(event_data);
            winrate_data = event_data['map']['stats'];
            console.log(winrate_data)
            brawlerdata = getBrawlerdata();
            
        }
        

    })
    .catch(error => {
        console.error('Error:', error);
    });

var brawlerdata = undefined;

function getBrawlerdata() {
    fetch(`http://localhost:3000/brawlers`, requestOptions)

        .then(response => {

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            brawlerdata = data;
            setbrawlerwinrates(winrate_data, brawlerdata);
            return (data);

        })
        .catch(error => {
            console.error('Error:', error);
        });
}



if (brawlerdata != undefined && winrate_data != undefined) {
    console.log("AAAAABAUABAUBAZA")
    setbrawlerwinrates(winrate_data, brawlerdata);
   
}


var current_page = 1;
var records_per_page = 6;


