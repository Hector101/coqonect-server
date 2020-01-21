import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';

import skillType from './skill';
import ProfileType from './profile';
import RatingType from './rating';

import UserSkillsResolver from '../../resolvers/client/query/UserSkill';

export default new GraphQLObjectType({
  name: 'user',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    publicId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    blocked: {
      type: new GraphQLNonNull(GraphQLString),
    },
    verified: {
      type: new GraphQLNonNull(GraphQLString),
    },
    profile: {
      type: new GraphQLNonNull(ProfileType),
    },
    rating: {
      type: RatingType,
    },
    skills: {
      type: new GraphQLList(skillType),
      resolve: UserSkillsResolver,
    },
  },
});
