let FB = require('./FB');
let fb = new FB();

fb.getUserName('4').then((userName)=> {
    console.log(userName.name);
});

fb.getGroupById('882374948522079').then((group)=> {
    console.log(group);
});

fb.getGroupMembersById('882374948522079').then((members)=> {
    console.log(members);
});
