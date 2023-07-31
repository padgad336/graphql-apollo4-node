import { composeWithMongoose } from "graphql-compose-mongoose";
import { BookModel } from "../../models";
import { AuthorTC } from "./author";


export const BookTC =composeWithMongoose(BookModel)
BookTC.addRelation('author', {
	resolver: () => AuthorTC.getResolver('findById'),
	prepareArgs: {
		_id: (source:any) => source.author,
	},
	projection: { author: true },
})