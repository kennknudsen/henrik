'use strict';

var email = {
    //in: 'body',
    notEmpty:  {
        errorMessage: 'Empty Email'
    },
    isEmail: {
        errorMessage: 'Invalid Email'
    },
    isLength: {
        options: [{ min: 2, max: 200 }],
        errorMessage: 'Must be between 2 and 200 chars long' // Error message for the validator, takes precedent over parameter message
    }
};

module.exports = email;