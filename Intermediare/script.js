document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const num = urlParams.get('code');
    const courriel = urlParams.get('courriel');
    console.log("hello")
    fetch('https://restfull-a3g4.onrender.com/utilisateur/verification/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ num: num, courriel: courriel }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        window.location.href = 'https://restfull-a3g4.onrender.com/verification/autreRoute';
    })
    .catch(error => console.error('Erreur:', error));
});
