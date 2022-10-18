import { derived, writable } from "svelte/store";

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
  return data
    ? JSON.parse(data)
    : {
        lists: [
          {
            name: "Default",
            count_per_draw: 1,
            in_hat: [],
            drawn: [],
          },
          {
            name: "Default 2",
            count_per_draw: 1,
            in_hat: [],
            drawn: [],
          }
        ],
      };
}

function write_to_storage(data: PermamentStore) {
  localStorage.setItem("data", JSON.stringify(data));
}

export const persistant_store = writable(read_from_storage());

export const current_list_idx = writable(0);

export const current_list = derived(
  [persistant_store, current_list_idx],
  ([$persistant_store, $current_list_idx]) => {
    return $persistant_store.lists[$current_list_idx];
  }
);

persistant_store.subscribe((data) => {
  write_to_storage(data);
});
