let lzInicial = {
    init: () => {
        //debugger;
        let json = null;       
        fetch(lzInicial.mockScripts.perfil)
            .then(response => {
                return response.json();            
            })
            .then(body => {
                lzInicial.perfil = body;
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
            Object.keys(lzInicial.perfil.acesso).forEach(function eachKey(key) { 
                if(key == destiny.getAttribute('id')){
                    retorno = lzInicial.perfil.acesso[key].includes(grantKey);
                }
            });
        } catch (error) {
            console.warn(error.message);
        }
        return retorno;
    },
    fetchToPage: (destiny, urlHtml, urlJs) => {
        //debugger;
        if(!destiny) return false;
        if(!lzInicial.hasAccess(destiny, 'V')) return false;
        if(!urlHtml) return false;
        
        fetch(urlHtml.concat('.html'))
            .then(response => { 
                return response.text();
            })
            .then(_html => { 
                return destiny.innerHTML = _html;
            })
            .then(_load => {
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
    //TODO - Load url or Json Object
    // selConf.optionSelected, 
    // selConf.val, 
    // selConf.text
    // selConf.list
    fetchToSelect: (select, url, selConf) => {
        let combo = document.querySelector(select);
        if(!combo) return false;
        if(!lzInicial.hasAccess(combo, 'V')) return false;
        
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
    populate: function( form, data, basename) {

		for(var key in data) {

			if( ! data.hasOwnProperty( key ) ) {
				continue;
			}

			var name = key;
			var value = data[key];

                        if ('undefined' === typeof value) {
                            value = '';
                        }

                        if (null === value) {
                            value = '';
                        }

			// handle array name attributes
			if(typeof(basename) !== "undefined") {
				name = basename + "[" + key + "]";
			}

			if(value.constructor === Array) {
				name += '[]';
			} else if(typeof value == "object") {
				populate( form, value, name);
				continue;
			}

			// only proceed if element is set
			var element = form.elements.namedItem( name );
			if( ! element ) {
				continue;
			}

			var type = element.type || element[0].type;

			switch(type ) {
				default:
					element.value = value;
					break;

				case 'radio':
				case 'checkbox':
					for( var j=0; j < element.length; j++ ) {
						element[j].checked = ( value.indexOf(element[j].value) > -1 );
					}
					break;

				case 'select-multiple':
					var values = value.constructor == Array ? value : [value];

					for(var k = 0; k < element.options.length; k++) {
						element.options[k].selected |= (values.indexOf(element.options[k].value) > -1 );
					}
					break;

				case 'select':
				case 'select-one':
					element.value = value.toString() || value;
					break;
				case 'date':
          				element.value = new Date(value).toISOString().split('T')[0];	
					break;
			}

		}

	},
    perfil: {},
    mockScripts: {
        perfil: 'http://localhost:3000/perfil',
        paises: 'http://localhost:3000/paises',
        pageCustomer: 'http://localhost:3000/customer',
        customers: 'http://localhost:3000/customers/'
    },
    modules: {
        lzModal: "assets/module/pages/lzModal"
    },
    modulesJs: {
        lzModal: "assets/module/lzModal"
    },
    pages: {
        billing: "view/pages/billing",
        payment: "view/pages/payment",
        yourCart: "view/pages/yourCart",
        cep: "view/pages/cep",
        none: "view/pages/none"
    },
    scripts: {
        billing: "view/scripts/billing",
        yourCart: "view/scripts/yourCart",
        payment: "view/scripts/payment",
        cep: "view/scripts/cep"
    }
};
lzInicial.init();