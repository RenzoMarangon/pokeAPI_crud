const { Schema, model } = require('mongoose');

const pokemonSchema = Schema({
    name:{
        type:String,
        required:[true, 'El nombre es obligatorio'],
        unique:true
    },
    numberID:{
        type:String,
        required:[true,'Se debe especificar el número de pókemon'],
    },
    type:{
        type:String,
        required:[true, 'Se requiere al menos un tipo de pókemon']
        //Si es más de un tipo, hay que separarlo con un espacio
    },
    state:{
        type:Boolean,
        default:true,
        required:true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    img:{
        type:String,
    },
    generation:{
        type:String,
        required:[true,'Se debee especificar la generación'],
        default:1,
    },
    evolution:{
            type:Schema.Types.ObjectId,
            ref:'Pokemon'
    },   
    stats:{
        attack:{
            type:String,
            required:[true, 'Se requiere el ataque del pókemon']
        },
        defense:{
            type:String,
            required:[true, 'Se requiere la defensa del pókemon']
        },
        resistance:{
            type:String,
            required:[true, 'Se requiere la resistencia del pókemon']
        },
        hp:{
            type:String,
            required:[true, 'Se requieren los puntos de vida del pókemon']
        },
    },
    evolutionLevel:{
        type:String
    }
    // attacks:{
    //     type:Schema.Types.ObjectId,
    //     ref:'Attacks',
    //     default:{}
    // },


})

pokemonSchema.methods.toJSON = function(){
    const { __v, _id, state, user, ...pokemon } = this.toObject();
    pokemon.id = _id;
    pokemon.type = pokemon.type.split(' ');

    return pokemon;
}

module.exports = model('Pokemon', pokemonSchema);