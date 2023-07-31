import {
	composeWithMongoose,
} from 'graphql-compose-mongoose'

import { UserModel } from '../../models'

const baseOptions = {
	fields: {
		remove: ['password'],
	},
}

export const UserTC = composeWithMongoose(UserModel, baseOptions)

UserTC.addRelation('createdById', {
	resolver: () => UserTC.getResolver('findById'),
	prepareArgs: {
		_id: (source:any) => source.createdById,
	},
	projection: { createdById: true },
})

export default UserTC
