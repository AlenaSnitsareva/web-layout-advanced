// create cards
function createCard(product) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  const saleOrStars = document.createElement('span');
  const img = document.createElement('picture');
  const contentContainer = document.createElement('div');
  const name = document.createElement('h3');
  const model = document.createElement('p');
  const price = document.createElement('span');
  const oldPrice = document.createElement('span');
  const btn = document.createElement('button');

  if (product.sale < 0) {
    saleOrStars.innerHTML = `${formatPrice(String(product.sale))}`;
    price.innerHTML = `${formatPrice(
      String(product.price + product.sale)
    )} руб`;
    oldPrice.innerHTML = `${formatPrice(String(product.price))} руб`;
    price.classList.add('price-sale');
    saleOrStars.classList.add('sale');
    oldPrice.classList.add('old-price');
  } else {
    price.innerHTML = `${formatPrice(String(product.price))} руб`;
    saleOrStars.innerHTML = `${formatStars(product.stars)}`;
    price.classList.add('price');
    saleOrStars.classList.add('stars');
  }
  img.innerHTML = `<source
                    srcset="
                    ./img/png/${product.src}.png 1x,
                    ./img/png/${product.src}-2x.png 2x,
                    "
                  />
                  <img class="card__img"
                    src="./img/png/${product.src}.png"
                    alt="${product.name} ${product.color} ${
    product.model[product.model.length - 1]
  }"
                  />`;
  name.innerHTML = `${product.name} `;
  model.innerHTML = `“${product.model[product.model.length - 1]}”`;
  a.href = `./ditails-page.html?id=${product.id}`;
  btn.innerHTML = 'Купить';

  li.classList.add('card');
  a.classList.add('card__link');
  name.classList.add('card__name');
  model.classList.add('card__model');
  btn.classList.add('card__btn');

  a.append(img);
  li.append(saleOrStars);
  li.append(a);
  contentContainer.append(name);
  contentContainer.append(model);
  price.append(oldPrice);
  contentContainer.append(price);
  contentContainer.append(btn);
  li.append(contentContainer);
  return li;
}

function formatPrice(str) {
  const s = str.length;
  const chars = str.split('');
  const strWithSpaces = chars.reduceRight((acc, char, i) => {
    const spaceOrNothing = (s - i) % 3 === 0 ? ' ' : '';
    return spaceOrNothing + char + acc;
  }, '');

  return strWithSpaces[0] === ' ' ? strWithSpaces.slice(1) : strWithSpaces;
}
function formatStars(number) {
  if (number % 1 === 0) {
    return String(number) + ',' + '0';
  } else {
    const stringArr = String(number).split('.');

    return stringArr[0] + ',' + stringArr[1];
  }
}

function createCardCategory(category) {
  const li = document.createElement('li');
  const modelsList = document.createElement('ul');
  const contentContainer = document.createElement('div');
  category.models.forEach((model) => {
    const modelsItem = document.createElement('li');
    const modelsLink = document.createElement('a');
    modelsLink.innerHTML = `${model}`;
    modelsLink.href = `./catalog-page.html?model=${category.name}%${model}`;
    modelsItem.append(modelsLink);
    modelsList.append(modelsItem);
  });
  const name = document.createElement('a');
  const img = document.createElement('picture');
  const btn = document.createElement('a');

  li.classList.add('category-card');
  modelsList.classList.add('models-list');
  name.classList.add('category-name');
  name.classList.add('actions');
  btn.classList.add('category-btn');
  btn.classList.add('actions');

  name.innerHTML = `<span>${category.name}</span><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_21061_112)">
<circle cx="11" cy="11" r="10" stroke="#A65CF0" stroke-width="2"/>
<path d="M9.625 7.5625L13.0625 11L9.625 14.4375" stroke="#A65CF0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_21061_112">
<rect width="22" height="22" fill="white"/>
</clipPath>
</defs>
</svg>
`;
  name.href = `./catalog-page.html?category=${category.name}`;
  img.innerHTML = `<source
                    srcset="
                    ./img/png/${category.src}.png 1x,
                    ./img/png/${category.src}-2x.png 2x,
                    "
                  />
                  <img
                  class="category-img"
                    src="./img/png/${category.src}.png"
                    alt="${category.name}"
                  />`;
  btn.innerHTML = `<span>В каталог</span><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_21061_112)">
<circle cx="11" cy="11" r="10" stroke="#A65CF0" stroke-width="2"/>
<path d="M9.625 7.5625L13.0625 11L9.625 14.4375" stroke="#A65CF0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_21061_112">
<rect width="22" height="22" fill="white"/>
</clipPath>
</defs>
</svg>
`;
  btn.href = `./catalog-page.html?category=${category.name}`;

  contentContainer.append(modelsList);
  contentContainer.append(name);
  contentContainer.append(img);
  li.append(contentContainer);
  li.append(btn);
  return li;
}

