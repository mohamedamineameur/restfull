document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const num = urlParams.get('code');
    const courriel = urlParams.get('courriel');
    console.log("hello")
    fetch('http://localhost:5005/utilisateur/verification/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ num: num, courriel: courriel }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        window.location.href = 'http://localhost:5005/verification/autreRoute';
    })
    .catch(error => console.error('Erreur:', error));
});
