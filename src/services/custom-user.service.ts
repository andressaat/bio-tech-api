import {UserService} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {compare} from 'bcrypt';
import {User} from '../models';
import {UserRepository} from '../repositories';


export type Credentials = {
  email: string;
  password: string;
};


export class CustomUserService implements UserService<User, Credentials>{
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
  ) {}

  async verifyCredentials(credentials: Credentials): Promise<User> {
    const invalidCredentialsError = 'Invalid email or password.';

    const foundUser = await this.userRepository.findOne({
      where: {email: credentials.email},
    });
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const credentialsFound = await this.userRepository.findCredentials(
      foundUser.id,
    );
    if (!credentialsFound) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    const passwordMatched = await compare(
      credentials.password,
      credentialsFound.password,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    console.log('verifyCredentials: ', foundUser);
    return foundUser;
  }

  //function to find user by id
  async findUserById(id: string) {
    const userNotfound = 'invalid User';
    const foundUser = await this.userRepository.findOne({
      where: {id: id},
    });

    if (!foundUser) {
      throw new HttpErrors.Unauthorized(userNotfound);
    }

    console.log('findUserById: ', foundUser);
    return foundUser;
  }

  convertToUserProfile(user: User): UserProfile {
    console.log('convert:', user);
    return {
      [securityId]: user.id.toString(),
      role: user.role,
      name: user.name,
      id: user.id,
      email: user.email,
    };
  }
}
