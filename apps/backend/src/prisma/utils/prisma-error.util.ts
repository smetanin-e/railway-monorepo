import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

type PrismaErrorMessages = {
  unique?: string;
  notFound?: string;
};

export function handlePrismaError(
  error: unknown,
  messages: PrismaErrorMessages,
): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        if (messages.unique) {
          throw new BadRequestException(messages.unique);
        }
        break;

      case 'P2025':
        if (messages.notFound) {
          throw new NotFoundException(messages.notFound);
        }
        break;
    }
  }

  throw error;
}
