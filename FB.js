let url = require('url'),
    fb = require('fb'),
    rp = require('request-promise');

/** @author E-Kirill */

/** Set your application ClientID here */
let client_id = '';
/** Set your application Client secret here */
let client_secret = '';

fb.options({
    appId: client_id,
    appSecret: client_secret,
    scope: 'read_custom_friendlists,user_managed_groups'
});

/**
 * Class representing a Facebook GRAPH API connection.
 * @class FB
 */
class FB{
    /**
     * Setting a token.
     * @function constructor
     * @param {string} UAtoken - (User Access token) if present replaces  app token.
     * @memberof FB
     */
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

    /**
     * Makes link for API with access token.
     * @function formatUrl
     * @param {string} path - path in the API;
     * @return {string} The link value.
     * @memberof FB
     */
    async formatUrl (path) {
        try{
            await this.init;
            let link = url.format({
                hostname: 'graph.facebook.com/' + path,
                protocol: 'https',
                query: {
                    access_token: this.token
                }
            });
            return link;
        }
        catch(err){
            throw Error(err);
        }
    }

    /**
     * Makes request to FB API.
     * @function getUserName
     * @param {string} id - User ID;
     * @return {string} User data.
     * @memberof FB
     */
    async getUserName(id = '') {
        try {
            let link = await this.formatUrl(id);
            let res = await rp({
                uri: link,
                json: true,
                encoding: 'utf8'
            });
            return res;
        }
        catch(err) {
            throw Error(err);
        }
    }

    /**
     * Makes request to FB API. 
     * @function getGroupById
     * @param {string} id - Group ID;
     * @return {string} Group data.
     * @memberof FB
     */
    async getGroupById(id = '') {
        try {
            let link = await this.formatUrl(id);
            let res = await rp({
                uri: link,
                json: true,
                encoding: 'utf8'
            });
            return res;
        }
        catch(err) {
            throw Error(err);
        }
    }

    /**
     * Makes request to FB API. 
     * @function getGroupMembersById
     * @param {string} id - Group ID;
     * @return {string} Group members.
     * @memberof FB
     */
    async getGroupMembersById(id = '') {
        try {
            let link = await this.formatUrl(id + '/members');
            let res = await rp({
                uri: link,
                json: true,
                encoding: 'utf8'
            });
            return res;
        }
        catch(err) {
            throw Error(err);
        }
    }
}

module.exports = FB;