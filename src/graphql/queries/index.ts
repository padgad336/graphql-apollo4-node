import authorQueries from './author'
import bookQueries from './book'
import userQueries from './user'


export default {
	...userQueries,
	...bookQueries,
	...authorQueries
}
