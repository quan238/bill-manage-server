import { OmitType } from '@nestjs/swagger';
import { CustomerCreateDto } from './customer.create.dto';

export class CustomerUpdateValueDto extends OmitType(CustomerCreateDto, [
    'customerId',
] as const) {}
