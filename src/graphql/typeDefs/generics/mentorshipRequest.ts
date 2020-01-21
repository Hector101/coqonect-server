import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';

import skillType from './skill';
import userType from './user';

export default new GraphQLObjectType({
  name: 'mentorshipRequest',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    requestType: {
      type: new GraphQLNonNull(GraphQLString),
    },
    status: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLString,
    },
    skill: {
      type: new GraphQLNonNull(skillType),
    },
    otherSkills: {
      type: new GraphQLList(skillType),
    },
    account: {
      type: new GraphQLNonNull(userType),
    },
    mentors: {
      type: new GraphQLList(userType),
    },
  },
});
