<template>
  <b-container>
    <b-row>
      <b-col class="text-center">
        <h3>ลงทะเบียนกับ Xentric</h3>
        <h5>สวัสดี {{displayName}}</h5>
      </b-col>
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
      displayName: ""
    };
  },
  beforeMount() {
    liff
      .getProfile()
      .then(profile => {
        this.displayName = profile.displayName;
      })
      .catch(err => {
        console.log("error", err);
      });
  },
  methods: {
    onSubmit() {
      const staff = {
        firstname: this.firstname,
        lastname: this.lastname,
        nickname: this.nickname,
        age: this.age,
        phone: this.phone,
        email: this.email,
        userLineId: "myId",
        pictureUrl: "test",
        eventId: this.$route.query.eventid
      };
      api
        .post("/createStaff", staff)
        .then(res => {
          console.log("After Created" + res.data.message);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style></style>
