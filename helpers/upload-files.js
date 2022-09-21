const  path = require('path');
const { v4:uuidv4 } = require('uuid');

const uploadFile = ( files, folder = '', extensionsAllowed = [ 'png', 'jpg', 'jpeg','gif' ]) => {

    return new Promise( (resolve, reject) => {
        //Busco el archivo a subir
        const { archive } = files;

        const archiveName = archive.name.split('.');

        const extension = archiveName[ archiveName.length-1 ].toLowerCase();

        if( !extensionsAllowed.includes( extension ) ) {
            reject(`La extensión ${ extension } no es permitida.`)
            return;
        }

        const archiveRandomName = uuidv4() + '.' + extension;

        const uploadPath = path.join( __dirname, '../uploads/', folder , archiveRandomName)

        // Mover el archivo a la carpeta uploads
        archive.mv(uploadPath, function(err) {
            if (err) {
                reject( err );
                return;
            }

            resolve( archiveRandomName );
        });
    })
}

module.exports = {
    uploadFile
}