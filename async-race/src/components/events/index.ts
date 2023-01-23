import { ICar } from "../../types/types";
import {
  getCar,
  createCar,
  deleteCar,
  updateCar,
} from "../../api/api";
import { constants } from "../../constants/constants";
import { storage } from "../storage/storage";
import { garageUpdate } from "../update-garage/index";
import { renderGarage } from "../render-html/render";
import { PageButtonsUpdate, disableButtons } from "../update-page-buttons/index";
import { startDriving, stopDriving, race } from "../driving/index";


export const addEvents = function (): void {
  const garage = document.querySelector(".garage") as HTMLDivElement;
  const createCarName = document.querySelector(".create-car-name") as HTMLInputElement;
  const createCarColor = document.querySelector(".create-car-color") as HTMLInputElement;
  const createCarForm = document.querySelector(".create-car-form") as HTMLFormElement;
  const updateCarName = document.querySelector(".update-car-name") as HTMLInputElement;
  const updateCarColor = document.querySelector(".update-car-color") as HTMLInputElement
  const updateCarButton = document.querySelector(".update-car-button") as HTMLButtonElement;;
  const updateCarForm = document.querySelector(".update-car-form") as HTMLFormElement;
  let selectedCar: ICar | null = null;


  createCarForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (createCarName.value) {
      const newCar = {
        name: createCarName.value,
        color: createCarColor.value,
      };
      await createCar(newCar);
      await garageUpdate();
      garage.innerHTML = renderGarage();
      PageButtonsUpdate();
      createCarName.value = "";
      createCarColor.value = "#888888";
    } else {
      alert("Please enter the car name!");

    }
  });

  document.body.addEventListener("click", async (event) => {
    const eventTarget = event.target as HTMLButtonElement;
    const resetBtn = document.querySelector(".reset-btn") as HTMLButtonElement;;
    const raceBtn = document.querySelector(".race-btn") as HTMLButtonElement;;

    if (eventTarget.classList.contains("prev-page-btn")) {
      storage.garagePage -= 1;
      await garageUpdate();
      PageButtonsUpdate();
      garage.innerHTML = renderGarage();
    }

    if (eventTarget.classList.contains("next-page-btn")) {
      storage.garagePage += 1;
      await garageUpdate();
      PageButtonsUpdate();
      garage.innerHTML = renderGarage();
    }

    if (eventTarget.classList.contains("generat-cars-btn")) {
      eventTarget.disabled = true;
      const cars = generateCars(constants.generateCarsLimit);
      await Promise.all(cars.map(async (car) => createCar(car)));
      await garageUpdate();
      PageButtonsUpdate();
      garage.innerHTML = renderGarage();
      disableButtons(false);
      eventTarget.disabled = false;
    }

    if (eventTarget.classList.contains("remove-btn")) {
      const id = +eventTarget.id.split("remove-car-")[1];
      await deleteCar(id);
      await garageUpdate();
      garage.innerHTML = renderGarage();
      PageButtonsUpdate();
    }

    if (eventTarget.classList.contains("select-btn")) {
      selectedCar = await getCar(+eventTarget.id.split("select-car-")[1]);
      updateCarName.value = selectedCar.name;
      updateCarColor.value = selectedCar.color;
      updateCarName.disabled = false;
      updateCarColor.disabled = false;
      updateCarButton.disabled = false;
    }

    if (eventTarget.classList.contains("start-engine-btn")) {
      const id = +eventTarget.id.split("start-engine-car-")[1];
      startDriving(id);
    }
    if (eventTarget.classList.contains("stop-engine-btn")) {
      const id = +eventTarget.id.split("stop-engine-car-")[1];
      stopDriving(id);
    }

    if (eventTarget.classList.contains("race-btn")) {
      disableButtons(true);
      eventTarget.disabled = true;
      const winner = await race(startDriving);
      const winInfo = document.querySelector(".win-info") as HTMLDivElement;
      winInfo.innerHTML = `${winner.name} won the race with the best time: ${winner.time}s!`;
      winInfo.classList.toggle("visible", true);
      resetBtn.disabled = false;
    }

    if (eventTarget.classList.contains("reset-btn")) {
      disableButtons(false);
      eventTarget.disabled = true;
      storage.cars.map(({ id }) => stopDriving(id));
      const winInfo = document.querySelector(".win-info") as HTMLDivElement;
      winInfo.innerHTML = "";
      raceBtn.disabled = false;
    }


    updateCarForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const car = {
        name: updateCarName.value,
        color: updateCarColor.value,
      };
      if (selectedCar) {
        await updateCar(selectedCar.id, car);
      }
      await garageUpdate();
      garage.innerHTML = renderGarage();
      updateCarName.value = "";
      updateCarName.disabled = true;
      updateCarColor.disabled = true;
      updateCarColor.value = "#000000";
      updateCarButton.disabled = true;
      selectedCar = null;
    });
  });
}