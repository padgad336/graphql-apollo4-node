import passwordHash from "password-hash";

import { GraphQLError } from 'graphql';
import { Resolver, schemaComposer } from "graphql-compose";

import { UserModel } from "../../models";
import { jwtSign } from "../../../config/util";
interface Args {
  username: string;
  password: string;
}
const loginResolver = new Resolver<any, any, Args, any>(
  {
    name: "login",
    type: "String",
    args: {
      username: "String!",
      password: "String!",
    },
    resolve: async ({ args }) => {
      const { username, password } = args;
      const user = await UserModel.findOne({ username });
      // console.log(user)
      if (!user) {
        throw new GraphQLError(`Username ${username} not found`, {
          extensions: {
            code: 'FORBIDDEN',
            myExtension: "foo",
          },
        });
       
      }
      const valid = passwordHash.verify(password, `${user.password}`);
      if (!valid) {
        throw new GraphQLError(`"Incorrect password"`, {
          extensions: {
            code: 'FORBIDDEN',
            myExtension: "foo",
          },
        });
      }
      return jwtSign(
        {
          _id: user._id,
          role: user.role,
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          mobile: user.mobile,
        },
        "3d"
      );
    },
  },
  schemaComposer
);

const authMutations = {
  login: loginResolver,
};

export default authMutations;
