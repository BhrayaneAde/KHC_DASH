<template>
  <div class="border rounded-lg p-4 min-h-[150px] bg-white shadow-sm">
    <!-- Barre d'outils -->
    <div class="mb-4 flex flex-wrap gap-2">
      <button @click="editor.chain().focus().toggleBold().run()" :class="buttonClass(editor.isActive('bold'))" title="Gras">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6 4a1 1 0 011-1h4a4 4 0 010 8H7a1 1 0 01-1-1V4zm1 1v6h3a2 2 0 100-4H7z" />
        </svg>
      </button>

      <button @click="editor.chain().focus().toggleItalic().run()" :class="buttonClass(editor.isActive('italic'))" title="Italique">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 4a1 1 0 000 2h1.586l-2.293 8H7a1 1 0 000 2h6a1 1 0 000-2h-1.586l2.293-8H13a1 1 0 100-2h-3z" />
        </svg>
      </button>

      <button @click="editor.chain().focus().toggleStrike().run()" :class="buttonClass(editor.isActive('strike'))" title="Barré">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 12h16M9 4h6a3 3 0 110 6h-1M15 20H9a3 3 0 010-6h1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <button @click="editor.chain().focus().setTextAlign('left').run()" :class="buttonClass()" title="Aligner à gauche">
       <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
  <line x1="3" y1="6" x2="21" y2="6" />
  <line x1="3" y1="12" x2="15" y2="12" />
  <line x1="3" y1="18" x2="21" y2="18" />
</svg>

      </button>

      <button @click="editor.chain().focus().setTextAlign('center').run()" :class="buttonClass()" title="Centrer">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
  <line x1="6" y1="6" x2="18" y2="6" />
  <line x1="3" y1="12" x2="21" y2="12" />
  <line x1="6" y1="18" x2="18" y2="18" />
</svg>

      </button>

      <button @click="editor.chain().focus().setTextAlign('right').run()" :class="buttonClass()" title="Aligner à droite">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
  <line x1="3" y1="6" x2="21" y2="6" />
  <line x1="9" y1="12" x2="21" y2="12" />
  <line x1="3" y1="18" x2="21" y2="18" />
</svg>

      </button>
    </div>

    <!-- Éditeur -->
    <EditorContent :editor="editor" />
  </div>
</template>


<script setup>
import { ref, onBeforeUnmount, watch } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'

const props = defineProps({
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])

const editor = new Editor({
  extensions: [
    StarterKit,
    TextAlign.configure({
      types: ['heading', 'paragraph']
    }),
  ],
  content: props.modelValue,
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  }
})

watch(() => props.modelValue, (newValue) => {
  if (newValue !== editor.getHTML()) {
    editor.commands.setContent(newValue)
  }
})

onBeforeUnmount(() => {
  editor.destroy()
})

// Classe dynamique pour bouton actif
const buttonClass = (isActive = false) =>
  `p-2 border rounded-md transition text-gray-700 hover:bg-blue-100 hover:text-blue-600 ${isActive ? 'bg-blue-100 text-blue-600 border-blue-400' : 'border-gray-300'}`
</script>


<style scoped>
/* Style pour la barre d'outils */
button {
    background-color: #f0f0f0;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

button:hover {
    background-color: #e0e0e0;
}

button.active {
    background-color: #d0d0d0;
}

button i {
    font-size: 16px;
}
</style>

<!-- Assurez-vous d'inclure Font Awesome dans votre projet -->
<!-- Ajoutez cette ligne dans votre index.html ou utilisez un package npm -->
<!-- <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet"> -->