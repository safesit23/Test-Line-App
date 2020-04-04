<template>
  <b-container fluid>
    <b-row align-h="center">
      <img src="/img/logo.png" alt="Xentric logo" />
    </b-row>
    <div>
      <h6>DEBUG Ver6 [18:00,TUE31Mar2020]</h6>
      <div v-if="lineTest">
        <p>
          userLineId: {{ userLineId }}
          <br />
          lineContext: {{ line.lineContext }}
          <br />
          lineToken: {{ line.lineToken }}
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
      lineTest: false,
      line: {
        lineContext: null,
        lineToken: null
      }
    };
  },
  created() {
    console.log("created-Line");
    this.$liff
      .init({
        liffId: "1653855652-eXWXyM06"
      })
      .then(() => {
        console.log("isInClient: " + liff.isInClient());
        if (!liff.isLoggedIn()) {
          liff.login({
            redirectUri: "https://xentric.safe.in.th/staff?eventid=1"
          });
        }
        // const medium = "https://medium.com/linedevth/";
        // const queryString = decodeURIComponent(window.location.search).replace(
        //   "?liff.state=",
        //   ""
        // );
        // const params = new URLSearchParams(queryString);
        // const id = params.get("id");
        // if (id != null && id != "") {
        //   window.location.assign(medium + id);
        // } else {
        //   window.location.assign("https://developers.line.biz");
        // }
        liff
          .getProfile()
          .then(profile => {
            this.userLineId = profile.userId;
          })
          .catch(err => {
            console.log("error", err);
            this.errormessage = "cannot get line profile";
          });
        this.line.lineContext = liff.getContext();
        this.line.lineToken = liff.getDecodedIDToken();
      })
      .catch(err => {
        this.errormessage = "cannot connect LIFF";
      });
  },
  beforeMount() {
    console.log("beforeMount");
    this.eventId = this.$route.query.eventid;
    console.log("EventId: " + this.eventId);

    //Choosing Initial Page
    // this.init();
    this.init_Test_Line();
    // this.init_Test_API();
  },
  methods: {
    init() {
      api
        .post("/findAccount", {
          userLineId: this.userId,
          eventId: this.eventid
        })
        .then(res => {
          this.response = res.data;
          if (this.response.hasStaff) {
            this.$router.push({
              path: `/staff/join/${this.response.eventName}`
            });
          } else {
            this.$router.push({
              path: `/staff/register/${this.response.eventName}`
            });
          }
        })
        .catch(err => {
          console.log("API findAccount Error");
        });
    },

    init_Test_Line() {
      this.lineTest = true;
    },

    init_Test_API() {
      console.log("init_Test_API");
      api
        .post("/findAccount", {
          userLineId: "U73dd7aa2c2ce557fd139aa9807a3f512",
          // userLineId: "1as",
          eventId: "2"
        })
        .then(res => {
          console.log("Account: " + res.data.message);
          this.response = res.data.body;
          console.log(
            "Response: [hasStaff:" +
              this.response.hasStaff +
              "], [eventName:" +
              this.response.eventName +
              "]"
          );
          var isTrue = Boolean(this.response.hasStaff);
          console.log("isTrue: " + isTrue);
          if (isTrue) {
            // changePage("/staff/join?eventid="+1)
            this.$router.push("/staff/join?eventid=1");
          } else {
            // changePage("/staff/register?eventid=1"+1)
            this.$router.push("/staff/register?eventid=1");
          }
          // Check profile if have profile
          // if (this.response.hasStaff) {
          //   this.$router.push({ path: `/staff/join/${res.data.body.eventName}` });
          // } else {
          //   this.$router.push({ path: `/staff/register/${res.data.body.eventName}` });
          // }
        })
        .catch(err => {
          this.errormessage = "API findAccount Error";
        });
    },
    changePage(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style></style>
