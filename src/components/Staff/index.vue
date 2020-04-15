<template></template>

<script>
import api from "../../utils/api";

export default {
  name: "Staff",
  data() {
    return {
      profile: null,
      eventId: "",
      errormessage: "-",
      response: null
    };
  },
  async created() {
    //Init Line LIFF
    await this.$liff.init({ liffId: `${process.env.VUE_APP_LIFF_ID}` });
    //In LineApp
    if (liff.isInClient()) {
    } else {  //Browser
      if (!liff.isLoggedIn()) {
        // liff.login({ redirectUri: window.location.href });
      }
    }
    this.getUserLineProfile();
    this.eventId = this.getEventId();
    // const staffStatus = this.getUserAccount(this.profile.userId, this.eventId);
    const staffStatus = this.getUserAccount("U73dd7aa2c2ce557fd139aa9807a3f512", this.eventId);
    this.joinEvent(staffStatus);
  },
  methods: {
    getEventId() {
      const newUrl = decodeURIComponent(window.location.search).replace(
        "?liff.state=",
        ""
      );
      const params = new URLSearchParams(newUrl);
      return params.get("eventid");
    },
    async getUserLineProfile() {
      console.log("getUserLineProfile");
      this.profile = await liff.getProfile();
      console.log("Profile: " + this.profile);
    },
    async getUserAccount(userId, eventId) {
      console.log(`getUserAc(${userId}, ${eventId})`);
      api
        .post("/findAccount", {
          userLineId: userId,
          eventId: eventId
        })
        .then(res => {      //Missing Data Here! Contact Api to check it
          console.log("My response");
          this.response = res.data;
          console.log(res.data);
          let check = Boolean(res.data.hasStaff)
          console.log("Check: "+check);
        })
        .catch(err => {
          console.log("API findAccount Error");
        });

      // try {
      //   let res = await api.post("/findAccount", {userLineId: userId,eventId: eventId})
      //   console.log(res);
      //   let check = Boolean(res.data.hasStaff)
      // } catch (error) {
      //   console.log("getUser Error: "+error);
      // }
      //   console.log("Check: "+check);
      //   return check
    },
    joinEvent(staffStatus) {
      console.log(`joinEvent(${staffStatus})`);
      const join = `${process.env.VUE_APP_WEB_URL}/staff/join?eventid=${this.eventId}`;
      const register = `${process.env.VUE_APP_WEB_URL}/staff/register?eventid=${this.eventId}`;
      try {
        if (staffStatus && staffStatus!=null) {
          console.log("has userId in db");
          console.log("Goto:" + join);
          window.location.assign(join);
        } else {
          console.log("not has userId in db");
          console.log("Goto:" + register);
          window.location.assign(register);
        }
      } catch (error) {
        console.log("redirectPage Function error");
      }
    }
  }
};
</script>