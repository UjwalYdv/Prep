<script>
import { ref, watch, onMounted, nextTick } from 'vue'

const GLOBAL_LANG_KEY = 'java'
const globalActiveLanguage = ref('')

// initialize from localStorage if available
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem(GLOBAL_LANG_KEY)
  if (stored) {
    globalActiveLanguage.value = stored
  }
}

// Watch for changes and save to localStorage
watch(globalActiveLanguage, (newLang) => {
  if (typeof window !== 'undefined' && newLang) {
    localStorage.setItem(GLOBAL_LANG_KEY, newLang)
  }
})
</script>

<script setup>
const props = defineProps({
  languages: {
    type: Array,
    required: true,
  },
})

const activeTab = ref(0)
const isFullscreen = ref(false)
const copiedIndex = ref(null)

onMounted(() => {
  if (globalActiveLanguage.value) {
    const index = props.languages.findIndex(
      (lang) => lang.name === globalActiveLanguage.value,
    )
    if (index !== -1) {
      activeTab.value = index
    }
  } else if (props.languages.length > 0) {
    // Note: If no global language is set, use the first tab's language as default
    globalActiveLanguage.value = props.languages[0].name
  }
})

watch(globalActiveLanguage, (newLang) => {
  if (newLang) {
    const index = props.languages.findIndex((lang) => lang.name === newLang)
    if (index !== -1) {
      activeTab.value = index
    }
  }
})

const setActiveTab = (index) => {
  activeTab.value = index
  globalActiveLanguage.value = props.languages[index].name
}

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
  document.body.style.overflow = isFullscreen.value ? 'hidden' : ''
}

const copyCode = async (index) => {
  await nextTick()
  const panel = document.querySelectorAll('.tab-panel')[index]
  const codeBlock = panel?.querySelector('pre code')
  if (codeBlock) {
    try {
      await navigator.clipboard.writeText(codeBlock.innerText.trim())
      copiedIndex.value = index
      setTimeout(() => (copiedIndex.value = null), 1500)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }
}

/* for mapping the language icons to the header of codetab */
/*  TODO : Add the original logo of the languages */

const langIcon = (lang) => {
  const lower = lang.toLowerCase()
  if (lower.includes('cpp') || lower.includes('c++')) return '💠'
  if (lower.includes('python') || lower.includes('py')) return '🐍'
  if (lower.includes('java')) return '☕'
  if (lower.includes('js') || lower.includes('javascript')) return '🟨'
  if (lower.includes('ts') || lower.includes('typescript')) return '🟦'
  if (lower.includes('go')) return '🐹'
  if (lower.includes('rust')) return '🦀'
  if (lower.includes('html')) return '🌐'
  if (lower.includes('css')) return '🎨'
  return '📄'
}
</script>

<template>
  <div class="code-tabs" :class="{ fullscreen: isFullscreen }">
    <!-- Tabs header -->
    <div class="tabs-header">
      <button
        v-for="(lang, index) in languages"
        :key="index"
        :class="['tab-button', { active: activeTab === index }]"
        @click="setActiveTab(index)"
      >
        <span class="lang-icon">{{ langIcon(lang.name) }}</span>
        {{ lang.name }}
      </button>
    </div>

    <!-- Tab content -->
    <div class="tabs-content">
      <div
        v-for="(lang, index) in languages"
        :key="index"
        v-show="activeTab === index"
        class="tab-panel"
      >
        <div class="editor-actions">
          <button
            class="copy-button"
            @click="copyCode(index)"
            title="Copy code"
          >
            📋
          </button>
          <span v-if="copiedIndex === index" class="copied-message">
            ✅ Copied!
          </span>
          <button
            class="fullscreen-button"
            @click="toggleFullscreen"
            title="Toggle fullscreen"
          >
            {{ isFullscreen ? '×' : '⛶' }}
          </button>
        </div>
        <slot :name="lang.slot"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.code-tabs {
  margin: 16px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
  transition: all 0.3s ease;
  position: relative;
}

.tabs-header {
  display: flex;
  background-color: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  overflow-x: auto;
}

.tab-button {
  padding: 10px 22px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
  white-space: nowrap;
  border-bottom: 2px solid transparent;
  display: flex;
  align-items: center;
  gap: 6px;
}

.lang-icon {
  font-size: 16px;
}

.tab-button:hover {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-mute);
}

.tab-button.active {
  color: var(--vp-c-brand-1);
  border-bottom-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg);
}

.tabs-content {
  position: relative;
  background-color: var(--vp-c-bg);
}

.tab-panel {
  position: relative;
}

.tab-panel :deep(div[class*='language-']) {
  margin: 0;
  border-radius: 0;
  border: none;
}

/* Buttons inside the editor */
.editor-actions {
  position: absolute;
  top: 10px;
  right: 14px;
  display: flex;
  gap: 10px;
  z-index: 10;
  align-items: center;
}

.editor-actions button {
  border: none;
  background: rgba(0, 0, 0, 0.45);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  width: 38px;
  height: 38px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.editor-actions button:hover {
  background: rgba(0, 0, 0, 0.6);
  transform: scale(1.1);
}

.copied-message {
  color: #16a34a;
  font-size: 14px;
  font-weight: 500;
  margin-right: 6px;
  opacity: 0;
  animation: fadeInOut 1.5s ease forwards;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translateY(5px);
  }
  20% {
    opacity: 1;
    transform: translateY(0);
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-5px);
  }
}

.fullscreen {
  position: fixed !important;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  border-radius: 0;
  margin: 0;
  background: var(--vp-c-bg);
  overflow: auto;
}

.fullscreen .tabs-content {
  height: calc(100vh - 50px);
  overflow: auto;
}

.tab-panel :deep(.vp-copy),
.tab-panel :deep(.copy),
.tab-panel :deep(.code-copy),
.tab-panel :deep(.shiki-copy) {
  display: none !important;
}

.tab-panel :deep(.lang),
.tab-panel :deep(.language-label),
.tab-panel :deep(.vp-code-group .language) {
  display: none !important;
}
</style>
