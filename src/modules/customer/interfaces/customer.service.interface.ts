import {
    IDatabaseExistOptions,
    IDatabaseFindAllOptions,
    IDatabaseGetTotalOptions,
} from 'src/common/database/interfaces/database.interface';
import { CustomerEntity } from '../repository';

export interface ICustomerService {
    findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<CustomerEntity[]>;
    getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions
    ): Promise<number>;
    existByCustomerId(
        name: string,
        options?: IDatabaseExistOptions
    ): Promise<boolean>;
}
