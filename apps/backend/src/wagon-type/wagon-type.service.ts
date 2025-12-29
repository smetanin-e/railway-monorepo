import { Injectable } from '@nestjs/common';

@Injectable()
export class WagonTypeService {
  private types = [
    { id: '1', name: 'Полувагон' },
    { id: '2', name: 'Цистерна' },
    { id: '3', name: 'Платформа' },
  ];

  findAll() {
    return this.types;
  }
}
