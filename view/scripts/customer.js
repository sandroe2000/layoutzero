let customer = {
    init: () => {

        lzComboBox.setComboBox('#customerTipoDePublico', lzInicial.host.concat('/formsofaddress'), {val:'id',text:'descr'});
        lzComboBox.setComboBox('#customerFormaDeTratamento', lzInicial.host.concat('/formsofaddress'), {val:'id',text:'descr'});
    }
};
customer.init();