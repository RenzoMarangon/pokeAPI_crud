const path = require('path');
const fs   = require('fs')
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const { uploadFile } = require('../helpers/upload-files');
const Pokemon = require('../models/pokemon');
const User = require('../models/user');

const uploadImage = async(req, res) => {

      try {
          const archiveName = await uploadFile( req.files,'images', undefined ) //req.files -- FOLDER -- EXTENSIONS ['jpg','txt','pdf']
           
          res.json({ archiveName })
        
      } catch (err) {
        res.status(400).json({err})
      }
}

const uploadImageCloudinary = async(req, res) => {

  try {
      //Busco el path temporal del archivo
      const { tempFilePath } = req.files.archive;
      //Lo guardo en clodudinary y devuelvo el url
      const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
      
      res.json({ secure_url });
  } catch (err) {
    res.status(400).json({err})
  }
}

const updateImage = async(req, res) => {

  const { collection, id } = req.params
 
  let model;

  switch( collection ){
      case 'users':
        model = await User.findById(id);
        if( !model ){
          res.status(400).json({err:'No se encontró un usuario con ese ID'});
          return
        }
        
      break;

      case 'pokemons':
        model = await Pokemon.findById(id);
        if( !model ){
          res.status(400).json({err:'No se encontró un pokemon con ese ID'});
          return
        }

      break;

      default:
        res.status(500).json({ msg: `La collección ${collection} todavía no puede subir imágenes` })
  }

  //Buscar y borrar imagen ligada al objeto si ya existe
  if(model.img){
    const filePath = path.join( __dirname, '../uploads',collection, model.img );

    //Las borro del servidor
    if( fs.existsSync( filePath )){
      fs.unlinkSync( filePath );
    }
  }

  const fileName = await uploadFile( req.files, collection, undefined );

  model.img = fileName;

  await model.save();

  res.json( model );
}

const updateImageCloudinary = async(req, res) => {

  const { collection, id } = req.params
 
  let model;

  switch( collection ){
      case 'users':
        model = await User.findById(id);
        if( !model ){
          res.status(400).json({err:'No se encontró un usuario con ese ID'});
          return
        }
        
      break;

      case 'pokemons':
        model = await Pokemon.findById(id);
        if( !model ){
          res.status(400).json({err:'No se encontró un pokemon con ese ID'});
          return
        }

      break;

      default:
        res.status(500).json({ msg: `La collección ${collection} todavía no puede subir imágenes` })
  }

  //Buscar y borrar imagen ligada al objeto si ya existe
  if(model.img){
    const nameArr = model.img.split('/');
    const name    = nameArr[ nameArr.length-1 ];
    const [ public_id ] = name.split('.');

    cloudinary.uploader.destroy( public_id );
  }
  //Busco el path temporal del archivo
  const { tempFilePath } = req.files.archive;
  //Lo guardo en clodudinary y devuelvo el url
  const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
  //Guardo el url en la img del objeto
  model.img = secure_url;

  await model.save();

  res.json( model );
}


const getImage = async( req, res ) =>{
  const { collection, id } = req.params
 
  let model;

  switch( collection ){
      case 'users':
        model = await User.findById(id);
        if( !model ){
          res.status(400).json({err:'No se encontró un usuario con ese ID'});
          return
        }
        
      break;

      case 'pokemons':
        model = await Pokemon.findById(id);
        if( !model ){
          res.status(400).json({err:'No se encontró un pokemon con ese ID'});
          return
        }

      break;

      default:
        res.status(500).json({ msg: `La collección ${collection} todavía no puede subir imágenes` })
  }

  //Buscar la imagen si existe en el modelo
  if(model.img){
    const filePath = path.join( __dirname, '../uploads',collection, model.img );
    //La busca en el servidor y la muestra
    if( fs.existsSync( filePath )){
      res.sendFile(filePath);
      return;
    }
  }

  const image404 = path.join(__dirname,'../public/404_image.png')
  res.sendFile(image404)
}


module.exports = {
    uploadImage,
    updateImage,
    getImage,
    updateImageCloudinary,
    uploadImageCloudinary
}