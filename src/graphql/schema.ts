import { GraphQLSchema } from 'graphql';

import query from './typeDefs/query';
import mutation from './typeDefs/mutation';
import subscription from './typeDefs/subscription';

export default new GraphQLSchema({
  query,
  mutation,
  subscription,
});
