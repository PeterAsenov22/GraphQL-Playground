import { Sequelize } from 'sequelize-typescript';
import { Author } from 'src/authors/models/author.model';
import { Post } from 'src/posts/models/post.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'admin123',
        database: 'nest',
      });
      sequelize.addModels([Author, Post]);
      await sequelize.sync({alter: true});
      return sequelize;
    },
  },
];
