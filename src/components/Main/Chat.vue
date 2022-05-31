<template>
  <v-container>
    <div class="padding-bottom-1"></div>
    <v-row class="no-gutters elevation-4">
      <v-col cols="auto" class="flex-grow-1 flex-shrink-0">
        <v-responsive
          v-if="activeChat"
          class="overflow-y-hidden fill-height"
          height="500"
        >
          <v-card flat class="d-flex flex-column fill-height">
            <v-card-title> Welcome To Chatify </v-card-title>
            <v-card-text
              class="flex-grow-1 overflow-y-auto"
              v-chat-scroll="{ always: false, smooth: true }"
            >
              <template v-for="chat in chats">
                <div
                  v-if="chat.content"
                  v-bind:key="chat.timestamp"
                  :class="{
                    'd-flex flex-row-reverse': chat.uid === dispatch.email,
                  }"
                >
                  <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                      <v-hover>
                        <v-chip
                          :color="chat.uid === dispatch.email ? 'primary' : ''"
                          dark
                          style="height: auto; white-space: normal"
                          class="pa-4 mb-2"
                          v-on="on"
                        >
                          {{ chat.content }}
                          <sub class="ml-2" style="font-size: 0.5rem"
                            >11:03am</sub
                          >
                        </v-chip>
                      </v-hover>
                    </template>
                  </v-menu>
                  <sub
                    class="ml-2"
                    style="
                      font-size: 0.5rem;
                      padding-top: 35px;
                      padding-right: 10px;
                    "
                    >{{ chat.uid }}</sub
                  >
                </div>
                <div
                  v-if="chat.imageAttachment"
                  v-bind:key="chat.timestamp + 1"
                  :class="{
                    'd-flex flex-row-reverse': chat.uid === dispatch.email,
                  }"
                >
                  <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                      <v-hover>
                        <v-chip
                          :color="chat.uid === dispatch.email ? 'primary' : ''"
                          dark
                          style="height: auto; white-space: normal"
                          class="pa-4 mb-2"
                          v-on="on"
                        >
                          <v-img
                            @click="imageShow(chat.imageAttachment)"
                            max-height="100"
                            max-width="150"
                            :src="chat.imageAttachment"
                          ></v-img>
                          <sub class="ml-2" style="font-size: 0.5rem"
                            >11:03am</sub
                          >
                        </v-chip>
                      </v-hover>
                    </template>
                  </v-menu>
                  <sub
                    class="ml-2"
                    style="
                      font-size: 0.5rem;
                      padding-top: 35px;
                      padding-right: 10px;
                    "
                    >{{ chat.uid }}</sub
                  >
                </div>
              </template>
            </v-card-text>

            <v-container
              v-if="pastedImage"
              style="width: 100%; height: 20%; padding: 0.5em"
            >
              <div style="width: 100%; height: 100%; display: flex">
                <v-btn
                  color="error"
                  small
                  text
                  absolute
                  style="z-index: 9999; padding-left: 0"
                  @click="(e) => deletePasted(e)"
                  >X</v-btn
                >
                <v-img
                  max-height="100"
                  max-width="150"
                  :src="pastedImage"
                ></v-img>
              </div>
            </v-container>
            <v-card-text class="flex-shrink-1">
              <v-text-field
                contenteditable="true"
                @paste="(e) => onPaste(e)"
                ref="txtChat"
                v-model="msg"
                label="Enter Message"
                type="text"
                no-details
                outlined
                append-outer-icon="mdi-send"
                @keyup.enter="(e) => onSubmit(e)"
                @click:append-outer="(e) => onSubmit(e)"
                hide-details
              />
            </v-card-text>
          </v-card>
        </v-responsive>
      </v-col>
    </v-row>
    <!-- <v-btn @click="$vuetify.goTo('#about')">About</v-btn>
    <div id='about'> -->
  </v-container>
</template>
<script>
import { insertChatToDb } from "../../services/ChatController";
import { db } from "../../services/firebase";
import { mapGetters } from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Chat",
  data() {
    return {
      chats: [],
      msg: "",
      activeChat: 1,
      pastedImage: null,
      blobImage: null,
    };
  },
  computed: {
    ...mapGetters(["dispatch"]),
    icon() {
      return this.icons[this.iconIndex];
    },
  },
  methods: {
    imageShow(src) {
      window.open(src);
    },
    chatFocus() {
      this.$refs.txtChat.focus();
    },
    deletePasted() {
      this.pastedImage = null;
      this.blobImage = null;
    },
    onPaste(e) {
      if (e.clipboardData && e.clipboardData.items) {
        // Get the items from the clipboard
        var items = e.clipboardData.items;
        // Loop through all items, looking for any kind of image
        for (var i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            // We need to represent the image as a file
            var blob = items[i].getAsFile();

            var URLObj = URL.createObjectURL(blob);
            // // Use a URL or webkitURL (whichever is available to the browser) to create a
            this.pastedImage = URLObj;
            // The URL can then be used as the source of an image
            this.blobImage = blob;
            // Prevent the image (or URL) from being pasted into the contenteditable element
            e.preventDefault();
          }
        }
      }
    },
    onSubmit(event) {
      event.preventDefault();
      if (this.msg.trim() !== "") {
        insertChatToDb(
          { Chatbox: this.msg },
          this.dispatch.email,
          this.pastedImage && this.blobImage
        );
        this.msg = "";
        this.pastedImage = null;
        this.blobImage = null;
      } else if (this.pastedImage !== null) {
        insertChatToDb(
          { Chatbox: null },
          this.dispatch.email,
          this.pastedImage && this.blobImage
        );
        this.pastedImage = null;
        this.blobImage = null;
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.chatFocus();
    });
  },
  async created() {
    db.ref("chats").on("value", (snapshot) => {
      let chats = [];
      snapshot.forEach((snap) => {
        chats.push(snap.val());
      });
      this.chats = chats;
    });
  },
  watch: {
    dispatch(values) {
      if (!values.isAuthenticated) {
        this.$router.push("/Login");
      }
    },
  },
};
</script>
<style scoped>
.padding-bottom-1 {
  padding-bottom: 50px;
}
</style>
