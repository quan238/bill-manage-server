import { Type } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CustomerRequestDto {
    @IsNotEmpty()
    @IsUUID('4')
    @Type(() => String)
    customer: string;
}
