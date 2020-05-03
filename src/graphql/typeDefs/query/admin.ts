import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

// Types
import UserSkillType from '../../typeDefs/generics/userSkill';

// Resolvers
import UserSkillsResolver from '../../resolvers/admin/query/UserSkills';

export default new GraphQLObjectType({
  name: 'AdminQuery',
  description: 'Query Accessible to admins',
  fields: () => ({
    isAdmin: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Get admin authentication status',
      resolve: () => true,
    },
    userSkills: {
      type: new GraphQLList(UserSkillType),
      args: {
        status: {
          type: GraphQLString,
        },
        email: {
          type: GraphQLString,
        },
        name: {
          type: GraphQLString,
        },
        skillName: {
          type: GraphQLString,
        },
        take: {
          type: new GraphQLNonNull(GraphQLInt),
        },
        skip: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      description: 'Fetch all user skills with different status',
      resolve: UserSkillsResolver,
    },
 }),
});
