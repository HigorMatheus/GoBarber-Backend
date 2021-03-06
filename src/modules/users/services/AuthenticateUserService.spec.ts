import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashaProvider';
import FakeUsersRepository from '../repositories/fakes/fakeUsersRepository';

import AutenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let autenticateUsers: AutenticateUserService;

describe('AutentcateUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    autenticateUsers = new AutenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should de able to Autentcate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jon Due',
      email: 'jondue@exemple.com',
      password: '1233456',
    });

    const response = await autenticateUsers.execute({
      email: 'jondue@exemple.com',
      password: '1233456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to autenticate with nom exists user', async () => {
    await expect(
      autenticateUsers.execute({
        email: 'jondue@exemple.com',
        password: '1233456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to autenticate with whith wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Jon Due',
      email: 'jondue@exemple.com',
      password: '1233456',
    });

    await expect(
      autenticateUsers.execute({
        email: 'jondue@exemple.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
