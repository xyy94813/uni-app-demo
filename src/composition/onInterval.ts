import { onMounted, onUnmounted  } from "vue"

const onInterval = (handler: TimerHandler, ms: number) => {
  let intervalKey: number;
  onMounted(() => {
    intervalKey = setInterval(handler, ms)
  })
  onUnmounted(() => intervalKey && clearInterval(intervalKey))
}

export default onInterval