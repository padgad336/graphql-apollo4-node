import mongoose from 'mongoose'

const { Schema } = mongoose




const authorSchema = new Schema({
firstname:{type:String},
lastname:{type:String},
penedname:{
    type:String
}
})

export const AuthorModel = mongoose.model('Author', authorSchema)


export default AuthorModel