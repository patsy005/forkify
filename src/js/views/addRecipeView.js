import View from "./View.js";
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
    _parentEl = document.querySelector('.upload');
    _successMsg = 'Recipe was successfully uploaded 😊';

    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');

    constructor() {
        super();
        this._addShowWindowHander();
        this._addHideWIndowHandler();
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

    addUploadHander(handlerFn) {
        this._parentEl.addEventListener('submit', function (e) {
            e.preventDefault();
            const dataArr = [...new FormData(this)];

            console.log(dataArr
                .filter(entry => entry[0].startsWith('ingredient'))
                .forEach(ing => {
                    console.log(ing);
                    // console.log(...ing);
                    // console.log(ing[0]);
                    const arr = [ing];
                    console.log(arr);

                })

    
            )

            console.log(dataArr);
            const data = Object.fromEntries(dataArr);
            console.log(data);
            handlerFn(data);
        })
    }


    _generateMarkup() {

    }
}

export default new AddRecipeView();