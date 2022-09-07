const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    mail:{
        type: String,
        required: [true, 'El email es obligatorio'],
        unique:true,
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img:{
        type:String
    },
    role:{
        type:String,
        required:true,
        emun:["ADMIN_ROLE","USER_ROLE"],
        default:"USER_ROLE"
    },
    google:{
        type:Boolean,
        default:false
    },
    state:{
        type:Boolean,
        default:true
    }
});

//MODIFICAR EL OBJETO DE MONGO
UserSchema.methods.toJSON = function(){
    const { __v, password, ...user } = this.toObject();
    return user;
}

module.exports = model('User', UserSchema);