import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

// Определяем интерфейс для переменных окружения
interface EnvironmentVariables {
  NODE_ENV: string;
}

export function getGraphQLConfig(
  configService: ConfigService<EnvironmentVariables, false>,
): ApolloDriverConfig {
  return {
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
    playground: configService.getOrThrow<string>('NODE_ENV') === 'development',
  };
}
