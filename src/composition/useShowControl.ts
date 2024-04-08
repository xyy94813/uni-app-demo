import { ref } from 'vue'

const useShowControl = (defaultValue: boolean) => {
    const showed = ref(defaultValue || false);
    const show = () => {
        showed.value = true
      }
      const hide = () => {
        showed.value = false
      }
    return {
        showed,
        show,
        hide,
    }
}

export default useShowControl;