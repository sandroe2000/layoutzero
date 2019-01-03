let administrationNavBar = {
    init: () => {
        document.querySelector('#menuFormatDeTratamento').addEventListener('click', administrationNavBar.carregarFormaDeTratamento ,false);
    },
    carregarFormaDeTratamento: () => {

        let destiny = document.querySelector('#secAdminstracao');
        let urlHtml = 'view/pages/formatDeTratamento';
        let urlJs = 'view/scripts/formatDeTratamento';
        
        lzInicial.fetchToPage(destiny, urlHtml, urlJs);
    }
};

let administration = {
    init: () => {
        administrationNavBar.init();
        
    }
};
administration.init();