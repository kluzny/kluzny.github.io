import { rainbowCursor, fairyDustCursor } from "https://unpkg.com/cursor-effects@latest/dist/esm.js";

const colors = [
  "#FE0000",
  "#FD8C00",
  "#FFE500",
  "#119F0B",
  "#0644B3",
  "#C22EDC",
];

export function mouseEffects() {
  new fairyDustCursor({ colors });
  new rainbowCursor({ colors });
}