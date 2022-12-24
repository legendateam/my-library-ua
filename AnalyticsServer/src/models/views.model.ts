import { getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

class ViewsSchema extends TimeStamps {
    @prop({
        default: 0, unique: false, required: true, type: () => Number,
    })
    public views!: number;

    @prop({
        required: true, unique: false, default: 0, type: () => Number,
    })
    public unique_views!: number;

    @prop({
        required: true, unique: false, default: 0, type: () => Number,
    })
    public auth_views!: number;
}

export const ViewsModel: ReturnModelType<typeof ViewsSchema> = getModelForClass(
    ViewsSchema,
    {
        schemaOptions: {
            toJSON: { virtuals: true },
            toObject: { virtuals: true },
        },
    },
);
