import {hyRequest} from "./index"

export function getAllTags(type) {
  return hyRequest.get({
    url: `/tags/list/${type}`
  })
}