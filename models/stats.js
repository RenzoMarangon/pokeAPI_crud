const { Schema, model } = require('mongoose');

const StatsSchema = Schema({
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
    const { __v, _id, ...stats } = this.toObject();
    stats.id = _id;
    return stats;
}

module.exports = model( 'Stats', TypeSchema ); 