import { getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

class IpAddressSchema extends TimeStamps {
    @prop({
        required: true, unique: true, trim: true, type: () => String,
    })
    public ipAddress!: string;
}

export const ipAddressModel: ReturnModelType<typeof IpAddressSchema> = getModelForClass(
    IpAddressSchema,
    {
        schemaOptions: {
            toJSON: { virtuals: true },
            toObject: { virtuals: true },
        },
    },
);
