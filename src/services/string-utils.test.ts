import { isBlank, isNotBlank, isNumeric } from './string-utils';

describe('string-utils', () => {
  describe('isBlank', () => {
    it.each`
      value        | expected
      ${null}      | ${true}
      ${undefined} | ${true}
      ${''}        | ${true}
      ${'    '}    | ${true}
      ${'  a  '}   | ${false}
    `('should return $expected for <$value>', ({ value, expected }) => {
      expect(isBlank(value)).toBe(expected);
    });
  });

  describe('isNotBlank', () => {
    it.each`
      value        | expected
      ${null}      | ${false}
      ${undefined} | ${false}
      ${''}        | ${false}
      ${'    '}    | ${false}
      ${'  a  '}   | ${true}
    `('should return $expected for <$value>', ({ value, expected }) => {
      expect(isNotBlank(value)).toBe(expected);
    });
  });

  describe('isNumeric', () => {
    it.each`
      value        | expected
      ${null}      | ${false}
      ${undefined} | ${false}
      ${''}        | ${false}
      ${'    '}    | ${false}
      ${'  a  '}   | ${false}
      ${'123ABC'}  | ${false}
      ${'123'}     | ${true}
    `('should return $expected for <$value>', ({ value, expected }) => {
      expect(isNumeric(value)).toBe(expected);
    });
  });
});
