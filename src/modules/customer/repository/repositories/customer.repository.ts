import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoUUIDRepositoryAbstract } from 'src/common/database/abstracts/mongo/repositories/database.mongo.uuid.repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import { CustomerDoc, CustomerEntity } from '../entities/customer.entity';

@Injectable()
export class CustomerRepository extends DatabaseMongoUUIDRepositoryAbstract<
    CustomerEntity,
    CustomerDoc
> {
    constructor(
        @DatabaseModel(CustomerEntity.name)
        private readonly customerModel: Model<CustomerEntity>
    ) {
        super(customerModel);
    }
}
