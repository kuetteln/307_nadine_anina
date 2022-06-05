// Show input error message

/**
 * Beschreibung
 * @param id: Identifikation des eingegebenen Datenelement
 * @param message: Fehlermeldung
 * @returns {string}
 */
function showError(id, message) {
    return `${id}: ${message}`;
}

// Show success outline
function showSuccess(id) {
    return `${id} successfully validated!`;
}

// Check email is valid
function checkEmail(id,input) {
    //Default: is valid
    let result = {
        isNotValid: false,
        msg: showSuccess(id)
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(input.trim())) {
        result = {
            isNotValid: true,
            msg: showError(id, 'Email ist ungültig')
        }
    }
    return result;
}
// Check funktion is valdi
function checkForderung(id,input) {
    let result = {
        isNotValid: false
    }
    if (parseInt(id,input) === "-Bitte auswählen-") {
        showError(id, `${getFieldName(input)} ist ein Pflichtfeld`);
    }
    return result;
}
// Check telefon is valid
function checkTelefon(id,input) {
    //Default: is valid
    let result = {
        isNotValid: false,
        msg: showSuccess(id)
    }
    const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!re.test(input.trim())) {
        result = {
            isNotValid: true,
            msg: showError(id, 'Telefon ist ungültig')
        }
    }
    return result;
}

//TODO: Check article for throwing errors in node js
// https://stackoverflow.com/questions/33086247/throwing-an-error-in-node-js

// Check required fields
function checkRequired(id, input) {
    //Default: is valid
    let result = {
        isNotValid: false,
        msg: showSuccess(id)
    }
    //if input is empty ...
    if (input.trim() === '') {
        //.. then it's not valid
        result = {
            isNotValid: true,
            msg: showError(id, `${input.toString()} ist ein Pflichtfeld`)
        }
    }
    //return validation result
    return result;
}

// Check input length
function checkLength(id, input, min, max) {
    //Default: is valid
    let result = {
        isNotValid: false,
        msg: showSuccess(id)
    }
    if (input.length < min) {
        result = {
            isNotValid: true,
            msg: showError(id,
            `${id} muss mindestens ${min} Zeichen lang sein`)
        }
    } else if (input.length > max) {
        result = {
            isNotValid: true,
            msg: showError(id,
                `${id} muss weniger als ${max} Zeichen lang sein`)
        }
    }
    return result;
}

/**
 *  Export validation functions for further usage.
 *  function to export WITHOUT brackets!
 */
module.exports = {
    checkEmail,
    checkLength,
    checkRequired,
    checkTelefon,
    checkForderung
}
