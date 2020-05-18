'use strict'

/**
 * Generates a random string of required length
 * @param { number } length desired length fo random string
 * @returns { String }
 */

export const randomString = length => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let randomString = ''
  if (!parseInt(length)) return randomString
  if (length < 0) return randomString
  while (randomString.length < Math.floor(length)) {
    const alphabetIndex = Math.floor(Math.random() * (alphabet.length - 1))
    randomString += alphabet[alphabetIndex]
  }
  return randomString
}

/**
 * Fetches the requested JSON file from the server
 * @param { string } path Path to JSON file
 * @returns { object } Parsed contents of the JSON file
 */

const loadJSONData = async (path = '') => {
  return require('@/assets/newContacts.json')
}

/** Configures which JSON file contains the raw contact information */
export const fetchContacts = async () => {
  const contactDatabse = '/newContacts.json'
  return loadJSONData(contactDatabse)
}

/**
 * Convert contact data loaded from the JSON file to structure used by the App
 * @param { Array } contactList Raw data from JSON file's result property
 * @returns { Array } List of contacts with computed data
 */

export const normalizeContactData = (contactList) => {
  return contactList.reduce((list, { name, email, mobile, uid }) => {
    const fullName = `${name.first} ${name.last}`
    list.push({
      fullName,
      email,
      mobile,
      first: name.first,
      last: name.last,
      uid
    })
    return list
  }, [])
}

/**
 * Sorts list of contacts processed by normalizeContactData function
 * @param { Array } contactList Normalized contact list data
 * @returns { Array } Sorted data based on the last name of each contact
 */

export const sortContactsByLastName = (contactList) => {
  return contactList.sort((a, b) => {
    return a.last.localeCompare(b.last)
  })
}

/**
 * Reads each contacts lastname and lists their first letters
 * @param { Array } contactList Normalized contact list data
 * @returns { Array } Unique first letters of lastnames
 */

export const getLettersForFilter = (contactList) => {
  const uniqueLetters = contactList.reduce((list, { last }) => {
    list.add(last[0])
    return list
  }, new Set())
  return [...uniqueLetters]
}

/**
 * Searches a string in visible contact data
 * @param { Array } contactList Normalized contact list data
 * @param { String } term Term to be searched for in data
 * @returns { Array } A list of contacts who's data includes the search term
 */

export const filterByTerm = (contactList, term) => {
  return contactList.filter(({ fullName, email, mobile }) => {
    term = term.toLowerCase()
    return fullName.toLowerCase().search(term) >= 0 ||
      email.toLowerCase().search(term) >= 0 ||
      mobile.search(term) >= 0
  })
}

/**
 * Filters contact data based on the first letter of their lastnames
 * @param { Array } contactList Normalized contact list data
 * @param { Char } letter A character that is used as a search term
 * @returns { Array } A list of contacts who's last name starts with `letter`
 */

export const filterByLetter = (contactList, letter) => {
  return contactList.filter(({ last }) => {
    const lastNameStartsWith = last[0]
    return lastNameStartsWith === letter
  })
}

/**
 * Fetches a contact based on its unique ID
 * @param { Array } contactList Normalized contact list data
 * @param {*} uid A string of 6 characters representing a unique contact ID
 * @returns The contact that has the requested ID
 */

export const getItemByUID = (contactList, uid) => {
  return contactList.find(({ uid: contactUid }) => {
    return uid === contactUid
  })
}

/**
 * Validates a string representing an email address
 * Reference: https://www.w3resource.com/javascript/form/email-validation.php
 * @param { String } email String of email address
 * @returns { Boolean } True if the string is a valid email address
 */

export const isValidEmail = email => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
}
