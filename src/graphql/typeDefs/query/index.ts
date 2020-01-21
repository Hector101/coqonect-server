import { GraphQLObjectType } from 'graphql';

import clientQuery from './client';
import adminQuery from './admin';
import superAdminQuery from './superAdmin';
import publicQuery from './public';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query for CoQonect',
  fields: () => ({
    client: {
      type: clientQuery,
      resolve: (_parent, _args, { req: { isAuthorized } }) => {
        if (!isAuthorized) {
          throw new Error('Not Authorized');
        }
        return {};
      },
    },
    admin: {
      type: adminQuery,
      resolve: (_parent, _args, { req: { isSuperAdmin, isAdmin } }) => {
        if (isSuperAdmin || isAdmin) {
          return {};
        }
        throw new Error('Not Authorized');
      },
    },
    superAdmin: {
      type: superAdminQuery,
      resolve: (_parent, _args, { req: { isSuperAdmin } }) => {
        if (!isSuperAdmin) {
          throw new Error('Not Authorized');
        }
        return {};
      },
    },
    public: {
      type: publicQuery,
      resolve: () => ({}),
    },
  }),
});
