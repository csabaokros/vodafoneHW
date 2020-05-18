import {
  randomString,
  normalizeContactData,
  sortContactsByLastName,
  getLettersForFilter,
  filterByTerm,
  filterByLetter,
  getItemByUID,
  isValidEmail
} from "@/functions/utils"

// Mock data for contacts
const contactData = require('./mockContacts').results
const normalizedContacts = normalizeContactData(contactData)
const sortedContacts = sortContactsByLastName(normalizedContacts)
const listWithDuplicate = [...sortedContacts, sortedContacts[0]]

describe('Utility functions', () => {
  describe('randomString', () => {
    it('Generates a string', () => {
      expect(typeof randomString(6)).toBe('string')
    })
    it('Generates a string of requested length', () => {
      expect(randomString(6).length).toBe(6)
    })
    it('Argument can be a number formatted as a string', () => {
      expect(randomString('6').length).toBe(6)
    })
    it('Argument can be a float, but the integer part will be used', () => {
      expect(randomString(12.01234).length).toBe(12)
    })
    it('A zero length string is returned when argument is negative', () => {
      expect(randomString(-1).length).toBe(0)
    })
    it('A zero length string is returned when argument is NaN', () => {
      expect(randomString("Not a number").length).toBe(0)
    })
  })
  describe('normalizeContactData', () => {
    it('Parses contact data as an Array', () => {
      expect(Array.isArray(normalizedContacts)).toBe(true)
    }),
    it('Adds the required new fields', () => {
      const contact = normalizedContacts[0]
      expect(contact).toHaveProperty('fullName')
      expect(contact).toHaveProperty('first')
      expect(contact).toHaveProperty('last')
    })
  })
  describe('sortContactsByLastName', () => {
    it('Sorts by last name', () => {
      expect(sortedContacts[0].last.localeCompare(sortedContacts[1].last)).toBeLessThanOrEqual(1)
    })
  })
  describe('getLettersForFilter', () => {
    it('Returns unique first letters of lastnames', () => {
      expect(getLettersForFilter(sortedContacts).length).toBe(3)
    })
    it('Returns unique letters with duplicate item', () => {
      expect(getLettersForFilter(listWithDuplicate).length).toBe(3)
    })
  })
  describe('filterByTerm', () => {
    it('Finds contacts with email `@example.com`', () => {
      expect(filterByTerm(sortedContacts, '@example.com').length).toBe(3)
    })
    it('Finds contact with name `Simmons`', () => {
      expect(filterByTerm(sortedContacts, 'Simmons').length).toBe(1)
    })
    it('Finds both contacts with name `Jensen` after duplication', () => {
      expect(filterByTerm(listWithDuplicate, 'Jensen').length).toBe(2)
    })
    it('Returns empty array for strings not in data', () => {
      const filteredContacts = filterByTerm(sortedContacts, 'not in data')
      expect(Array.isArray(filteredContacts)).toBe(true)
      expect(filteredContacts.length).toBe(0)
    })
  })
  describe('filterByLetter', () => {
    it('Finds contact with first letter of lastname: `S`', () => {
      expect(filterByLetter(sortedContacts, 'S').length).toBe(1)
    })
    it('Finds both contacts with lastname starting with `J` after duplication', () => {
      expect(filterByLetter(listWithDuplicate, 'J').length).toBe(2)
    })
  })
  describe('getItemByUID', () => {
    it('Finds contact with uid: `PX175m`', () => {
      expect(getItemByUID(sortedContacts, 'PX175m').fullName).toBe('Wyatt Jensen')
    })
    it('Comes up empty for non-existing ID', () => {
      expect(getItemByUID(listWithDuplicate, 'PX175')).toBe(undefined)
    })
  })
  describe('isValidEmail', () => {
    it('Returns true for valid email', () => {
      expect(isValidEmail('a@a.com')).toBe(true)
    })
    it('Returns false for invalid email', () => {
      expect(isValidEmail('aa.com')).toBe(false)
    })
  })
})
