class SearchView{
    #parentEl = document.querySelector('.search');

    getQuery(){
        const query = this.#parentEl.querySelector('.search__field').value;
        this.#clearInput();
        return query;
    }

    #clearInput(){
        this.#parentEl.querySelector('.search__field').value = '';
    }

    addHandlerSearch(handlerFn){
        this.#parentEl.addEventListener('submit', function(e){
            e.preventDefault();
            handlerFn();
        });
    }
}

export default new SearchView();