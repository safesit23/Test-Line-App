<template>
  <b-container fluid>
    <b-row align-h="center">
      <h2>Test Staff Flow</h2>
      <h5 style="color:blue">ver 13.5</h5>
    </b-row>
    <b-row>
      <p>
        Version Details: {{verDetails}}
        <br />
        Ver Result 13.4: {{verResult}}
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
      verDetails: `เปลี่ยนหน้าโดยใช้ window.location.assign`,
      verResult: `Redirect กลับไปที่ Homepage เพราะ path https://linebot-myevent.firebaseapp.com/staff/index?liff.state=?eventid=3`
    }
  },
};
</script>

<style></style>
