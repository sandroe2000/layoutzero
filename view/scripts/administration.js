let administrationNavBar = {
    init: () => {
        document.querySelectorAll('.dropdown-item').forEach(dropdown => {     
            dropdown.addEventListener('click', administrationNavBar.carregarItemDoMenu ,false);
        });
    },
    carregarItemDoMenu: (event) => {

        let str = event.target.getAttribute('data-item');
        if(!str) return false;

        let destiny = document.querySelector('#SEC_ADMIN');
        let urlHtml = 'view/pages/'.concat(str);
        let urlJs = 'view/scripts/'.concat(str);
        
        lzInicial.fetchToPage(destiny, urlHtml, urlJs);
    }
};

let administration = {
    init: () => {
        administrationNavBar.init();
        
    }
};
administration.init();