const newCategoryBtn = document.querySelector('#newCategory');
let catalogCategories = document.querySelector('#catalogCategories');

newCategoryBtn.addEventListener('click', e => {

    if (document.querySelector('.newCategoryItem')) {
        alert('Finalize a nova categoria ou cancele o processo antes de prosseguir.')
        return false
    }

  let newCategoryItem = document.createElement('div');
      newCategoryItem.classList.add('newCategoryItem');

  let newCategoryInput = document.createElement('input');
      newCategoryInput.classList.add('black-color');
      newCategoryInput.classList.add('body-2');
      newCategoryInput.type='text';
      newCategoryInput.placeholder='Nome da categoria';

  let newCategoryButton1 = document.createElement('button');
      newCategoryButton1.classList.add('icon-button');

  let newCategoryButton2 = document.createElement('button');
      newCategoryButton2.classList.add('icon-button');

  let newCategorySpan1 = document.createElement('span');
      newCategorySpan1.classList.add('material-icons-round');
      newCategorySpan1.classList.add('primary-color');
      newCategorySpan1.innerHTML='save';

  let newCategorySpan2 = document.createElement('span');
      newCategorySpan2.classList.add('material-icons-round');
      newCategorySpan2.classList.add('low-color');
      newCategorySpan2.innerHTML='close';

      newCategoryButton1.append(newCategorySpan1);
      newCategoryButton2.append(newCategorySpan2);
      newCategoryItem.append(newCategoryInput);
      newCategoryItem.append(newCategoryButton1);
      newCategoryItem.append(newCategoryButton2);

      catalogCategories.append(newCategoryItem);

      newCategoryButton2.addEventListener('click', e => {
        catalogCategories.removeChild(newCategoryItem);
      })
})