import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'profile',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    fullName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    imageUrl: {
      type: GraphQLString,
    },
    gender: {
      type: GraphQLString,
    },
    city: {
      type: GraphQLString,
    },
    country: {
      type: GraphQLString,
    },
    bio: {
      type: GraphQLString,
    },
  },
});
