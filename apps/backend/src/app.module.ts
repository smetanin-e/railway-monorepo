import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { getGraphQLConfig } from './config/graphql.config';
import { ApolloDriver } from '@nestjs/apollo';
import { WagonModule } from './wagon/wagon.module';
import { WagonTypeModule } from './wagon-type/wagon-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useFactory: getGraphQLConfig,
      inject: [ConfigService],
    }),
    PrismaModule,
    WagonModule,
    WagonTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
