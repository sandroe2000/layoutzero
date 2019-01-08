let comboBox = {
    init: () => {
        debugger;
        document.querySelector('#btnComboBoxNovo').addEventListener('click', (event) => {
            comboBox.tr = null;
            comboBox.item = null;
            comboBox.carregarModal();
        } ,false);
        document.querySelector('#btnComboBoxSearch').addEventListener('click', comboBox.search ,false);
        document.querySelector('#sizeComboBox').addEventListener('change', comboBox.search ,false);
        document.querySelector('#paginationComboBox').addEventListener('click', comboBox.setPage, false);
        document.querySelector('#tableComboBox > tbody').addEventListener('click', comboBox.delete ,false);
        document.querySelector('#tableComboBox > tbody').addEventListener('click', comboBox.edit ,false);
    },
    delete: (event) => {
        event.preventDefault();
        comboBox.tr = event.target.closest('tr');
        let el = event.target.classList.contains('fa-trash');
        if(el){
            if(!lzInicial.hasAccess('comboBox', 'D')) {
                alertify.error('Você não possui acesso a esta função!');
                return false;
            }
            alertify.confirm(
                'Confirm Title', 
                'Confirm Message', 
                function(){ 
                    let id = comboBox.tr.children[0].textContent;
                    let url = lzInicial.host.concat('/comboboxes/').concat(id);
                    fetch(url, { 
                        method: 'DELETE',
                        headers: lzInicial.headers,
                    }).then(response => {
                        //REFAZ A BUSCA NA MESMA PAGINA 
                        debugger;
                        comboBox.tr = null;
                        comboBox.search();    
                    });
                    alertify.success('registro removido com sucesso!');
                }, 
                function(){ 
                    alertify.message('Açao cancelada!')
                }                
            );
        }
    },
    edit: (event) => {
        event.preventDefault();
        comboBox.tr = event.target.closest('tr');
        let el = event.target.classList.contains('fa-pencil-square-o');
        let chk = '';
        if(el){
            if(!lzInicial.hasAccess('comboBox', 'W')) {
                alertify.error('Você não possui acesso a esta função!');
                return false;
            }
            if(isDate(comboBox.tr.children[2].textContent, 'dd/MM/yyyy')){
                chk = 'DISABLED';
            }
            comboBox.item = {
                comboBoxModalId: comboBox.tr.children[0].textContent,
                comboBoxModalDescr: comboBox.tr.children[1].textContent,
                comboBoxModalDisabled: chk
            };
            comboBox.carregarModal();
        }
    },
    carregarModal: () => {
        let title = 'Cadastro - ComboBox';
        let destiny = document.querySelector('#secModal');
        let urlHtml = 'view/pages/comboBoxModal';
        let urlJs = 'view/scripts/comboBoxModal';        
        lzModal.fetchToPage(destiny, urlHtml, urlJs, title);
    },
    search: (event) => {
        let descr = document.querySelector('#comboBoxDescr').value;
        if(!descr){
            alertify
                .alert()
                .setting({
                    'title': 'Atenção',
                    'label': 'Ok',
                    'message': `<h4>O campo da pesquisa está vazio!</h4>
                                Preencha algum valor para uma pesquisa valida!`
                })
                .show();
            return false;
        }
        let url = lzInicial.host.concat('/comboboxes/pageable');
        // OK -encodeURI(url) client side
        url += '?descr='.concat(encodeURI(descr));
        url += '&size='.concat(document.querySelector('#sizeComboBox').value);
        url += '&page='.concat(comboBox.page);

        fetch(url, { 
            method: 'GET',
            headers: lzInicial.headers
        }).then(response => {
                return response.json();            
        }).then(response => {
            return comboBox.list = response;
        }).then(data => {
            let options = {
                data: data, 
                page: comboBox.page, 
                tabId: '#tableComboBox', 
                pageId: '#paginationComboBox'
            };
            lzDataTable.setTable(options);
        });
    },
    tr: null, 
    item: {},
    page: 0,
    list: []
};
comboBox.init();