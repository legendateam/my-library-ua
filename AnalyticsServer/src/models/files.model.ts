import { getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

class DownloadSchema extends TimeStamps {
    @prop({
        required: true,
        unique: false,
        default: 0,
        type: () => Number,
    })
    public readNumbers!: number;

    @prop({
        required: true,
        unique: false,
        default: 0,
        type: () => Number,
    })
    public downloadNumbers!: number;
}

export const filesModel: ReturnModelType<typeof DownloadSchema> = getModelForClass(DownloadSchema, {
    schemaOptions: {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
});
