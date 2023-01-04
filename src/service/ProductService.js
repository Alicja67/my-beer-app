export default class ProductService {
  async getProducts(url) {
    return await axios
      .get(url)
      .then((response) => {
        if (response.data) {
          results = response.data;
          console.log("results", results);
        } else {
          alert("Network Error");
        }
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  }
}
