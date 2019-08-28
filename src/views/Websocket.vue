<template>
  <div class="websocket">
    <div class="websocket-input">
      <input type="text" v-model="input" @keypress.enter="add">
      <button @click="add">Добавить</button>
    </div>
    <div class="websocket-list">
      <div class="websocket-item" v-for="item in list" :key="item.id">
        {{item.text}} <a href="" @click.prevent="del(item.id)">(удалить)</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { randomStr } from '@/utils'

  const URI = 'ws://echo.websocket.org'

  export default {
    name: 'Websocket',

    data: () => ({
      list: [
        {
          id: randomStr(),
          text: 'Тестовый коммент 1'
        },
        {
          id: randomStr(),
          text: 'Это шедевр'
        },
        {
          id: randomStr(),
          text: 'Это прекрасно'
        },
        {
          id: randomStr(),
          text: 'Лучшее, что я видел'
        },
        {
          id: randomStr(),
          text: 'Два чая этому автору'
        }
      ],
      input: '',
      ws: {
        instance: null,
        queue: {},
        timeout: 5000
      }
    }),

    created () {
      this.ws.instance = new WebSocket(URI)

      this.ws.instance.onopen = () =>
        console.log('WS подключенно')

      this.ws.instance.onclose = () =>
        console.log('WS отключен')

      this.ws.instance.onmessage = (msg) => {
        const idQueue = msg.data

        if (this.ws.queue[idQueue]) {
          this.ws.queue[idQueue]()
          this.deleteFromQueue(idQueue)
        }
      }
    },

    methods: {
      addToQueue (cb) {
        const idQueue = randomStr()

        this.ws.queue[idQueue] = cb

        this.ws.instance.send(idQueue)

        setTimeout(() => {
          if (this.ws.queue[idQueue]) {
            console.log(`id queue ${idQueue} error timeout`)

            this.deleteFromQueue(idQueue)
          }
        }, this.ws.timeout)
      },

      deleteFromQueue (idQueue) {
        let tempQueue = { ...this.ws.queue }

        delete tempQueue[idQueue]

        this.ws.queue = tempQueue
      },

      add () {
        const text = this.input

        this.addToQueue(() => {
          let item = {
            id: randomStr(),
            text
          }
          this.list.push(item)
        })

        this.input = ''
      },

      del (id) {
        this.addToQueue(() => {
          this.list = this.list.filter((item) => item.id !== id)
        })
      }
    }
  }
</script>

<style lang="scss">
  .websocket {

    &-list {
      margin-top: 24px;
    }

    input {
      padding: 0.25em 2em;
      margin-right: 10px;

      line-height: 30px;
      color: #273849;
      border: 1px solid #e3e3e3;
      outline: none;
      border-radius: 2em;
      background-size: 20px;

      transition: border-color 0.2s ease;
      vertical-align: middle !important;
      box-sizing: border-box;
    }

    button {
      padding: 0.75em 2em;

      display: inline-block;

      color: #fff;

      background-color: #4fc08d;
      border-radius: 2em;
      border: 1px solid #4fc08d;

      transition: all 0.15s ease;
      box-sizing: border-box;
      cursor: pointer;;
    }
  }
</style>
