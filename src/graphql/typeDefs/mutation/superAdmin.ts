import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
} from 'graphql';

import messageType from '../generics/message';

import BlockAdminResolver from '../../resolvers/superAdmin/mutation/BlockAdmin';
import DemoteSuperAdminResolver from '../../resolvers/superAdmin/mutation/DemoteSuperAdmin';
import UnblockAdminResolver from '../../resolvers/superAdmin/mutation/UnblockAdmin';
import UpgradeAdminResolver from '../../resolvers/superAdmin/mutation/UpgradeAdmin';

export default new GraphQLObjectType({
  name: 'SuperAdminMutation',
  description: 'Mutation Accessible to Super Admins',
  fields: () => ({
    blockAdmin: {
      type: messageType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: BlockAdminResolver,
    },
    unblockAdmin: {
      type: messageType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: UnblockAdminResolver,
    },
    upgradeAdmin: {
      type: messageType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: UpgradeAdminResolver,
    },
    demoteSuperAdmin: {
      type: messageType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: DemoteSuperAdminResolver,
    },
  }),
});
