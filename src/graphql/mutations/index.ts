import authMutations from './auth'
import authorMutations from './author'
import bookMutations from './book'
import userMutations from './user'


export default {
	...authMutations,
	...userMutations,
	...bookMutations,
	...authorMutations
}
