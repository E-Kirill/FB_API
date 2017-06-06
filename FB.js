let url = require('url'),
    fb = require('fb'),
    rp = require('request-promise');

let client_secret = '',
    client_id = '';

fb.options({
    appId: client_id,
    appSecret: client_secret,
    scope: 'read_custom_friendlists,user_managed_groups'
});

class FB{
    constructor(UAtoken) {
        if(UAtoken){
            this.token = UAtoken;
        }else {
            let that = this;
            this.init = (async ()=> {
                try{
                    let res = await fb.api('oauth/access_token', {
                        client_id: client_id,
                        client_secret: client_secret,
                        grant_type: 'client_credentials'
                    })
                    that.token = res.access_token;
                }
                catch(err){
                    throw Error(err);
                }
            })();
            this.init.then(()=>{
                this.init = true;
            });
        };
    }

    formatUrl (path) {
        let link = url.format({
            hostname: 'graph.facebook.com/' + path,
            protocol: 'https',
            query: {
                access_token: this.token
            }
        });
        return link;
    }

    async getUserName(id = '') {
        try {
            let link = this.formatUrl(id);
            let res = await rp(link);
            res = JSON.parse(res);
            for(let key in res){
                res[key] = res[key].toString("utf8");
            }
            return res;
        }
        catch(err) {
            return Error(err);
        }
    }
}

module.exports = FB;