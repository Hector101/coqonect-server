import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from 'graphql';

import messageType from '../generics/message';
import PreSessionType from '../generics/preSession';

import EditProfileResolver from '../../resolvers/client/mutation/EditProfile';
import ChangePasswordResolver from '../../resolvers/client/mutation/ChangePassword';
import AddUserSkillResolver from '../../resolvers/client/mutation/AddUserSkill';
import NotifyMentorshipRequestResolver from '../../resolvers/client/mutation/NotifyMentorshipRequest';
import CreateMentorshipRequestResolver from '../../resolvers/client/mutation/CreateMentorshipRequest';
import RemoveUserSkillResolver from '../../resolvers/client/mutation/RemoveUserSkill';
import EndPreSessionResolver from '../../resolvers/client/mutation/EndPreSession';
import StartPreSessionResolver from '../../resolvers/client/mutation/StartPreSession';
import StartMainSessionResolver from '../../resolvers/client/mutation/StartMainSession';
import EndMainSessionResolver from '../../resolvers/client/mutation/EndMainSession';
import CreatePreSessionResolver from '../../resolvers/client/mutation/CreatePreSession';
import ReadMentorToMenteeNotificationResolver from '../../resolvers/client/mutation/ReadMentorToMenteeNotification';
import ReadPreSessionNotificationResolver from '../../resolvers/client/mutation/ReadPreSessionNotification';
import RateMentorResolver from '../../resolvers/client/mutation/RateMentor';

export default new GraphQLObjectType({
  name: 'ClientMutation',
  description: 'Query Accessible to Admin and Super Admin',
  fields: () => ({
    editProfile: {
      type: messageType,
      args: {
        fullName: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        country: { type: new GraphQLNonNull(GraphQLString) },
        bio: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: EditProfileResolver,
    },
    changePassword: {
      type: messageType,
      args: {
        oldPassword: { type: new GraphQLNonNull(GraphQLString) },
        newPassword: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: ChangePasswordResolver,
    },
    addUserSkill: {
      type: messageType,
      args: {
        skillId: { type: new GraphQLNonNull(GraphQLID) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        evidence: { type: new GraphQLNonNull(GraphQLString) },
        months: { type: new GraphQLNonNull(GraphQLInt) },
        years: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: AddUserSkillResolver,
    },
    removeUserSkill: {
      type: messageType,
      args: {
        skillId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: RemoveUserSkillResolver,
    },
    createMentorshipRequest: {
      type: messageType,
      args: {
        skillId: { type: new GraphQLNonNull(GraphQLID) },
        otherSkillIds: { type: new GraphQLList(GraphQLID) },
        requestType: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve: CreateMentorshipRequestResolver,
    },
    notifyMentorshipRequest: {
      type: messageType,
      args: {
        mentorshipRequestId: { type: new GraphQLNonNull(GraphQLID)},
      },
      resolve: NotifyMentorshipRequestResolver,
    },
    createPreSession: {
      type: PreSessionType,
      args: {
        mentorshipRequestId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: CreatePreSessionResolver,
    },
    readMentorToMenteeNotification: {
      type: messageType,
      args: {
        mentorshipRequestId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: ReadMentorToMenteeNotificationResolver,
    },
    startPreSession: {
      type: messageType,
      args: {
        refCode: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: StartPreSessionResolver,
    },
    endPreSession: {
      type: messageType,
      args: {
        refCode: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: EndPreSessionResolver,
    },
    startMainSession: {
      type: messageType,
      args: {
        refCode: { type: new GraphQLNonNull(GraphQLString) },
        mentorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: StartMainSessionResolver,
    },
    endMainSession: {
      type: messageType,
      args: {
        refCode: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: EndMainSessionResolver,
    },
    readPreSessionNotification: {
      type: messageType,
      args: {
        preSessionId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: ReadPreSessionNotificationResolver,
    },
    rateMentor: {
      type: messageType,
      args: {
        mainSessionId: { type: new GraphQLNonNull(GraphQLString) },
        mentorId: { type: new GraphQLNonNull(GraphQLString) },
        rate: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: RateMentorResolver,
    },
  }),
});
