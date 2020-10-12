import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Pagamento, PagamentoRelations, Aluno, User} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {AlunoRepository} from './aluno.repository';
import {UserRepository} from './user.repository';

export class PagamentoRepository extends DefaultCrudRepository<
  Pagamento,
  typeof Pagamento.prototype.id,
  PagamentoRelations
> {

  public readonly aluno: BelongsToAccessor<Aluno, typeof Pagamento.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof Pagamento.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('AlunoRepository') protected alunoRepositoryGetter: Getter<AlunoRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Pagamento, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.aluno = this.createBelongsToAccessorFor('aluno', alunoRepositoryGetter,);
    this.registerInclusionResolver('aluno', this.aluno.inclusionResolver);
  }
}
