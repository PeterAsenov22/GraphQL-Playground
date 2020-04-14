const { GraphQLServer } = require('graphql-yoga');

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}];

const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone',
    feed: () => links,
    link: (parent, args) => links.find(l => l.id === args.id)
  },
  Mutation: {
    postLink: (parent, args) => {
      const link = {
        id: `link-${links.length}`,
        description: args.description,
        url: args.url
      };

      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      const link = links.find(l => l.id === args.id);
      if (!link) {
        return undefined;
      }

      if (args.description) {
        link.description = args.description;
      }

      if (args.url) {
        link.url = args.url;
      }

      return link;
    },
    deleteLink: (parent, args) => {
      const link = links.find(l => l.id === args.id);
      if (!link) {
        return undefined;
      }

      links = links.filter(l => l.id !== args.id);
      return link;
    }
  },
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

server.start(() => console.log('Server is running on http://localhost:4000'));