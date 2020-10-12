import {AuthenticationComponent} from '@loopback/authentication';
import {
  JWTAuthenticationComponent,
  RefreshTokenServiceBindings,
  TokenServiceBindings,
  UserServiceBindings
} from '@loopback/authentication-jwt';
import {AuthorizationComponent, AuthorizationDecision, AuthorizationOptions, AuthorizationTags} from '@loopback/authorization';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MyAuthorizationProvider} from './authorization-provider';
import {DbDataSource} from './datasources';
import {UserRepository} from './repositories';
import {UserCredentialsRepository} from './repositories/user-credentials.repository';
import {MySequence} from './sequence';
import {CustomJWTService, CustomUserService} from './services';
export {ApplicationConfig};

export class BioTechApiApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    // Mount authentication system
    this.component(AuthenticationComponent);
    // Roles config component
    const authorizationOptions: AuthorizationOptions = {
      precedence: AuthorizationDecision.DENY,
      defaultDecision: AuthorizationDecision.DENY,
    };

    const binding = this.component(AuthorizationComponent);
    this.configure(binding.key).to(authorizationOptions);

    this
      .bind('authorizationProviders.my-authorizer-provider')
      .toProvider(MyAuthorizationProvider)
      .tag(AuthorizationTags.AUTHORIZER);
    // provider
    // this.bind(AuthenticationBindings.AUTH_ACTION).toProvider(AuthenticateActionProvider);
    // Mount jwt component
    this.component(JWTAuthenticationComponent);
    // Bind datasource
    this.dataSource(DbDataSource, UserServiceBindings.DATASOURCE_NAME);

    // Bind user service
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.bind(UserServiceBindings.USER_SERVICE).toClass(CustomUserService as any);
    // Bind user and credentials repository
    this.bind(UserServiceBindings.USER_REPOSITORY).toClass(
      UserRepository,
    );
    this.bind(UserServiceBindings.USER_CREDENTIALS_REPOSITORY).toClass(
      UserCredentialsRepository,
    );

    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(CustomJWTService);
    // for jwt access token
    this.bind(TokenServiceBindings.TOKEN_SECRET).to("<yourSecret>");
    // Bind datasource
    this.dataSource(DbDataSource, RefreshTokenServiceBindings.DATASOURCE_NAME);
    // for refresh token
    this.bind(RefreshTokenServiceBindings.REFRESH_SECRET).to("<yourSecret>");
    // for jwt access token expiration
    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to("3600");// 1h 3600
    // for refresh token expiration
    this.bind(RefreshTokenServiceBindings.REFRESH_EXPIRES_IN).to("86400"); // 1d

  }
}
