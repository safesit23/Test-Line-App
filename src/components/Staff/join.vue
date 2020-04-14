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
import api from "../../utils/api"
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
      this.getUserLineProfile();
    } else {
      console.log("Out Line App");
      // if (!liff.isLoggedIn()) {
      //   liff.login({ redirectUri: `${process.env.VUE_APP_APP_WEB_URL}?eventid=555` });
      // }
      this.getUserLineProfile();
      console.log("ID: "+this.$route.query.eventid);
      await this.getEventName(this.$route.query.eventid);
    }
  },
  methods: {
    async getUserLineProfile() {
      this.profile = await liff.getProfile();
      console.log("Profile: "+this.profile);
    },
    async getEventName(id){
      this.getEventName = await api.get("/getEvent",{
        eventId : id
      })
      .then(res =>{
        console.log(res.data.event);
        if(res.data.event.EVENT_NAME  !=null)
        console.log("New");
        this.eventName = res.data.event.EVENT_NAME
      })
      .catch(err =>{
        console.log(err);
      })
    }
  },
  computed: {
    message() {
      return `ขอบคุณ ${this.profile.displayName} ที่สมัครมาเป็นส่วนหนึ่งของงาน ${this.eventName} โปรดรอการอนุมัติ`;
    }
  }
};
</script>
