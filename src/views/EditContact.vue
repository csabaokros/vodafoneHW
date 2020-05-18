<template>
  <b-container id="contact-list-main" class="px-md-0">
    <b-row class="logo pt-2 sticky-top search">
      <b-col cols="4" md="2">
        <VodaLogo />
      </b-col>
    </b-row>
    <ContactInfoEdit label="First name" :value="first" dataKey="first" />
    <ContactInfoEdit label="Last name" :value="last" dataKey="last" />
    <ContactInfoEdit label="Email" :value="email" dataKey="email" fieldType="email" />
    <ContactInfoEdit label="Mobile" :value="mobile" dataKey="mobile" />
    <b-row>
      <b-col class="text-center mb-5">
        <b-button v-if="uid" :to="`/contact/${uid}/`" variant="dark">Cancel</b-button>
        <b-button v-else :to="`/`" variant="dark">Cancel</b-button>
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

import { isValidEmail } from '@/functions/utils'

export default {
  name: 'EditContact',
  components: {
    ContactInfoEdit,
    VodaLogo
  },
  computed: {
    contact () {
      return this.$store.getters.getContactByUID(this.$route.params.uid)
    },
    uid () {
      return this.$route.params.uid
    },
    first () {
      return this.contact && this.contact.first
    },
    last () {
      return this.contact && this.contact.last
    },
    email () {
      return this.contact && this.contact.email
    },
    mobile () {
      return this.contact && this.contact.mobile
    },
    saveable () {
      return this.first && this.last && this.email && this.mobile && isValidEmail(this.email)
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
      this.$store.dispatch('saveContact', contact)
      this.$router.push({ path: `/contact/${this.uid}` })
    }
  }
}
</script>

<style scoped lang="sass">
</style>
