<template>
  <command-form service="shoutBox" action="postMessage" reset-on-done v-slot="{ data }">
    <!-- <form-bind name="text" v-slot="{ value, error, setValue }">
      <input type="text" placeholder="write message"
             :value="value" @input="e=>setValue(e.target.value)"/>
    </form-bind> -->
    <input type="text" id="uid" placeholder="write message" v-model="data.text" />
    <button type="submit">Send!</button>
  </command-form>
  <observe :what="$views.shoutBox.messagesByTimestamp({ reverse: true })" v-slot="{ value: messages }">
    <p v-for="message in messages">{{ message.text }}</p>
  </observe>  
</template>

<script>
export default {
  reactivePreFetch(route) {
    return [
      this.$fetch.shoutBox.messagesByTimestamp({ reverse: true })
    ]
  }
}
</script>

<style scoped>
  h1, a {
    color: green;
  }
</style>
