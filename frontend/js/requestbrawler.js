
const apiUrl = 'http://localhost:3000/brawlers';


const requestOptions = {
    method: 'GET',
    headers: {
         "accept": "application/json",
    },
};

function tableCreate() {
    const body = document.body,
        tbl = document.getElementById('tbl');
    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');
    for (let i = 0; i < 3; i++) {
        const tr = tbl.insertRow();
        for (let j = 0; j < 2; j++) {

                const td = tr.insertCell();
                td.appendChild(document.createTextNode("\u00A0"))
                //td.style.border = '1px solid black';
                tr.appendChild(td)

        }
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
        tableCreate();
        outputElement.textContent = JSON.stringify(data, null, 2);
    })
    .catch(error => {
        console.error('Error:', error);
    });

