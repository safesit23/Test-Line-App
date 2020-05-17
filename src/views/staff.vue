<template>
  <b-container fluid>
    <b-row class="my-4">
      <b-img center src="/img/xentric_logo.png" alt="Xentric Logo" height="50px" />
    </b-row>
    <b-row align-h="center">
      <p>Version: {{version}}({{verDetails}})</p>
    </b-row>

    <router-view></router-view>
  </b-container>
</template>

<script>
export default {
  name: "Staff",
  data() {
    return {
      version: "13.8.6",
      verDetails: `Upgrade Theme / test fix`,
      verHistory: ""
    };
  }
};
</script>

<style>
body {
  background-color: #241d49;
  color: white;
}
</style>