import { UserTC} from '../type-composers/user'

const userQueries = {
	users: UserTC.getResolver('findMany'),
	userId: UserTC.getResolver('findById')
}

export default userQueries
