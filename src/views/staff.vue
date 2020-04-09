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
        Ver Result {{version}}: {{verResult}}
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
      version: "13.5.5",
      verDetails: `เกิด bug หน้า Register ไม่ขึ้นเพราะตั้งชื่อ method ไม่ตรง`,
      verResult: `ให้ redirect ไปที่ Staff Register (13.15.2-bug ที่ Desktop Browser)`
    }
  },
};
</script>

<style></style>