function createUsefulItem(usefulItem) {
  const li = document.createElement('li');
  const img = document.createElement('picture');
  const container = document.createElement('div');
  const descr = document.createElement('p');
  const btn = document.createElement('button');

  li.classList.add('useful-card');
  descr.classList.add('useful-descr');
  btn.classList.add('useful-btn');
  container.classList.add('useful-container');

  descr.innerHTML = `${usefulItem.descr}`;
  img.innerHTML = `<source
                    srcset="
                    ./img/png/${usefulItem.src}.png 1x,
                   
                    "
                  />
                  <img
                     class="useful-img"
                    src="./img/png/${usefulItem.src}.png"
                    alt="" aria-hidden="true" 
                  />`;
  btn.innerHTML = 'Читать';

  li.append(img);
  container.append(descr);
  container.append(btn);
  li.append(container);
  return li;
}

// main page

function specialOffers(data) {
  const ul = document.getElementById('special-offers');

  const filteredData = data.filter((el) => {
    if (el.sale < 0) {
      return el;
    }
  });
  if (window.screen.width >= 768) {
    pagination(ul, 1, filteredData, 3);
  } else {
    pagination(ul, 1, filteredData, 6);
  }
}

function highRating(data) {
  const ul = document.getElementById('high-ul');
  const filteredData = data.filter((product) => {
    if (product.stars > 4.6 && product.sale === 0) {
      return product;
    }
  });

  for (let i = 0; i < filteredData.length; i++) {
    if (i > 7 || (window.screen.width < 1326 && i > 5)) {
      return;
    }
    const card = createCard(filteredData[i]);
    ul.append(card);
  }
}

function topCategories(categories) {
  const ul = document.getElementById('top-categories');

  categories.forEach((category) => {
    const card = createCardCategory(category);
    ul.append(card);
  });
}

function useful(usefulsList) {
  const ul = document.getElementById('useful-list');

  usefulsList.forEach((usefulItem) => {
    const card = createUsefulItem(usefulItem);
    ul.append(card);
  });
}

function createMainPage(data, categoties, usefulsList) {
  specialOffers(data);
  highRating(data);
  topCategories(categoties);
  useful(usefulsList);
}

// create catalog

function path(list) {
  const pathSpan = document.getElementById('path');

  for (let i = 0; i < list.length; i++) {
    const pathItem = document.createElement('li');
    const pathLink = document.createElement('a');
    pathItem.classList.add('path-item');
    pathLink.classList.add('path-link');

    if (i !== list.length - 1) {
      pathLink.innerHTML = `${list[i]} /`;
    } else {
      pathLink.innerHTML = `${list[i]}`;
    }

    pathItem.append(pathLink);
    pathSpan.append(pathItem);
  }
}

function pagination(ul, elValue, data, numberOfCards) {
  for (let i = 0; i < data.length; i++) {
    if (i < numberOfCards * (elValue - 1)) {
      continue;
    }
    if (i >= numberOfCards * elValue) {
      return;
    }
    const card = createCard(data[i]);
    ul.append(card);
  }
}

function catalogList(data) {
  const ul = document.getElementById('catalog');
  const paginator = document.getElementById('paginator');

  Array.from(paginator).forEach((el) => {
    el.addEventListener('change', () => {
      ul.innerHTML = '';

      if (window.screen.width >= 1024) {
        pagination(ul, el.value, data, 9);
      } else if (window.screen.width < 1024) {
        pagination(ul, el.value, data, 6);
      }
    });
  });
  if (window.screen.width >= 1024) {
    pagination(ul, 1, data, 9);
  } else if (window.screen.width < 1024) {
    pagination(ul, 1, data, 6);
  }
}

function createCatalogPage(data, pathList) {
  path(pathList);
  catalogList(data);
}

