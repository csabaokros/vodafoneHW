<template>
  <b-row class="my-5">
    <b-col cols="12">
      <b-row class="">
        <b-col class="text-center">
          <h2>{{label}}</h2>
        </b-col>
      </b-row>
    </b-col>
    <b-col cols="12" >
      <b-row>
        <b-col md="4" offset-md="4"><b-form-input v-model="infoValue" :type="fieldType" class="text-center" /></b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'ContactInfoEdit',
  props: {
    label: String,
    value: String,
    dataKey: String,
    fieldType: String
  },
  computed: {
    contact () {
      if (this.$route.params.uid) {
        return this.$store.getters.getContactByUID(this.$route.params.uid)
      } else {
        return this.$store.getters.getTempContact
      }
    },
    infoLabel: {
      get () {
        return this.$props.label
      }
    },
    infoValue: {
      get () {
        return this.$props.value
      },
      set (val) {
        const tempContact = this.contact
        const { dataKey } = this.$props
        tempContact[dataKey] = val
        this.$store.commit('updateTempContact', tempContact)
      }
    },
    infoFieldType () {
      return this.$props.fieldType || 'text'
    }
  }
}
</script>
