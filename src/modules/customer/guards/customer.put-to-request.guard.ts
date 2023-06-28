import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { CustomerService } from '../services';
import { CustomerDoc } from '../repository';

@Injectable()
export class CustomerPutToRequestGuard implements CanActivate {
    constructor(private readonly customerService: CustomerService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { params } = request;
        const { customer } = params;

        const check: CustomerDoc = await this.customerService.findOneById(
            customer
        );
        request.__customer = check;

        return true;
    }
}
