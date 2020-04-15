const bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  { APP_SECRET, getUserId } = require('../utils');

function postLink(root, args, context) {
  const userId = getUserId(context);
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId }}
  });
}

function updateLink(parent, args, context) {
  return context.prisma.updateLink({
    data: {
      url: args.url,
      description: args.description,
    },
    where: {
      id: args.id
    }
  });
}

function deleteLink(parent, args, context) {
  return context.prisma.deleteLink({
    id: args.id
  });
}

async function signUp(parent, args, context) {
  const hashedPassword = await bcrypt.hash(args.password, 10);
  const {password, ...user} = await context.prisma.createUser({ ...args, password: hashedPassword });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

async function login(parent, args, context) {
  const errMessage = 'Invalid account details!';
  try {
    const {password, ...user} = await context.prisma.user({ email: args.email });
    const valid = await bcrypt.compare(args.password, password);
    if (!valid) {
      throw new Error(errMessage);
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
      token,
      user,
    };
  }
  catch {
    throw new Error(errMessage);
  }
}

module.exports = {
  postLink,
  updateLink,
  deleteLink,
  signUp,
  login
}