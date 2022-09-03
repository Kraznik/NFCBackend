var log = require("../models").APILog;

module.exports = async function(req,res, next){


    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const origin =  req.get('origin') || req.get('host');
    var create = await log.create({
        path:"("+req.method+")"+req.url,
        data:{ip,origin}
    })

    // console.log(req.ip,req.socket.remoteAddress);
    // console.log(req);
    // var host = req.get('origin');
    // console.log(host);
    // //|| host == "dev-eth-barcelona.web.app" || host == "main-eth-bcn.web.app" || host == "ethbarcelona.com"
    // if(host == "localhost:3456" )
    // {
    //     next();
    // }
    // else{
    //     res.send("Not Valid");
    // }

    next()
}