import { AuthorTC } from "../type-composers/author";

const authorMutations ={
    createAuthor:AuthorTC.getResolver('createOne'),
    updateAuthor:AuthorTC.getResolver('updateById'),
    removeAuthor:AuthorTC.getResolver('removeById'),
}
export default authorMutations