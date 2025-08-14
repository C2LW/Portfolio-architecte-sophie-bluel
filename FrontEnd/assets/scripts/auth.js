// Fonction récupération login and password
function loginAndPassword() {
    const auth = document.querySelector("#login-form");
    const email = document.getElementById('email');

    email.addEventListener("change", function (event) {
        const emailValue = event.target.value;
        const mailRegex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+");

        if (mailRegex.test(emailValue)) { // Si email = true
            console.log(emailValue);
        } else {
            console.log('Email non valide'); // Code pour indiqué que le mail n'est pas correct
            
        }

    });

    auth.addEventListener("submit", function (event) {
        event.preventDefault(); // Fonction pour empecher le rechargement de la page

    });
};

loginAndPassword();