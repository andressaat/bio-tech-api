import {belongsTo, Entity, model, property} from '@loopback/repository';
import {GrupoMuscular, GrupoMuscularWithRelations} from './grupo-muscular.model';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'biotech_schema', table: 'exercicios'},
  },
})
export class Exercicio extends Entity {
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

  @belongsTo(() => GrupoMuscular, {name: 'grupo'}, {name: 'grupo_id'})
  grupoId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Exercicio>) {
    super(data);
  }
}

export interface ExercicioRelations {
  // describe navigational properties here
  grupo ?: GrupoMuscularWithRelations;
}

export type ExercicioWithRelations = Exercicio & ExercicioRelations;
