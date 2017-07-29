'use strict';

var zip = {
    //in: 'body',
    notEmpty:  {
        errorMessage: 'Empty Zip'
    },
    isLength: {
        options: [{ min: 4, max: 4 }],
        errorMessage: 'Must be between 4 and 4 chars long' // Error message for the validator, takes precedent over parameter message
    }
};

module.exports = zip;