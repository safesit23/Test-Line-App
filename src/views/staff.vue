<template>
  <b-container fluid>
    <b-row align-h="center">
      <h2>Test Staff Flow</h2>
      <h5 style="color:blue">ver {{version}}</h5>
    </b-row>
    <b-row>
      <p>
        Version Details: {{verDetails}}
        <br />
        Ver History {{verHistory}}
      </p>
    </b-row>
    <hr />
    <router-view></router-view>
  </b-container>
</template>

<script>
export default {
  name: "Staff",
  data() {
    return {
      version: "13.7.4",
      verDetails: `Rollback to .4`,
      verHistory:""
    }
  },
};
</script>

<style></style>
