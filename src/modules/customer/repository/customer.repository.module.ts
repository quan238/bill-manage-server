import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import { CustomerRepository } from './repositories/customer.repository';
import { CustomerEntity, CustomerSchema } from './entities/customer.entity';

@Module({
    providers: [CustomerRepository],
    exports: [CustomerRepository],
    controllers: [],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: CustomerEntity.name,
                    schema: CustomerSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class CustomerRepositoryModule {}
