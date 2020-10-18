import {Entity, model, property, hasMany} from '@loopback/repository';
import {Exercicio} from './exercicio.model';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'biotech_schema', table: 'grupos_musculares'},
  },
})
export class GrupoMuscular extends Entity {
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

  @hasMany(() => Exercicio, {keyTo: 'grupoId'})
  exercicios: Exercicio[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<GrupoMuscular>) {
    super(data);
  }
}

export interface GrupoMuscularRelations {
  // describe navigational properties here
}

export type GrupoMuscularWithRelations = GrupoMuscular & GrupoMuscularRelations;
