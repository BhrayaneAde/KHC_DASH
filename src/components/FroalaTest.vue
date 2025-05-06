<template>
    <div class="border rounded-md p-2 min-h-[150px]">
        <!-- Barre d'outils -->
        <div class="mb-4 flex gap-2">
            <button @click="editor.chain().focus().toggleBold().run()" :class="{'active': editor.isActive('bold')}">
                <i class="fas fa-bold"></i>
            </button>
            <button @click="editor.chain().focus().toggleItalic().run()" :class="{'active': editor.isActive('italic')}">
                <i class="fas fa-italic"></i>
            </button>
            <button @click="editor.chain().focus().toggleStrike().run()" :class="{'active': editor.isActive('strike')}">
                <i class="fas fa-strikethrough"></i>
            </button>
            <button @click="editor.chain().focus().setTextAlign('left').run()">
                <i class="fas fa-align-left"></i>
            </button>
            <button @click="editor.chain().focus().setTextAlign('center').run()">
                <i class="fas fa-align-center"></i>
            </button>
            <button @click="editor.chain().focus().setTextAlign('right').run()">
                <i class="fas fa-align-right"></i>
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
    modelValue: {
        type: String,
        default: ''
    }
})
const emit = defineEmits(['update:modelValue'])

const editor = new Editor({
    extensions: [
        StarterKit,
        TextAlign.configure({
            types: ['heading', 'paragraph'], // Appliquer la justification aux titres et aux paragraphes
        }),
    ],
    content: props.modelValue,
    onUpdate: ({ editor }) => {
        emit('update:modelValue', editor.getHTML())
    }
})

// Gérer la mise à jour externe de modelValue
watch(() => props.modelValue, (newValue) => {
    if (newValue !== editor.getHTML()) {
        editor.commands.setContent(newValue)
    }
})

onBeforeUnmount(() => {
    editor.destroy()
})
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