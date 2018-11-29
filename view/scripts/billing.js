let billing = {
    init: () => {   
        Promise.all([
            new Promise((resolve, reject)=>{
                lzInicial.fetchToPage(document.getElementById('secPayment'), lzInicial.pages.payment, lzInicial.scripts.payment);
            }),
            new Promise((resolve, reject)=>{
                lzInicial.fetchToPage(document.getElementById('secYourCart'), lzInicial.pages.yourCart, lzInicial.scripts.yourCart);
            }),
            new Promise((resolve, reject)=>{
                billing.hasAccessWrite();
            }),
            new Promise((resolve, reject)=>{
                billing.loadCountry('#billingCountry', lzInicial.mockScripts.paises);
                billing.loadSearchCEP();
            })
        ]).then(result =>{
            console.info('OK');
        }).catch(reason =>{
            console.warn('Falha!', reason);
        });        
    },
    hasAccessWrite: () => {
        if(!lzInicial.hasAccess(document.querySelector('#secPrincipal'), 'W')){       
            document.querySelector('#firstName').setAttribute("disabled", "disabled");
            document.querySelector('#lastName').setAttribute("disabled", "disabled");
            document.querySelector('#username').setAttribute("disabled", "disabled");
            document.querySelector('#email').setAttribute("disabled", "disabled");
            document.querySelector('#address').setAttribute("disabled", "disabled");
            document.querySelector('#address2').setAttribute("disabled", "disabled");
            document.querySelector('#billingCountry').setAttribute("disabled", "disabled");
            document.querySelector('#billingState').setAttribute("disabled", "disabled");
            document.querySelector('#zip').setAttribute("disabled", "disabled");
            document.querySelector('#same-address').setAttribute("disabled", "disabled");
            document.querySelector('#save-info').setAttribute("disabled", "disabled");
            document.querySelector('#btnSendBilling').setAttribute("disabled", "disabled");
        }
    },
    loadCountry: (select, url) => {
        let selConf = {
            val: 'code', 
            text: 'name'
        };
        lzInicial.fetchToSelect(select, url, selConf);
        document.querySelector(select).addEventListener('change', function(event){
            selConf = {
                val: 'code', 
                text: 'name',
                list: 'estados'
            };
            let url = 'http://localhost:3000/paises/'.concat(document.querySelector(select).selectedIndex);
            lzInicial.fetchToSelect('#billingState', url, selConf);
        }, false);
    },
    loadSearchCEP: () => {
        document.querySelector('#btnSearchCEP').addEventListener('click', function(event){
            lzModal.openModal(lzInicial.pages.cep, lzInicial.scripts.cep);
        }, false);
    }
};
billing.init();