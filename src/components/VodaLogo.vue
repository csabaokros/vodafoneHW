<template>
  <b-link to="/">
    <b-img
      :src="require('@/assets/logo.png')"
      :srcset="
        require('@/assets/logo.png') + ' 1x, ' +
        require('@/assets/logo_cropped.png') + ' 2x'"
      left fluid block
      alt="Vodafone's logo"
      @click="click"
    />
  </b-link>
</template>

<script>
export default {
  name: 'VodaLogo',
  methods: {
    click () {
      this.$store.commit('updateFilterLetter', '')
    }
  }
}
</script>
