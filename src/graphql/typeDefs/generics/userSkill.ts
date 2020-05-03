import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

import ProfileType from './profile';

export default new GraphQLObjectType({
  name: 'userSkill',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    status: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    evidence: {
      type: new GraphQLNonNull(GraphQLString),
    },
    years: {
      type: new GraphQLNonNull(GraphQLString),
    },
    months: {
      type: new GraphQLNonNull(GraphQLString),
    },
    accountId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    profile: {
      type: new GraphQLNonNull(ProfileType),
    },
  },
});
