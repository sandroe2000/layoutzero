let lzInicial = {
    init: () => {   
        alertify.defaults.transition = "slide";
        alertify.defaults.theme.ok = "btn btn-primary";
        alertify.defaults.theme.cancel = "btn btn-danger";
        alertify.defaults.theme.input = "form-control";  

        alertify.set('notifier','position', 'top-right');
                
        window.indexedDB.open(dbName, 2).onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(["auth"], 'readonly');
            const authStore = transaction.objectStore("auth");
            authStore.getAll().onsuccess = (event) => {
                let results = event.target.result;
                lzInicial.headers = {
                    "Authorization": results[0].Authorization,
                    "Content-Type": "application/json"
                };
                if(!results.length){
                    alertify.alert()
                        .setting({
                            'title': 'Atenção',
                            'label': 'Ok',
                            'message': 'Falha ao executar login!',
                            'onok': function(){
                                location.href = 'index.html';
                            }
                        })
                        .show();
                }
                let url = lzInicial.host.concat('/users/perfil/')+results[0].login;
                fetch(url, { method: 'GET',
                            headers: lzInicial.headers,
                            mode: 'cors',
                            cache: 'no-cache'
                    })
                    .then(response => {
                        return response.json();            
                    })
                    .then(body => {
                        if(body.status && body.status==500){
                            alertify
                                .alert()
                                .setting({
                                    'title': 'Atenção',
                                    'label': 'Ok',
                                    'message': body.message
                                })
                                .show();
                        }
                        lzInicial.perfil = body;
                    });
            };
            transaction.oncomplete = () => {
                db.close();
            };            
        };
    },
    headers: {},
    singOut: () => {
        const request = window.indexedDB.open(dbName, 2);
        request.onsuccess = (event) => {
            const db = request.result;
            const transaction = db.transaction(["auth"], "readwrite");
            const authStore = transaction.objectStore("auth");
            authStore.clear();
            transaction.oncomplete = () => {
                db.close();
                location.href = 'index.html';
            };
        };
    },
    host: 'http://localhost/app',
    //GRANT_KEYS => VIEW: V, WRITE: W, DELETE: D, ex.: "VWD"
    hasAccess: (destiny, grantKey) => {
        //debugger;
        if(!destiny) return false;
        let retorno = false;
        let access = lzInicial.perfil.access;
        let destinyId;
        if(destiny instanceof Element){
            destinyId = destiny.getAttribute('id');
        }else{
            destinyId = destiny;
        }

        try {
            for(i in access){        
                if(access[i].descr == destinyId ){
                    retorno = access[i].value.includes(grantKey);
                }                
            }
            
        } catch (error) {
            console.warn(error.message);
        }
        return retorno;
    },
    fetchToPage: (destiny, urlHtml, urlJs) => {
        //debugger;
        if(!destiny) return false;
        if(!urlHtml) return false;
        if(!lzInicial.hasAccess(destiny, 'V')){
            urlHtml = 'view/pages/accessDenied';
            urlJs = null;
        }
        
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
    populate: function(form, data, basename) {

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
                    if(element.length){
                        for( var j=0; j < element.length; j++ ) {
                            element[j].checked = ( value.indexOf(element[j].value) > -1 );
                        }
                    }else{
                        element.checked = ( value.indexOf(element.value) > -1 );
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
    modules: {
        lzModal: "assets/module/pages/lzModal"
    },
    modulesJs: {
        lzModal: "assets/module/js/lzModal"
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

document.querySelector('#btnSingOut').addEventListener('click', (event) => {
    lzInicial.singOut();
});

lzInicial.init();