export {}
declare global {
  import type { DialogApi, LoadingBarApi, MessageApi, NotificationApi } from "naive-ui"

  interface Window {
    $message: MessageApi
    $notification: NotificationApi
  }
}
