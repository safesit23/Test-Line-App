<template>
  <b-container fluid>
    <b-row>
      <p>
        userLineId: {{ profile.userId }}
        <br />
        eventId: {{eventId}}
        <br />
      </p>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Staff",
  data() {
    return {
      profile: "",
      eventId: "",
      errormessage: "-"
    };
  },
  async created() {
    console.log("1.) Created------");
    const decode_url = decodeURIComponent(window.location.href);
    console.log("Path-decode:" + decode_url);
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
    // this.getAccount()

  },
  beforeMount() {
    console.log("2.) beforeMount");
    //eventId
    const newUrl = decodeURIComponent(window.location.search).replace(
      "?liff.state=",
      ""
    );
    const params = new URLSearchParams(newUrl);
    this.eventId = params.get("eventid");
    console.log("2.1.) EventId: " + this.eventId);
    this.initApi();

  },
  methods: {
    async getUserLineProfile() {
      this.profile = await liff.getProfile();
      console.log("Profile: "+this.profile);
    },
    // async getAccount(){
    //   //use api
    // },
    initApi() {
      try {
        console.log("initApi");
        if (this.eventId == 555) {
          console.log("InitApi: has userId");
          const newPath = `${process.env.VUE_APP_WEB_URL}/staff/join?eventid=${this.eventId}`;
          console.log(newPath);
          window.location.assign(newPath);
        } else {
          console.log("InitApi: not has userId");
          const newPath = `${process.env.VUE_APP_WEB_URL}/staff/register?eventid=${this.eventId}`;
          console.log(newPath);
          window.location.assign(newPath);
        }
      } catch (error) {
        console.log("initApi error");
      }
    }
  }
};
</script>

<style></style>
