let billing = {
    init: () => {   
        Promise.all([
            new Promise((resolve, reject)=>{
                app.fetchToPage(document.getElementById('secPayment'), 'view/pages/payment', 'view/scripts/payment');
            }),
            new Promise((resolve, reject)=>{
                app.fetchToPage(document.getElementById('secYourCart'), 'view/pages/yourCart', 'view/scripts/yourCart');
            }),
            new Promise((resolve, reject)=>{
                billing.hasAccessWrite();
            }),
            new Promise((resolve, reject)=>{
                billing.loadCountry('#billingCountry', app.mockScripts.paises);
            })
        ]).then(result =>{
            console.info('OK');
        }).catch(reason =>{
            console.warn('Falha!', reason);
        });        
    },
    hasAccessWrite: () => {
        if(!app.hasAccess(document.querySelector('#secPrincipal'), 'W')){       
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
        app.fetchToSelect(select, url, selConf);
        document.querySelector(select).addEventListener('change', function(event){
            selConf = {
                val: 'code', 
                text: 'name',
                list: 'estados'
            };
            let url = 'http://localhost:3000/provincias/'.concat(document.querySelector(select).selectedIndex);
            app.fetchToSelect('#billingState', url, selConf);
        });
    }
};
billing.init();