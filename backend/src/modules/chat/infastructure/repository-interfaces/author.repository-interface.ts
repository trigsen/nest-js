import {AuthorEntity} from "../entities/author.entity";

export interface AuthorRepositoryInterface {
    addAuthor: (username: string) => Promise<AuthorEntity>
    findAuthorByUsername: (username: string) => Promise<AuthorEntity | null>
}