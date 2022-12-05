import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

import {AuthorDocument, AuthorEntity} from "../entities/author.entity";
import {AuthorRepositoryInterface} from "../repository-interfaces/author.repository-interface";


@Injectable()
export class AuthorRepository implements AuthorRepositoryInterface {
    constructor(@InjectModel(AuthorEntity.name) private authorModel: Model<AuthorDocument>) {}

    async addAuthor(username: string) {
        return new this.authorModel({ username }).save()
    }

    async findAuthorByUsername(username: string) {
        return this.authorModel.findOne({ username }).lean().exec()
    }
}