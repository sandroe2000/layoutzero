let customer = {
    init: () => {

        fetch(lzInicial.mockScripts.pageCustomer)
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