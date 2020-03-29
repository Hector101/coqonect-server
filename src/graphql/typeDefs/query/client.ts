import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

// Schema types
import UserType from '../generics/user';
import mentorshipRequestType from '../generics/mentorshipRequest';
import preSessionNotificationType from '../generics/mentorshipSessionNotification';
import mentorToMenteeNotificationType from '../generics/mentorToMenteeNotification';

// Resolvers
import AuthenticatedUserResolver from '../../resolvers/client/query/AuthenticatedUser';
import UserResolver from '../../resolvers/client/query/User';
import MentorshipRequestsResolver from '../../resolvers/client/query/MentorshipRequests';
import MyMentorshipRequestsResolver from '../../resolvers/client/query/MyMentorshipRequests';
import PreSessionNotificationsResolver from '../../resolvers/client/query/PreSessionNotifications';
import MentorToMenteeNotificationsResolver from '../../resolvers/client/query/MentorToMenteeNotifications';

export default new GraphQLObjectType({
  name: 'ClientQuery',
  description: 'Query Accessible to clients',
  fields: () => ({
    authenticatedUser: {
      type: UserType,
      description: 'Get authenticated user details',
      resolve: AuthenticatedUserResolver,
    },
    isAuthenticated: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Get user authentication status',
      resolve: () => true,
    },
    user: {
      type: UserType,
      args: {
        accountId: { type: new GraphQLNonNull(GraphQLID) },
      },
      description: 'Get user details by accountId',
      resolve: UserResolver,
    },
    mentorshipRequests: {
      type: new GraphQLList(mentorshipRequestType),
      args: {
        take: { type: GraphQLInt },
        skip: { type: GraphQLInt },
        requestType: { type: GraphQLString },
        status: { type: GraphQLString },
      },
      resolve: MentorshipRequestsResolver,
    },
    myMentorshipRequests: {
      type: new GraphQLList(mentorshipRequestType),
      args: {
        requestType: { type: GraphQLString },
        take: { type: GraphQLInt },
        skip: { type: GraphQLInt },
      },
      resolve: MyMentorshipRequestsResolver,
    },
    preSessionNotifications: {
      type: new GraphQLList(preSessionNotificationType),
      args: {
        status: { type: GraphQLString },
        take: { type: GraphQLInt },
        skip: { type: GraphQLInt },
      },
      resolve: PreSessionNotificationsResolver,
    },
    mentorToMenteeNotifications: {
      type: new GraphQLList(mentorToMenteeNotificationType),
      args: {
        status: { type: GraphQLString },
        take: { type: GraphQLInt },
        skip: { type: GraphQLInt },
      },
      resolve: MentorToMenteeNotificationsResolver,
    },
 }),
});
