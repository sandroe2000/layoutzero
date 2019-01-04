let searchCustomer = {
    init: () => {
        document.querySelector('#tableSearchCustomer > tbody').addEventListener('click', searchCustomer.store ,false);
        document.querySelector('#btnModalEnviar').addEventListener('click', searchCustomer.search ,false);
        document.querySelector('#sizeSearchCustomer').addEventListener('change', searchCustomer.search ,false);
        document.querySelector('#paginationSearchCustomer').addEventListener('click', searchCustomer.setPage, false);
        //Render Destiny
        //document.querySelector('#modalLongTitle').innerHTML = 'Search Customer';
        lzLeftNav.fetchToPage(document.querySelector('nav-left>button>i.fa.fa-lg.fa-user').parentElement);

        document.querySelectorAll('thead tr th').forEach(th => {
            th.addEventListener('click', searchCustomer.setSort, false);
        });
    },
    store: (event) => {     
        let id = event.target.parentElement.children[0].textContent;   
        fetch(lzInicial.mockScripts.customers.concat(id))
        .then(response => {
            return response.json();            
        })
        .then(body => {
            //Store Data
            return customer.data = body;
        })
        .then(data => {
            //Data-Binding
            lzInicial.populate(document.querySelector('#frmCustomer'), customer.data);
        })
        .then(data => {
            //TODO - REMOVE LISTNERS
            lzModal.hide();
        })
        .catch (error => {
            console.warn(error.message);
        });
        event.preventDefault();
    },
    search: (event) => {
        let searchParams = {
            name: document.querySelector('#name').value,
            cellphone: document.querySelector('#cellphone').value,
            email: document.querySelector('#email').value,
            document: document.querySelector('#document').value,
            cpfCnpj: document.querySelector('#cpfCnpj').value,
            rgie: document.querySelector('#rgie').value
        };
        if(_.isEmpty(_.compact(Object.values(searchParams)))){
            alertify
                .alert()
                .setting({
                    'title': 'Atenção',
                    'label': 'Ok',
                    'message': `<h4>Os campos da pesquisa estão vazios!</h4>
                                Preencha algum valor para uma pesquisa valida!`
                })
                .show();
            return false;
        }
        let url = lzInicial.host.concat('/customers/search');
        url += '?name='.concat(searchParams.name);
        url += '&phone='.concat(searchParams.cellphone);
        url += '&email='.concat(searchParams.email);
        url += '&document='.concat(searchParams.document);
        url += '&cpfcnpj='.concat(searchParams.cpfCnpj);
        url += '&rgie='.concat(searchParams.rgie);
        url += '&size='.concat(document.querySelector('#sizeSearchCustomer').value);
        url += '&page='.concat(searchCustomer.page);
        url += '&sort='.concat(searchCustomer.sortDirection);
        fetch(url, { 
            method: 'GET',
            headers: lzInicial.headers
        }).then(response => {
            return response.json();            
        }).then(body => {
            return searchCustomer.customers = body;
        }).then(data => {
            let options = {
                data: data, 
                page: searchCustomer.page, 
                tabId: '#tableSearchCustomer', 
                pageId: '#paginationSearchCustomer'
            };
            lzDataTable.setTable(options);
        });
    },
    setPage: (event) => {
        if(event.target.nodeName=='UL'){
            return false;
        }
        searchCustomer.page = new Number(event.target.text)-1;
        searchCustomer.search();
    },
    page: 0,
    sortDirection: "CORPORATE_ID,ASC",
    customers: [],
    setSort: (event) => {
        let th = event.target.closest('th');
        let thDataColumn = th.getAttribute('data-column');
        if(thDataColumn=='phones'){
            thDataColumn = 'phone';
        }
        let sortFieldName = _.snakeCase(thDataColumn);
        let sortDirection;
        if(th.firstElementChild.classList.contains('fa-sort')){
            sortDirection = "asc";
            th.firstElementChild.classList.remove('fa-sort');
            th.firstElementChild.classList.add('fa-sort-asc');
        }else if(th.firstElementChild.classList.contains('fa-sort-desc')){
            sortDirection = "asc";
            th.firstElementChild.classList.remove('fa-sort-desc');
            th.firstElementChild.classList.add('fa-sort-asc');
        }else if(th.firstElementChild.classList.contains('fa-sort-asc')){
            sortDirection = "desc";
            th.firstElementChild.classList.remove('fa-sort-asc');
            th.firstElementChild.classList.add('fa-sort-desc');
        }
        searchCustomer.sortDirection = sortFieldName+","+sortDirection;
        searchCustomer.search();
    } 
};
searchCustomer.init();