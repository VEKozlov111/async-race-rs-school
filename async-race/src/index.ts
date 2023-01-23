import { garageUpdate } from "./components/update-garage/index"
import { renderHtml } from "./components//render-html/render"
import { PageButtonsUpdate } from "./components/update-page-buttons/index"
import { addEvents } from "./components/events/index"

async function runUpp() {
  await garageUpdate()
  await renderHtml();
  PageButtonsUpdate();
  addEvents();
  console.log(storage.cars)
}
runUpp()