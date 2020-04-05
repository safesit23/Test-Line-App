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
      eventId: "",
      displayName: ""
    };
  },
  beforeMount() {
    this.eventId = this.$route.query.eventid;
    const liffId = `${process.env.VUE_APP_LIFF_ID}`;
    this.$liff
      .init({
        liffId: liffId
      })
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login();
        }
        liff
          .getProfile()
          .then(profile => {
            this.displayName = profile.displayName;
          })
          .catch(err => {
            console.log("error", err);
            this.errormessage = "cannot get line profile";
          });
      })
      .catch(err => {
        this.errormessage = "cannot connect LIFF";
      });
  },
  computed: {
    message() {
      return `ขอบคุณ ${this.displayName} ที่สมัครมาเป็นส่วนหนึ่งของงาน ${this.eventId} โปรดรอการอนุมัติ`;
    }
  }
};
</script>
