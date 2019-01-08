let customer = {
    init: () => {

        lzComboBox.setComboBox('#customerTipoDePublico', lzInicial.host.concat('/comboboxes/all/2'), {val:'id',text:'descr'});
        lzComboBox.setComboBox('#customerPessoaFisicaJuridica', lzInicial.host.concat('/comboboxes/all/3'), {val:'id',text:'descr'});
        lzComboBox.setComboBox('#customerGenero', lzInicial.host.concat('/comboboxes/all/4'), {val:'id',text:'descr'});
        lzComboBox.setComboBox('#customerFormaDeTratamento', lzInicial.host.concat('/comboboxes/all/5'), {val:'id',text:'descr'});
    }
};
customer.init();