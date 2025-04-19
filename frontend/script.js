// Retrieve values from URL parameters or other sources
var params = new URLSearchParams(window.location.search);
var username = params.get('username');
var balance = params.get('balance');

// Update the content of elements in the HTML template
document.getElementById('username').textContent = username;
document.getElementById('balance').textContent = balance;
