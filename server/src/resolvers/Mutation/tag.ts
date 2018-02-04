import { getUserId, Context } from '../../utils';

export const tag = {
  async createTag(parent, { text }, ctx: Context, info) {
    const userId = getUserId(ctx);
    return ctx.db.mutation.createTag(
      {
        data: {
          text,
          createdBy: {
            connect: { id: userId },
          },
        },
      },
      info,
    );
  },

  async deleteTag(parent, { id }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const tagExists = await ctx.db.exists.Tag({
      id,
      createdBy: { id: userId },
    });
    if (!tagExists) {
      throw new Error(`Tag not found or you're not the author`);
    }

    return ctx.db.mutation.deleteTag({ where: { id } });
  },
};
