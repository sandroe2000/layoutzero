let dbImport = {
    init: () => {
        let i = 0;
        document.querySelector('#btDbImportNovo').addEventListener('click', dbImport.newConn ,false);
        document.querySelectorAll('input[name="chkField"]').forEach(chk => {
            chk.addEventListener('click', dbImport.chkField, false);
        });
    },
    newConn: () => {
        let title = 'Cadastro - New DB Conection';
        let destiny = document.querySelector('#SEC_MODAL');
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
    }
};
dbImport.init();