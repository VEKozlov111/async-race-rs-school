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