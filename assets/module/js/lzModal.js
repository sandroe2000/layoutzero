let lzModal = {
    init: () => {
        let modal = document.querySelector('#modalCenter');
    },
    fetchToPage: (destiny, urlHtml, urlJs, title) => {
        //debugger;
        if(!destiny) return false;
        if(!lzInicial.hasAccess(destiny, 'V')) return false;
        if(!urlHtml) return false;

        fetch(lzInicial.modules.lzModal.concat('.html'))
            .then(response => { 
                return response.text();
            })
            .then(_html => { 
                return destiny.innerHTML = _html;
            })
            .then(_load => {
                if(lzInicial.modulesJs.lzModal){
                    let body = document.getElementsByTagName('body')[0];
                    let buildJS = true;
                    document.querySelectorAll('script').forEach(script => {
                        //debugger;
                        if(script.src.includes(lzInicial.modulesJs.lzModal)){
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
                        script.src = lzInicial.modulesJs.lzModal.concat('.js');
                        body.appendChild(script);
                    }
                }
                fetch(urlHtml.concat('.html'))
                    .then(response => { 
                        return response.text();
                    })
                    .then(_html2 => { 
                        if(!lzInicial.hasAccess(document.getElementById('SEC_INSIDE_MODAL'), 'V')) return false;
                        return document.getElementById('SEC_INSIDE_MODAL').innerHTML = _html2;
                    })
                    .then(_load2 => {
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
                            if(title){
                                document.querySelector('#modalLongTitle').innerHTML = title;
                            }
                        }
                    })
                    .catch (error => {
                        console.warn(error.message);
                    });
            })
            .then(exec => {
                lzModal.show();
            })
            .catch (error => {
                console.warn(error.message);
            });
    },
    show: () => {
        //let modal = document.querySelector('#modalCenter');
        //let modalInstance = new Modal(modal);
        //modalInstance.show({
        //    backdrop: 'static',
        //    keyboard: false
        //});
        $('#modalCenter').modal({
            backdrop: 'static',
            keyboard: false,
            show: true
        })
    },
    hide: () => {
        //let modal = document.querySelector('#modalCenter');
        //let modalInstance = new Modal(modal);
        //modalInstance.hide();
        $('#modalCenter').modal('hide');
    }
};
lzModal.init();