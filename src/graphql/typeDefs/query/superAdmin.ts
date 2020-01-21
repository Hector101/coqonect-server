import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
} from 'graphql';

export default new GraphQLObjectType({
name: 'SuperAdminQuery',
description: 'Query Accessible to Super Admins',
fields: () => ({
  isSuperAdmin: {
    type: new GraphQLNonNull(GraphQLBoolean),
    resolve: () => true,
  },
}),
});
