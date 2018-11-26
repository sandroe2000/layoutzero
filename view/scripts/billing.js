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
                billing.loadCountry(document.querySelector('#billingCountry'), app.mockScripts.countrys);
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
            document.querySelector('#state').setAttribute("disabled", "disabled");
            document.querySelector('#zip').setAttribute("disabled", "disabled");
            document.querySelector('#same-address').setAttribute("disabled", "disabled");
            document.querySelector('#save-info').setAttribute("disabled", "disabled");
            document.querySelector('#btnSendBilling').setAttribute("disabled", "disabled");
        }
    },
    loadCountry: (select, url) => {
        app.fetchToSelect(select, url);
    }
};
billing.init();