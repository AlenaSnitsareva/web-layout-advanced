const dataList = products();
const categoriesList = categories();
const usefulsList = usefuls();
const appContainer = document.getElementById('main');
const searchParams = new URLSearchParams(location.search);

const productId = searchParams.get('id');
const productCategory = searchParams.get('category');
const productModel = searchParams.get('model');
const cooperation = searchParams.get('cooperation');

if (productId) {
  const product = dataList.filter((product) => {
    if (product.id === Number(productId)) {
      return product;
    }
  });

  renderClientDitails(
    product[0],
    ['Главная', 'Каталог'].concat(product[0].model),
    dataList
  );
} else if (productModel) {
  const modelList = productModel.split('%');
  const filteredDataList = dataList.filter((product) => {
    if (
      product.model.includes(modelList[0]) &&
      product.model.includes(modelList[1]) &&
      product.sale === 0
    ) {
      return product;
    }
  });
  createCatalogPage(filteredDataList, ['Главная', 'Каталог'].concat(modelList));
} else if (productCategory) {
  const filteredDataList = dataList.filter((product) => {
    if (product.model.includes(productCategory) && product.sale === 0) {
      return product;
    }
  });
  createCatalogPage(filteredDataList, ['Главная', 'Каталог', productCategory]);
} else {
  createMainPage(dataList, categoriesList, usefulsList);
}
