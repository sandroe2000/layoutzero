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
    fetchToSelect: (select, url, optionSelected) => {
        if(!select) return false;
        if(!app.hasAccess(select, 'V')) return false;
        
        fetch(url)
            .then(response => { 
                return response.text();
            })
            .then(body => { 
                JSON.parse(body).forEach(country => {
                    console.info(body);
                    let option = document.createElement('option');
                    option.value = country.code;
                    option.text = country.name;
                    if(optionSelected==country.code){
                        option.selected = true;
                    }
                    select.appendChild(option);
                });
            })
            .catch (error => {
                console.warn(error.message);
            });
        
    },
    perfil: {},
    mockScripts: {
        perfil: '/mock/perfil.json',
        countrys: '/mock/countrys.json'
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