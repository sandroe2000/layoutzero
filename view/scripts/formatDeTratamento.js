let formatDeTratamento = {
    init: () => {
        document.querySelector('#btnFormadeTratamentoNovo').addEventListener('click', (event) => {
            formatDeTratamento.tr = null;
            formatDeTratamento.item = null;
            formatDeTratamento.carregarModal();
        } ,false);
        document.querySelector('#btnFormaDeTratamentoSearch').addEventListener('click', formatDeTratamento.search ,false);
        document.querySelector('#sizeFormaDeTratamento').addEventListener('change', formatDeTratamento.search ,false);
        document.querySelector('#paginationFormaDeTratamento').addEventListener('click', formatDeTratamento.setPage, false);
        document.querySelector('#tableFormaDeTratamento > tbody').addEventListener('click', formatDeTratamento.delete ,false);
        document.querySelector('#tableFormaDeTratamento > tbody').addEventListener('click', formatDeTratamento.edit ,false);
    },
    delete: (event) => {
        event.preventDefault();
        formatDeTratamento.tr = event.target.closest('tr');
        let el = event.target.classList.contains('fa-trash');
        if(el){
            if(!lzInicial.hasAccess('formaDeTratamento', 'D')) {
                alertify.error('Você não possui acesso a esta função!');
                return false;
            }
            alertify.confirm(
                'Confirm Title', 
                'Confirm Message', 
                function(){ 
                    let id = formatDeTratamento.tr.children[0].textContent;
                    let url = lzInicial.host.concat('/formsofaddress/').concat(id);
                    fetch(url, { 
                        method: 'DELETE',
                        headers: lzInicial.headers,
                    }).then(response => {
                        //REFAZ A BUSCA NA MESMA PAGINA 
                        debugger;
                        formatDeTratamento.tr = null;
                        formatDeTratamento.search();    
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
        formatDeTratamento.tr = event.target.closest('tr');
        let el = event.target.classList.contains('fa-pencil-square-o');
        let chk = '';
        if(el){
            if(!lzInicial.hasAccess('formaDeTratamento', 'W')) {
                alertify.error('Você não possui acesso a esta função!');
                return false;
            }
            if(isDate(formatDeTratamento.tr.children[2].textContent, 'dd/MM/yyyy')){
                chk = 'DISABLED';
            }
            formatDeTratamento.item = {
                formaDeTratamentoModalId: formatDeTratamento.tr.children[0].textContent,
                formaDeTratamentoModalDescr: formatDeTratamento.tr.children[1].textContent,
                formaDeTratamentoModalDisabled: chk
            };
            formatDeTratamento.carregarModal();
        }
    },
    carregarModal: () => {
        let title = 'Cadastro - Forma de Tratamento';
        let destiny = document.querySelector('#secModal');
        let urlHtml = 'view/pages/formatDeTratamentoModal';
        let urlJs = 'view/scripts/formatDeTratamentoModal';        
        lzModal.fetchToPage(destiny, urlHtml, urlJs, title);
    },
    search: (event) => {
        let descr = document.querySelector('#formaDeTratamentoDescr').value;
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
        let url = lzInicial.host.concat('/formsofaddress/pageable');
        // OK -encodeURI(url) client side
        url += '?descr='.concat(encodeURI(descr));
        url += '&size='.concat(document.querySelector('#sizeFormaDeTratamento').value);
        url += '&page='.concat(formatDeTratamento.page);

        fetch(url, { 
            method: 'GET',
            headers: lzInicial.headers
        }).then(response => {
                return response.json();            
        }).then(response => {
            return formatDeTratamento.list = response;
        }).then(data => {
            if(data.totalElements){
                let options = {
                    data: data, 
                    page: formatDeTratamento.page, 
                    tabId: '#tableFormaDeTratamento', 
                    pageId: '#paginationFormaDeTratamento'
                };
                lzDataTable.setTable(options);
            }else{
                alertify.message('Nenhum registro encontrado!')
            }
        });
    },
    tr: null, 
    item: {},
    page: 0,
    list: []
};
formatDeTratamento.init();