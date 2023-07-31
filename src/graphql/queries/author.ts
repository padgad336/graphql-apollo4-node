import { AuthorTC } from '../type-composers/author'


const authorQueries = {
	authors: AuthorTC.getResolver('findMany'),
	authorId: AuthorTC.getResolver('findById')
}

export default authorQueries
