import { BookTC } from "../type-composers/book";

const bookMutations ={
    createBook:BookTC.getResolver('createOne'),
    updateBook:BookTC.getResolver('updateById'),
    removeBook:BookTC.getResolver('removeById'),
}
export default bookMutations