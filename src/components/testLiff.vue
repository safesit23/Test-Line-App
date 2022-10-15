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
      <b-col sm="12">
        <h6>Function ส่ง Sticker</h6>
        <b-button variant="success" @click="sendSticker()">SEND</b-button>
      </b-col>
      <b-col sm="12">
        <h6>Function ส่ง Flex Message</h6>
        <b-button variant="success" @click="sendFlex()">SEND</b-button>
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
      if (liff.isInClient()) {
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
      } else {
        console.log('liff.sendMessage only available in LIFF apps')
      }
    },
    sendSticker() {
      if (liff.isInClient()) {
        liff
          .sendMessages([
            {
              type: "sticker",
              packageId: "11537",
              stickerId: "52002762"
            }
          ])
          .then(() => {
            console.log("message sent");
          })
          .catch(err => {
            console.log("error", err);
          });
      } else {
        console.log('liff.sendMessage only available in LIFF apps')
      }
    },
    sendFlex() {
      if (liff.isInClient()) {
        liff
          .sendMessages([
            {
              type: "flex",
              altText: "this is a flex message",
              contents: {
                type: "bubble",
                size: "mega",
                header: {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    {
                      type: "box",
                      layout: "vertical",
                      contents: [
                        {
                          type: "text",
                          text: "Stage",
                          color: "#ffffff66",
                          size: "sm"
                        },
                        {
                          type: "text",
                          text: "Main stage",
                          color: "#ffffff",
                          size: "xl",
                          flex: 4,
                          weight: "bold"
                        }
                      ]
                    }
                  ],
                  paddingAll: "20px",
                  backgroundColor: "#4A67DC",
                  spacing: "md",
                  height: "100px",
                  paddingTop: "22px"
                },
                body: {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    {
                      type: "text",
                      text: "Total: 1.30 hour",
                      color: "#b7b7b7",
                      size: "xs"
                    },
                    {
                      type: "box",
                      layout: "horizontal",
                      contents: [
                        {
                          type: "text",
                          text: "19.00",
                          size: "sm",
                          gravity: "center"
                        },
                        {
                          type: "box",
                          layout: "vertical",
                          contents: [
                            {
                              type: "filler"
                            },
                            {
                              type: "box",
                              layout: "vertical",
                              contents: [
                                {
                                  type: "filler"
                                }
                              ],
                              cornerRadius: "30px",
                              height: "12px",
                              width: "12px",
                              borderColor: "#EF454D",
                              borderWidth: "2px"
                            },
                            {
                              type: "filler"
                            }
                          ],
                          flex: 0
                        },
                        {
                          type: "text",
                          text: "Session 1",
                          gravity: "center",
                          flex: 4,
                          size: "sm"
                        }
                      ],
                      spacing: "lg",
                      cornerRadius: "30px",
                      margin: "xl"
                    },
                    {
                      type: "box",
                      layout: "horizontal",
                      contents: [
                        {
                          type: "box",
                          layout: "baseline",
                          contents: [
                            {
                              type: "filler"
                            }
                          ],
                          flex: 1
                        },
                        {
                          type: "box",
                          layout: "vertical",
                          contents: [
                            {
                              type: "box",
                              layout: "horizontal",
                              contents: [
                                {
                                  type: "filler"
                                },
                                {
                                  type: "box",
                                  layout: "vertical",
                                  contents: [
                                    {
                                      type: "filler"
                                    }
                                  ],
                                  width: "2px",
                                  backgroundColor: "#B7B7B7"
                                },
                                {
                                  type: "filler"
                                }
                              ],
                              flex: 1
                            }
                          ],
                          width: "12px"
                        },
                        {
                          type: "text",
                          text: "30 Mins",
                          gravity: "center",
                          flex: 4,
                          size: "xs",
                          color: "#8c8c8c"
                        }
                      ],
                      spacing: "lg",
                      height: "64px"
                    },
                    {
                      type: "box",
                      layout: "horizontal",
                      contents: [
                        {
                          type: "box",
                          layout: "horizontal",
                          contents: [
                            {
                              type: "text",
                              text: "20:00",
                              gravity: "center",
                              size: "sm"
                            }
                          ],
                          flex: 1
                        },
                        {
                          type: "box",
                          layout: "vertical",
                          contents: [
                            {
                              type: "filler"
                            },
                            {
                              type: "box",
                              layout: "vertical",
                              contents: [
                                {
                                  type: "filler"
                                }
                              ],
                              cornerRadius: "30px",
                              width: "12px",
                              height: "12px",
                              borderWidth: "2px",
                              borderColor: "#6486E3"
                            },
                            {
                              type: "filler"
                            }
                          ],
                          flex: 0
                        },
                        {
                          type: "text",
                          text: "Session 2",
                          gravity: "center",
                          flex: 4,
                          size: "sm"
                        }
                      ],
                      spacing: "lg",
                      cornerRadius: "30px"
                    },
                    {
                      type: "box",
                      layout: "horizontal",
                      contents: [
                        {
                          type: "box",
                          layout: "baseline",
                          contents: [
                            {
                              type: "filler"
                            }
                          ],
                          flex: 1
                        },
                        {
                          type: "box",
                          layout: "vertical",
                          contents: [
                            {
                              type: "box",
                              layout: "horizontal",
                              contents: [
                                {
                                  type: "filler"
                                },
                                {
                                  type: "box",
                                  layout: "vertical",
                                  contents: [
                                    {
                                      type: "filler"
                                    }
                                  ],
                                  width: "2px",
                                  backgroundColor: "#6486E3"
                                },
                                {
                                  type: "filler"
                                }
                              ],
                              flex: 1
                            }
                          ],
                          width: "12px"
                        },
                        {
                          type: "text",
                          text: "30 Mins",
                          gravity: "center",
                          flex: 4,
                          size: "xs",
                          color: "#8c8c8c"
                        }
                      ],
                      spacing: "lg",
                      height: "64px"
                    },
                    {
                      type: "box",
                      layout: "horizontal",
                      contents: [
                        {
                          type: "text",
                          text: "20:30",
                          gravity: "center",
                          size: "sm"
                        },
                        {
                          type: "box",
                          layout: "vertical",
                          contents: [
                            {
                              type: "filler"
                            },
                            {
                              type: "box",
                              layout: "vertical",
                              contents: [
                                {
                                  type: "filler"
                                }
                              ],
                              cornerRadius: "30px",
                              width: "12px",
                              height: "12px",
                              borderColor: "#6486E3",
                              borderWidth: "2px"
                            },
                            {
                              type: "filler"
                            }
                          ],
                          flex: 0
                        },
                        {
                          type: "text",
                          text: "Session 3",
                          gravity: "center",
                          flex: 4,
                          size: "sm"
                        }
                      ],
                      spacing: "lg",
                      cornerRadius: "30px"
                    }
                  ]
                }
              }
            }
          ])
          .then(() => {
            console.log("message sent");
          })
          .catch(err => {
            console.log("error", err);
          });
      } else {
        console.log('liff.sendMessage only available in LIFF apps')
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