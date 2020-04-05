<template>
  <b-container fluid>
    <b-row>
      <p>
        userLineId: {{ userLineId }}
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
      userLineId: "",
      eventId: "",
      errormessage: "-"
    };
  },
  created() {
    console.log("1.) Created------");
    const decode_url = decodeURIComponent(window.location.href);
    console.log("Path-decode:" + decode_url);
    //Line Init
    const liffId = `${process.env.VUE_APP_LIFF_ID}`;
    this.$liff
      .init({
        liffId: liffId
      })
      .then(() => {
        console.log("1.1.) isInClient: " + liff.isInClient());
        if (!liff.isLoggedIn()) {
          liff.login();
        }
        liff
          .getProfile()
          .then(profile => {
            let userLineId = profile.userId;
            console.log("userLineId: " + this.userLineId);
          })
          .catch(err => {
            console.log("error", err);
            this.errormessage = "cannot get line profile";
          });
      })
      .catch(err => {
        this.errormessage = "cannot connect LIFF";
      });
    //   console.log("Path-After get Profile:" + window.location.href);
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

    // const newPath = `${process.env.VUE_APP_WEB_URL}/staff/join?eventid=${this.eventId}`
    // console.log(newPath);
    // window.location.assign(newPath);
  },
  methods: {
    initApi() {
      try {
        console.log("initApi");
        if (this.eventId = 555) {
          console.log("InitApi: has userId");
          const newPath = `${process.env.VUE_APP_WEB_URL}/staff/join?eventid=${this.eventId}`;
          console.log(newPath);
          window.location.assign(newPath)
        } else {
          console.log("InitApi: not has userId");
        }
      } catch (error) {
        console.log("initApi error");
      }
    }
  }
};
</script>

<style></style>
