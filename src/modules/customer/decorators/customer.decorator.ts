import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';
import { CustomerDoc, CustomerEntity } from '../repository';

export const GetCustomer = createParamDecorator(
    (
        returnPlain: boolean,
        ctx: ExecutionContext
    ): CustomerDoc | CustomerEntity => {
        const { __customer } = ctx
            .switchToHttp()
            .getRequest<IRequestApp & { __customer: CustomerDoc }>();
        return returnPlain ? __customer.toObject() : __customer;
    }
);
