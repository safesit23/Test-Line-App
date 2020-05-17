<template>
  <b-container>
    <b-row>
      <b-col class="text-center">
        <h3>ลงทะเบียนกับ Xentric</h3>
        <div v-if="profile!=null">
          <h5>สวัสดี {{profile.displayName}}</h5>
        </div>
        <div v-if="eventId!=null">
          <h5>EventId = {{eventId}}</h5>
        </div>
      </b-col>
    </b-row>
    <b-row class="d-flex align-items-center mt-2" v-if="profile!=null">
      <b-avatar :src="profile.pictureUrl" size="4rem"></b-avatar>
    </b-row>
    <b-row class="align-items-center mt-2">
      <b-col md="5">
          <b-form-group label="ชื่อ:">
            <b-form-input v-model="firstname"></b-form-input>
          </b-form-group>
          <b-form-group label="นามสกุล:">
            <b-form-input v-model="lastname"></b-form-input>
          </b-form-group>
          <b-form-group label="ชื่อเล่น:">
            <b-form-input v-model="nickname"></b-form-input>
          </b-form-group>
          <b-form-group label="ปีเกิด:">
            <b-form-input v-model="yearOfBirth"></b-form-input>
          </b-form-group>
          <b-form-group label="เบอร์โทร:">
            <b-form-input v-model="phone"></b-form-input>
          </b-form-group>
          <b-form-group label="อีเมลล์:">
            <b-form-input v-model="email" type="email"></b-form-input>
          </b-form-group>
          <b-button class="my-5" block type="submit" variant="primary" @click="onSubmit()">Submit</b-button>
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
      yearOfBirth: "",
      phone: "",
      email: "",
      profile: null,
      eventId: ""
    };
  },
  async beforeMount() {
    this.eventId = this.$route.query.eventid;
    await this.$liff.init({ liffId: `${process.env.VUE_APP_LIFF_ID}` });
    if (liff.isInClient()) {
      //In LineApp
    } else {
      if (!liff.isLoggedIn()) {
        liff.login({ redirectUri: window.location.href });
      }
    }
    console.log("EventId: " + this.eventId);
    this.getUserLineProfile();
    console.log("Profile: " + this.profile);
  },
  methods: {
    async getUserLineProfile() {
      this.profile = await liff.getProfile();
      console.log("Profile: " + this.profile);
    },
    onSubmit() {
      console.log("OnSubmit");
      const staff = {
        firstname: this.firstname,
        lastname: this.lastname,
        nickname: this.nickname,
        yearOfBirth: this.yearOfBirth,
        phone: this.phone,
        email: this.email,
        userLineId: this.profile.userId,
        pictureUrl: this.profile.pictureUrl,
        eventId: this.eventId
      };
      console.log(
        `Staff: ID-${staff.eventId},UId-${staff.userLineId},YOD-${staff.yearOfBirth}`
      );
      api
        .post("/createStaff", staff)
        .then(res=>{
          console.log("After Created Staff:");
          console.log(res);
        })
        .catch(err => {
          console.log(err);
          console.log("Cannot create Staff:");
        });
      this.redirectPage();
    },
    redirectPage() {
      console.log("Redirect Page");
      const join = `${process.env.VUE_APP_WEB_URL}/staff/join?eventid=${this.eventId}`;
      console.log("JOIN: " + join);
      window.location.assign(join);
    }
  }
};
</script>

<style></style>
