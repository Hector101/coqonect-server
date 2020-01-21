import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'rating',
  fields: {
    ratingCount: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    average: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
  },
});
