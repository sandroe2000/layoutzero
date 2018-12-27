let lzLogin = {
    init: () => {
        alertify.defaults.transition = "slide";
        alertify.defaults.theme.ok = "btn btn-primary";
        alertify.defaults.theme.cancel = "btn btn-danger";
        alertify.defaults.theme.input = "form-control";
        let btnSend = document.querySelector('#btnSend').addEventListener('click', (event) => {
            lzLogin.send(event);
        });
    },
    host: 'http://localhost/app/',
    send: () => {
        if(!document.querySelector('#login').value.length || !document.querySelector('#senha').value.length){
            alertify
                .alert('Atenção', 'Os campos "Login" e "Senha" são obrigatórios!')
                .set('closable', false);            
            return false;			
        }

        fetch(lzLogin.host.concat('login'), { 
            method: "POST",
            headers: new Headers().append('accept', 'application/json'),
            mode: 'cors',
            body: JSON.stringify({
                "username":document.querySelector('#login').value, 
                "password":document.querySelector('#senha').value
            })
        }).then(response => {
            if(!response.ok){
                alertify
                .alert('Atenção', response.statusText)
                .set('closable', false);            
            return false;
                return false;
            }
            return response.headers;   
        }).then(header => {
            
            let authItem = {
                login: document.querySelector('#login').value,
                Authorization: header.get('Authorization').replace('Bearer ','')
            };
            window.indexedDB.open(dbName, 2).onsuccess = (event) => {
                const db = event.target.result;
                const transaction = db.transaction(["auth"], "readwrite");
                const authStore = transaction.objectStore("auth");
                authStore.clear().onsuccess = function(event) {
                    authStore.add(authItem);
                };                
                transaction.oncomplete = () => {
                    db.close();
                    location.href = 'home.html';
                };
            };
        })
        .catch((err) => {
            console.log(err);
        });
    }
};
lzLogin.init();