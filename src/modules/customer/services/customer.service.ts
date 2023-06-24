import { Injectable } from '@nestjs/common';
import { ICustomerService } from '../interfaces';
import { CustomerEntity, CustomerRepository } from '../repository';
import {
    IDatabaseFindAllOptions,
    IDatabaseGetTotalOptions,
} from 'src/common/database/interfaces/database.interface';

@Injectable()
export class CustomerService implements ICustomerService {
    constructor(private readonly roleRepository: CustomerRepository) {}

    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<CustomerEntity[]> {
        return this.roleRepository.findAll<CustomerEntity>(find, options);
    }

    async getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number> {
        return this.roleRepository.getTotal(find, options);
    }
}
