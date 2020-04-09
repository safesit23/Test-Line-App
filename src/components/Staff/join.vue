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
      profile: ""
    };
  },
  async beforeMount() {
    this.eventId = this.$route.query.eventid;
    //Line Init
    await this.$liff.init({ liffId: `${process.env.VUE_APP_LIFF_ID}` });
    if (liff.isInClient()) {
      //In LineApp
      this.getUserLineProfile();
    } else {
      if (!liff.isLoggedIn()) {
        liff.login({ redirectUri: `${process.env.VUE_APP_APP_WEB_URL}?eventid=555` });
      }
      this.getUserLineProfile();
    }
  },
  methods: {
    async getUserLineProfile() {
      this.profile = await liff.getProfile();
      console.log("Profile: "+this.profile);
    }
  },
  computed: {
    message() {
      return `ขอบคุณ ${this.profile.displayName} ที่สมัครมาเป็นส่วนหนึ่งของงาน ${this.eventId} โปรดรอการอนุมัติ`;
    }
  }
};
</script>
