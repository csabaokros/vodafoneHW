<template>
  <b-container id="contact-list-main" class="px-md-0">
    <b-button :to="`/contact/new`" pill variant="danger" size="lg" class="addContact position-fixed m-4">+</b-button>
    <b-row class="logo pt-2 sticky-top search">
      <b-col cols="4" md="2">
        <VodaLogo />
      </b-col>
      <b-col cols="5" offset="5" class="d-none d-md-block">
        <b-form-input placeholder="Search for contact" v-model="searchTerm" />
      </b-col>
    </b-row>
    <b-row align-h="center" class="mt-5">
      <b-col>
        <h1 class="text-center mb-1">Contacts</h1>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <b-col cols="2" md="1"><hr class="m-0 pt-1 bg-danger" /></b-col>
    </b-row>
    <b-row align-h="center" class="pt-5 pb-2 sticky-top filter">
      <FilterButton v-for="letter in letters" v-bind:key="letter" :letter="letter" />
    </b-row>
    <b-row align-h="center" class="mt-5">
      <ContactCard
        v-for="{fullName, email, mobile, uid} in filteredContacts"
        v-bind:key="email"
        :name="fullName"
        :email="email"
        :mobile="mobile"
        :uid="uid" />
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import VodaLogo from '@/components/VodaLogo.vue'
import FilterButton from '@/components/FilterButton.vue'
import ContactCard from '@/components/ContactCard.vue'

export default {
  name: 'Home',
  components: {
    VodaLogo,
    FilterButton,
    ContactCard
  },
  computed: {
    searchTerm: {
      get () {
        return this.$store.getters.getSearchTerm
      },
      set (term) {
        this.$store.dispatch('setSearchTerm', term)
      }
    },
    contacts () {
      return this.$store.getters.getContactList
    },
    letters () {
      return this.$store.getters.getFilterLetters
    },
    filteredContacts () {
      return this.$store.getters.getFilteredContacts(this.searchTerm)
    }
  },
  mounted () {
    this.$store.commit('updateFilterLetter', '')
  }
}
</script>

<style lang="sass">
.sticky-top
  background-color: white

.filter
  z-index: 1

.search
  z-index: 2

.addContact
  bottom: 0
  right: 0
  z-index: 3
</style>
