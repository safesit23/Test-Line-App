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
      version: "13.5.2",
      verDetails: `แก้ condition เป็น == และเพิ่ม else ไปที่ google.com`,
      verResult: `13.15.1-ยังพบปัญหาโหลดหน้าเรื่อยๆ`
    }
  },
};
</script>

<style></style>
