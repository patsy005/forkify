import View from './View.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _successMsg = 'Recipe was successfully uploaded 😊';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnAddIngredient = document.querySelector('.upload__btn');
  _ingredientsColumn = document.querySelector('.upload__column--ing');
  _existingIngredients = 2;

  constructor() {
    super();
    this._addShowWindowHander();
    this._addHideWIndowHandler();
    this._addIngredientHandler();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addShowWindowHander() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHideWIndowHandler() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  _createIngredient() {
    const html = `
        <label for="ingredient-${
          this._existingIngredients + 1
        }-quantity" data-ing-num="${
      this._existingIngredients + 1
    }">Ingredient ${this._existingIngredients + 1}</label>
        <input
            type="text"
            required
            name="ingredient-${this._existingIngredients + 1}-quantity"
            id="ingredient-${this._existingIngredients + 1}-quantity"
            placeholder="quantity" />

        <label for="ingredient-${this._existingIngredients + 1}-unit"></label>
        <select name="ingredient-${
          this._existingIngredients + 1
        }-unit" id="ingredient-${this._existingIngredients + 1}-unit">
            <option value="cup" id="unit">pieces</option>
            <option value="cups" id="unit">cups</option>
            <option value="spoon" id="unit">spoon</option>
            <option value="spoons" id="unit">spoons</option>
            <option value="grams" id="unit">grams</option>
        </select>
        <label for="ingredient-${
          this._existingIngredients + 1
        }-description"></label>
        <input
            type="text"
            required
            name="ingredient-${this._existingIngredients + 1}-description"
            placeholder="ingredient"
            id="ingredient-${this._existingIngredients + 1}-description" />
    
    `;

    this._ingredientsColumn.insertAdjacentHTML('beforeend', html);
  }

  _addIngredientHandler() {
    this._btnAddIngredient.addEventListener('click', () =>{
        console.log('first')
        console.log(this);
        this._createIngredient();
        this.__existingIngredients++;
    });
  }

  addUploadHander(handlerFn) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      // const dataArr = [...new FormData(this)];
      const dataArr = [...new FormData(this)];

      // Przetwarzaj dane składników
      const ingredientsData = {};
      const updatedDataArr = dataArr
        .map(entry => {
          if (entry[0].startsWith('ingredient-')) {
            const [, index, field] = entry[0].split('-');
            if (!ingredientsData[index]) {
              ingredientsData[index] = {};
            }
            ingredientsData[index][field] = entry[1];
            return null; // Pomijamy wpis składnika w tym etapie
          }
          return entry;
        })
        .filter(entry => entry !== null);

      // Tworzymy tablicę składników z połączonymi wartościami
      const combinedIngredientsData = Object.keys(ingredientsData).map(
        index => {
          return [
            `ingredient-${index}`,
            Object.values(ingredientsData[index]).join(','),
          ];
        }
      );

      // Dodaj przetworzone dane składników do updatedDataArr
      combinedIngredientsData.forEach(ingredientData => {
        updatedDataArr.push(ingredientData);
      });
      console.log(combinedIngredientsData);

      console.log(dataArr);
      const data = Object.fromEntries(updatedDataArr);
      console.log(data);
      handlerFn(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
