const App = require("@live-change/framework")
const app = App.app()
const service = app.createServiceDefinition({
  name: "shoutBox"
})

const Message = service.model({
  name: "Message",
  properties: {
    text: {
      type: String,
      validation: ['nonEmpty']
    },
    timestamp: {
      type: Date,
      validation: ['nonEmpty']
    }
  },
  indexes: {
    byTimestamp: {
      property: ['timestamp']
    }
  }
})

service.view({
  name: "messagesByTimestamp",
  properties: {
    ...app.Range
  },
  async daoPath(parameters, { client, service }, method) {
    console.log("MESSAGES DAO")
    const range = {
      ...parameters,
      limit: (parameters.limit && parameters.limit < 100) ? parameters.limit : 100
    }
    console.log("MESSAGES RANGE", range)
    const result = await Message.sortedIndexRangeGet("byTimestamp", range)
    console.log("MESSAGES", result)
    return Message.sortedIndexRangePath("byTimestamp", range)
  }
})

service.action({
  name: "postMessage",
  properties: {
    text: Message.properties.text    
  },
  async execute({ text }, { client, service }, emit) {
    const id = app.generateUid()
    const timestamp = new Date()
    return await Message.create({ id, text, timestamp })
  }
})

module.exports = service
