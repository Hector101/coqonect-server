import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { withFilter } from 'apollo-server-express';

import mentorshipSessionNotificationType from '../generics/mentorshipSessionNotification';
import mentorToMenteeNotificationType from '../generics/mentorToMenteeNotification';

import {
  PRE_SESSION_NOTIFICATION,
  MENTOR_TO_MENTEE_NOTIFICATION,
 } from '../../../lib/constants';

export default new GraphQLObjectType({
  name: 'Subscription',
  description: 'Root Subscription for CoQonect',
  fields: () => ({
    preSessionNotification: {
      type: mentorshipSessionNotificationType,
      args: {
        receiverId: { type: new GraphQLNonNull(GraphQLString)},
      },
      subscribe: withFilter(
        (_, __, { pubSub, connection: { context: { auth } } }) => {
          if (!auth.isAuthorized) {
            throw new Error('Not Authorized');
          }
          return pubSub.asyncIterator(PRE_SESSION_NOTIFICATION);
        },
        (payload, args) => {
          return payload.preSessionNotification.receiverId === args.receiverId;
        },
      ),
    },
    mentorToMenteeNotification: {
      type: mentorToMenteeNotificationType,
      args: {
        mentorshipRequestId: { type: new GraphQLNonNull(GraphQLString)},
      },
      subscribe: withFilter(
        (_, __, { pubSub, connection: { context: { auth } } }) => {
          if (!auth.isAuthorized) {
            throw new Error('Not Authorized');
          }
          return pubSub.asyncIterator(MENTOR_TO_MENTEE_NOTIFICATION);
        },
        (payload, args) => {
          return payload.mentorshipRequestId === args.mentorshipRequestId;
        },
      ),
    },
  }),
});
