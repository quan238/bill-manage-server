import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
    ValidateIf,
} from 'class-validator';
// import { MobileNumberAllowed } from 'src/common/request/validations/request.mobile-number-allowed.validation';

export class CustomerCreateDto {
    @ApiProperty({
        description: 'Name of role',
        example: 'PH05AA010000005',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(50)
    @Type(() => String)
    readonly customerId: string;

    @ApiProperty({
        example: faker.person.fullName(),
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(30)
    @Type(() => String)
    readonly name: string;

    @ApiProperty({
        example: faker.phone.number('+84 #########'),
        required: true,
    })
    @IsString()
    @IsOptional()
    @MinLength(10)
    @MaxLength(14)
    @ValidateIf((e) => e.phoneNumber !== '')
    @Type(() => String)
    readonly phoneNumber: string;

    @ApiProperty({
        example: faker.address.streetAddress(),
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(300)
    readonly address: string;
}
