let customer = {
    init: () => {

        if(!searchCustomer.customers.length){
            return false;
        }

        let uri = lzLogin.host.concat(`customers/${searchCustomer.customers[0].id}`);
        fetch(uri)
            .then(response => {
                return response.json();            
            })
            .then(body => {
                customer.objects = body;
            })
            .then(data => {
                lzComboBox.setComboBox(
                    '#formaDeTratamento', 
                    customer.objects, 
                    {
                        val: "id", 
                        text: "descricao",
                        list: "formaDeTratamento"
                    });
            })
            .catch (error => {
                console.warn(error.message);
            });
    },
    objects: {},
    data: {}
};
customer.init();