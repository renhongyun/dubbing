import { getAudioList } from "./audio"
import {hyRequest} from "./index"

export function getAudioDetail(id) {
  return hyRequest.get({
    url: "/song/detail",
    data: {
      id
    }
  })
}