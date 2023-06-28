import { Injectable } from '@nestjs/common';
import { ICustomerService } from '../interfaces';
import { CustomerDoc, CustomerEntity, CustomerRepository } from '../repository';
import {
    IDatabaseCreateOptions,
    IDatabaseExistOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
    IDatabaseSaveOptions,
} from 'src/common/database/interfaces/database.interface';
import { CustomerCreateDto, CustomerUpdateValueDto } from '../dtos';

@Injectable()
export class CustomerService implements ICustomerService {
    constructor(private readonly customerRepository: CustomerRepository) {}

    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<CustomerEntity[]> {
        return this.customerRepository.findAll<CustomerEntity>(find, options);
    }

    async findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<CustomerDoc> {
        return this.customerRepository.findOneById<CustomerDoc>(_id, options);
    }

    async getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number> {
        return this.customerRepository.getTotal(find, options);
    }

    async existById(
        id: string,
        options?: IDatabaseExistOptions
    ): Promise<boolean> {
        return this.customerRepository.exists(
            {
                _id: id,
            },
            { ...options, withDeleted: true }
        );
    }

    async existByCustomerId(
        customerId: string,
        options?: IDatabaseExistOptions
    ): Promise<boolean> {
        return this.customerRepository.exists(
            {
                customerId,
            },
            { ...options, withDeleted: true }
        );
    }

    async updateValue(
        repository: CustomerDoc,
        { name, address, phoneNumber }: CustomerUpdateValueDto,
        options?: IDatabaseSaveOptions
    ): Promise<CustomerDoc> {
        repository.name = name;
        repository.address = address;
        repository.phoneNumber = phoneNumber;

        return this.customerRepository.save(repository, options);
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
