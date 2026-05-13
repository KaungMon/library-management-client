<template>
  <div class="card" style="height: 37.5em">
    <div class="">
      <h1 class="font-italic">Notifications</h1>
      <button @click="clear" class="clear_btn"><i class="pi pi-list" style="color: white"></i> Clear all</button>
    </div>
    <ScrollPanel class="px-3 py-2" style="width: 100%; height: 100%">
      <div class="grid">
        <div class="col-12 p-0" v-for="n in notifications" :key="n.id">
          <div
            class="flex align-items-center m-2 px-4 py-3 bg-white-alpha-40"
            style="border-radius: 10px"
          >
            <img
              v-if="n.data.book_image != null"
              :src="`${config.public.baseUrl}/storage/image/${n.data.book_image}`"
              class="rounded"
              width="64"
              height="100%"
            />
            <img
              v-else
              src="/public/img/images.png"
              class="rounded"
              width="64"
              height="100%"
            />
            <div class="grid">
              <div class="col-12 ml-2 pr-3">
                <div class="flex justify-content-between align-items-center">
                  <h4 class="m-0 p-0" v-html="n.data.message"></h4>
                  <small>{{ n.created_at }}</small>
                </div>
              </div>
              <div class="col-12 ml-2">
                <p class="p-0 m-0">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eligendi, laudantium. Tenetur asperiores minus blanditiis
                  repellat consectetur incidunt earum excepturi cum. Laudantium
                  repudiandae, modi aliquid illo vitae officia? Magnam, a
                  quibusdam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollPanel>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Pusher from "pusher-js";
dayjs.extend(relativeTime);

const config = useRuntimeConfig();
const notifications = ref([]);

async function fetchNotifications() {
  try {
    const response = await axios.get(
      `${config.public.apiBaseUrl}/notification/index`
    );
    let data = response.data.notifications;
    data.forEach((d) => {
      const time = dayjs(d.created_at);
      d.created_at = time.fromNow();
      d.data.message = d.data.message.replace(
        /overdue/,
        `<span class="text-red-500">overdue</span>`
      );
    });
    notifications.value = data;
    console.log(notifications.value);
  } catch (error) {
    console.error("Error fetching data", error);
  }
}

async function clear() {
  try {
    const response = await axios.get(`${config.public.apiBaseUrl}/notification/delete`);
    let message = response.data.message;
    console.log(message);
    notifications.value = [];
  }
  catch (error) {
    console.log("Error fetching data", error);
    
  }
}

onMounted(() => {
  var pusher = new Pusher(config.public.PUSHER_APP_KEY, {
    cluster: config.public.PUSHER_APP_CLUSTER,
  });

  var channel = pusher.subscribe("public-channel");
  channel.bind("OverdueNotification", function (data) {
    console.log(data);
    fetchNotifications();
  });
  fetchNotifications();
});
</script>

<style lang="scss" scoped>
.clear_btn {
  background: none;
  display: flex;
  justify-content: center;
  gap: 0.3em;
  align-items: center;
  border: none;
  color: white;
  padding: 0.5em 1em;
  transition: 0.5s;
}
.clear_btn:hover {
  text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.488);
  transform: scale(1.03);
}
</style>
