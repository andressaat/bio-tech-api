import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {AvaliacaoFisica, AvaliacaoFisicaRelations, User, Aluno} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';
import {AlunoRepository} from './aluno.repository';

export class AvaliacaoFisicaRepository extends DefaultCrudRepository<
  AvaliacaoFisica,
  typeof AvaliacaoFisica.prototype.id,
  AvaliacaoFisicaRelations
> {

  public readonly user: BelongsToAccessor<User, typeof AvaliacaoFisica.prototype.id>;

  public readonly aluno: BelongsToAccessor<Aluno, typeof AvaliacaoFisica.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('AlunoRepository') protected alunoRepositoryGetter: Getter<AlunoRepository>,
  ) {
    super(AvaliacaoFisica, dataSource);
    this.aluno = this.createBelongsToAccessorFor('aluno', alunoRepositoryGetter,);
    this.registerInclusionResolver('aluno', this.aluno.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
