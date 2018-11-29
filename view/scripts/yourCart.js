let yourCart = {
    init: () => {
        if(!lzInicial.hasAccess(document.querySelector('#secYourCart'), 'W')){
        
            document.querySelector('#codePromo').setAttribute("disabled", "disabled");
            document.querySelector('#btnCart').setAttribute("disabled", "disabled");
        }
    }
};
yourCart.init();