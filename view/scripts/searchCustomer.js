let searchCustomer = {
    init: () => {
        document.querySelector('#tableSearchCustomer > tbody').addEventListener('click', searchCustomer.store ,false);
        document.querySelector('#btnModalEnviar').addEventListener('click', searchCustomer.search ,false);
        document.querySelector('#sizeSearchCustomer').addEventListener('change', searchCustomer.search ,false);
        document.querySelector('#paginationSearchCustomer').addEventListener('click', searchCustomer.setPage, false);
        //Render Destiny
        document.querySelector('#modalLongTitle').innerHTML = 'Search Customer';
        lzLeftNav.fetchToPage(document.querySelector('nav-left>button>i.fa.fa-lg.fa-user').parentElement);
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
        window.indexedDB.open(dbName, 2).onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(["auth"], 'readonly');
            const authStore = transaction.objectStore("auth");
            authStore.getAll().onsuccess = (event) => {
                let results = event.target.result;
                let url = lzInicial.host.concat('customers/search');
                    url += '?name='.concat(searchParams.name);
                    url += '&phone='.concat(searchParams.cellphone);
                    url += '&email='.concat(searchParams.email);
                    url += '&document='.concat(searchParams.document);
                    url += '&cpfcnpj='.concat(searchParams.cpfCnpj);
                    url += '&rgie='.concat(searchParams.rgie);
                    url += '&size='.concat(document.querySelector('#sizeSearchCustomer').value);
                    url += '&page='.concat(searchCustomer.page);
                let header = new Headers();
                    header.append("Authorization", results[0].Authorization);
                let params = { method: 'GET',
                            headers: header,
                            mode: 'cors',
                            cache: 'no-cache'};
                fetch(url, params)
                    .then(response => {
                        return response.json();            
                    })
                    .then(body => {
                        return searchCustomer.customers = body;
                    })
                    .then(data => {
                        //debugger;
                        let options = {
                            data: data, 
                            page: searchCustomer.page, 
                            tabId: '#tableSearchCustomer', 
                            pageId: '#paginationSearchCustomer'
                        };
                        lzDataTable.setTable(options);
                    })
                    .catch (error => {
                        console.warn(error.message);
                    });
            };
            transaction.oncomplete = () => {
                db.close();
            };            
        };
    },
    setPage: (event) => {
        if(event.target.nodeName=='UL'){
            return false;
        }
        searchCustomer.page = new Number(event.target.text)-1;
        searchCustomer.search();
    },
    page: 0,
    customers: [] 
};
searchCustomer.init();