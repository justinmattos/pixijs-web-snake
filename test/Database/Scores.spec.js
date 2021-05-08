const bcrypt = require('bcrypt');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const {
  models: { User, Score },
} = require('../../server/db/index');

describe('Score Model', () => {
  beforeAll(() => {
    const newScores = ['EASY', 'MEDIUM', 'HARD'].map(
      (difficulty) =>
        new Score({
          difficulty,
          value: Math.floor(Math.random() * 100) + 1,
        })
    );
    return Promise.all(newScores.map((score) => score.save()));
  });
  describe('Attributes', () => {
    let score1;
    beforeEach(() => {
      return new Promise((res, rej) => {
        Score.findOne()
          .then((score) => {
            score1 = score;
            res();
          })
          .catch(rej);
      });
    });
    describe('difficulty', () => {
      test('Scores have a difficulty attribute', () => {
        expect(score1.difficulty).toBeTruthy();
      });
      test('The difficulty must not be null', () => {
        score1
          .update({ difficulty: null })
          .then(() => expect(true).toBe(false))
          .catch(() => expect(true).toBe(true));
      });
      test('The difficulty must be "EASY", "MEDIUM", or "HARD', () => {
        score1
          .update({ difficulty: 'SEMI-HARD' })
          .then(() => expect(true).toBe(false))
          .catch(() => expect(true).toBe(true));
      });
    });
    describe('value', () => {
      test('Scores have a value attribute', () => {
        expect(score1.value).toBeTruthy();
      });
      test('The value must not be null', () => {
        score1
          .update({ value: null })
          .then(() => expect(true).toBe(false))
          .catch(() => expect(true).toBe(true));
      });
      test('The value must be an integer', () => {
        score1
          .update({ value: 2.5 })
          .then(() => expect(true).toBe(false))
          .catch(() => expect(true).toBe(true));
      });
    });
    describe('date', () => {
      test('Scores have a date attribute', () => {
        expect(score1.date).toBeTruthy();
      });
      test("The date defaults to today's date", () => {
        const today = new Date();
        let year = today.getFullYear(),
          month = today.getMonth() + 1,
          day = today.getDate();
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        expect(score1.date).toBe(`${year}-${month}-${day}`);
      });
    });
  });
});
