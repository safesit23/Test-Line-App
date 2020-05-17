<template>
<div>
  <!-- <h4>ยืนยันการลงทะเบียน</h4>
  <button @click="confirm()">กดยืนยัน</button> -->
</div>
</template>

<script>
import api from "../../utils/api";

export default {
  name: "Staff",
  data() {
    return {
      userId: "",
      staffId: "",
      eventId: "",
      errormessage: "-",
      path: ""
    };
  },
  async beforeMount () {
    //Init Line LIFF
    await this.$liff.init({ liffId: `${process.env.VUE_APP_LIFF_ID}` });
    //In LineApp
    if (liff.isInClient()) {
    } else {
      //Browser
      if (!liff.isLoggedIn()) {
        liff.login({ redirectUri: window.location.href });
      }
    }
    try {
      this.eventId = this.getEventId();
      const profile = await this.getUserLineProfile();
      const userId = profile.userId
      console.log("UserId: "+userId);
      let staffId
      staffId = await this.getStaffId(userId, this.eventId);
      // const staffId = await this.getStaffId("Demo1", this.eventId);
      this.joinEvent(staffId);
    } catch (error) {
      console.log("init Function Error"+error);
    }
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
      const lineProfile = await liff.getProfile();
      return lineProfile
    },
    getStaffId(userLineId, eventId) {
      console.log(`getStaffId(${userLineId}, ${eventId})`);
      return api
        .post("/findAccount", {
          userLineId: userLineId,
          eventId: eventId
        })
        .then(res => {
          console.log(res);
          const staffId = res.data.body.staffId; //get in body
          console.log(`getStaffId: staffId is ${staffId}`);
          console.log(`Response: ${res.data.message}`);
          return staffId;
        })
        .catch(err => {
          console.log("API findAccount Error");
        });
    },
    joinEvent(staffId) {
      console.log(`joinEvent(${staffId})`);
      const join = `${process.env.VUE_APP_WEB_URL}/staff/join?eventid=${this.eventId}`;
      const register = `${process.env.VUE_APP_WEB_URL}/staff/register?eventid=${this.eventId}`;
      try {
        if (staffId != null) {
          console.log("GotoJOIN:" + join);
          this.path = join
          window.location.assign(join);
        } else {
          console.log("GotoREGIS:" + register);
          this.path = register
          window.location.assign(register);
        }
      } catch (error) {
        console.log("joinEvent Function error");
      }
    }
  }
};
</script>