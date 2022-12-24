import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';

export interface ICommonFields extends TimeStamps{
    _id: Types.ObjectId,
}
