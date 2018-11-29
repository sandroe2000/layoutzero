let lzModal = {
    init: () => {
        $('#modalCenter').on('hide.bs.modal', function(event) {

            document.querySelectorAll('.modal-backdrop').forEach(item => {
                item.remove();
            });
            document.querySelectorAll('.modal').forEach(item => {
                item.remove();
            });
        });
    },
    openModal: (urlHtml, urlJs) => {
        //debugger;
        if(!document.getElementById('secModal')) return false;
        if(!lzInicial.hasAccess(document.getElementById('secModal'), 'V')) return false;
        if(!urlHtml) return false;

        fetch(lzInicial.modules.lzModal.concat('.html'))
            .then(response => { 
                return response.text();
            })
            .then(_html => { 
                return document.getElementById('secModal').innerHTML = _html;
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
                        if(!lzInicial.hasAccess(document.getElementById('secInsideModal'), 'V')) return false;
                        return document.getElementById('secInsideModal').innerHTML = _html2;
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
                        }
                    })
                    .catch (error => {
                        console.warn(error.message);
                    });
            })
            .then(exec => {
                $('#modalCenter').modal('show');
            })
            .catch (error => {
                console.warn(error.message);
            });
    }
};
lzModal.init();