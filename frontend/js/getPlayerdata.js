
var params = new URLSearchParams(window.location.search);
var tag = params.get('tag');
var username = "none";
const apiUrl = `http://localhost:3000/players/${tag}`;


const requestOptions = {
    method: 'GET',
    headers: {
        "accept": "application/json",
    },
};

function setAllBrawlerdata(data, brawlerdata) {

}

function setBrawlerdata(element, brawlerelement) {

    console.log(element['name']);
    console.log(brawlerelement);
    var e = document.createElement('div');
    e.classList.add('brawlercontainer');
    var p = document.createElement('p');
    p.classList.add('brawlerdataTxt');
    brawler_name = element['name'];
    brawler_name = brawler_name.toLowerCase();
    brawlername = brawler_name.split(" ");

    for (let i = 0; i < brawlername.length; i++) {
        brawlername[i] = brawlername[i][0].toUpperCase() + brawlername[i].substr(1);
    }
    brawlername = brawlername.join(" ");

    var brawlericon = document.createElement('img');
    brawlericon.src = brawlerelement['imageUrl3'];
    brawlericon.width = 60;
    brawlericon.height = 60;
    brawlericon.style = "vertical-align: middle; padding-right: 10px;";

    var bname = document.createElement('brawlername');
    bname.textContent = brawlername;
    bname.classList.add('brawlerdataTxt');

    p.appendChild(brawlericon)
    p.appendChild(bname);

    e.appendChild(p);

    var v = document.createElement('div');

    var powericon = document.createElement('img');
    powericon.src = "file:///C:/Alles/Htmlundso/brawlhelper/frontend/icons/PowerPoint.png";
    powericon.width = 35;
    powericon.height = 35;
    powericon.style = "vertical-align: middle;padding: 10px;padding-left: 20px;padding-right: 5px;";


    var brawler_power = document.createElement('brawler_power');
    brawler_power.appendChild(powericon);
    var brawler_power_txt = document.createElement('brawler_power');
    brawler_power_txt.textContent = element['power'];
    brawler_power_txt.classList.add('brawlerdataTxt');
    brawler_power.classList.add('brawlerdataTxt');
    brawler_power.appendChild(brawler_power_txt);

    v.appendChild(brawler_power);

    var trophyicon = document.createElement('img');
    trophyicon.src = "file:///C:/Alles/Htmlundso/brawlhelper/frontend/icons/trophy.png";
    trophyicon.width = 35;
    trophyicon.height = 35;
    trophyicon.style = "vertical-align: middle;padding: 10px;padding-left: 20px;padding-right: 5px;";

    var brawler_trophies = document.createElement('brawler_trophies');
    brawler_trophies.appendChild(trophyicon);
    var brawler_trophies_txt = document.createElement('brawler_trophies');
    brawler_trophies_txt.textContent = element['trophies'];
    brawler_trophies_txt.classList.add('brawlerdataTxt');
    brawler_trophies.classList.add('brawlerdataTxt');
    brawler_trophies.appendChild(brawler_trophies_txt);
    v.appendChild(brawler_trophies);

    rank = element['rank'];

    var rankicon = document.createElement('img');
    rankicon.src = `file:///C:/Alles/Htmlundso/brawlhelper/frontend/icons/Rank_${rank}.png`;
    rankicon.width = 60;
    rankicon.height = 60;
    rankicon.style = "vertical-align: middle;padding: 10px;padding-left: 20px;padding-right: 5px;";
    v.appendChild(rankicon);

    e.appendChild(v);
    document.getElementById('brawers').appendChild(e);
    var f = document.createElement('div')
    f.classList.add('content');
    var p = document.createElement('p');
    p.textContent = "Lorum ipsum";
    f.appendChild(p);
    document.getElementById('brawers').appendChild(f);
}
function setPlayerdata(data, brawlerdata) {
    
    document.getElementById('username').textContent = data['name'];
    document.getElementById('playerTag').textContent = '#' + tag;
    document.getElementById('club').textContent = data['club']['name'];
    var elms = document.querySelectorAll("[id='username']");

    for (var i = 0; i < elms.length; i++)
        elms[i].textContent = data['name'];

    var namecolor = data['nameColor']; 
    console.log(namecolor)
    namecolor = '#' + namecolor.slice(3+1) + 'ff';
    console.log(namecolor)
    var usernametxt = document.getElementById('usernameText');
    usernametxt.style = `color: ${namecolor};`
    document.getElementById('trophies').textContent = data['trophies'];
    document.getElementById('3vs3Victories').textContent = data['3vs3Victories'];
    document.getElementById('soloVictories').textContent = data['soloVictories'];
    document.getElementById('duoVictories').textContent = data['duoVictories'];
    totalvictories = data['3vs3Victories'] + data['soloVictories'] + data['duoVictories']
    document.getElementById('totalvictories').textContent = totalvictories
    getIcon(data['icon']['id'])
    console.log(data['club']['tag'].slice(1))
    getClubData(data['club']['tag'].slice(1))
    var clubLink = document.getElementById("clubUrl");
    clubTag = data['club']['tag'].slice(1);
    clubLink.href = `file:///C:/Alles/Htmlundso/brawlhelper/frontend/Club.html?tag=${clubTag}`

    player_brawlerdata = data['brawlers']
    player_brawlerdata.sort((a, b) => b.trophies - a.trophies);

    

    for (let index = 0; index < data['brawlers'].length; ++index) {
        const element = player_brawlerdata[index];
        var brawler_id = element['id'] - 16000000;
        if (brawler_id > 55) {
            console.log("woogie")
            brawler_id -= 1;
        }
        if (brawler_id < 33) {
            console.log("waagie")
            brawler_id += 1;
        }
        brawler_id *= -1;
        
        brawler_id += brawlerdata['list'].length;
        console.log(brawler_id)
        console.log(element['name'])
        const brawlerelement = brawlerdata['list'][brawler_id];

        setBrawlerdata(element, brawlerelement);

    }


    var coll = document.getElementsByClassName("brawlercontainer");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }
}

function getIcon(id) {
    fetch(`http://localhost:3000/icons`, requestOptions)

        .then(response => {

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            icon = data['player'][id];
            imgurl = icon['imageUrl'];
            var pfp = document.getElementById("profilePicture");

            pfp.src = imgurl;
         
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function getClubData(clubTag) {
    url = `http://localhost:3000/clubs/${clubTag}`
    fetch(url, requestOptions)

        .then(response => {

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("AAA");
            getClubIcon(data['badgeId']);
        })
        .catch(error => {
            console.error('Error:', error);
        });

}
function getClubIcon(id) {

    fetch(`http://localhost:3000/icons`, requestOptions)

        .then(response => {

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            icon = data['club'][id];
            imgurl = icon['imageUrl'];
            console.log(imgurl)
            var pfp = document.getElementById("clubIcon");

            pfp.src = imgurl;

        })
        .catch(error => {
            console.error('Error:', error);
        });
}



var brawlerdata = undefined;

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
    })
    .catch(error => {
        console.error('Error:', error);
    });

fetch(apiUrl, requestOptions)

    .then(response => {

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        setPlayerdata(data, brawlerdata);
    })
    .catch(error => {
        console.error('Error:', error);
    });