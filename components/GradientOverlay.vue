<template>
  <div class="gridient"></div>
  <div class="gridient glitch"></div>
</template>

<style>
/* modified from https://codepen.io/mtsgeneroso/pen/LYEWBMd?editors=1100 @mtsgeneroso */

.gridient {
  --gridient-size: 20px;
  z-index: -1;
  pointer-events: none;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  background-color: transparent;
  background-size: var(--gridient-size) var(--gridient-size), var(--gridient-size) var(--gridient-size);
  background-position:  -1px -1px, -1px -1px;
  background-image: linear-gradient(rgba(0,255,0,0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,255,0,0.05) 1px, transparent 1px);
  mix-blend-mode: difference;
}

.gridient.glitch {
  clip-path: polygon(0 0, 100% 0, 100% .5em, 0 .5em);
  background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
  animation: glitch 7.5s linear infinite;
  animation-delay: 0s;
  transform: translatex(.1rem);
}

@keyframes glitch {
 to {
  clip-path: polygon(0 calc(100% - .5em), 100% calc(100% - .5em), 0 100%, 0 100%)
 }
}
</style>