import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Author } from './models/author.model';
import { CreateAuthorInput } from './dto/create-author.input';
import { Crypto } from '../utils/crypto.util';
import { UpdateAuthorInput } from './dto/edit-author.input';
import { literal, Op } from 'sequelize';
import { AuthorMeta } from './models/author-meta.model';

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

    async create(createAuthorData: CreateAuthorInput): Promise<Author> {
        if (await Author.findOne({ where: { firstName: createAuthorData.firstName } })) {
            console.log('author with this first name exists');
            throw new BadRequestException();
        }

        if (await Author.findOne({
            where: literal(`"meta"->>'bulstatHash' = '${Crypto.hmac(createAuthorData.meta.bulstat)}'`)
        })) {
            console.log('author with the same company bulstat exists');
            throw new BadRequestException();
        }

        const meta = new AuthorMeta(createAuthorData.meta.companyName, createAuthorData.meta.bulstat);
        createAuthorData.meta = meta;

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