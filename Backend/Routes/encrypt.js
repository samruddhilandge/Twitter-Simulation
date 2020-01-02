
const sha1 = require('sha1');
let password = "12"
let enPassword = sha1(password);
console.log(enPassword)