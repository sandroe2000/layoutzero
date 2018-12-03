let searchCustomer = {
    init: () => {
        document.querySelector('#ltsIdentificacao > tbody').addEventListener('click', searchCustomer.store ,false);
        document.querySelector('#btnModalEnviar').addEventListener('click', searchCustomer.search ,false);
        //Render Destiny
        lzLeftNav.fetchToPage(document.querySelector('nav>button>i.fa.fa-lg.fa-user').parentElement);
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
            //Self Clean & Close
            document.querySelector('#ltsIdentificacao > tbody').addEventListener('click', searchCustomer.store ,false);
            document.querySelector('#btnModalEnviar').addEventListener('click', searchCustomer.search ,false);
            lzModal.hide();
        })
        .catch (error => {
            console.warn(error.message);
        });
        
        event.preventDefault();
    },
    search: () => {

        fetch(lzInicial.mockScripts.customers)
            .then(response => {
                return response.json();            
            })
            .then(body => {
                return searchCustomer.customers = body;
            })
            .then(data => {
                lzDataTable.setTable(data, '#ltsIdentificacao');
            })
            .catch (error => {
                console.warn(error.message);
            });

    },
    customers: [] 
};
searchCustomer.init();