
const fs = require('fs')
var path = require('path');

module.exports = async function(req,res){
    var name = req.params.name;
    console.log(name);
    if(!name)
    {
        res.send({error: "No File Found"});
        return;
    }

    try {
        if (fs.existsSync("./public/files/"+name)) {
            res.sendFile(path.resolve('./public/files/'+name));
        }else{
            res.status(400).send("Not Found")
        }
    } catch(err) {
    console.error(err)

    res.status(500).send("Something went wrong")

    }

}
