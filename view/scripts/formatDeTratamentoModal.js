let formatDeTratamentoModal = {
    init: () => {
        if(formatDeTratamento.item){
            lzInicial.populate(document.querySelector('#formFormaDeTratamentoModal'), formatDeTratamento.item);
        }
        document.querySelector('#btnFormaDeTratamentoModalGravar').addEventListener('click', formatDeTratamentoModal.edit, false);
    },
    edit: (event) => {
        event.preventDefault();
        let id = document.querySelector('#formaDeTratamentoModalId');
        let descr = document.querySelector('#formaDeTratamentoModalDescr');
        let disabled = document.querySelector('#formaDeTratamentoModalDisabled');
        let method = 'PUT';
        let url = lzInicial.host.concat('/formsofaddress/').concat(id.value);
        let json = {
            id: id.value,
            descr: descr.value,
            disabled: formatDate(new Date(), 'dd/MM/yyyy')
        };
        if(!id.value){
            delete json['id'];
            method = 'POST';
            url = lzInicial.host.concat('/formsofaddress');;
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
            let disabled = '- - -';
            if(response.disabled){
                disabled = response.disabled;
            } 
            if(formatDeTratamento.tr){
                formatDeTratamento.tr.children[1].textContent = response.descr;
                formatDeTratamento.tr.children[2].textContent = disabled;
            }else{
                formatDeTratamento.search(); 
            }
            formatDeTratamento.tr = null;
            document.querySelector('#btnFormaDeTratamentoModalCancelar').click();     
        });
    }
};
formatDeTratamentoModal.init();