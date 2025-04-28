<!-- <div class="space-y-4">
    <h2 class="text-xl font-bold text-[#2563EB] mb-4">Formulaire d'Évaluation</h2>
  <div
    v-for="(evaluation, index) in evaluations"
    :key="index"
    class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center bg-gray-50 dark:bg-[#1E293B] p-4 rounded shadow-sm"
  >
    <select
      v-model="evaluation.critere"
      class="col-span-1 px-3 py-2 rounded border border-gray-300 bg-white dark:bg-[#1E293B] dark:text-[#F8FAFC]"
    >
      <option value="">Critère...</option>
      <option v-for="critere in criteres" :key="critere" :value="critere">{{ critere }}</option>
    </select>

    <input
      v-model="evaluation.note"
      type="number"
      min="0"
      max="5"
      step="0.1"
      class="col-span-2 px-3 py-2 border border-gray-300 rounded dark:bg-[#1E293B] dark:text-[#F8FAFC]"
      placeholder="Note sur 5"
    />

    <button
      @click="supprimerCritere(index)"
      class="bg-[#DF0808] text-white px-3 py-2 rounded hover:bg-red-700 transition"
    >
      Supprimer
    </button>
  </div>

  <div class="flex flex-col sm:flex-row gap-4 mt-4">
    <button
      @click="ajouterCritere"
      class="bg-[#65D972] text-white px-4 py-2 rounded hover:bg-green-600 transition"
    >
      Ajouter un critère
    </button>

    <button
      @click="soumettreFormulaire"
      class="bg-[#2582EB] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
    >
    Valider l’évaluation
    </button>
  </div>
</div> -->


<!-- const ajouterCritere = () => {
    evaluations.value.push({ critere: '', note: '' })
  }
  
  const supprimerCritere = (index) => {
    evaluations.value.splice(index, 1)
  }
  
  const soumettreFormulaire = () => {
    const evaluationValide = evaluations.value.every(ev => ev.critere && ev.note)
    if (!evaluationValide) {
      alert('Merci de remplir tous les critères avant de soumettre.')
      return
    }
    console.log('Évaluation soumise pour la piste :', piste.value.id, evaluations.value)
  } -->