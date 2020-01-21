import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLID,
} from 'graphql';

import userType from '../generics/user';

import FetchMentorsResolver from '../../resolvers/public/query/FetchMentors';

export default new GraphQLObjectType({
  name: 'PublicQuery',
  description: 'Query Accessible to the public',
  fields: () => ({
    mentors: {
      type: new GraphQLList(userType),
      args: {
        take: { type: GraphQLInt },
        skip: { type: GraphQLInt },
        name: { type: GraphQLString },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
        skillId: { type: GraphQLID },
      },
      description: 'Get mentors by name or verified skills',
      resolve: FetchMentorsResolver,
    },
 }),
});
