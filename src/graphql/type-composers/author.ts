import { composeWithMongoose } from "graphql-compose-mongoose";
import { AuthorModel } from "../../models";


export const AuthorTC =composeWithMongoose(AuthorModel)
