<template>
  <b-container id="contact-list-main" class="px-md-0">
    <b-row class="logo pt-2 sticky-top search">
      <b-col cols="4" md="2">
        <VodaLogo />
      </b-col>
    </b-row>
    <b-row class="logo pt-5 sticky-top">
      <b-col>
        <h1 class="text-center mb-1">{{name}}</h1>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <b-col cols="2" md="1"><hr class="m-0 pt-1 bg-danger" /></b-col>
    </b-row>
    <ContactInfoDisplay label="Email" :value="email" />
    <ContactInfoDisplay label="Mobile" :value="mobile" />
    <b-row>
      <b-col class="text-center mb-5">
        <b-button to="/" variant="dark" class="mx-1 mx-md-5">Back</b-button>
        <b-button variant="outline-danger" class="mx-1 ml-md-5 mr-md-2" v-b-modal.modal-confirm @click="deleteContact">Delete</b-button>
        <b-button :to="`/contact/${uid}/edit`" variant="danger" class="mx-1 mr-md-5">Edit</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ContactInfoDisplay from '@/components/ContactInfoDisplay.vue'
import VodaLogo from '@/components/VodaLogo.vue'

export default {
  name: 'SingleContact',
  components: {
    ContactInfoDisplay,
    VodaLogo
  },
  computed: {
    contact () {
      return this.$store.getters.getContactByUID(this.$route.params.uid)
    },
    name () {
      return this.contact && this.contact.fullName
    },
    email () {
      return this.contact && this.contact.email
    },
    mobile () {
      return this.contact && this.contact.mobile
    },
    uid () {
      return this.contact && this.contact.uid
    }
  },
  methods: {
    deleteContact () {
      this.$bvModal.msgBoxConfirm('Are you sure you want to delete this contact?', {
        title: 'Delete contact',
        okVariant: 'danger',
        okTitle: 'DELETE',
        cancelVariant: 'dark',
        cancelTitle: 'CANCEL',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then(value => {
          if (value) {
            this.$store.dispatch('deleteContact', this.$store.getters.getContactByUID(this.uid))
            this.$router.push({ path: '/' })
          }
        })
    }
  }
}
</script>

<style scoped lang="sass">
</style>
