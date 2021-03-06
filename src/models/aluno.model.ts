import {belongsTo, Entity, model, property, hasMany} from '@loopback/repository';
import {Pacote, PacoteWithRelations} from './pacote.model';
import {Treino} from './treino.model';
import {AvaliacaoFisica} from './avaliacao-fisica.model';
import {DietaNutricional} from './dieta-nutricional.model';

@model({
  settings: {
    postgresql: {
      table: 'alunos',
      schema: 'biotech_schema',
    },
    strict: true,
  }
})
export class Aluno extends Entity {
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
    type: 'date',
    required: true,
    name: 'data_inicio'
  })
  dataInicio: string;

  @property({
    type: 'string',
    required: true,
  })
  cpf: string;

  @property({
    type: 'string',
    required: true,
  })
  rg: string;

  @property({
    type: 'string',
    required: true,
  })
  endereco: string;

  @property({
    type: 'date',
    required: true,
    name: 'data_nascimento'
  })
  dataNascimento: string;

  @property({
    type: 'string',
    required: true,
  })
  telefone: string;

  @property({
    type: 'string',
  })
  observacaoes?: string;

  @property({
    type: 'string',
  })
  objetivo?: string;
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

  @belongsTo(() => Pacote, {name: 'pacote'}, {name: 'pacote_id'})
  pacoteId: number;

  @hasMany(() => Treino)
  treinos: Treino[];

  @hasMany(() => AvaliacaoFisica)
  avaliacoesFisicas: AvaliacaoFisica[];

  @hasMany(() => DietaNutricional)
  dietaNutricional: DietaNutricional[];

  constructor(data?: Partial<Aluno>) {
    super(data);
  }
}

export interface AlunoRelations {
  // describe navigational properties here
  pacote: PacoteWithRelations
}

export type AlunoWithRelations = Aluno & AlunoRelations;
