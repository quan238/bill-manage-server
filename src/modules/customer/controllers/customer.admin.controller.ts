import {
    Body,
    ConflictException,
    Controller,
    Get,
    Post,
    Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomerService } from '../services';
import { CustomerDoc, CustomerEntity } from '../repository';
import { PaginationListDto } from 'src/common/pagination/dtos/pagination.list.dto';
import {
    IResponse,
    IResponsePaging,
} from 'src/common/response/interfaces/response.interface';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { AuthJwtAdminAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator';
import { PaginationQuery } from 'src/common/pagination/decorators/pagination.decorator';
import {
    CUSTOMER_DEFAULT_AVAILABLE_ORDER_BY,
    CUSTOMER_DEFAULT_AVAILABLE_SEARCH,
    CUSTOMER_DEFAULT_ORDER_BY,
    CUSTOMER_DEFAULT_ORDER_DIRECTION,
    CUSTOMER_DEFAULT_PER_PAGE,
} from '../constants/customer.list';
import {
    CustomerCreateDto,
    CustomerRequestDto,
    CustomerUpdateValueDto,
} from '../dtos';
import { GetCustomer } from '../decorators/customer.decorator';
import { RequestParamGuard } from 'src/common/request/decorators/request.decorator';
import {
    CustomerAdminGetGuard,
    CustomerAdminUpdateGuard,
} from '../decorators/customer.admin.decorator';

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
    // @PolicyAbilityProtected({
    //     subject: ENUM_POLICY_SUBJECT.CUSTOMER,
    //     action: [ENUM_POLICY_ACTION.READ],
    // })
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

    @CustomerAdminGetGuard()
    @AuthJwtAdminAccessProtected()
    @RequestParamGuard(CustomerRequestDto)
    @Get('get/:customer')
    async get(@GetCustomer() customer: CustomerEntity): Promise<IResponse> {
        return { data: customer };
    }

    @AuthJwtAdminAccessProtected()
    @Post('/create')
    async create(@Body() body: CustomerCreateDto): Promise<IResponse> {
        const { customerId } = body;

        const exist: boolean = await this.customerService.existByCustomerId(
            customerId
        );

        if (exist) {
            throw new ConflictException({
                statusCode: 5003,
                message: 'customer.error.customerExist',
            });
        }

        const create = await this.customerService.create(body);

        return {
            data: { _id: create._id },
        };
    }

    @CustomerAdminUpdateGuard()
    @AuthJwtAdminAccessProtected()
    @RequestParamGuard(CustomerRequestDto)
    @Put('/update/:customer')
    async update(
        @GetCustomer() customer: CustomerDoc,
        @Body()
        body: CustomerUpdateValueDto
    ): Promise<IResponse> {
        await this.customerService.updateValue(customer, body);

        return {
            data: { _id: customer._id },
        };
    }
}
