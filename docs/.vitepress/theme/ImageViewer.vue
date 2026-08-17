<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps<{
  src: string
  alt?: string
}>()

const emit = defineEmits<{
  close: []
}>()

const wrapper = ref<HTMLElement | null>(null)
const image = ref<HTMLImageElement | null>(null)
const visible = ref(false)
const loading = ref(true)
const containMode = ref(true)
const scale = ref(1)
const rotation = ref(0)
const offsetX = ref(0)
const offsetY = ref(0)
const transitionEnabled = ref(false)
const zoomRate = 1.2
const minScale = 0.2
const maxScale = 7
let previousBodyOverflow = ''
let closeTimer: number | null = null
let activePointerId: number | null = null
let dragStartX = 0
let dragStartY = 0
let dragOriginX = 0
let dragOriginY = 0

const imageStyle = computed(() => {
  let translateX = offsetX.value / scale.value
  let translateY = offsetY.value / scale.value
  const radian = rotation.value * Math.PI / 180
  const cosRadian = Math.cos(radian)
  const sinRadian = Math.sin(radian)
  const originalTranslateX = translateX

  translateX = translateX * cosRadian + translateY * sinRadian
  translateY = translateY * cosRadian - originalTranslateX * sinRadian

  return {
    maxWidth: containMode.value ? '100%' : undefined,
    maxHeight: containMode.value ? '100%' : undefined,
    transform: `scale(${scale.value}) rotate(${rotation.value}deg) translate(${translateX}px, ${translateY}px)`,
    transition: transitionEnabled.value ? 'transform .3s' : ''
  }
})

function resetTransform() {
  scale.value = 1
  rotation.value = 0
  offsetX.value = 0
  offsetY.value = 0
  transitionEnabled.value = false
}

function zoom(direction: 'in' | 'out', animated = true) {
  if (loading.value) {
    return
  }

  const nextScale = direction === 'in'
    ? scale.value * zoomRate
    : scale.value / zoomRate

  scale.value = Number.parseFloat(Math.min(maxScale, Math.max(minScale, nextScale)).toFixed(3))
  transitionEnabled.value = animated
}

function rotate(degrees: number) {
  if (loading.value) {
    return
  }

  rotation.value += degrees
  transitionEnabled.value = true
}

function toggleMode() {
  if (loading.value) {
    return
  }

  containMode.value = !containMode.value
  resetTransform()
}

function requestClose() {
  if (!visible.value || closeTimer !== null) {
    return
  }

  visible.value = false
  closeTimer = window.setTimeout(() => {
    closeTimer = null
    emit('close')
  }, 300)
}

function handleKeydown(event: KeyboardEvent) {
  switch (event.code) {
    case 'Escape':
      requestClose()
      break
    case 'Space':
      event.preventDefault()
      toggleMode()
      break
    case 'ArrowUp':
      event.preventDefault()
      zoom('in')
      break
    case 'ArrowDown':
      event.preventDefault()
      zoom('out')
      break
  }
}

function handleWheel(event: WheelEvent) {
  event.preventDefault()
  zoom(event.deltaY < 0 ? 'in' : 'out', false)
}

function handlePointerDown(event: PointerEvent) {
  if (loading.value || event.button !== 0 || !image.value) {
    return
  }

  activePointerId = event.pointerId
  dragStartX = event.pageX
  dragStartY = event.pageY
  dragOriginX = offsetX.value
  dragOriginY = offsetY.value
  transitionEnabled.value = false
  image.value.setPointerCapture(event.pointerId)
  event.preventDefault()
}

function handlePointerMove(event: PointerEvent) {
  if (event.pointerId !== activePointerId) {
    return
  }

  offsetX.value = dragOriginX + event.pageX - dragStartX
  offsetY.value = dragOriginY + event.pageY - dragStartY
}

function handlePointerUp(event: PointerEvent) {
  if (event.pointerId !== activePointerId) {
    return
  }

  if (image.value?.hasPointerCapture(event.pointerId)) {
    image.value.releasePointerCapture(event.pointerId)
  }
  activePointerId = null
}

function handleImageLoad() {
  loading.value = false
}

function handleImageError() {
  loading.value = false
}

onMounted(() => {
  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  document.addEventListener('keydown', handleKeydown)
  nextTick(() => {
    visible.value = true
    wrapper.value?.focus({ preventScroll: true })
  })
})

