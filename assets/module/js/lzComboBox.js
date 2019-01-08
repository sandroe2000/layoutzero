let lzComboBox = {
    setComboBox: (select, urlOrData, selConf) => {
        let combo = document.querySelector(select);
        if(!combo) return false;
        //if(!lzInicial.hasAccess(combo, 'V')) return false;
        if(typeof urlOrData === 'string'){
            lzComboBox.__setUrlToComboBox(select, urlOrData, selConf);
        }else{
            lzComboBox.__setObjToComboBox(select, urlOrData, selConf);
        }
    },
    __setUrlToComboBox: (select, urlOrData, selConf) => {
        fetch(urlOrData, { 
            method: 'GET',
            headers: lzInicial.headers
        }).then(response => { 
            return response.text();
        }).then(data => { 
            lzComboBox.__setObjToComboBox(select, data, selConf);
        }).catch (error => {
            console.warn(error.message);
        });
    },
    __setObjToComboBox: (select, json, selConf) => {
        let combo = document.querySelector(select);
        //let json = JSON.parse(data);
        if(json[selConf.list]){
            json = json[selConf.list];
        }
        document.querySelectorAll(select.concat(' option')).forEach(option => {
            option.remove();
        });
        let option = document.createElement('option');
            option.value = "";
            option.text = "Selecione";
        combo.appendChild(option);
        JSON.parse(json).forEach(item => {
            let option = document.createElement('option');
            option.value = item[selConf.val];
            option.text = item[selConf.text];
            if(selConf.optionSelected && selConf.optionSelected==item[selConf.val]){
                option.selected = true;
            }
            combo.appendChild(option);
        });
    }
};