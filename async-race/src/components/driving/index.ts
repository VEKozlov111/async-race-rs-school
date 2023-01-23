import { ICar, ICarCreate, IRace, IStartDriving } from "../../types/types";
import {
  getCars,
  getCar,
  createCar,
  deleteCar,
  updateCar,
  startEngine,
  stopEngine,
  drive
} from "../../api/api";
import { constants } from "../../constants/constants";
import { storage } from "../storage/storage";
import { carBrands, carModels } from "../../data/dataCars";



export async function startDriving(id: number): Promise<IStartDriving> {
  const startEngineButton = document.getElementById(`start-engine-car-${id}`) as HTMLButtonElement;
  const stopEngineButton = document.getElementById(`stop-engine-car-${id}`) as HTMLButtonElement;
  startEngineButton.disabled = true;
  startEngineButton.classList.toggle("active", true);
  const { velocity, distance } = await startEngine(id);
  const time = Math.round(distance / velocity);
  startEngineButton.classList.toggle("active", false);
  stopEngineButton.disabled = false;
  const car = document.getElementById(`car-${id}`) as HTMLElement;
  car.style.animationName = `car-animation`;
  car.style.animationDuration = `${time.toString()}ms`;
  const { success } = await drive(id);
  if (!success) {
    car.style.animationPlayState = "paused";
    car.classList.add("broken");
  }
  return { success, id, time };
}

export async function stopDriving(id: number): Promise<void> {
  const startEngineButton = document.getElementById(`start-engine-car-${id}`) as HTMLButtonElement;
  const stopEngineButton = document.getElementById(`stop-engine-car-${id}`) as HTMLButtonElement;
  stopEngineButton.disabled = true;
  stopEngineButton.classList.toggle("active", true);
  await stopEngine(id);
  stopEngineButton.classList.toggle("active", false);
  startEngineButton.disabled = false;
  const car = document.getElementById(`car-${id}`) as HTMLElement;
  car.style.animationName = "none";
  car.style.animationPlayState = "initial";
  car.classList.remove("broken");
}

async function raceAll(promises: Promise<IStartDriving>[], indexes: number[]): Promise<IRace> {
  const { success, id, time } = await Promise.race(promises);
  if (!success) {
    const indexFailed = indexes.findIndex((i) => i === id);
    const restOfPromises = [...promises.slice(0, indexFailed), ...promises.slice(indexFailed + 1, promises.length)];
    const restOfIndexes = [...indexes.slice(0, indexFailed), ...indexes.slice(indexFailed + 1, indexes.length)];
    return raceAll(restOfPromises, restOfIndexes);
  }
  return { ...storage.cars.find((car: ICar) => car.id === id), time: +(time / 1000).toFixed(2) };
}

export async function race(action: (id: number) => Promise<IStartDriving>): Promise<IRace> {
  const promises = storage.cars.map(({ id }) => action(id));
  const winner = await raceAll(
    promises,
    storage.cars.map((car: ICar) => car.id)
  );
  return winner;
}