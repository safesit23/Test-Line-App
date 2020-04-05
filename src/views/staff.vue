<template>
  <b-container fluid>
    <b-row align-h="center">
      <h2>Test LINE API</h2>
    </b-row>
    <div>
      <h6 style="color:red">DEBUG Ver10 [17:00,5pr2020]</h6>
      <div v-if="lineTest">
        <p>
          userLineId: {{ userLineId }}
          <br />
        </p>
      </div>
      <div v-else>
        <p>Response(Account): {{ response }}</p>
      </div>
      <p>
        eventId: {{ eventId }}
        <br />
        Error: {{ errormessage }}
      </p>
      <b-button-group v-if="lineTest">
        <b-button @click="changePage('/staff/join?eventid='+eventId)">Join</b-button>
        <b-button @click="changePage('/staff/register?eventid='+eventId)">Register</b-button>
      </b-button-group>
    </div>
    <hr />
    <router-view></router-view>
  </b-container>
</template>

<script>
import api from "../utils/api";

export default {
  name: "Staff",
  data() {
    return {
      userLineId: "",
      eventId: "",
      response: null,
      errormessage: "-",
      lineTest: true
    };
  },
  created() {
    console.log("created-Line");
    this.eventId = this.$route.query.eventid;
    console.log("EventId = " + this.eventId);
    const liffId = `${process.env.VUE_APP_LIFF_ID}`;
    console.log("liffId: " + liffId);
    this.$liff
      .init({
        liffId: liffId
      })
      .then(() => {
        console.log("isInClient: " + liff.isInClient());
        if (!liff.isLoggedIn()) {
          liff.login();
        }
        liff
          .getProfile()
          .then(profile => {
            this.userLineId = profile.userId;
          })
          .catch(err => {
            console.log("error", err);
            this.errormessage = "cannot get line profile";
          });
      })
      .catch(err => {
        this.errormessage = "cannot connect LIFF";
      });
    // console.log("PathBeforeLogin: " + path);
    // const path = `${process.env.VUE_APP_WEB_URL}/staff?eventid=${eventId}`;
    console.log("CurrentPath:" + window.location.href);
  },
  beforeMount() {
    console.log(">>beforeMount");
    const decode_url = decodeURIComponent(window.location.href);
    console.log("DecodePath:" + decode_url);
    const queryString = decode_url.replace("?liff.state=","");
    this.eventId = this.$route.query.eventid;
    console.log("TypeA: " + this.$route.query.eventid);
    const url = new URLSearchParams(queryString);
    console.log("TypeB: " + url.get("eventid"));
  },
  methods: {
    changePage(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style></style>
