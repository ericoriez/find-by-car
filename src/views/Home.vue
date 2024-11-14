<template>
  <div>
    <div class="text-red-700 text-5xl">
      <h1>Find By Car</h1>
    </div>

    <div class="p-4">
      <button
          @click="filterVehicles('Car')"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-4"
      >
        Voiture
      </button>

      <button
          @click="filterVehicles('Motorcycle')"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-4"
      >
        Moto
      </button>

      <button
          @click="filterVehicles('UtilityVehicle')"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-4"
      >
        Véhicule Utilitaire
      </button>

      <button
          @click="resetFilter"
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mx-4"
      >
        Tous
      </button>
    </div>
  </div>

  <div class="container mx-auto px-4 py-6">
    <h1 class="text-3xl font-bold text-center mb-8">Liste des Véhicules</h1>
    <div v-if="error" class="text-red-500 text-center mb-6">
      {{ error }}
    </div>
    <div v-if="loading" class="text-center mb-6">
      <p>Chargement des véhicules...</p>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
          v-for="vehicle in filteredVehicles"
          :key="vehicle.id"
          class="p-4 border rounded-lg shadow-md hover:shadow-lg transition"
      >
        <h2 class="text-xl font-semibold mb-2">{{ vehicle.brand }} - {{ vehicle.model }}</h2>
        <p class="text-gray-600">Couleur : {{ vehicle.color }}</p>
        <p class="text-gray-600">Puissance Fiscale : {{ vehicle.fiscalPower }}</p>
        <p class="text-gray-600">Prix de Base : {{ vehicle.basePrice }}€</p>
        <p class="text-gray-600">Prix au km : {{ vehicle.kmPrice }}€</p>
        <p class="text-gray-600">Matricule : {{ vehicle.matriculation }}</p>
        <img
            :src="vehicle.image"
            alt="Image véhicule"
            class="w-full h-49 object-cover rounded-md mb-4"
        />
        <button
            class="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Voir Détails
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/axiosConfig'; // Importez la configuration d'Axios
export default {
  name: 'HomePage',
  data() {
    return {
      vehicles: [],
      filteredVehicles: [],
      error: '',
    };
  },
  methods: {
    async fetchVehicles() {
      try {
        const response = await axios.get('/vehicles');
        this.vehicles = response.data;
        this.filteredVehicles = response.data; // Initialisation avec tous les véhicules
        console.log('Données récupérées :', this.vehicles);
      } catch (error) {
        console.error('Erreur de la récuperation des vehicules :', error);
        this.error = 'Impossible de charger les véhicules.';
      }
    },
    filterVehicles(type) {
      console.log(`Filtrage pour le type : ${type}`);
      this.filteredVehicles = this.vehicles.filter((vehicle) => vehicle.type === type);
    },
    resetFilter() {
      this.filteredVehicles = this.vehicles; // Réinitialise le filtre pour afficher tous les véhicules
    },
  },
  created() {
    this.fetchVehicles();
  },
};
</script>