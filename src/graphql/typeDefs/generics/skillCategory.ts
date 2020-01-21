import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';

import skillType from './skill';

export default new GraphQLObjectType({
  name: 'skillCategory',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    skills: {
      type: new GraphQLList(skillType),
    },
  },
});
