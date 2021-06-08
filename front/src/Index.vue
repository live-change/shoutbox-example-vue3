<template>
  <div class="shoutbox">
    <command-form service="shoutBox" action="postMessage" reset-on-done v-slot="{ data }">
      <!-- <form-bind name="text" v-slot="{ value, error, setValue }">
        <input type="text" placeholder="write message"
              :value="value" @input="e=>setValue(e.target.value)"/>
      </form-bind> -->
      <input type="text" placeholder="Write message..." v-model="data.text" />
      <button type="submit">Send!</button>
    </command-form>
    <observe :what="$views.shoutBox.messagesByTimestamp({ reverse: true })" v-slot="{ value: messages }">
      <div class="messages">
        <p class="message" v-for="message in messages">{{ message.text }}</p>
      </div>
    </observe>  
  </div>
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
  .shoutbox {
    display: flex;
    flex-direction: column;
  }
  form {
    display: flex;    
  }
  input[type=text] {
    flex-grow: 1;
    padding: 5px;
    border: 1px solid gray;
    border-radius: 3px;
  }
  button {
    margin-left: 4px;
    border: none;
    border-radius: 3px;
    background: lightgreen;
  }
  .messages {
    margin-top: 5px;
    flex-grow: 1;
    overflow-y: auto;
  }
  p.message {    
    margin: 2px;
    padding: 5px 10px;
    border-radius: 10px;
    border-bottom: 1px solid #80FFB0;
  }
</style>
