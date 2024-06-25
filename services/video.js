import { hyRequest } from "./index"

export function getVideoList() {
  return hyRequest.get({
    url: '/video/all'
  })
}