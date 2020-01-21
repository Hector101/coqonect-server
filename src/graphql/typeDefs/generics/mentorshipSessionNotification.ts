import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
} from 'graphql';

import userType from './user';

import NotificationSenderResolver from '../../resolvers/client/query/NotificationSender';

export default new GraphQLObjectType({
  name: 'mentorshipSessionNotification',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    senderId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    receiverId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    preSessionId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    read: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    sender: {
      type: new GraphQLNonNull(userType),
      resolve: NotificationSenderResolver,
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});
