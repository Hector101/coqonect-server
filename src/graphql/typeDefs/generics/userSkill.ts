import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'userSkill',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    verified: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    description: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
  },
});
