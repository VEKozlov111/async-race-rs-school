import { ICar, ICarCreate, ICarSpeed } from "../types/types";
import { path, constants } from "../constants/constants";

export const getCars = async (
  page: number,
  limit = constants.garagePagesLimit
): Promise<{ items: ICar[]; count: number }> => {
  const response = await fetch(`${path.garage}?_page=${page}&_limit=${limit}`);
  return {
    items: await response.json(),
    count: Number(response.headers.get("X-Total-Count")),
  };
};


export const getCar = async (id: number): Promise<ICar> => {
  return (await fetch(`${path.garage}/${id}`)).json();
};

export const updateCar = async (id: number, body: ICarCreate) =>
  (
    await fetch(`${path.garage}/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();

export const createCar = async (body: ICarCreate): Promise<ICar> =>
  (
    await fetch(path.garage, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
  ).json();

export const deleteCar = async (id: number): Promise<void> => {
  return (await fetch(`${path.garage}/${id}`, { method: "DELETE" })).json();
};
export const startEngine = async (id: number): Promise<ICarSpeed> =>
  (await fetch(`${path.engine}?id=${id}&status=started`, { method: "PATCH" })).json();

export const stopEngine = async (id: number): Promise<ICarSpeed> =>
  (await fetch(`${path.engine}?id=${id}&status=stopped`, { method: "PATCH" })).json();

export const drive = async (id: number): Promise<{ success: boolean }> => {
  const res = await fetch(`${path.engine}?id=${id}&status=drive`, { method: "PATCH" }).catch();
  return res.status !== 200 ? { success: false } : { ...(await res.json()) };
};