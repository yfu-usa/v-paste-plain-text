<template>
  <q-page padding>

    <q-input v-paste-plain-text v-model="text" label="Paste plain text"  />
    <div >
      {{  text }}
    </div>
    <div >
      {{  binaryText }}
    </div>

    <q-input v-paste-plain-text v-model="textArea" label="Paste plain text" type="textarea"  />

    <div>
      <q-editor v-model="editor"  />

    </div>
    <q-card flat bordered>
      <q-card-section v-html="editor" />
    </q-card>
  </q-page>
</template>

<script setup>

import { computed, ref } from 'vue'
import routes from '../router/routes'
const text = ref('');
const editor = ref('');
const textArea = ref('');
const binaryText = computed(() => {
  let hex = "";
  for (let i = 0; i < text.value.length; i++) {
    let charCode = text.value.charCodeAt(i);
    hex += charCode.toString(16).padStart(2, '0') + ' ';
  }
  return hex;
} );
</script>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
