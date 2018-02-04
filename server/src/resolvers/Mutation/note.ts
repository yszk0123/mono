import { getUserId, Context } from '../../utils';

export const note = {
  async createNote(parent, { text }, ctx: Context, info) {
    const userId = getUserId(ctx);
    return ctx.db.mutation.createNote(
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

  async deleteNote(parent, { id }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const noteExists = await ctx.db.exists.Note({
      id,
      createdBy: { id: userId },
    });
    if (!noteExists) {
      throw new Error(`Note not found or you're not the author`);
    }

    return ctx.db.mutation.deleteNote({ where: { id } });
  },
};
