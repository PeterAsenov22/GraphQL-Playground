import { Inject, Injectable } from '@nestjs/common';
import { Author } from './models/author.model';

@Injectable()
export class AuthorsService {
    constructor(
        @Inject('AUTHORS_REPOSITORY') private authorsRepository: typeof Author) {}

    // private readonly authors: Author[];
    // constructor() {
    //     this.authors = [
    //         {
    //             id: 1,
    //             firstName: 'Petar',
    //             lastName: 'Asenov'
    //         },
    //         {
    //             id: 2,
    //             firstName: 'Ivan',
    //             lastName: 'Asenov'
    //         }
    //     ]
    // }

    findAll(): Promise<Author[]> {
        // return this.authors;
        return this.authorsRepository.findAll<Author>();
    }

    findOneById(id: number): Author {
        return null;
        // return {
        //     id: id,
        //     firstName: 'Petar',
        //     lastName: 'Asenov'
        // }
    }
}