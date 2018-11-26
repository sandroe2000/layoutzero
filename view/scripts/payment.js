let payment = {
    init: () => {
        if(!app.hasAccess(document.querySelector('#secPayment'), 'W')){

            document.getElementsByName('paymentMethod').forEach( payMet => {
                payMet.checked = false; 
                payMet.setAttribute("disabled", "disabled");            
            });        
            document.querySelector('#cc-name').setAttribute("disabled", "disabled");
            document.querySelector('#cc-number').setAttribute("disabled", "disabled");
            document.querySelector('#cc-expiration').setAttribute("disabled", "disabled");
            document.querySelector('#cc-cvv').setAttribute("disabled", "disabled");
        }
    }
};
payment.init();