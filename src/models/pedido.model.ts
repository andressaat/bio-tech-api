import {Entity, hasMany, model, property} from '@loopback/repository';
import {ItemPedido} from './item-pedido.model';

@model({
  settings: {idInjection: false, postgresql: {schema: 'biotech_schema', table: 'pedidos'}}
})
export class Pedido extends Entity {
  @property({
    type: 'number',
    required: false,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
    precision: 12,
    scale: 2,
    postgresql: {columnName: 'valor', dataType: 'numeric', dataLength: null, dataPrecision: 12, dataScale: 2, nullable: 'NO'},
  })
  valor: number;

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

  @hasMany(() => ItemPedido)
  itens: ItemPedido[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Pedido>) {
    super(data);
  }
}

export interface PedidoRelations {
  // describe navigational properties here
}

export type PedidoWithRelations = Pedido & PedidoRelations;


export class PedidoDTO extends Entity {
  @property({
    type: 'number',
    required: false,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
    precision: 12,
    scale: 2,
    postgresql: {columnName: 'valor', dataType: 'numeric', dataLength: null, dataPrecision: 12, dataScale: 2, nullable: 'NO'},
  })
  valor: number;

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

  @property.array(ItemPedido, {required: false})
  itens: ItemPedido[];
}
