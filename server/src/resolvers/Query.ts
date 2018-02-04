import { getUserId, Context } from '../utils';

export const Query = {
  feed(parent, args, ctx: Context, info) {
    return ctx.db.query.paragraphs({ where: { isPublished: true } }, info);
  },

  drafts(parent, args, ctx: Context, info) {
    const id = getUserId(ctx);

    const where = {
      isPublished: false,
      author: {
        id,
      },
    };

    return ctx.db.query.paragraphs({ where }, info);
  },

  paragraph(parent, { id }, ctx: Context, info) {
    return ctx.db.query.paragraph({ where: { id: id } }, info);
  },

  me(parent, args, ctx: Context, info) {
    const id = getUserId(ctx);
    return ctx.db.query.user({ where: { id } }, info);
  },
};
