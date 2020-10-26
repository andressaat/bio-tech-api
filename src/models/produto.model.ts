import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'biotech_schema', table: 'produtos'}}
})
export class Produto extends Entity {
  @property({
    type: 'number',
    required: false,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'nome', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  nome: string;

  @property({
    type: 'number',
    required: true,
    precision: 12,
    scale: 2,
    postgresql: {columnName: 'valor', dataType: 'numeric', dataLength: null, dataPrecision: 12, dataScale: 2, nullable: 'NO'},
  })
  valor: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'min_estoque', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  minEstoque: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'qtd_estoque', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  qtdEstoque: number;

  @property({
    type: 'date',
    postgresql: {columnName: 'created_at', dataType: 'timestamp with time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  createdAt?: string;

  @property({
    type: 'date',
    postgresql: {columnName: 'updated_at', dataType: 'timestamp with time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  updatedAt?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Produto>) {
    super(data);
  }
}

export interface ProdutoRelations {
  // describe navigational properties here
}

export type ProdutoWithRelations = Produto & ProdutoRelations;
