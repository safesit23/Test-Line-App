<template>
    <b-container>
      <h1>Homepage Test Line</h1>
      <h4>{{liffId}}</h4>
    </b-container>
</template>

<script>

export default {
  name: 'Homepage',
  data() {
    return {
      liffId: ""
    }
  },
  beforeMount () {
    this.liffId = `${process.env.VUE_APP_LIFF_ID}`;
    console.log(process.env.VUE_APP_LIFF_ID)
  },

}
</script>