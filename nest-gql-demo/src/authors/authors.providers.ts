import { Author } from "./models/author.model";

export const authorsProviders = [
    {
        provide: 'AUTHORS_REPOSITORY',
        useValue: Author,
    },
];