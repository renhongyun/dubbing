import { hyRequest } from "./index"

export function getCategories() {
  return hyRequest.get({
    url: '/firstCategory/getFirstCategory'
  })
}

export function getCategoriesAll() {
  return hyRequest.get({
    url: '/firstCategory/all'
  })
}