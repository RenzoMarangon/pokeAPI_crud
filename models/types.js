const { Schema, model } = require('mongoose');

const TypeSchema = Schema({
    name:{
        type:String,
        required:[true, 'Al menos debe haber un tipo'],
        unique:true,
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


//MODIFICAR EL OBJETO DE MONGO
TypeSchema.methods.toJSON = function(){
    const { __v, _id, state, user, ...type } = this.toObject();
    type.id = _id;
    return type;
}

module.exports = model( 'Type', TypeSchema ); 