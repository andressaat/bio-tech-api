import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property
} from '@loopback/repository';
import {Aluno, AlunoWithRelations} from './aluno.model';
import {TreinoExercicio} from './treino-exercicio.model';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'biotech_schema', table: 'treinos'},
  },
})
export class Treino extends Entity {
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
    length: 60,
    postgresql: {
      columnName: 'nome',
      dataType: 'character varying',
      dataLength: 60,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  nome: string;

  @property({
    required: true,
    type: 'date',
    postgresql: {
      columnName: 'data_inicio',
      dataType: 'date',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  dataInicio: string;

  @property({
    type: 'date',
    required: true,
    postgresql: {
      columnName: 'data_termino',
      dataType: 'date',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  dataTermino: string;

  @property({
    required: true,
    type: 'array',
    itemType: 'string',
    postgresql: {
      columnName: 'dias_da_semana',
      dataType: 'varchar[]',// Na verdade é INTEGER[], por algum bug só assim funciona
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  diasDaSemana: string[];

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

  @hasMany(() => TreinoExercicio, {keyTo: 'treinoId'})
  exercicios: TreinoExercicio[];

  @belongsTo(() => Aluno, {name: 'aluno'}, {name: 'aluno_id'})
  alunoId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Treino>) {
    super(data);
  }
}

export interface TreinoRelations {
  // describe navigational properties here
  aluno ?: AlunoWithRelations;
}

export type TreinoWithRelations = Treino & TreinoRelations;

export class TreinoDTO extends Entity {
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
    length: 60,
    postgresql: {
      columnName: 'nome',
      dataType: 'character varying',
      dataLength: 60,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  nome: string;

  @property({
    required: true,
    type: 'date',
    postgresql: {
      columnName: 'data_inicio',
      dataType: 'date',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  dataInicio: string;

  @property({
    type: 'date',
    required: true,
    postgresql: {
      columnName: 'data_termino',
      dataType: 'date',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  dataTermino: string;

  @property({
    required: true,
    type: 'array',
    itemType: 'string',
    postgresql: {
      columnName: 'dias_da_semana',
      dataType: 'varchar[]',// Na verdade é INTEGER[], por algum bug só assim funciona
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  diasDaSemana: string[];

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

  @property.array(TreinoExercicio, {required: false})
  exercicios: TreinoExercicio[];
}
