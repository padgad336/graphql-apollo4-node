import { BookTC} from '../type-composers/book'

const bookQueries = {
	books: BookTC.getResolver('findMany'),
	bookId: BookTC.getResolver('findById')
}

export default bookQueries
