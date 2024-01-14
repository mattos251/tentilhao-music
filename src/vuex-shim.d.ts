import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // Declare seus próprios estados do store
  interface State {
    count: number
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}