export {};

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: (key: string) => string;
  }
}

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent;
  export default component;
}
