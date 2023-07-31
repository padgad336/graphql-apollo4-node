import authMutations from './auth'
import userMutations from './user'


export default {
	...authMutations,
	...userMutations,
}
