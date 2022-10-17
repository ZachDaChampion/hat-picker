import { writable } from "svelte/store";

export interface PermamentStore {
  lists: ListStore[];
}

export interface ListStore {
  name: string;
  count_per_draw: number;
  in_hat: InHatStore[];
  drawn: DrawnStore[];
}

export interface InHatStore {
  name: string;
}

export interface DrawnStore {
  name: string;
  date: Date;
}

function read_from_storage(): PermamentStore {
  const data = localStorage.getItem("data");
  return data ? JSON.parse(data) : { lists: [] };
}

function write_to_storage(data: PermamentStore) {
  localStorage.setItem("data", JSON.stringify(data));
}

export const persistant_store = writable(read_from_storage());

persistant_store.subscribe((data) => {
  write_to_storage(data);
});
