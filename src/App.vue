<template>
  <div id="app" v-if="contactList">
    <router-view/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      contactList () {
        return this.$store.getters.getContactList()
      }
    }
  },
  async created () {
    // Fetch the Contacts data file, and add its contents to the store
    await this.$store.dispatch('loadContactList')
  }
}
</script>
<style lang="scss">

</style>
