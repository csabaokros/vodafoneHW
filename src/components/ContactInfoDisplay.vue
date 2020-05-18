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
        <b-col class="text-center">{{value}}</b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'ContactInfoDisplay',
  props: {
    label: String,
    value: String
  }
}
</script>
