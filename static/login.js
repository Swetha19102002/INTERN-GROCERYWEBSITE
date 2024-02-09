document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    var jsonData = {};
    formData.forEach(function(value, key){
        jsonData[key] = value;
    });
    axios.post('/login', jsonData)
        .then(function(response) {
            console.log(response.data);
        })
        .catch(function(error) {
            console.error('Error:', error);
        });
});