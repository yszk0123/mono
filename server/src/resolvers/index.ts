import { Query } from './Query';
import { auth } from './Mutation/auth';
import { paragraph } from './Mutation/paragraph';
import { AuthPayload } from './AuthPayload';

export default {
  Query,
  Mutation: {
    ...auth,
    ...paragraph,
  },
  AuthPayload,
};
