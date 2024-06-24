import { hyRequest } from "./index"

export function getBanners() {
  return hyRequest.get({
    url: "/carousel/list",
  })
}