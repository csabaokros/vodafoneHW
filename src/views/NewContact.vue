<template>
  <b-container id="contact-list-main" class="px-md-0">
    <b-row class="logo pt-2 sticky-top search">
      <b-col cols="4" md="2">
        <VodaLogo />
      </b-col>
    </b-row>
    <ContactInfoEdit label="First name" value="" dataKey="first" />
    <ContactInfoEdit label="Last name" value="" dataKey="last" />
    <ContactInfoEdit label="Email" value="" dataKey="email" />
    <ContactInfoEdit label="Mobile" value="" dataKey="mobile" />
    <b-row>
      <b-col class="text-center mb-5">
        <b-button to="/" variant="dark">Cancel</b-button>
      </b-col>
      <b-col class="text-center mb-5">
        <b-button variant="danger" @click.stop.prevent="saveContact()" :disabled="!saveable">Save</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ContactInfoEdit from '@/components/ContactInfoEdit.vue'
import VodaLogo from '@/components/VodaLogo.vue'

import { randomString } from '@/functions/utils'

export default {
  name: 'NewContact',
  components: {
    ContactInfoEdit,
    VodaLogo
  },
  computed: {
    uid () {
      return randomString(6)
    },
    first () {
      return this.$store.getters.getTempContact.first
    },
    last () {
      return this.$store.getters.getTempContact.last
    },
    email () {
      return this.$store.getters.getTempContact.email
    },
    mobile () {
      return this.$store.getters.getTempContact.mobile
    },
    saveable () {
      return this.first && this.last && this.email && this.mobile
    }
  },
  methods: {
    saveContact () {
      const contact = {
        first: this.first,
        last: this.last,
        fullName: `${this.first} ${this.last}`,
        name: {
          first: this.first,
          last: this.last
        },
        uid: this.uid,
        email: this.email,
        mobile: this.mobile
      }
      this.$store.dispatch('addNewContact', contact)
      this.$router.push({ path: `/contact/${this.uid}` })
    }
  },
  mounted () {
    this.$store.commit('updateTempContact', {
      first: '',
      last: '',
      email: '',
      mobile: '',
      uid: this.uid
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
</style>
