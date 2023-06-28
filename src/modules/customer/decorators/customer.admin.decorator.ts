import { CustomerNotFoundGuard } from '../guards/customer.not-found.guard';
import { CustomerPutToRequestGuard } from './../guards/customer.put-to-request.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';

export function CustomerAdminGetGuard(): MethodDecorator {
    return applyDecorators(
        UseGuards(CustomerPutToRequestGuard, CustomerNotFoundGuard)
    );
}

export function CustomerAdminUpdateGuard(): MethodDecorator {
    return applyDecorators(
        UseGuards(CustomerPutToRequestGuard, CustomerNotFoundGuard)
    );
}
