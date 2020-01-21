import { GraphQLObjectType } from 'graphql';

import AdminMutation from './admin';
import ClientMutation from './client';
import SuperAdminMutation from './superAdmin';

export default new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation for CoQonect',
  fields: () => ({
    admin: {
      type: AdminMutation,
      resolve: (_parent, _args, { req: { isSuperAdmin, isAdmin } }) => {
        if (isSuperAdmin || isAdmin) {
          return {};
        }
        throw new Error('Not Authorized');
      },
    },
    client: {
      type: ClientMutation,
      resolve: (_parent, _args, { req: { isAuthorized } }) => {
        if (isAuthorized) {
          return {};
        }
        throw new Error('Not Authorized');
      },
    },
    superAdmin: {
      type: SuperAdminMutation,
      resolve: (_parent, _args, { req: { isSuperAdmin }}) => {
        if (isSuperAdmin) {
          return {};
        }
        throw new Error('Not Authorized');
      },
    },
  }),
});
