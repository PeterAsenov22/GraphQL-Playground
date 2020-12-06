import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Author } from './models/author.model';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/edit-author.input';

@Injectable()
export class AuthorsService {
    constructor(
        @Inject('AUTHORS_REPOSITORY')
        private authorsRepository: typeof Author,
    ) { }

    findAll(): Promise<Author[]> {
        return this.authorsRepository.findAll();
    }

    findOneById(id: number): Promise<Author> {
        return this.authorsRepository.findOne({
            where: {
                id,
            }
        })
    }

    async remove(id: number): Promise<void> {
        const author = await this.findOneById(id);
        await author.destroy();
    }

    create(createAuthorData: CreateAuthorInput): Promise<Author> {
        return this.authorsRepository.create(createAuthorData);
    }

    async update(updateAuthorData: UpdateAuthorInput): Promise<Author> {
        const author = await this.findOneById(updateAuthorData.id);
        if (updateAuthorData.lastName) {
            author.lastName = updateAuthorData.lastName;
            await author.save();
        }

        return author;
    }
}