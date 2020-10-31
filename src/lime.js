<<<<<<< HEAD
const config = {
    // host:process.env.NODE_ENV == 'development' ? 'https://open.ggjtaq.com' : 'https://open.ggjtaq.com',
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
    // host:process.env.NODE_ENV == 'development' ? 'https://open.ggjtaq.com' : 'https://open.ggjtaq.com',
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
>>>>>>> 1f702aa4e73375b5b4e4a49a41d31abce6883975
export default lime;