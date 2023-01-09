import { defineStore } from "pinia";
import axios from 'axios';

export const useBeersStore = defineStore("beers", {
  state: () => ({ beers: {}, url: 'https://api.punkapi.com/v2/beers' }),
  getters: {
    beers: (state) => state.beers,
  },
  actions: {
    async function getApiData() {
        await axios
          .get(url.value)
          .then((response) => {
            if (response.data) {
              if (response.data.length === 0) {
                showInfo('warn', 'Brak danych', 'Nie ma elementów o podanych parametrach');
                handleReset();
              } else {
                results.value = response.data;
              }
            } else {
              showInfo('error', 'Network Error', '');
            }
          })
          .catch((error) => {
            console.log(error.message);
            // alert(error.message);
            showInfo('error', 'Brak lub błędne dane', error.message);
          });
      }
  },
});
