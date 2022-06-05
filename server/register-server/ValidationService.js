// Validate form input elements
const validateLib = require('./ValidationLib');

/**
 * Validate User
 * @param userObj
 * @returns {boolean|{msg: string, isNotValid: boolean}|{isNotValid}|*}
 */
function validateUser(userObj) {
    // Check required fields
    let result = validateLib.checkRequired("name", userObj.name);
    if (result.isNotValid) { return result; }

    // Check required fields

    result = validateLib.checkRequired("vorname", userObj.vorname);
    if (result.isNotValid) { return result; }

    result = validateLib.checkRequired("email", userObj.email);
    if (result.isNotValid) { return result; }

    result = validateLib.checkRequired("forderung", userObj.forderung);
    if (result.isNotValid) { return result; }

    result = validateLib.checkRequired("telefon", userObj.telefon);
    if (result.isNotValid) { return result; }

    //check length
    result = validateLib.checkLength("name",userObj.name, 3, 15);
    if (result.isNotValid) { return result; }

    //check email syntax
    result = validateLib.checkEmail("email", userObj.email);
    if (result.isNotValid) { return result; }

    //check telefon syntax
    result = validateLib.checkTelefon("telefon", userObj.telefon);
    if (result.isNotValid) { return result; }

   //check forderung syntax
    result = validateLib.checkForderung("forderung", userObj.forderung);
    if (result.isNotValid) { return result; }


    //all inputs are valid and isNotValid=false
    return false;
}

/**
 *  Export validation functions for further usage.
 *  function to export WITHOUT beackets!
 */
module.exports = {
    validateUser
}
