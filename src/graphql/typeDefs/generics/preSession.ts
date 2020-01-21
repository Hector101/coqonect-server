import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';

import userType from './user';

import MenteeResolver from '../../resolvers/client/query/Mentee';
import MentorsResolver from '../../resolvers/client/query/Mentors';

export default new GraphQLObjectType({
  name: 'mentorshipSession',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    menteeId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    status: {
      type: new GraphQLNonNull(GraphQLString),
    },
    refCode: {
      type: new GraphQLNonNull(GraphQLString),
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
    mentee: {
      type: new GraphQLNonNull(userType),
      resolve: MenteeResolver,
    },
    mentorshipRequestId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    mentors: {
      type: new GraphQLList(userType),
      resolve: MentorsResolver,
    },
  },
});
