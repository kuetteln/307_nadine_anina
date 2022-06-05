// read form element
const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const nachricht = document.getElementById('nachricht');
const vorname = document.getElementById('vorname');
const telefon = document.getElementById('telefon');
const monat = document.getElementById('monat');
const forderung = document.getElementById('forderung');

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';

}

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email ungültig');
    }
}

function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        return (true)
    }
    showError(input, 'Email ungültig');
    return (false)
}


function checkPhone(input) {
    const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Telefon ungültig');
    }
}



// Check number
function checkNumber(input) {
    const regexPhoneNumber = /^((\+)33|0)[1-9](\d{2}){4}$/;

    if (input.match(regexPhoneNumber)) {
        showSuccess(input);
    } else {
        showError(input, "Nummer ist ungültig");
    }
}

// Check required fields
function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} ist ein Pflichtfeld`);
            isRequired = true;
        } else {
            showSuccess(input);
        }
    });
    return isRequired;
}

function checkDDL(input) {
    let isRequired = false;
    console.log(`DDL ${input.value}`)
    if (parseInt(input.value) === 0) {
        showError(input, `${getFieldName(input)} ist ein Pflichtfeld`);
        isRequired = true;
    } else {
        showSuccess(input);
    }
    return isRequired;
}

function checkPflicht(inputArr) {
    let isRequired = false;
    inputArr.forEach(function (option) {
        if (option.value.trim() === '') {
            showError(option, `${getFieldName(option)} ist ein Pflichtfeld`);
            isRequired = true;
        } else {
            showSuccess(option);
        }
    });

    return isRequired;
}


// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input,
            `${getFieldName(input)} muss mindestens ${min} Zeichen haben`
        );
    } else if (input.value.length > max) {
        showError(input,
            `${getFieldName(input)} muss weniger als ${max} Zeichen haben`
        );
    } else {
        showSuccess(input);
    }
}

// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Validate form input elements
function validateForm() {
    if (!checkRequired([name, email, vorname, telefon, monat,nachricht])) {
        checkLength(name, 3, 15);
        checkDDL(forderung)
        checkLength(nachricht, 6, 25);
        checkEmail(email);
        checkPhone(telefon);
    }
}

/**
 * Send form data to server
 * Info: https://stackoverflow.com/questions/4295782/how-to-process-post-data-in-node-js
 */
function sendForm() {
    const SERVER = "http://localhost:3000";
    fetch(SERVER + '/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                name: name,
                email: email
            }
        })
    });

}


// Event listeners
form.addEventListener('submit', function (e) {
    //https://www.w3schools.com/jsref/event_preventdefault.asp
    e.preventDefault();
    //First validate form
    validateForm();
    //Send Data
    //sendForm();
});

