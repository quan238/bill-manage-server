import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { CallbackWithoutResultAndOptionalError, Document } from 'mongoose';
import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';

export const CustomerDatabaseName = 'customers';

@DatabaseEntity({ collection: CustomerDatabaseName })
export class CustomerEntity extends DatabaseMongoUUIDEntityAbstract {
    @Prop({
        required: true,
        index: true,
        trim: true,
        type: String,
        maxlength: 50,
    })
    customerId: string;

    @Prop({
        required: true,
        index: true,
        trim: true,
        type: String,
        maxlength: 50,
    })
    name: string;

    @Prop({
        required: true,
        index: true,
        type: String,
        maxlength: 300,
    })
    address: string;

    @Prop({
        required: false,
        index: true,
        type: String,
        maxlength: 20,
    })
    phoneNumber: string;

    @Prop({
        required: false,
        type: String,
        maxlength: 300,
    })
    notes: string;
}

export const CustomerSchema = SchemaFactory.createForClass(CustomerEntity);

export type CustomerDoc = CustomerEntity & Document;

CustomerSchema.pre(
    'save',
    function (next: CallbackWithoutResultAndOptionalError) {
        next();
    }
);
