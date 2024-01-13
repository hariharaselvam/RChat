function ValidateIPaddress(inputText) {

    var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (inputText.match(ipformat)) {
        return true;
    }
    return false;
}

function ValidateEmail(mail) {
    if (mail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        return true;
    }
    return false;
}

function allnumeric(inputtxt) {
    var numbers = /^[0-9]+$/;
    if (inputtxt.match(/^[0-9]+$/)) {
        return true;
    }
    return false;
}

function CheckPassword(inputtxt) {
    var passw = /^[A-Za-z]\w{7,14}$/;
    if (inputtxt.value.match(passw)) {

        return true;
    }
    else {

        return false;
    }
}

