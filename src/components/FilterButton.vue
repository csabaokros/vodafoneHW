<template>
  <span size="lg" class="text-dark mx-2 px-1" :class="{active: isActive}" @click="clicked">{{letter}}</span>
</template>

<script>
export default {
  name: 'FilterButton',
  props: {
    letter: String
  },
  computed: {
    filterLetter: {
      get () {
        return this.$store.getters.getFilterLetter
      }
    },
    isActive () {
      return this.$store.getters.getFilterLetter === this.$props.letter
    }
  },
  methods: {
    clicked () {
      const letter = this.$props.letter === this.filterLetter ? '' : this.$props.letter
      this.$store.dispatch('setFilterLetter', letter)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
span
  font-size: larger
  font-weight: bold
  cursor: pointer
  user-select: none
.active
  text-decoration: underline
</style>
