let lzLeftNav = {
    init: () => {
        document.querySelector('nav').addEventListener('click', function(event){
            let _obj = lzLeftNav.__getEventTargetObject(event);
            if(!_obj) return false;            
            lzLeftNav.__setNavStyle(_obj);    
            app.fetchToPage(document.querySelector('main div.container-fluid'), _obj.getAttribute('data-html'), _obj.getAttribute('data-js'));
        }, false);
    },
    __getEventTargetObject: (event) => {
        let pEl = event.target.parentNode;
        let cEl = event.target;
        let obj = pEl;
        if(cEl.nodeName=='NAV'){
            return null;
        }
        if(cEl.classList.contains('btn')){
            obj = cEl;
        }
        return obj;
    },
    __setNavStyle: (obj) => {
        document.querySelectorAll('nav button').forEach(btn => {
            btn.classList.remove('active');
        });
        obj.classList.add('active');
    }
};  
lzLeftNav.init();