<template>
  <b-container fluid>
    <b-row align-h="center">
      <h2>Test LINE API</h2>
    </b-row>
    <div>
      <h6 style="color:green">DEBUG Ver13 [18:13,5pr2020]</h6>
      <p>Previous: Ver12 สามารถ get ค่าทั้ง 2 อย่างได้(เอาค่าจาก param)แต่ redirect ไป homepage</p>
      <p>Ver 13: ใส่ liffid + push ไปหน้า join</p>
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
    console.log("1.) Created------");
    const decode_url = decodeURIComponent(window.location.href);
    console.log("Path-decode:" + decode_url);
    console.log("C-Eventid-query: " + this.$route.query.eventid);
    const newUrl = decodeURIComponent(window.location.search).replace("?liff.state=","");
    console.log("Path-editPath: "+newUrl);
    const params = new URLSearchParams(newUrl);
    console.log("C-Eventid-param: "+params.get("eventid"));

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
      console.log("Path-After get Profile:" + window.location.href);
  },
  beforeMount() {
    console.log(">>beforeMount");
    const newUrl = decodeURIComponent(window.location.search).replace("?liff.state=","");
    console.log("new Path: "+newUrl);
    const params = new URLSearchParams(newUrl);
    this.eventId = params.get("eventid");
    console.log("EventId from Param: "+this.eventId);
    this.$router.push("/staff/join?eventid=1");
  },
  methods: {
    changePage(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style></style>
