<template>
  <b-col cols="12" md="4" class="mb-4">
    <b-card class="text-center" header-bg-variant="dark" @click="clicked">
      <template v-slot:header>
        <h6 class="mb-0 text-center text-white">{{name}}</h6>
      </template>
      <b-card-text class="pt-0 mb-1 text-muted">{{email}}</b-card-text>
      <b-card-text class="pb-0 text-muted">{{mobile}}</b-card-text>
    </b-card>
  </b-col>
</template>

<script>
export default {
  name: 'ContactCard',
  props: {
    name: String,
    email: String,
    mobile: String,
    uid: String
  },
  methods: {
    clicked (e) {
      this.$router.push({ path: `/contact/${this.$props.uid}` })
      this.$bvModal.show('bv-modal-example')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.card
  cursor: pointer
</style>
