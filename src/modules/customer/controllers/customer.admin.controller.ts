import { Body, ConflictException, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomerService } from '../services';
import { CustomerEntity } from '../repository';
import { PaginationListDto } from 'src/common/pagination/dtos/pagination.list.dto';
import {
    IResponse,
    IResponsePaging,
} from 'src/common/response/interfaces/response.interface';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { AuthJwtAdminAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator';
import {
    ENUM_POLICY_ACTION,
    ENUM_POLICY_SUBJECT,
} from 'src/common/policy/constants/policy.enum.constant';
import { PolicyAbilityProtected } from 'src/common/policy/decorators/policy.decorator';
import { PaginationQuery } from 'src/common/pagination/decorators/pagination.decorator';
import {
    CUSTOMER_DEFAULT_AVAILABLE_ORDER_BY,
    CUSTOMER_DEFAULT_AVAILABLE_SEARCH,
    CUSTOMER_DEFAULT_ORDER_BY,
    CUSTOMER_DEFAULT_ORDER_DIRECTION,
    CUSTOMER_DEFAULT_PER_PAGE,
} from '../constants/customer.list';
import { CustomerCreateDto } from '../dtos';

@ApiTags('modules.admin.customer')
@Controller({
    version: '1',
    path: '/customer',
})
export class CustomerAdminController {
    constructor(
        private readonly customerService: CustomerService,
        private readonly paginationService: PaginationService
    ) {}

    @Get('/list')
    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.ROLE,
        action: [ENUM_POLICY_ACTION.READ],
    })
    @AuthJwtAdminAccessProtected()
    async list(
        @PaginationQuery(
            CUSTOMER_DEFAULT_PER_PAGE,
            CUSTOMER_DEFAULT_ORDER_BY,
            CUSTOMER_DEFAULT_ORDER_DIRECTION,
            CUSTOMER_DEFAULT_AVAILABLE_SEARCH,
            CUSTOMER_DEFAULT_AVAILABLE_ORDER_BY
        )
        { _search, _limit, _offset, _order }: PaginationListDto
    ): Promise<IResponsePaging<CustomerEntity>> {
        const find: Record<string, any> = {
            ..._search,
        };
        const customers: CustomerEntity[] = await this.customerService.findAll(
            find,
            {
                paging: {
                    limit: _limit,
                    offset: _offset,
                },
                order: _order,
            }
        );

        const total: number = await this.customerService.getTotal(find);
        const totalPage: number = this.paginationService.totalPage(
            total,
            _limit
        );

        return {
            _pagination: { total, totalPage },
            data: customers,
        };
    }

    @PolicyAbilityProtected({
        subject: ENUM_POLICY_SUBJECT.USER,
        action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.CREATE],
    })
    @AuthJwtAdminAccessProtected()
    @Post('/create')
    async create(@Body() body: CustomerCreateDto): Promise<IResponse> {
        const { customerId } = body;

        const exist: boolean = await this.customerService.existByCustomerId(
            customerId
        );

        if (exist) {
            throw new ConflictException({
                // statusCode: ENUM_ROLE_STATUS_CODE_ERROR.ROLE_EXIST_ERROR,
                message: 'role.error.exist',
            });
        }

        const create = await this.customerService.create(body);

        return {
            data: { _id: create._id },
        };
    }
}
