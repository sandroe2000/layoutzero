let app = {
    init: () => {
        //debugger;
        let json = null;       
        fetch(app.mockScripts.perfil)
            .then(response => {
                return response.json();            
            })
            .then(body => {
                app.perfil = body;
                console.info(body);
            })
            .catch (error => {
                console.warn(error.message);
            });
        
    },
    //GRANT_KEYS => VIEW: V, WRITE: W, DELETE: D, ex.: "VWD"
    hasAccess: (destiny, grantKey) => {
        //debugger;
        if(!destiny) return false;
        let retorno = false;
        try {
            Object.keys(app.perfil.acesso).forEach(function eachKey(key) { 
                if(key == destiny.getAttribute('id')){
                    retorno = app.perfil.acesso[key].includes(grantKey);
                }
            });
            console.info(retorno);
        } catch (error) {
            console.warn(error.message);
        }
        return retorno;
    },
    fetchToPage: (destiny, urlHtml, urlJs) => {
        //debugger;
        if(!destiny) return false;
        if(!app.hasAccess(destiny, 'V')) return false;
        if(!urlHtml) return false;
        
        fetch(urlHtml.concat('.html'))
            .then(response => { 
                console.info(response);
                return response.text();
            })
            .then(_html => { 
                console.info(_html);
                return destiny.innerHTML = _html;
            })
            .then(_load => {
                console.info(_load);
                if(urlJs){
                    let body = document.getElementsByTagName('body')[0];
                    let buildJS = true;
                    document.querySelectorAll('script').forEach(script => {
                        //debugger;
                        if(script.src.includes(urlJs)){
                            //if exists exec js.init();
                            let start = script.src.lastIndexOf('/')+1;
                            let end = script.src.lastIndexOf('.');
                            let str = script.src.substring(start, end);
                            let js = `if (typeof ${str} !== 'undefined' && ${str} !== null) {
                                        ${str}.init();
                                    }`;
                            eval(js);
                            buildJS = false;
                        }
                    });
                    if(buildJS){
                        script = document.createElement('script');    
                        script.src = urlJs.concat('.js');
                        body.appendChild(script);
                    }
                }
            })
            .catch (error => {
                console.warn(error.message);
            });        
        
    },
    //TODO - Combos com dependencia de outro combo(ou campo)
    // selConf.optionSelected, 
    // selConf.val, 
    // selConf.text
    // selConf.list
    fetchToSelect: (select, url, selConf) => {
        let combo = document.querySelector(select);
        if(!combo) return false;
        if(!app.hasAccess(combo, 'V')) return false;
        
        fetch(url)
            .then(response => { 
                return response.text();
            })
            .then(body => { 
                let json = JSON.parse(body);

                if(json[selConf.list]){
                    json = json[selConf.list];
                }

                document.querySelectorAll(select.concat(' option')).forEach(option => {
                    option.remove();
                });

                let option = document.createElement('option');
                    option.value = "";
                    option.text = "Choose...";
                combo.appendChild(option);

                json.forEach(item => {
                    console.info(body);
                    let option = document.createElement('option');
                    option.value = item[selConf.val];
                    option.text = item[selConf.text];
                    if(selConf.optionSelected && selConf.optionSelected==item[selConf.val]){
                        option.selected = true;
                    }
                    combo.appendChild(option);
                });
            })
            .catch (error => {
                console.warn(error.message);
            });
    },
    perfil: {},
    mockScripts: {
        perfil: 'http://localhost:3000/perfil',
        paises: 'http://localhost:3000/paises',
        estados: 'http://localhost:3000/estados'
    },
    pages: {
        billing: "view/pages/billing",
        none: "view/pages/none"
    },
    scripts: {
        billing: "view/scripts/billing",
        yourCart: "view/scripts/yourCart",
        payment: "view/scripts/payment"
    }
};
app.init();