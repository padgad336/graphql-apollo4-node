import mongoose from 'mongoose'

const { Schema } = mongoose


// project: {
//     type: Schema.Types.ObjectId,
//     ref: 'Project',
//     required: true,
// },

const BookSchema = new Schema({
name:{type:String},
author:{
    type:Schema.Types.ObjectId,
    ref:'Author'
},
category:{
    type:String
}
})

export const BookModel = mongoose.model('Book', BookSchema)


export default BookModel