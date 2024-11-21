
const {SchemaType, model, Schema} = require('mongoose');

// const Cat = mongoose.model('Cat', { name: String });

const UserSchema = Schema({
    name: {
        type:String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    }
})


module.exports = model('User', UserSchema)
