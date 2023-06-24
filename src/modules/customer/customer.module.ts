import { Module } from '@nestjs/common';
import { CustomerRepositoryModule } from './repository/customer.repository.module';
import { CustomerService } from './services';

@Module({
    controllers: [],
    providers: [CustomerService],
    exports: [CustomerService],
    imports: [CustomerRepositoryModule],
})
export class CustomerModule {}
