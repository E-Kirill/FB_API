let FB = require('./FB');
let fb = new FB();

console.log(fb);
fb.getUserName('4').then((userName)=> {
    console.log(userName.name);
});
