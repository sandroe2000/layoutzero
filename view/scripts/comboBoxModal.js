let comboBoxModal = {
    init: () => {
        if(comboBox.item){
            lzInicial.populate(document.querySelector('#formComboBoxModal'), comboBox.item);
        }
        document.querySelector('#btnComboBoxModalGravar').addEventListener('click', comboBoxModal.edit, false);
    },
    edit: (event) => {
        event.preventDefault();
        let id = document.querySelector('#comboBoxModalId');
        let descr = document.querySelector('#comboBoxModalDescr');
        let disabled = document.querySelector('#comboBoxModalDisabled');
        let method = 'PUT';
        let url = lzInicial.host.concat('/comboboxes/').concat(id.value);
        let json = {
            id: id.value,
            descr: descr.value,
            disabled: formatDate(new Date(), 'dd/MM/yyyy')
        };
        if(!id.value){
            delete json['id'];
            method = 'POST';
            url = lzInicial.host.concat('/comboboxes');;
        }
        if(!disabled.checked){
            delete json['disabled'];
        }
        fetch(url, { 
            method: method,
            headers: lzInicial.headers,
            body: JSON.stringify(json)
        }).then(response => {
            return response.json();            
        }).then(response => {
            let disabled = '';
            if(response.disabled){
                disabled = response.disabled;
            } 
            if(comboBox.tr){
                comboBox.tr.children[1].textContent = response.descr;
                comboBox.tr.children[2].textContent = disabled;
            }else{
                comboBox.search(); 
            }
            comboBox.tr = null;
            document.querySelector('#btnComboBoxModalCancelar').click();     
        });
    }
};
comboBoxModal.init();