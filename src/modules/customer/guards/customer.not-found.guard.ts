import {
    Injectable,
    CanActivate,
    ExecutionContext,
    NotFoundException,
} from '@nestjs/common';

@Injectable()
export class CustomerNotFoundGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { __customer } = context.switchToHttp().getRequest();

        if (!__customer) {
            throw new NotFoundException({
                statusCode: 50500,
                message: 'customer.error.notFound',
            });
        }

        return true;
    }
}
