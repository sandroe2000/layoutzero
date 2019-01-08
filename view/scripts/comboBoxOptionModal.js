let comboBoxOptionModal = {
    init: () => {
        if(comboBoxOption.item){
            lzInicial.populate(document.querySelector('#formComboBoxOptionModal'), comboBoxOption.item);
        }
        document.querySelector('#btnComboBoxOptionModalGravar').addEventListener('click', comboBoxOptionModal.edit, false);
    },
    edit: (event) => {
        event.preventDefault();
        let id = document.querySelector('#comboBoxOptionModalId');
        let comboboxId = document.querySelector('#comboBoxOptionModalComboBoxId');
        let corporateId = document.querySelector('#comboBoxOptionModalCorporateId');
        let descr = document.querySelector('#comboBoxOptionModalDescr');
        let disabled = document.querySelector('#comboBoxOptionModalDisabled');
        let method = 'PUT';
        //let url = lzInicial.host.concat('/comboboxoptions/').concat(id.value);
        let url = lzInicial.host.concat('/comboboxoptions');
        let json = {
            id: id.value,                
            fkComboBox: comboboxId.value,
            corporateId: corporateId.value,
            descr: descr.value,
            disabled: formatDate(new Date(), 'dd/MM/yyyy')
        };
        if(!id.value){
            delete json['id'];
            method = 'POST';
        }
        if(!corporateId.value){
            delete json['corporateId'];
        }
        if(!disabled.checked){
            delete json['disabled'];
        }
        fetch(url, { 
            method: method,
            headers: lzInicial.headers,
            body: JSON.stringify(json)
        }).then(response => {
            if(response.status>201){
                alertify.error('Erro '+response.status+', A operação nãp foi realizada com sucesso!');
                return false;
            }
            return response.json();            
        }).then(response => {
            if(response){
                let disabled = '';
                if(response.disabled){
                    disabled = response.disabled;
                } 
                if(comboBoxOption.tr){
                    comboBoxOption.tr.children[1].textContent = response.corporateId;
                    comboBoxOption.tr.children[2].textContent = response.descr;
                    comboBoxOption.tr.children[3].textContent = disabled;
                }else{
                    comboBoxOption.search(); 
                }
            }
            comboBoxOption.tr = null;
            document.querySelector('#btnComboBoxOptionModalCancelar').click();     
        });
    }
};
comboBoxOptionModal.init();