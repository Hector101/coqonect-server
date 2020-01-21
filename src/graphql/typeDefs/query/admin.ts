import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'AdminQuery',
  description: 'Query Accessible to admins',
  fields: () => ({
    isAdmin: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Get admin authentication status',
      resolve: () => true,
    },
 }),
});
