import mongoose from 'mongoose'

const { Schema } = mongoose



const enumUserType = {
	ADMIN: 'Admin',
	MEMBER: 'Member',
}



const UserSchema = new Schema(
	{
		role: {
			type: String,
			required: true,
			enum: Object.keys(enumUserType),
		},
		username: { type: String, required: true },
		password: { type: String },
		firstname: { type: String },
		lastname: { type: String },
		email: { type: String },
		mobile: { type: String },
	},
	{ timestamps: true }
)





export const UserModel = mongoose.model('User', UserSchema)


export default UserModel

