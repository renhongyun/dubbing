import {hyRequest} from "./index"

export function getAudioList(audioData) {
  return hyRequest.post({
    url: '/audio/list',
    data: audioData
  })
}
