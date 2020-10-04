import {Entity, hasOne, model, property} from '@loopback/repository';
import {UserCredentials} from './user-credentials.model';

@model({
  settings: {
    postgresql: {
      table: 'users',
      schema: 'biotech_schema',
    },
    strict: true,
 }
})
export class User extends Entity/* extends UserJWT */{

  @property({
    type: 'string',
    id: true,
    generated: true
  })
  id: string;

  @property({
    type: 'string',
  })
  name?: string;


  @property({
    type: 'string',
  })
  username?: string;

  @property({
    type: 'string',
  })
  realm?: string;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
  })
  email: string;

  @property({
    type: 'boolean',
    name:'email_verified'
  })
  emailVerified?: boolean;

  @property({
    type: 'string',
    name:'verification_token'
  })
  verificationToken?: string;

  @property({
    type: 'string',
  })
  role?: string;

  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;


  @property({
    type: 'date',
    name:'created_at'
  })
  createdAt?: string;

  @property({
    type: 'date',
    name:'updated_at'
  })
  updatedAt?: string;


  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;

@model()
export class NewUserRequest extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}


export const enum RolesTypes {
  Atendente = 'atendente',
  Gerente ='gerente',
  Instrutor = 'instrutor',
  Nutricionista ='nutricionista'
}
