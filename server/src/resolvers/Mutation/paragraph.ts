import { getUserId, Context } from '../../utils';

export const paragraph = {
  async createParagraph(parent, { title, text }, ctx: Context, info) {
    const userId = getUserId(ctx);
    return ctx.db.mutation.createParagraph(
      {
        data: {
          title,
          text,
          author: {
            connect: { id: userId },
          },
        },
      },
      info,
    );
  },

  async publish(parent, { id }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const paragraphExists = await ctx.db.exists.Paragraph({
      id,
      author: { id: userId },
    });
    if (!paragraphExists) {
      throw new Error(`Paragraph not found or you're not the author`);
    }

    return ctx.db.mutation.updateParagraph(
      {
        where: { id },
        data: { isPublished: true },
      },
      info,
    );
  },

  async deleteParagraph(parent, { id }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const paragraphExists = await ctx.db.exists.Paragraph({
      id,
      author: { id: userId },
    });
    if (!paragraphExists) {
      throw new Error(`Paragraph not found or you're not the author`);
    }

    return ctx.db.mutation.deleteParagraph({ where: { id } });
  },
};
