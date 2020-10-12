import {UserWithRelations} from '@loopback/authentication-jwt';
import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Aluno, AlunoWithRelations} from './aluno.model';
import {User} from './user.model';

enum FormasPagamento {
  DINHEIRO = 'dinheiro',
  DEBITO = 'debito',
  CREDITO = 'credito'
}

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'biotech_schema', table: 'pagamentos'},
  },
})
export class Pagamento extends Entity {
  @property({
    type: 'string',
    required: false,
    id: 1,
    postgresql: {
      columnName: 'id',
      dataType: 'uuid',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
    precision: 8,
    scale: 2,
    postgresql: {
      columnName: 'valor_pago',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 8,
      dataScale: 2,
      nullable: 'NO',
    },
  })
  valorPago: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'forma_pagamento',
      dataType: 'USER-DEFINED',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
    jsonSchema: {
      enum: Object.values(FormasPagamento),
    },
  })
  formaPagamento: string;

  @property({
    type: 'date',
    required: true,
    postgresql: {
      columnName: 'data_vencimento',
      dataType: 'timestamp with time zone',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  dataVencimento: string;


  // @property({
  //   type: 'string',
  //   required: true,
  //   postgresql: {
  //     columnName: 'user_id',
  //     dataType: 'uuid',
  //     dataLength: null,
  //     dataPrecision: null,
  //     dataScale: null,
  //     nullable: 'NO',
  //   },
  // })
  // userId: string;

    @belongsTo(() => User, {name: 'user'}, {name: 'user_id'})
    userId: string;


  // @property({
  //   type: 'number',
  //   required: true,
  //   scale: 0,
  //   postgresql: {
  //     columnName: 'aluno_id',
  //     dataType: 'integer',
  //     dataLength: null,
  //     dataPrecision: null,
  //     dataScale: 0,
  //     nullable: 'NO',
  //   },
  // })
  // alunoId: number;

  @belongsTo(() => Aluno, {name: 'aluno'}, {name: 'aluno_id'})
  alunoId: number;

  @property({
    type: 'date',
    postgresql: {
      columnName: 'created_at',
      dataType: 'timestamp with time zone',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  createdAt?: string;

  @property({
    type: 'date',
    postgresql: {
      columnName: 'updated_at',
      dataType: 'timestamp with time zone',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  updatedAt?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Pagamento>) {
    super(data);
  }
}

export interface PagamentoRelations {
  // describe navigational properties here
  aluno?:AlunoWithRelations;
  user?: UserWithRelations;
}

export type PagamentoWithRelations = Pagamento & PagamentoRelations;
