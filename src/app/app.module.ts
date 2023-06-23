import { Module } from '@nestjs/common';
import { JobsModule } from 'src/jobs/jobs.module';
import { RouterModule } from 'src/router/router.module';
import { CommonModule } from 'src/common/common.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        CommonModule,

        // Jobs
        JobsModule.forRoot(),

        // Routes
        RouterModule.forRoot(),
    ],
})
export class AppModule {}
