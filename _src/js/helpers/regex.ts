
/*
    Returns querystring regex pattern
*/
export const queryStringPattern = /([^?=&]+)(=([^&]*))?/g;

/*
    Returns email regex pattern
*/
export const emailRegexPattern = /^([a-zA-Z0-9_-])+([\.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-]+)+$/;

/*
    Returns password regex pattern
*/
export const passwordRegexPattern = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/;

/*
    Returns phone regex pattern
*/
export const phoneRegexPattern = /^((([0-9]{3}))|([0-9]{3}))[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/;
