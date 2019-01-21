let customer = {
    init: () => {

        lzComboBox.setComboBox('#customerTipoDePublico', lzInicial.host.concat('/comboboxoptions?fk=1'), {val:'id',text:'descr'});
        lzComboBox.setComboBox('#customerPessoaFisicaJuridica', lzInicial.host.concat('/comboboxoptions?fk=2'), {val:'id',text:'descr'});
        lzComboBox.setComboBox('#customerGenero', lzInicial.host.concat('/comboboxoptions?fk=3'), {val:'id',text:'descr'});
        lzComboBox.setComboBox('#customerFormaDeTratamento', lzInicial.host.concat('/comboboxoptions?fk=4'), {val:'id',text:'descr'});
    }
};
customer.init();