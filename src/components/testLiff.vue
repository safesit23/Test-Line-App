<template>
  <b-container>
    <b-row v-if="profile!=null">
      <b-avatar v-bind:src="profile.pictureUrl"></b-avatar>
    </b-row>
    <b-row v-if="profile!=null">
      <h3>Information (Profile)</h3>
      <p>Name: {{profile.displayName}}</p>
      <p>UserId: {{profile.userId}}</p>
    </b-row>
    <b-row>
      <h3>Function sendMessage</h3>
      <b-col sm="12">
        <h6>Function ส่งข้อความ</h6>
        <b-button variant="primary" @click="sendMessage()">Try to send</b-button>
      </b-col>
      <b-col sm="12">
        <h6>Function ส่งข้อความจากที่พิมพ์</h6>
        <p>You type: {{typeText}}</p>
        <b-form-input v-model="message" placeholder="Enter message"></b-form-input>
        <b-button variant="success" @click="sendMessage(message)">SEND</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "TestLIFF",
  data() {
    return {
      profile: null,
      message: ""
    };
  },
  async beforeMount() {
    await this.$liff.init({ liffId: `${process.env.VUE_APP_LIFF_ID}` });
    if (liff.isInClient()) {
    } else {
      //Browser
      if (!liff.isLoggedIn()) {
        liff.login();
      }
    }
    liff
      .getProfile()
      .then(profile => {
        this.profile = profile;
      })
      .catch(err => {
        console.log("error", err);
      });
  },
  methods: {
    sendMessage(message) {
      console.log("sendMessage Func");
      console.log("Message: " + message);
      if (message != null) {
        liff
          .sendMessages([
            {
              type: "text",
              text: message
            }
          ])
          .then(() => {
            console.log("message sent");
          })
          .catch(err => {
            console.log("error", err);
          });
      } else {
        liff
          .sendMessages([
            {
              type: "text",
              text: "สวัสดีครับผมมมมมมม"
            }
          ])
          .then(() => {
            console.log("message sent");
          })
          .catch(err => {
            console.log("error", err);
          });
      }
    }
  },
  computed: {
    typeText() {
      return this.message;
    }
  }
};
</script>

<style>
</style>