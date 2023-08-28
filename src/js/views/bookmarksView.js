import View from "./View.js";
import previewView from "./previewView.js";
import icons from 'url:../../img/icons.svg';

class BookmakrsView extends View {
    _parentEl = document.querySelector('.bookmarks__list');
    _errorMsg = 'No bookmakrs yet. Find a nice recipe and bookmark it 😉';
    _successMsg = '';

    addRenderHandler(handlerFn){
        window.addEventListener('load', handlerFn);
    }
    _generateMarkup() {
        return this._data.map(bookmark => previewView.render(bookmark, false)).join('');
    }

}

export default new BookmakrsView();