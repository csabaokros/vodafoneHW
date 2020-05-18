import Vue from 'vue'
import Vuex from 'vuex'

import {
  fetchContacts,
  normalizeContactData,
  sortContactsByLastName,
  getLettersForFilter,
  filterByTerm,
  filterByLetter,
  getItemByUID
} from '@/functions/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contacts: [],
    letters: [],
    searchTerm: '',
    filterLetter: '',
    tempContact: {
      first: '',
      last: '',
      email: '',
      mobile: ''
    }
  },
  mutations: {
    /**
     * Fills list of contacts with data from JSON file
     * @param { Object } state A reference to the current state
     * @param { Object[] } contacts
     */

    fillContactList (state, contacts) {
      state.contacts = contacts
    },

    /**
     * Updates list of letters for the name filter
     * @param { Object } state A reference to the current state
     * @param { String[] } letters A list of letters to display in the filter list
     */

    updateFilterLetters (state, letters) {
      state.letters = letters
    },

    /**
     * Updates search used to filter contact list
     * @param { Object } state A reference to the current state
     * @param { String } term A string to filter contacts by
     */

    updateSearchTerm (state, term) {
      state.searchTerm = term
    },

    /**
     * Updates the current letter that is used to filter contacts
     * @param { Object } state A reference to the current state
     * @param { String } letter A letter used to filter the contact list
     */

    updateFilterLetter (state, letter) {
      state.filterLetter = letter
    },

    /**
     * Updates the temporary contact data with new data
     * @param { Object } state A reference to the current state
     * @param { Object } data An object containing contact data to be finalized later
     */

    updateTempContact (state, data) {
      state.tempContact = data
    },

    /**
     * Adds contact to the contact list
     * @param { Object } state A reference to the current state
     * @param { Object } data The finalized contact information to add to contact list
     */

    saveNewContact (state, data) {
      state.contacts = sortContactsByLastName([data, ...state.contacts])
    }
  },
  actions: {
    // These mehods use the same arguments that are described in the
    // comments for the individual commits above

    // The initializing action that creates the neccessary live and
    // metadata for the application
    async loadContactList ({ commit }) {
      let { results: contacts } = await fetchContacts()
      if (!contacts) return
      contacts = normalizeContactData(contacts)
      contacts = sortContactsByLastName(contacts)
      commit('fillContactList', contacts)
      const letters = getLettersForFilter(contacts)
      commit('updateFilterLetters', letters)
    },
    // Updates the current search term and clears the letter filter
    setSearchTerm ({ commit }, term) {
      commit('updateFilterLetter', '')
      commit('updateSearchTerm', term)
    },
    // Updates the current letter filter and clears the search term
    setFilterLetter ({ commit }, letter) {
      commit('updateSearchTerm', '')
      commit('updateFilterLetter', letter)
    },
    // Removes a contact with matching UID from the contact list
    // and updates te list of letters that can be used to filter
    // contacts
    deleteContact ({ commit, state }, data) {
      state.contacts = state.contacts.filter(({ uid }) => {
        return uid !== data.uid
      })
      const letters = getLettersForFilter(state.contacts)
      commit('updateFilterLetters', letters)
    },
    // Adds a new contact to the list and updates te list of
    // letters that can be used to filter contacts
    addNewContact ({ commit, state }, data) {
      commit('saveNewContact', data)
      const letters = getLettersForFilter(state.contacts)
      commit('updateFilterLetters', letters)
    },
    // Updates a contact with matching UID with new data
    // by deleting the old one, and adding the new one
    saveContact ({ dispatch }, data) {
      dispatch('deleteContact', data)
      dispatch('addNewContact', data)
    }
  },
  getters: {
    // Retrieves the full list of contacts
    getContactList: state => state.contacts,
    // Retrieves the list of letters that can be used to
    // filter contacts
    getFilterLetters: state => state.letters,
    // Retrieves the list of contacts filtered by either
    // a letter, or a search term. Returns te full list
    // if no filter is active
    getFilteredContacts: state => {
      return searchTerm => {
        if (
          !state.filterLetter &&
          !state.searchTerm
        ) return state.contacts
        return searchTerm
          ? filterByTerm(state.contacts, searchTerm)
          : filterByLetter(state.contacts, state.filterLetter)
      }
    },
    // Retreives the current search term from the state
    getSearchTerm: state => state.searchTerm,
    // Retrieves the current filter letter from the state
    getFilterLetter: state => state.filterLetter,
    // Retrieves a contact from the state based on its uid
    getContactByUID: state => {
      return uid => {
        return getItemByUID(state.contacts, uid)
      }
    },
    // Retrieves the tempoary contact data used for editing
    // or adding a contact
    getTempContact: state => state.tempContact
  }
})
