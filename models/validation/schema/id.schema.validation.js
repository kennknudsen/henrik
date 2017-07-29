'use strict';

var name = {
    //in: 'body',
    notEmpty:  {
        errorMessage: 'Empty Id'
    },
    isLength: {
        options: [{ min: 2, max: 200 }],
        errorMessage: 'Der er sket en fejl - prøv igen' // Error message for the validator, takes precedent over parameter message
    }
};

module.exports = name;