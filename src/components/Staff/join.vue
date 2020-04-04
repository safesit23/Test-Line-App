<template>
  <b-container>
    <b-row>
      <b-col class="text-center">
        <h3>{{message}}</h3>
        </b-col>
    </b-row>

  </b-container>
</template>

<script>
export default {
  name: "StaffJoin",
  data() {
    return {
      eventname: "Event1",
      eventId: ""
    }
  },
  beforeMount () {
    this.eventId = this.$route.query.eventid;
  },
  computed: {
    message() {
      return `ขอบคุณสำหรับการสมัคร เข้าร่วมเป็นส่วนหนึ่งของงาน ${this.eventId} โปรดรอการอนุมัติ`
    }
  }
};
</script>
