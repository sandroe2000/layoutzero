let dbImport = {
    init: () => {
        let i = 0;
        document.querySelector('#btDbImportNovo').addEventListener('click', dbImport.newConn ,false);
        document.querySelectorAll('input[name="chkField"]').forEach(chk => {
            chk.addEventListener('click', dbImport.chkField, false);
        });
        document.querySelectorAll('select[name="fieldDestiny"]').forEach(select => {
            select.addEventListener('change', dbImport.optionSelected, false);
            dbImport.ArrCombos[i] = 0;
            i++;
        });
    },
    newConn: () => {
        let title = 'Cadastro - New DB Conection';
        let destiny = document.querySelector('#secModal');
        let urlHtml = 'view/pages/dbImportModal';
        let urlJs = 'view/scripts/dbImportModal';        
        lzModal.fetchToPage(destiny, urlHtml, urlJs, title);
    },
    chkField: (event) => {
        let chk = event.target;
        let row = event.target.closest('.row');
        let bg = 'white';
        let font = 'black';
        if (chk.checked){
            bg = 'WhiteSmoke';  
            font = 'LightGray';
        } 
        row.lastElementChild.lastElementChild.disabled=chk.checked
        row.style.background=bg;
        row.firstChild.nextSibling.style.color=font;
    },
    ArrCombos: [],
    optionSelected: (event) => {
        /* 1 - Array com um item para cada select
         * 2 - Cada item do Array inicia com o valor zerado representando o selectedIndex de cada Select.
         *
         * Quando selecionar um item, exemplo do select 1 item 3, 
         * verifica se este item esta marcado no Array com valor diferente de zero.
         * 
         * SE NÃO - Apenas grava o novo valor no array e bloqueia este item nos demais selects
         * SE SIM - Libera este item nos demais Selects; 
         *          Grava o novo valor no Array;
         *          Bloqueia este novo valor de item nos demais Selects
         */
        let selected = 0; //PARA DETERMINAR QUAL SELECT FOI CLICACO.
        document.querySelectorAll('select[name="fieldDestiny"]').forEach(select => {
            debugger;
            if(event.target!==select){
                for(let i=0; i<select.options.length; i++){
                    select.options[dbImport.ArrCombos[selected]].disabled=false;
                }
                select.options[event.target.options.selectedIndex].disabled=true;
                dbImport.ArrCombos[selected] = event.target.options.selectedIndex;//???
            }
            selected++;
        });
    }
};
dbImport.init();