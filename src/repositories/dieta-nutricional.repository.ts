import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DietaNutricional, DietaNutricionalRelations, Aluno, User} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {AlunoRepository} from './aluno.repository';
import {UserRepository} from './user.repository';

export class DietaNutricionalRepository extends DefaultCrudRepository<
  DietaNutricional,
  typeof DietaNutricional.prototype.id,
  DietaNutricionalRelations
> {

  public readonly aluno: BelongsToAccessor<Aluno, typeof DietaNutricional.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof DietaNutricional.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('AlunoRepository') protected alunoRepositoryGetter: Getter<AlunoRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(DietaNutricional, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.aluno = this.createBelongsToAccessorFor('aluno', alunoRepositoryGetter,);
    this.registerInclusionResolver('aluno', this.aluno.inclusionResolver);
  }
}
