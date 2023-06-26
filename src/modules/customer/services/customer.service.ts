import { Injectable } from '@nestjs/common';
import { ICustomerService } from '../interfaces';
import { CustomerDoc, CustomerEntity, CustomerRepository } from '../repository';
import {
    IDatabaseCreateOptions,
    IDatabaseExistOptions,
    IDatabaseFindAllOptions,
    IDatabaseGetTotalOptions,
} from 'src/common/database/interfaces/database.interface';
import { CustomerCreateDto } from '../dtos';

@Injectable()
export class CustomerService implements ICustomerService {
    constructor(private readonly customerRepository: CustomerRepository) {}

    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<CustomerEntity[]> {
        return this.customerRepository.findAll<CustomerEntity>(find, options);
    }

    async getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number> {
        return this.customerRepository.getTotal(find, options);
    }

    async existByCustomerId(
        customerId: string,
        options?: IDatabaseExistOptions
    ): Promise<boolean> {
        return this.customerRepository.exists(
            {
                id: customerId,
            },
            { ...options, withDeleted: true }
        );
    }

    async create(
        { name, customerId, phoneNumber, address }: CustomerCreateDto,
        options?: IDatabaseCreateOptions
    ): Promise<CustomerDoc> {
        const create: CustomerEntity = new CustomerEntity();
        create.name = name;
        create.address = address;
        create.customerId = customerId;
        create.phoneNumber = phoneNumber;

        return this.customerRepository.create<CustomerEntity>(create, options);
    }
}
