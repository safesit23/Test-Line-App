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
import api from "../../utils/api";
export default {
  name: "StaffJoin",
  data() {
    return {
      eventName: "",
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
    } else {  //Out LineApp
      if (!liff.isLoggedIn()) {
        liff.login({ redirectUri: window.location.href });
      }
    }
    this.getUserLineProfile();
    this.eventId = this.$route.query.eventid;
    console.log("ID: " + this.eventId);
    this.getEventName(this.eventId);
  },
  methods: {
    async getUserLineProfile() {
      this.profile = await liff.getProfile();
      console.log("Profile: " + this.profile);
    },
    async getEventName(id) {
      console.log(`getEventName(${id})"`);
      let res = await api.post("/getEvent", {eventId: id})
      console.log(res.data);
      if(res.data.event.EVENT_NAME != null){
        this.eventName = res.data.event.EVENT_NAME
      }
      // this.getEventName = await api.post("/getEvent", {
      //     eventId: id
      //   })
      //   .then(res => {
      //     console.log(res.data.event);
      //     if (res.data.event.EVENT_NAME != null){
      //       this.eventName = res.data.event.EVENT_NAME;
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    }
  },
  computed: {
    message() {
      return `ขอบคุณ ${this.profile.displayName} ที่สมัครมาเป็นส่วนหนึ่งของงาน ${this.eventName} โปรดรอการอนุมัติ`;
    }
  }
};
</script>
