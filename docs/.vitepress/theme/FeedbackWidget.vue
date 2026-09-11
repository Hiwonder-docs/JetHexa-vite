<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

const feedbackApiUrl = import.meta.env.VITE_FEEDBACK_API_URL || 'https://www.hiwonder.net/english-course-feedback'
const maxImageCount = 3
const maxImageSize = 5 * 1024 * 1024
const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp']

const isOpen = ref(false)
const status = ref<SubmitState>('idle')
const statusMessage = ref('')
const imageInput = ref<HTMLInputElement | null>(null)
const images = ref<File[]>([])
const form = reactive({
  name: '',
  email: '',
  message: '',
  website: ''
})

const canSubmit = computed(() => {
  return form.name.trim() && form.email.trim() && form.message.trim() && status.value !== 'submitting'
})

function resetForm() {
  form.name = ''
  form.email = ''
  form.message = ''
  form.website = ''
  images.value = []
  if (imageInput.value) {
    imageInput.value.value = ''
  }
}

function togglePanel() {
  isOpen.value = !isOpen.value
  if (isOpen.value && status.value !== 'submitting') {
    status.value = 'idle'
    statusMessage.value = ''
  }
}

function onImageChange(event: Event) {
  const input = event.target as HTMLInputElement
  const selectedFiles = Array.from(input.files || [])

  if (!selectedFiles.length) {
    return
  }

  const nextImages = [...images.value]

  for (const file of selectedFiles) {
    if (nextImages.length >= maxImageCount) {
      status.value = 'error'
      statusMessage.value = `You can upload up to ${maxImageCount} images.`
      break
    }

    if (!allowedImageTypes.includes(file.type)) {
      status.value = 'error'
      statusMessage.value = 'Please upload JPG, PNG, or WEBP images only.'
      continue
    }

    if (file.size > maxImageSize) {
      status.value = 'error'
      statusMessage.value = 'Each image must be 5MB or smaller.'
      continue
    }

    nextImages.push(file)
  }

  images.value = nextImages
  input.value = ''
}

function removeImage(index: number) {
  images.value = images.value.filter((_, fileIndex) => fileIndex !== index)
  if (status.value !== 'submitting') {
    status.value = 'idle'
    statusMessage.value = ''
  }
}

function formatFileSize(size: number) {
  return size >= 1024 * 1024 ? `${(size / 1024 / 1024).toFixed(1)}MB` : `${Math.ceil(size / 1024)}KB`
}

function getDocsVersion() {
  if (typeof window === 'undefined') {
    return ''
  }

  return window.location.pathname.match(/\/projects\/JetHexa\/en\/([^/]+)/)?.[1] || ''
}

async function submitFeedback() {
  if (!canSubmit.value) {
    status.value = 'error'
    statusMessage.value = 'Please complete all fields.'
    return
  }

  status.value = 'submitting'
  statusMessage.value = ''

  try {
    const payload = new FormData()
    payload.append('name', form.name.trim())
    payload.append('email', form.email.trim())
    payload.append('message', form.message.trim())
    payload.append('website', form.website)
    payload.append('source', 'JetHexa docs')
    payload.append('pageTitle', document.title)
    payload.append('pageUrl', window.location.href)
    payload.append('version', getDocsVersion())
    images.value.forEach((file) => {
      payload.append('images[]', file)
    })

    const response = await fetch(feedbackApiUrl, {
      method: 'POST',
      body: payload
    })

    const result = await response.json().catch(() => null)

    if (!response.ok || !result || ![1, 200].includes(Number(result.code))) {
      throw new Error(result?.msg || 'Submit failed. Please try again later.')
    }

    status.value = 'success'
    statusMessage.value = "Thanks for reaching out. We've received your question and will get back to you as soon as possible."
    resetForm()
  } catch (error) {
    status.value = 'error'
    statusMessage.value = error instanceof Error ? error.message : 'Submit failed. Please try again later.'
  }
}
</script>

<template>
  <div class="feedback-widget" :class="{ 'is-open': isOpen }">
    <section v-if="isOpen" class="feedback-widget__panel" aria-label="Submit a question">
      <div class="feedback-widget__header">
        <h2 class="feedback-widget__title">Ask a Question</h2>
        <button class="feedback-widget__close" type="button" aria-label="Close feedback form" @click="togglePanel">
          x
        </button>
      </div>

      <form class="feedback-widget__form" @submit.prevent="submitFeedback">
        <input
          v-model="form.name"
          class="feedback-widget__input"
          type="text"
          name="name"
          placeholder="Your Name"
          autocomplete="name"
          maxlength="100"
          required
        >
        <input
          v-model="form.email"
          class="feedback-widget__input"
          type="email"
          name="email"
          placeholder="Your Email"
          autocomplete="email"
          maxlength="160"
          required
        >
        <textarea
          v-model="form.message"
          class="feedback-widget__textarea"
          name="message"
          placeholder="Your Question"
          maxlength="2000"
          required
        />
        <div class="feedback-widget__upload">
          <label class="feedback-widget__upload-button">
            <input
              ref="imageInput"
              class="feedback-widget__file-input"
              type="file"
              name="images"
              accept="image/jpeg,image/png,image/webp"
              multiple
              @change="onImageChange"
            >
            <span>Attach Images</span>
          </label>
          <span class="feedback-widget__upload-meta">{{ images.length }}/{{ maxImageCount }}</span>
        </div>
        <ul v-if="images.length" class="feedback-widget__file-list" aria-label="Selected images">
          <li
            v-for="(image, index) in images"
            :key="`${image.name}-${image.size}-${index}`"
            class="feedback-widget__file-item"
          >
            <span class="feedback-widget__file-name">{{ image.name }}</span>
            <span class="feedback-widget__file-size">{{ formatFileSize(image.size) }}</span>
            <button
              class="feedback-widget__file-remove"
              type="button"
              :aria-label="`Remove ${image.name}`"
              @click="removeImage(index)"
            >
              x
            </button>
          </li>
        </ul>
        <input
          v-model="form.website"
          class="feedback-widget__honeypot"
          type="text"
          name="website"
          tabindex="-1"
          autocomplete="off"
        >

        <p
          v-if="statusMessage"
          class="feedback-widget__message"
          :class="`is-${status}`"
          role="status"
        >
          {{ statusMessage }}
        </p>

        <button class="feedback-widget__submit" type="submit" :disabled="!canSubmit">
          {{ status === 'submitting' ? 'Submitting...' : 'Submit' }}
        </button>
      </form>
    </section>

    <button
      class="feedback-widget__trigger"
      type="button"
      :aria-expanded="isOpen"
      aria-label="Open feedback form"
      @click="togglePanel"
    >
      <span class="feedback-widget__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7A8.4 8.4 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5Z" />
        </svg>
      </span>
      <span>Chat</span>
    </button>
  </div>
</template>
