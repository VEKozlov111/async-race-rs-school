import { storage } from "../storage/storage";
import { constants } from "../../constants/constants";
export function PageButtonsUpdate(): void {
  const prevPageButton = document.querySelector(".prev-page-btn") as HTMLButtonElement;
  const nextPageButton = document.querySelector(".next-page-btn") as HTMLButtonElement;
  const garageBtn = document.querySelector(".garage-btn") as HTMLButtonElement;
  garageBtn.disabled = true;
  if (storage.garagePage * constants.garagePagesLimit < storage.carsCount) {
    nextPageButton.disabled = false;
  } else {
    nextPageButton.disabled = true;
  }
  if (storage.garagePage > 1) {
    prevPageButton.disabled = false;
  } else {
    prevPageButton.disabled = true;
  }
}

export function disableButtons(operator: boolean): void {
  const btns = document.querySelectorAll(".btn") as NodeListOf<HTMLButtonElement>;
  if (operator) {
    btns.forEach((btn) => (btn.disabled = true));
  } else if (operator === false) {
    btns.forEach((btn) => (btn.disabled = false));
    PageButtonsUpdate()
  }
}