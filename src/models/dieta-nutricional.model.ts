import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Aluno, AlunoWithRelations} from './aluno.model';
import {User, UserWithRelations} from './user.model';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'biotech_schema', table: 'dietas_nutricionais'},
  },
})
export class DietaNutricional extends Entity {
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
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'refeicao',
      dataType: 'USER-DEFINED',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  refeicao: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'segunda',
      dataType: 'character varying',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  segunda: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'terca',
      dataType: 'character varying',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  terca: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'quarta',
      dataType: 'character varying',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  quarta: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'quinta',
      dataType: 'character varying',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  quinta: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'sexta',
      dataType: 'character varying',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  sexta: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'sabado',
      dataType: 'character varying',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  sabado: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'domingo',
      dataType: 'character varying',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  domingo: string;

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

  constructor(data?: Partial<DietaNutricional>) {
    super(data);
  }
}

export interface DietaNutricionalRelations {
  // describe navigational properties here
  user?: UserWithRelations;
  aluno?: AlunoWithRelations;
}

export type DietaNutricionalWithRelations = DietaNutricional &
  DietaNutricionalRelations;
