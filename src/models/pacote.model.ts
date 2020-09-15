import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: {
      table: 'pacotes',
      schema: 'biotech_schema',
    },
    strict: true,
  }
})
export class Pacote extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @property({
    type: 'string',
    required: true,
  })
  detalhes: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'date',
    name: 'created_at'
  })
  createdAt?: string;

  @property({
    type: 'date',
    name: 'updated_at'
  })
  updatedAt?: string;


  constructor(data?: Partial<Pacote>) {
    super(data);
  }
}

export interface PacoteRelations {
  // describe navigational properties here
}

export type PacoteWithRelations = Pacote & PacoteRelations;
