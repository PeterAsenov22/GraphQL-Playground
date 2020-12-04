import { Post } from "./models/post.model";

export const postsProviders = [
    {
        provide: 'POSTS_REPOSITORY',
        useValue: Post,
    },
];