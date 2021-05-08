const bcrypt = require('bcrypt');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const {
  models: { User, Score },
} = require('../../server/db/index');

describe('User Model', () => {
  beforeAll(() => {
    const newUser = new User({
      username: 'silentduck43',
      email: 'test@gmail.com',
      password: 'testpassword',
    });
    return newUser.save();
  });
  describe('Attributes', () => {
    let testUser;
    beforeEach(() => {
      return new Promise((res, rej) => {
        User.findOne({ where: { username: 'silentduck43' } })
          .then((user) => {
            testUser = user;
            res();
          })
          .catch(rej);
      });
    });
    describe('username', () => {
      test('Users have a username attribute', () => {
        expect(testUser.username).toBeTruthy();
      });
      test('The username cannot be null', () => {
        testUser.update({ username: null }).catch((err) => {
          expect(err instanceof ValidationError).toBe(true);
        });
      });
      test('The username cannot be less than 5 characters', () => {
        testUser.update({ username: 'test' }).catch((err) => {
          expect(err instanceof ValidationError).toBe(true);
        });
      });
      test('The username cannot be more than 25 characters', () => {
        testUser
          .update({ username: 'abcdefghijklmnopqrstuvwxyz' })
          .catch((err) => {
            expect(err instanceof ValidationError).toBe(true);
          });
      });
      test('The username must be unique in the database', () => {
        const anotherUser = new User({
          email: 'test2@gmail.com',
          username: 'silentduck43',
          password: 'testpassword',
        });
        anotherUser.save().catch((err) => {
          expect(err instanceof UniqueConstraintError).toBe(true);
        });
      });
    });
    describe('email', () => {
      test('Users have an email attribute', () => {
        expect(testUser.email).toBeTruthy();
      });
      test('The email cannot be null', () => {
        testUser.update({ email: null }).catch((err) => {
          expect(err instanceof ValidationError).toBe(true);
        });
      });
      test('The email must be a valid email', () => {
        testUser.update({ email: 'test' }).catch((err) => {
          expect(err instanceof ValidationError).toBe(true);
        });
      });
      test('The email must be unique in the database', () => {
        const anotherUser = new User({
          email: 'test@gmail.com',
          username: 'silentduck57',
          password: 'testpassword',
        });
        anotherUser
          .save()
          .then(() => expect(true).toBe(false))
          .catch((err) => {
            expect(err instanceof UniqueConstraintError).toBe(true);
          });
      });
    });
    describe('password', () => {
      test('Users have a password attribute', () => {
        expect(testUser.email).toBeTruthy();
      });
      test('The password cannot be null', () => {
        testUser.update({ password: null }).catch((err) => {
          expect(err instanceof ValidationError).toBe(true);
        });
      });
      test('The password cannot be less than 5 characters', () => {
        testUser.update({ password: 'tooshort' }).catch((err) => {
          expect(err instanceof ValidationError).toBe(true);
        });
      });
      test('The password cannot be more than 30 characters', () => {
        testUser
          .update({ password: 'thispasswordiswaytoolongtostore' })
          .catch((err) => {
            expect(err instanceof ValidationError).toBe(true);
          });
      });
      test('The password is hashed before being stored', () => {
        const { password } = testUser;
        expect(password === 'testpassword').toBe(false);
        bcrypt.compare('testpassword', password).then((result) => {
          expect(result).toBe(true);
        });
      });
    });
  });
});
