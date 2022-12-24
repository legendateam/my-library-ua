import { Types } from 'mongoose';

import { filesModel } from '../models/files.model';
import { IFiles, IFilesModel } from '../interfaces';

class FilesRepository {
    public async getOneByDate(date: string): Promise<IFilesModel | null> {
        return filesModel.findOne({ createdAt: { $gte: date } });
    }

    public async createOne(data: IFiles): Promise<IFilesModel> {
        return filesModel.create(data);
    }

    public async updateOne(_id: Types.ObjectId, files: IFiles): Promise<IFilesModel | null> {
        return filesModel.findOneAndUpdate(_id, files);
    }

    public async getAll(): Promise<IFilesModel[]> {
        return filesModel.find();
    }

    public async getAllByDate(date: string): Promise<IFilesModel[]> {
        return filesModel.find({ createdAt: { $gte: date } });
    }
}

export const filesRepository = new FilesRepository();
