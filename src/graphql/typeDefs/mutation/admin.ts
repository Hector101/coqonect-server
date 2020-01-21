import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} from 'graphql';

import messageType from '../generics/message';

import BlockUserResolver from '../../resolvers/admin/mutation/BlockerUser';
import UnblockUserResolver from '../../resolvers/admin/mutation/UnblockUser';
import AddSkillResolver from '../../resolvers/admin/mutation/AddSkill';
import AddSkillCategoryResolver from '../../resolvers/admin/mutation/AddSkillCategory';
import VerifyUserSkillResolver from '../../resolvers/admin/mutation/VerifyUserSkill';

export default new GraphQLObjectType({
  name: 'AdminMutation',
  description: 'Mutation Accessible to Admin and Super Admin',
  fields: () => ({
    blockUser: {
      type: messageType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: BlockUserResolver,
    },
    unblockUser: {
      type: messageType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: UnblockUserResolver,
    },
    addSkillCategory: {
      type: messageType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: AddSkillCategoryResolver,
    },
    addSkill: {
      type: messageType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        categoryId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: AddSkillResolver,
    },
    verifyUserSkill: {
      type: messageType,
      args: {
        accountId: { type: new GraphQLNonNull(GraphQLID) },
        skillId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: VerifyUserSkillResolver,
    },
  }),
});