// create ditails
function createCardDitails(product) {
  const section = document.getElementById('ditails');
  const container = document.createElement('div');
  const img = document.createElement('picture');
  const mainInform = document.createElement('div');
  const stars = document.createElement('span');
  const name = document.createElement('h2');
  const minDescr = document.createElement('p');
  const price = document.createElement('span');
  const btnContainer = document.createElement('div');
  const buyBtn = document.createElement('button');
  const cartBtn = document.createElement('button');

  stars.innerHTML = `${product.stars}`;
  img.innerHTML = `<source
                    srcset="
                    ./img/png/${product.src}.png 1x,
                    ./img/png/${product.src}-2x.png 2x,
                    "
                  />
                  <img
                  class="product__img"
                    src="./img/png/${product.src}.png"
                    alt="${product.name} ${product.color} ${
    product.model[product.model.length - 1]
  }"
                  />`;

  if (product.model.includes('Прямые')) {
    name.innerHTML = `${product.name} прямой "${
      product.model[product.model.length - 1]
    }"`;
  } else {
    name.innerHTML = `${product.name} "${
      product.model[product.model.length - 1]
    }"`;
  }
  minDescr.innerHTML = 'Мини 120 см без ящика Stark синий&nbsp;(Рогожка)';
  price.innerHTML = `${formatPrice(String(product.price))} руб`;
  buyBtn.innerHTML = 'Купить в один клик';
  cartBtn.innerHTML = '+ Добавить в корзину';

  section.classList.add('ditails');
  container.classList.add('section-container');
  stars.classList.add('stars');
  name.classList.add('product__name');
  minDescr.classList.add('product__min-descr');
  price.classList.add('product__price');
  btnContainer.classList.add('btn-container');
  buyBtn.classList.add('product__buy-btn');
  cartBtn.classList.add('product__cart-btn');

  const descrContainer = document.createElement('div');
  const subtitle = document.createElement('h3');
  const descr = document.createElement('p');
  const schematicImage = document.createElement('picture');

  descrContainer.classList.add('product__exstra-inform');
  subtitle.classList.add('product__subtitle');
  descr.classList.add('product__descr');

  subtitle.innerHTML = 'Опорный механизм';
  descr.innerHTML =
    'Опорный механизм напоминает пантограф, к которому добавили дополнительную секцию. У опорного дивана сиденье «выпрыгивает» вперёд и вытаскивает вторую часть спального места. Заключительный штрих — опустить спинку.<br> Этот механизм не портит пол и не боится ковров. Требуется чуть больше силы, чтобы разложить диван, но подросток справится.';
  schematicImage.innerHTML = `<source
  srcset="
  ./img/png/${product.srcSchematic}.png 1x
                    "
                  />
                  <img
                  class="product__shematic-img"
                    src="./img/png/${product.srcSchematic}.png"
                    alt="" aria-hidden="true" 
                    />`;
  const specList = document.createElement('ul');
  specList.classList.add('product__specList');
  specList.innerHTML = `
  <li class="product__specItem">
 <span class="spec-name">Гарантия</span><span class="spec-value">18 месяцев</span>
  </li>
  <li class="product__specItem">
  <span class="spec-name">Артикул</span><span class="spec-value">AAA41269004</span>
  </li>
  <li class="product__specItem">
  <span class="spec-name">Длина</span><span class="spec-value">163 см</span>
  </li>
  <li class="product__specItem">
  <span class="spec-name">Высота</span><span class="spec-value">90 см</span>
  </li>
  <li class="product__specItem">
  <span class="spec-name">Глубина</span><span class="spec-value">108 см</span>
  </li>
  <li class="product__specItem">
  <span class="spec-name">Спальное место</span><span class="spec-value">200 см х 125 см</span>
  </li>
  <li class="product__specItem">
  <span class="spec-name">Высота посадки</span><span class="spec-value">45 см</span>
  </li>
  <li class="product__specItem">
  <span class="spec-name">Механизм</span><span class="spec-value">Опорный</span>
  </li>
  <li class="product__specItem">
  <span class="spec-name">Тип обивки</span><span class="spec-value">Рогожка</span>
  </li>
  <li class="product__specItem">
  <span class="spec-name">Цвет</span><span class="spec-value">${product.color}</span>
  </li>
  <li class="product__specItem">
  <span class="spec-name">Наполнитель</span><span class="spec-value">Независимый пружинный блок</span>
  </li>
  <li class="product__specItem">
  <span class="spec-name">Материал каркаса</span><span class="spec-value">Металл. рама с дерев. латами</span>
  </li>
  <li class="product__specItem">
  <span class="spec-name">Количество мест</span><span class="spec-value">Двухместные</span>
  </li>
  <li class="product__specItem">
  <span class="spec-name">Категория</span><span class="spec-value">Прямые тканевые диваны</span>
  </li>
  <li class="product__specItem">
  <span class="spec-name">Возврат</span><span class="spec-value">Условия</span>
  </li>
  `;

  mainInform.append(stars);
  mainInform.append(name);
  mainInform.append(minDescr);
  mainInform.append(price);
  btnContainer.append(buyBtn);
  btnContainer.append(cartBtn);
  mainInform.append(btnContainer);

  descrContainer.append(subtitle);
  descrContainer.append(descr);
  descrContainer.append(schematicImage);
  // descrContainer.append(specList);

  container.append(img);
  container.append(mainInform);
  container.append(descrContainer);
  container.append(specList);
  section.append(container);
  return section;
}

function createSimilarProducts(product, data) {
  const filteredData = data.filter((item) => {
    if (
      item.model[0] === product.model[0] &&
      item.color === product.color &&
      item.id !== product.id
    ) {
      return item;
    }
  });

  const section = document.getElementById('similar');
  const container = document.createElement('div');
  const title = document.createElement('h2');
  const ul = document.createElement('ul');

  filteredData.forEach((product) => {
    const card = createCard(product);
    ul.append(card);
  });

  title.innerHTML = 'Похожие товары';

  section.classList.add('similar');
  container.classList.add('section-container');
  title.classList.add('similar__title');
  ul.classList.add('similar__ul');

  container.append(title);
  container.append(ul);
  section.append(container);
  return section;
}

function renderClientDitails(product, pathList, data) {
  path(pathList);
  createCardDitails(product);
  createSimilarProducts(product, data);
}
