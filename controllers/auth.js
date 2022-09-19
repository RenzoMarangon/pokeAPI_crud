const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { getAuth, signInWithPopup, GoogleAuthProvider } = require('firebase/auth');
const db = require('../database/firebase');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt-generator');


const accountLogin = async( req = request, res = response) => {

    const { mail, password } = req.body;

   try {
     //Verificar si el email existe
     const userExist = await User.findOne({ mail });
     if( !userExist ) return res.status(400).json({ error: "El correo no es válido" });
 
     //Verificar si la contraseña es correcta
     const validatePassword = bcryptjs.compareSync( password, userExist.password );
     if( !validatePassword ) return res.status(400).json({ error: "La contraseña no es válida" });
 
     //Verificar el state del usuario
     if( !userExist.state ) return res.status(400).json({ error: "El usuario no existe" });
 
 
     //Generar el jwt
    const token = await generateJWT( userExist.id );

     res.json({userExist,token})

   } catch (error) {
        console.log(error)
        res.status(500).json({ error:"Error interno de la base de datos, comuniquelo con el backend" })
   }

}

const googleAuthMailAndPass = async( req = request, res = response) => {

    const { mail, password, name } = req.body;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, mail, password)
    .then(async(userCredential) => {
        // Signed in
        const token = userCredential.user.stsTokenManager.accessToken

        const user= new User( { mail, token, password, name } );

        await user.save();

        res.json({ user })
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode+"\n")
        console.log(errorMessage+"\n")
        res.status(401).json({ error: "Credenciales no válidas" });
    });

}

const googleAuthPopUp = async( req = request, res = response ) => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        
        res.json({ user });
        
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        
    });
}

module.exports = {
    accountLogin,
    googleAuthPopUp,
}