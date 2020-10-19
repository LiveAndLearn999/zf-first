<<<<<<< HEAD
const config = {
    // host:process.env.NODE_ENV == 'development' ? 'http://test-open-admin.ggjtaq.com' : 'https://open.ggjtaq.com',
    host:process.env.NODE_ENV == 'development' ? 'http://test-open-admin.ggjtaq.com' : 'http://test-open-admin.ggjtaq.com',
    appid:'20200807111155590064',
    secret:'542d2e280b6a9f2391ed2408f5fee844',
    ver:'1.0.0',
    selftoken:'zfdz',
    debug:process.env.NODE_ENV == 'development'  ? true : true
}

const lime = new Lime(config);

if (lime.get_token() == null) {
    lime.set_token();
}
=======
const config = {
    // host:process.env.NODE_ENV == 'development' ? 'http://test-open-admin.ggjtaq.com' : 'https://open.ggjtaq.com',
    host:process.env.NODE_ENV == 'development' ? 'http://test-open-admin.ggjtaq.com' : 'http://test-open-admin.ggjtaq.com',
    appid:'20200807111155590064',
    secret:'542d2e280b6a9f2391ed2408f5fee844',
    ver:'1.0.0',
    selftoken:'zfdz',
    debug:process.env.NODE_ENV == 'development'  ? true : true
}

const lime = new Lime(config);

if (lime.get_token() == null) {
    lime.set_token();
}
>>>>>>> 1d56e43ea6b161b46d322e5ba7941a16d67a2276
export default lime;