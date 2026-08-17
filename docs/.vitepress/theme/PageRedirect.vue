<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useData, withBase, inBrowser } from 'vitepress'

const { frontmatter } = useData()

const redirectTarget = computed(() => {
  const rawTarget = String(frontmatter.value.redirectTo || '').trim()
  if (!rawTarget) {
    return withBase('/docs/')
  }

  return rawTarget.startsWith('/')
    ? withBase(rawTarget)
    : withBase(`/${rawTarget}`)
})

const normalizedRedirectTarget = computed(() => redirectTarget.value)

function isSameTarget(current: string, target: string) {
  return current === target || decodeURI(current) === decodeURI(target)
}

function replaceWithTarget(target: string) {
  window.location.replace(target)
}

onMounted(() => {
  if (!inBrowser) {
    return
  }

  const encodedTarget = normalizedRedirectTarget.value
  const current = window.location.pathname + window.location.search + window.location.hash
  if (isSameTarget(current, encodedTarget)) {
    return
  }

  replaceWithTarget(encodedTarget)
})
</script>

<template>
  <div class="page-redirect" style="text-align: center; padding: 100px 20px;">
    <p>Redirecting to content page...</p>
    <p><a :href="normalizedRedirectTarget" target="_self">If you are not redirected automatically, click here</a></p>
  </div>
</template>
