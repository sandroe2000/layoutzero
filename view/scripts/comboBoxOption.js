let comboBoxOption = {
    init: () => {
        lzComboBox.setComboBox('#comboBoxOption', lzInicial.host.concat('/comboboxes'), {val:'id',text:'descr'});
        document.querySelector('#btnComboBoxOptionNovo').addEventListener('click', (event) => {
            comboBoxOption.tr = null;
            comboBoxOption.item = {
                comboBoxOptionModalId: '',
                comboBoxOptionModalComboBoxId: document.querySelector('#comboBoxOption').value,
                comboBoxOptionModalCorporateId: '',
                comboBoxOptionModalDescr: '',
                comboBoxOptionModalDisabled: ''
            };
            comboBoxOption.carregarModal();
        } ,false);
        document.querySelector('#comboBoxOption').addEventListener('change', comboBoxOption.search ,false);
        document.querySelector('#btnComboBoxOptionSearch').addEventListener('click', comboBoxOption.search ,false);
        document.querySelector('#sizeComboBoxOption').addEventListener('change', comboBoxOption.search ,false);
        document.querySelector('#paginationComboBoxOption').addEventListener('click', comboBoxOption.setPage, false);
        document.querySelector('#tableComboBoxOption > tbody').addEventListener('click', comboBoxOption.delete ,false);
        document.querySelector('#tableComboBoxOption > tbody').addEventListener('click', comboBoxOption.edit ,false);
    },
    delete: (event) => {
        event.preventDefault();
        comboBoxOption.tr = event.target.closest('tr');
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
                    let id = comboBoxOption.tr.children[0].textContent;
                    let url = lzInicial.host.concat('/comboboxoptions/').concat(id);
                    fetch(url, { 
                        method: 'DELETE',
                        headers: lzInicial.headers,
                    }).then(response => {
                        //REFAZ A BUSCA NA MESMA PAGINA 
                        //debugger;
                        comboBoxOption.tr = null;
                        comboBoxOption.search();    
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
        comboBoxOption.tr = event.target.closest('tr');
        let el = event.target.classList.contains('fa-pencil-square-o');
        let chk = '';
        if(el){
            //if(!lzInicial.hasAccess('comboBox', 'W')) {
            //    alertify.error('Você não possui acesso a esta função!');
            //    return false;
            //}
            if(isDate(comboBoxOption.tr.children[3].textContent, 'dd/MM/yyyy')){
                chk = 'DISABLED';
            }
            comboBoxOption.item = {
                comboBoxOptionModalId: comboBoxOption.tr.children[0].textContent,
                comboBoxOptionModalComboBoxId: document.querySelector('#comboBoxOption').value,
                comboBoxOptionModalCorporateId: comboBoxOption.tr.children[1].textContent,
                comboBoxOptionModalDescr: comboBoxOption.tr.children[2].textContent,
                comboBoxOptionModalDisabled: chk
            };
            comboBoxOption.carregarModal();
        }
    },
    carregarModal: () => {
        let title = 'Cadastro - ComboBox Options';
        let destiny = document.querySelector('#secModal');
        let urlHtml = 'view/pages/comboBoxOptionModal';
        let urlJs = 'view/scripts/comboBoxOptionModal';        
        lzModal.fetchToPage(destiny, urlHtml, urlJs, title);
    },
    search: (event) => {
        let descr = document.querySelector('#comboBoxOptionDescr').value;
        /*
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
        */
        let url = lzInicial.host.concat('/comboboxoptions/pageable');
        // OK -encodeURI(url) client side
        url += '?fk='.concat(encodeURI(document.querySelector('#comboBoxOption').value));
        url += '&descr='.concat(encodeURI(descr));
        url += '&size='.concat(document.querySelector('#sizeComboBoxOption').value);
        url += '&page='.concat(comboBoxOption.page);

        fetch(url, { 
            method: 'GET',
            headers: lzInicial.headers
        }).then(response => {
                return response.json();            
        }).then(response => {
            return comboBoxOption.list = response;
        }).then(data => {
            let options = {
                data: data, 
                page: comboBoxOption.page, 
                tabId: '#tableComboBoxOption', 
                pageId: '#paginationComboBoxOption'
            };               
            lzDataTable.setTable(options);
        });
    },
    tr: null, 
    item: {},
    page: 0,
    list: []
};
comboBoxOption.init();