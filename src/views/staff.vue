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
      version: "13.7.5",
      verDetails: `(edit path) Integrate full flow use staffId instead status + this.sendMessage`,
      verHistory:"13.6.1-[SUCCESS]Integrate Line with API + edit page JOIN can display name"
    }
  },
};
</script>

<style></style>
