const fs = require("fs");
const Jimp = require("jimp");
var QRCode = require("qrcode");
const { v4: uuidv4 } = require("uuid");
var devconCreations = require("../models").devconCreations;

const convert = require('heic-convert');

const imgConvert = require("image-convert")

var request = require('request').defaults({ encoding: null });
const  {bufferToDataUrl} = require("buffer-to-data-url")

module.exports = async function (req, res) {
  let { walletAddress, nftTypeId, name, twitter, telegram, photoLink } =
    req.body;

  var checkCreations = await devconCreations.findAll({ where: { nftTypeId } });

  if (checkCreations.length) {
    res.send({ error: "NFT Type Id Exist" });
    return;
  }

  uuid = uuidv4();

  var create = await devconCreations.create({
    walletAddress,
    nftTypeId,
    name,
    twitter,
    telegram,
    photoLink,
    collected: 0,
    uuid,
    maxEditions: process.env.maxEditions,
  });

  console.log(create.id);
  var bg = await Jimp.read(`./public/bg.png`);

  request( photoLink,async (err, resp, imgbuffer) => {

    console.log(resp.headers['content-type']);



    if(err)
    {
      console.log(err);
      res.json({ error: "Problem" }); 
      return;
    }

    var uri = null

    if(resp.headers['content-type'] == "image/heic")
    {
      const outputBuffer = await convert({
        buffer: imgbuffer, // the HEIC file buffer
        format: 'PNG', // output format
      });
      console.log(outputBuffer);
      var mime = 'image/png'; 
      var encoding = 'base64'; 
      var data = outputBuffer.toString(encoding); 
      uri = 'data:' + mime + ';' + encoding + ',' + data;

    }else{
      var mime = 'image/png'; 
      var encoding = 'base64'; 
      var data = imgbuffer.toString(encoding); 
      uri = 'data:' + mime + ';' + encoding + ',' + data;
    }

    imgConvert.fromBuffer({
      buffer: uri,//replace with buffer
      quality: 50, //quality
      output_format: "jpg", //jpg
      size: "original" //defualt
  },async function(err,buffer,file){
      if(err)
      {
          console.log(err);
          res.json({ error: "Problem" }); 
          return;
      }
  
      var image1 = await Jimp.read(buffer);
  
    if (image1.bitmap.width > 600) {
      image1.resize(600, Jimp.AUTO);
      // bg.composite(
      //   image1,
      //   bg.bitmap.width / 2 - image1.bitmap.width / 2,
      //   350 + 300 - image1.bitmap.height / 2
      // );
  
      if(image1.bitmap.height > 600)
      {
        image1.resize(Jimp.AUTO,600);
        bg.composite(image1,bg.bitmap.width/2-image1.bitmap.width/2,350);
      }else{
  
        bg.composite(image1,bg.bitmap.width/2-image1.bitmap.width/2,350+300-image1.bitmap.height/2);
      }
    } else {
      image1.resize(Jimp.AUTO, 600);
  
      if (image1.bitmap.width > 600) {
        image1.resize(600, Jimp.AUTO);
        bg.composite(
          image1,
          bg.bitmap.width / 2 - image1.bitmap.width / 2,
          350 + 300 - image1.bitmap.height / 2
        );
      } else {
        bg.composite(image1, bg.bitmap.width / 2 - image1.bitmap.width / 2, 350);
      }
    }
  
    const font = await Jimp.loadFont("./public/MXfnces00eitd2ZIbD_O_9LL.ttf.fnt");
    const font1 = await Jimp.loadFont(
      "./public/UVlI7_gD6w7WBBK8_LmJG0FJ.ttf.fnt"
    );
    const font2 = await Jimp.loadFont(
      "./public/kEO276MrJpMd0SxlVrCeui7f.ttf.fnt"
    );
  
    var textWidth = Jimp.measureText(font, name);
  
    bg.print(font, bg.bitmap.width / 2 - textWidth / 2, 150, {
      text: name,
    });
  
    bg.print(font1, 370, 1015, {
      text: create.id.toString(),
    });
  
    bg.print(font2, 120, 1097, {
      text: twitter,
    });
  
    bg.print(font2, 120, 1172, {
      text: telegram,
    });
  
    var buffer1 = await QRCode.toDataURL(`${process.env.base_url}/${uuid}/claim`);
  
    var buffer = new Buffer(
      buffer1.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    console.log(buffer);
  
    var image2 = await Jimp.read(buffer);
    image2.resize(220, 220);
  
    bg.composite(image2, 577, 1015);
  
    bg.write(`./public/files/${nftTypeId}.png`);
  
    var update = await devconCreations.update(
      {
        generatedPhotoLink: `${process.env.home_url}/files/${nftTypeId}.png`,
      },
      { where: { id: create.id } }
    );
  
    var findCreations = await devconCreations.findAll({
      where: { id: create.id },
    });
  
    res.json({ message: "Success", data: findCreations[0] });
    return;
  
    })


  });

  


  
};