onBeforeUnmount(() => {
  if (closeTimer !== null) {
    window.clearTimeout(closeTimer)
  }
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = previousBodyOverflow
})
</script>

<template>
  <Teleport to="body">
    <Transition name="viewer-fade" appear>
      <div
        v-if="visible"
        ref="wrapper"
        class="vp-image-viewer__wrapper"
        role="dialog"
        aria-modal="true"
        aria-label="Image preview"
        tabindex="-1"
        @wheel="handleWheel"
      >
        <div class="vp-image-viewer__mask" aria-hidden="true" />

        <button
          type="button"
          class="vp-image-viewer__btn vp-image-viewer__close"
          aria-label="Close image preview"
          title="Close (Esc)"
          @click="requestClose"
        >
          <svg viewBox="0 0 1024 1024" aria-hidden="true">
            <path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z" />
          </svg>
        </button>

        <div class="vp-image-viewer__btn vp-image-viewer__actions" role="toolbar" aria-label="Image actions">
          <div class="vp-image-viewer__actions-inner">
            <button type="button" aria-label="Zoom out" title="Zoom out (scroll down)" :disabled="loading" @click="zoom('out')">
              <svg viewBox="0 0 1024 1024" aria-hidden="true"><path fill="currentColor" d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704M352 448h256a32 32 0 0 1 0 64H352a32 32 0 0 1 0-64" /></svg>
            </button>
            <button type="button" aria-label="Zoom in" title="Zoom in (scroll up)" :disabled="loading" @click="zoom('in')">
              <svg viewBox="0 0 1024 1024" aria-hidden="true"><path fill="currentColor" d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704m-32-384v-96a32 32 0 0 1 64 0v96h96a32 32 0 0 1 0 64h-96v96a32 32 0 0 1-64 0v-96h-96a32 32 0 0 1 0-64z" /></svg>
            </button>
            <i class="vp-image-viewer__actions-divider" aria-hidden="true" />
            <button type="button" aria-label="Toggle fit / original size" title="Fit / Original (space)" :disabled="loading" @click="toggleMode">
              <svg v-if="containMode" viewBox="0 0 1024 1024" aria-hidden="true"><path fill="currentColor" d="m160 96.064 192 .192a32 32 0 0 1 0 64l-192-.192V352a32 32 0 0 1-64 0V96h64zm0 831.872V928H96V672a32 32 0 1 1 64 0v191.936l192-.192a32 32 0 1 1 0 64zM864 96.064V96h64v256a32 32 0 1 1-64 0V160.064l-192 .192a32 32 0 1 1 0-64l192-.192zm0 831.872-192-.192a32 32 0 0 1 0-64l192 .192V672a32 32 0 1 1 64 0v256h-64z" /></svg>
              <svg v-else viewBox="0 0 1024 1024" aria-hidden="true"><path fill="currentColor" d="M813.176 180.706a60.235 60.235 0 0 1 60.236 60.235v481.883a60.235 60.235 0 0 1-60.236 60.235H210.824a60.235 60.235 0 0 1-60.236-60.235V240.94a60.235 60.235 0 0 1 60.236-60.235h602.352zm0-60.235H210.824A120.47 120.47 0 0 0 90.353 240.94v481.883a120.47 120.47 0 0 0 120.47 120.47h602.353a120.47 120.47 0 0 0 120.471-120.47V240.94a120.47 120.47 0 0 0-120.47-120.47zm-120.47 180.705a30.118 30.118 0 0 0-30.118 30.118v301.177a30.118 30.118 0 0 0 60.236 0V331.294a30.118 30.118 0 0 0-30.118-30.118zm-361.412 0a30.118 30.118 0 0 0-30.118 30.118v301.177a30.118 30.118 0 1 0 60.236 0V331.294a30.118 30.118 0 0 0-30.118-30.118M512 361.412a30.118 30.118 0 0 0-30.118 30.117v30.118a30.118 30.118 0 0 0 60.236 0V391.53A30.118 30.118 0 0 0 512 361.412M512 512a30.118 30.118 0 0 0-30.118 30.118v30.117a30.118 30.118 0 0 0 60.236 0v-30.117A30.118 30.118 0 0 0 512 512" /></svg>
            </button>
            <i class="vp-image-viewer__actions-divider" aria-hidden="true" />
            <button type="button" aria-label="Rotate left" title="Rotate left" :disabled="loading" @click="rotate(-90)">
              <svg viewBox="0 0 1024 1024" aria-hidden="true"><path fill="currentColor" d="M289.088 296.704h92.992a32 32 0 0 1 0 64H232.96a32 32 0 0 1-32-32V179.712a32 32 0 0 1 64 0v50.56a384 384 0 0 1 643.84 282.88 384 384 0 0 1-383.936 384 384 384 0 0 1-384-384h64a320 320 0 1 0 640 0 320 320 0 0 0-555.712-216.448z" /></svg>
            </button>
            <button type="button" aria-label="Rotate right" title="Rotate right" :disabled="loading" @click="rotate(90)">
              <svg viewBox="0 0 1024 1024" aria-hidden="true"><path fill="currentColor" d="M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z" /></svg>
            </button>
          </div>
        </div>

        <div class="vp-image-viewer__canvas">
          <img
            ref="image"
            class="vp-image-viewer__img image-viewer__img"
            :src="props.src"
            :alt="props.alt || ''"
            :style="imageStyle"
            draggable="false"
            @load="handleImageLoad"
            @error="handleImageError"
            @pointerdown="handlePointerDown"
            @pointermove="handlePointerMove"
            @pointerup="handlePointerUp"
            @pointercancel="handlePointerUp"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.vp-image-viewer__wrapper {
  position: fixed;
  inset: 0;
  z-index: 2000;
}

