import { Injectable } from "@nestjs/common";
import { DataBaseRepository } from "./DataBase.repository";
import { user, userDocument } from "../model";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UserRepositoryService extends DataBaseRepository<userDocument> {
    constructor(@InjectModel(user.name) private readonly _userModel: Model<userDocument>
    ) {
        super(_userModel);
    }
}