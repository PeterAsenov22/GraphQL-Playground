function feed(root, args, context, info) {
  return context.prisma.links();
}

function link(parent, args, context) {
  return context.prisma.link({id: args.id});
}

function user(parent, args, context) {
  return context.prisma.user({id: args.id});
}

module.exports = {
  feed,
  link,
  user
};