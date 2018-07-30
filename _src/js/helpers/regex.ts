
/*
    Returns querystring regex pattern
*/
export const queryStringPattern: RegExp = /([^?=&]+)(=([^&]*))?/g;

/*
    Returns email regex pattern
*/
export const emailRegexPattern: RegExp = /^([a-zA-Z0-9_-])+([\.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]+)+$/;

/*
    Returns password regex pattern
*/
export const passwordRegexPattern: RegExp = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/;

/*
    Returns phone regex pattern
*/
export const phoneRegexPattern: RegExp = /^((([0-9]{3}))|([0-9]{3}))[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/;
