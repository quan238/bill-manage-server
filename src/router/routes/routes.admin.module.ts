import { Module } from '@nestjs/common';
import { ApiKeyModule } from 'src/common/api-key/api-key.module';
import { ApiKeyAdminController } from 'src/common/api-key/controllers/api-key.admin.controller';
import { AuthModule } from 'src/common/auth/auth.module';
import { RoleAdminController } from 'src/modules/role/controllers/role.admin.controller';
import { RoleModule } from 'src/modules/role/role.module';
import { SettingAdminController } from 'src/common/setting/controllers/setting.admin.controller';
import { UserAdminController } from 'src/modules/user/controllers/user.admin.controller';
import { UserModule } from 'src/modules/user/user.module';
import { CustomerAdminController } from 'src/modules/customer/controllers';
import { CustomerModule } from 'src/modules/customer/customer.module';

@Module({
    controllers: [
        SettingAdminController,
        ApiKeyAdminController,
        RoleAdminController,
        UserAdminController,
        CustomerAdminController,
    ],
    providers: [],
    exports: [],
    imports: [ApiKeyModule, RoleModule, UserModule, AuthModule, CustomerModule],
})
export class RoutesAdminModule {}
