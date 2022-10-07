const { Schema, model } = require('mongoose');

const pokemonSchema = Schema({
    name:{
        type:String,
        required:[true, 'El nombre es obligatorio.'],
    },
    numberID:{
        type:String,
        required:[true,'Se debe especificar el número de pókemon.'],
    },
    type:{
        type:String,
        required:[true, 'Se requiere al menos un tipo de pókemon.']
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
        required:[true,'Se debe especificar la generación.'],
        default:1,
    },
    evolution:{
            type:Schema.Types.ObjectId,
            ref:'Pokemon'
    },   
    stats:{
        type:Object,
        required:[true,'Se deben especificar las estadísticas.'],
        attack:{
            type:Number,
        },
        defense:{
            type:Number,
        },
        special_attk:{
            type:Number,
        },
        special_defense:{
            type:Number,
        },
        velocity:{
            type:Number,
        },
        hp:{
            type:Number,
        },
        total:{
            type:Number,
            default:0
        },
    },
    evolutionLevel:{
        type:Number
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