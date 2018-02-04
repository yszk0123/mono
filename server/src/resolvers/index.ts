import { Query } from './Query';
import { auth } from './Mutation/auth';
import { note } from './Mutation/note';
import { AuthPayload } from './AuthPayload';

export default {
  Query,
  Mutation: {
    ...auth,
    ...note,
  },
  AuthPayload,
};