.vp-image-viewer__wrapper:focus {
  outline: none;
}

.vp-image-viewer__mask {
  position: absolute;
  inset: 0;
  background: #000;
  opacity: 0.5;
}

.vp-image-viewer__btn {
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 0;
  color: #fff;
  opacity: 0.8;
  user-select: none;
}

.vp-image-viewer__close {
  top: 40px;
  right: 40px;
  width: 44px;
  height: 44px;
  padding: 10px;
  border-radius: 50%;
  background-color: var(--vp-c-text-1);
  cursor: pointer;
}

.vp-image-viewer__close:hover,
.vp-image-viewer__close:focus-visible {
  opacity: 1;
  outline: 2px solid #fff;
  outline-offset: 2px;
}

.vp-image-viewer__close svg {
  width: 24px;
  height: 24px;
}

.vp-image-viewer__actions {
  left: 50%;
  bottom: 30px;
  height: 44px;
  padding: 0 23px;
  border-radius: 22px;
  background-color: var(--vp-c-text-1);
  transform: translateX(-50%);
}

.vp-image-viewer__actions-inner {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-around;
  gap: 22px;
  padding: 0 6px;
}

.vp-image-viewer__actions-inner button {
  display: flex;
  width: 23px;
  height: 23px;
  flex: 0 0 23px;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.vp-image-viewer__actions-inner button:hover,
.vp-image-viewer__actions-inner button:focus-visible {
  color: #fff;
  opacity: 1;
  outline: 2px solid rgba(255, 255, 255, 0.8);
  outline-offset: 3px;
  border-radius: 2px;
}

.vp-image-viewer__actions-inner button:disabled {
  cursor: wait;
  opacity: 0.45;
}

.vp-image-viewer__actions-inner svg {
  width: 23px;
  height: 23px;
}

.vp-image-viewer__actions-divider {
  width: 1px;
  height: 18px;
  margin: 0 -6px;
  background: rgba(255, 255, 255, 0.45);
}

.vp-image-viewer__canvas {
  position: static;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  user-select: none;
}

.vp-image-viewer__img {
  display: block;
  flex: none;
  cursor: grab;
  touch-action: none;
  user-select: none;
}

.vp-image-viewer__img:active {
  cursor: grabbing;
}

.viewer-fade-enter-active {
  animation: viewer-fade-in 0.3s;
}

.viewer-fade-leave-active {
  animation: viewer-fade-out 0.3s;
}

@keyframes viewer-fade-in {
  from {
    opacity: 0;
    transform: translate3d(0, -20px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes viewer-fade-out {
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, -20px, 0);
  }
}

@media (max-width: 640px) {
  .vp-image-viewer__close {
    top: 18px;
    right: 18px;
  }

  .vp-image-viewer__actions {
    bottom: 18px;
    padding: 0 16px;
  }

  .vp-image-viewer__actions-inner {
    gap: 16px;
  }
}
</style>
