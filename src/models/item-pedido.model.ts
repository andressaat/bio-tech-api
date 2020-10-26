import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Pedido, PedidoWithRelations} from './pedido.model';
import {Produto, ProdutoWithRelations} from './produto.model';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'biotech_schema', table: 'itens_pedidos'}
  }
})
export class ItemPedido extends Entity {
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
    postgresql: {columnName: 'valor_unitario', dataType: 'numeric', dataLength: null, dataPrecision: 12, dataScale: 2, nullable: 'NO'},
  })
  valorUnitario: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'quantidade', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  quantidade: number;

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

  @belongsTo(() => Produto, {name: 'produto'}, {name: 'produto_id'})
  produtoId: number;

  @belongsTo(() => Pedido, {name: 'pedido'}, {name: 'pedido_id'})
  pedidoId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ItemPedido>) {
    super(data);
  }
}

export interface ItemPedidoRelations {
  // describe navigational properties here
  produto?: ProdutoWithRelations;
  pedido?: PedidoWithRelations;
}

export type ItemPedidoWithRelations = ItemPedido & ItemPedidoRelations;
