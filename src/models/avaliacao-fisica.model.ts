import {UserWithRelations} from '@loopback/authentication-jwt';
import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Aluno, AlunoWithRelations} from './aluno.model';
import {User} from './user.model';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'biotech_schema', table: 'avaliacoes_fisicas'},
  },
})
export class AvaliacaoFisica extends Entity {
  @property({
    type: 'number',
    required: false,
    scale: 0,
    id: 1,
    postgresql: {
      columnName: 'id',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
    precision: 8,
    scale: 2,
    postgresql: {
      columnName: 'meta_peso',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 8,
      dataScale: 2,
      nullable: 'NO',
    },
  })
  metaPeso: number;

  @property({
    type: 'number',
    required: true,
    precision: 8,
    scale: 2,
    postgresql: {
      columnName: 'peso',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 8,
      dataScale: 2,
      nullable: 'NO',
    },
  })
  peso: number;

  @property({
    type: 'number',
    required: true,
    precision: 8,
    scale: 2,
    postgresql: {
      columnName: 'altura',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 8,
      dataScale: 2,
      nullable: 'NO',
    },
  })
  altura: number;

  @property({
    type: 'number',
    required: true,
    precision: 8,
    scale: 2,
    postgresql: {
      columnName: 'imc',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 8,
      dataScale: 2,
      nullable: 'NO',
    },
  })
  imc: number;

  @property({
    type: 'number',
    required: true,
    precision: 8,
    scale: 2,
    postgresql: {
      columnName: 'ombro',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 8,
      dataScale: 2,
      nullable: 'NO',
    },
  })
  ombro: number;

  @property({
    type: 'number',
    required: true,
    precision: 8,
    scale: 2,
    postgresql: {
      columnName: 'peitoral',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 8,
      dataScale: 2,
      nullable: 'NO',
    },
  })
  peitoral: number;

  @property({
    type: 'number',
    required: true,
    precision: 8,
    scale: 2,
    postgresql: {
      columnName: 'cintura',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 8,
      dataScale: 2,
      nullable: 'NO',
    },
  })
  cintura: number;

  @property({
    type: 'number',
    required: true,
    precision: 8,
    scale: 2,
    postgresql: {
      columnName: 'abdomen',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 8,
      dataScale: 2,
      nullable: 'NO',
    },
  })
  abdomen: number;

  @property({
    type: 'number',
    required: true,
    precision: 8,
    scale: 2,
    postgresql: {
      columnName: 'quadril',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 8,
      dataScale: 2,
      nullable: 'NO',
    },
  })
  quadril: number;

  @property({
    type: 'number',
    required: true,
    precision: 8,
    scale: 2,
    postgresql: {
      columnName: 'panturrilha_direita',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 8,
      dataScale: 2,
      nullable: 'NO',
    },
  })
 panturrilhaDireita: number;

  @property({
    type: 'number',
    required: true,
    precision: 8,
    scale: 2,
    postgresql: {
      columnName: 'panturrilha_esquerda',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 8,
      dataScale: 2,
      nullable: 'NO',
    },
  })
 panturrilhaEsquerda: number;

  @property({
    type: 'number',
    required: true,
    precision: 8,
    scale: 2,
    postgresql: {
      columnName: 'pescoco',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 8,
      dataScale: 2,
      nullable: 'NO',
    },
  })
  pescoco: number;

  @property({
    type: 'number',
    required: true,
    precision: 8,
    scale: 2,
    postgresql: {
      columnName: 'punho',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 8,
      dataScale: 2,
      nullable: 'NO',
    },
  })
  punho: number;

  @property({
    type: 'number',
    required: true,
    precision: 8,
    scale: 2,
    postgresql: {
      columnName: 'coxa_direita',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 8,
      dataScale: 2,
      nullable: 'NO',
    },
  })
  coxaDireita: number;

  @property({
    type: 'number',
    required: true,
    precision: 8,
    scale: 2,
    postgresql: {
      columnName: 'coxa_esquerda',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 8,
      dataScale: 2,
      nullable: 'NO',
    },
  })
  coxaEsquerda: number;

  @property({
    type: 'number',
    required: true,
    precision: 8,
    scale: 2,
    postgresql: {
      columnName: 'coxa_proximal_direita',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 8,
      dataScale: 2,
      nullable: 'NO',
    },
  })
  coxaProximalDireita: number;

  @property({
    type: 'number',
    required: true,
    precision: 8,
    scale: 2,
    postgresql: {
      columnName: 'coxa_proximal_esquerda',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 8,
      dataScale: 2,
      nullable: 'NO',
    },
  })
  coxaProximalEsquerda: number;

  @property({
    type: 'number',
    required: true,
    precision: 8,
    scale: 2,
    postgresql: {
      columnName: 'braco_relaxado_direito',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 8,
      dataScale: 2,
      nullable: 'NO',
    },
  })
  bracoRelaxadoDireito: number;

  @property({
    type: 'number',
    required: true,
    precision: 8,
    scale: 2,
    postgresql: {
      columnName: 'braco_relaxado_esquerdo',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 8,
      dataScale: 2,
      nullable: 'NO',
    },
  })
  bracoRelaxadoEsquerdo: number;

  @property({
    type: 'number',
    required: true,
    precision: 8,
    scale: 2,
    postgresql: {
      columnName: 'braco_contraido_direito',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 8,
      dataScale: 2,
      nullable: 'NO',
    },
  })
  bracoContraidoDireito: number;

  @property({
    type: 'number',
    required: true,
    precision: 8,
    scale: 2,
    postgresql: {
      columnName: 'braco_contraido_esquerdo',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 8,
      dataScale: 2,
      nullable: 'NO',
    },
  })
  bracoContraidoEsquerdo: number;

  @property({
    type: 'number',
    required: true,
    precision: 8,
    scale: 2,
    postgresql: {
      columnName: 'antebraco',
      dataType: 'numeric',
      dataLength: null,
      dataPrecision: 8,
      dataScale: 2,
      nullable: 'NO',
    },
  })
  antebraco: number;

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

  @belongsTo(() => User, {name: 'user'}, {name: 'user_id'})
  userId: string;

  @belongsTo(() => Aluno, {name: 'aluno'}, {name: 'aluno_id'})
  alunoId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<AvaliacaoFisica>) {
    super(data);
  }
}

export interface AvaliacaoFisicaRelations {
  // describe navigational properties here
  user?: UserWithRelations;
  aluno?: AlunoWithRelations;
}

export type AvaliacaoFisicaWithRelations = AvaliacaoFisica &
  AvaliacaoFisicaRelations;
