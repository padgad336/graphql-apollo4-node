import passwordHash from 'password-hash'

import { PubSub } from 'graphql-subscriptions'
import { Resolver, schemaComposer } from 'graphql-compose'

import { UserModel } from '../../models'
import { UserTC } from '../type-composers/user'
import { hashPassword } from '../../libs/hash-password'

export const pubsub = new PubSub()
interface Args {
	_id: string
	password: string
}
const setPassword = new Resolver<any, any, Args, any>(
	{
		name: 'setPassword',
		type: UserTC.getType(),
		args: {
			_id: 'String!',
			password: 'String!',
		},
		resolve: async ({ args }) => {
			const { _id, password } = args
			const hashedPassword = hashPassword(password)
			const user = await UserModel.findOneAndUpdate(
				{ _id },
				{ password: hashedPassword },
				{ new: true }
			)
			if (!user) {
				throw new Error('User not found')
			}
			return user
		},
	},
	schemaComposer
)

const userMutations = {
	createUser: UserTC.getResolver('createOne', [
		async (next, s, a, c, i) => {
			const username = a?.record?.username
			const user = await UserModel.findOne({ username })
			if (username === user?.username) {
				throw new Error('User already Exist')
			} else if (username !== user?.username) {
				return next(s, a, c, i)
			}
		},
	]),
	updateUser: UserTC.getResolver('updateById'),
	removeUser: UserTC.getResolver('removeById'),
	setPassword,
}

export default userMutations
