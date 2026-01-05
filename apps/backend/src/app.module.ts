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
import { WagonOwnerModule } from './wagon-owner/wagon-owner.module';
import { StationModule } from './station/station.module';
import { CargoOwnerModule } from './cargo-owner/cargo-owner.module';
import { CargoModule } from './cargo/cargo.module';

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
    WagonOwnerModule,
    StationModule,
    CargoOwnerModule,
    CargoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
