<template>
  <b-container>
    <b-row>
      <b-col class="text-center">
        <h3>ลงทะเบียนกับ Xentric</h3>
        <h5>สวัสดี {{profile.displayName}} ({{eventId}})</h5>
      </b-col>
    </b-row>
    <b-row>
      <!-- <img :src="profile.pictureUrl" alt="LineProfile"> -->
    </b-row>
    <b-row class="align-items-center mt-5">
      <b-col md="5">
        <b-form @submit="onSubmit">
          <b-form-group label="ชื่อ:">
            <b-form-input v-model="firstname"></b-form-input>
          </b-form-group>
          <b-form-group label="นามสกุล:">
            <b-form-input v-model="lastname"></b-form-input>
          </b-form-group>
          <b-form-group label="ชื่อเล่น:">
            <b-form-input v-model="nickname"></b-form-input>
          </b-form-group>
          <b-form-group label="อายุ:">
            <b-form-input v-model="age"></b-form-input>
          </b-form-group>
          <b-form-group label="เบอร์โทร:">
            <b-form-input v-model="phone"></b-form-input>
          </b-form-group>
          <b-form-group label="อีเมลล์:">
            <b-form-input v-model="email" type="email"></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import api from "../../utils/api";

export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      nickname: "",
      age: "",
      phone: "",
      email: "",
      profile: null,
      eventId: ""
    };
  },
  async beforeMount() {
    console.log(`Register: EventId is ${eventId}`);
    await this.$liff.init({ liffId: `${process.env.VUE_APP_LIFF_ID}` });
    if (liff.isInClient()) {
      //In LineApp
    } else {
      if (!liff.isLoggedIn()) {
        liff.login({ redirectUri: window.location.href });
      }
    }
    this.getUserLineProfile();
    this.eventId = this.$route.query.eventid;
    console.log("Profile: "+this.profile);

  },
  methods: {
    async getUserLineProfile() {
      this.profile = await liff.getProfile();
      console.log("Profile: " + this.profile);
    },
    onSubmit() {
      const staff = {
        firstname: this.firstname,
        lastname: this.lastname,
        nickname: this.nickname,
        age: this.age,
        phone: this.phone,
        email: this.email,
        userLineId: this.profile.userId,
        pictureUrl: this.profile.pictureUrl,
        eventId: this.$route.query.eventid
      };
      console.log(`Staff: ${staff}`);
      api
        .post("/createStaff", staff)
        .then(res => {
          console.log("After Created Staff:" + res.data.message);
        })
        .catch(err => {
          console.log(err);
        });
      this.redirectPage()
    },
    redirectPage(){
      const join = `${process.env.VUE_APP_WEB_URL}/staff/join?eventid=${this.eventId}`;
      window.location.assign(join);
    }
  }
};
</script>

<style></style>
