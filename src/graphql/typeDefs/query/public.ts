import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';

import userType from '../generics/user';
import SkillCategoryType from '../generics/skillCategory';

import FetchMentorsResolver from '../../resolvers/public/query/FetchMentors';

import SkillCategoriesResolver from '../../resolvers/public/query/SkillCategories';
import SkillCategoryResolver from '../../resolvers/public/query/SkillCategory';

export default new GraphQLObjectType({
  name: 'PublicQuery',
  description: 'Query Accessible to the public',
  fields: () => ({
    mentors: {
      type: new GraphQLList(userType),
      args: {
        take: { type: GraphQLInt },
        skip: { type: GraphQLInt },
        name: { type: GraphQLString },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
        skillId: { type: GraphQLID },
      },
      description: 'Get mentors by name or verified skills',
      resolve: FetchMentorsResolver,
    },
    skillCategory: {
      type: SkillCategoryType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      description: 'Get a single skill category',
      resolve: SkillCategoryResolver,
    },
    skillCategories: {
      type: new GraphQLList(SkillCategoryType),
      description: 'Get a list of skill categories',
      resolve: SkillCategoriesResolver,
    },
 }),
});
