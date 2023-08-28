import View from "./View.js";
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
    _parentEl = document.querySelector('.pagination');

    addHandlerClick(handlerFn){
        this._parentEl.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--inline');

            if(!btn) return;

            const goToPage = +btn.dataset.goto;
            handlerFn(goToPage);
        })
    }

    _generateBtnMarkup(className, num) {
        const curPage = this._data.page;
        return `
            <button data-goto="${curPage + num}" class="btn--inline pagination__btn--${className}">
            ${className === 'next' ? `
                <span>Page ${curPage + num}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            ` : `<svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage +num}</span>`}

            </button>


                
        `;
    }

    _generateMarkup() {
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

        const curPage = this._data.page;

        const pagesSumup = `<span class="pagination__pages">Page ${curPage} of ${numPages}</span>`;

        // Page 1, and there are other pages
        if (curPage === 1 && numPages > 1) {
            return `${this._generateBtnMarkup('next', 1) + pagesSumup}`;
        }


        // Last page
        if (curPage === numPages && numPages > 1) {
          return  `${this._generateBtnMarkup('prev', -1) + pagesSumup}`;
        }

        // Other page
        if (curPage < numPages) {
            return `${this._generateBtnMarkup('next', 1)+ pagesSumup + this._generateBtnMarkup('prev', -1) }`;
        }

        // Page 1, and there are NO other pages
        return '';
    }
}

export default new PaginationView();