var params = new URLSearchParams(window.location.search);
var tag = params.get('tag');
var clubName = "none";
const apiUrl = `http://localhost:3000/clubs/${tag}`;

const requestOptions = {
    method: 'GET',
    headers: {
        "accept": "application/json",
    },
};



function setClubdata(data) {
    document.getElementById('clubname').textContent = data['name'];
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
        setClubdata(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

