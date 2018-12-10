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
    send: () => {
        let login = document.querySelector('#login').value;
        let senha = document.querySelector('#senha').value;
        
        if(!login.length || !senha.length){
            alertify.alert('Atenção', 'Os campos "Login" e "Senha" são obrigatórios!')
            .set('closable', false);
            
            return false;			
        }
        
        let url = `http://localhost:3000/funcionarios?email=${login}&senha=${sha1(senha)}`;

        fetch(url)
            .then(response => {
                return response.json();            
            })
            .then(body => {
                return lzIndexedDB.add('funcionarios', body);
            })
            .then(dbItem => {
                location.href = 'index.html';
            })
            .catch (error => {
                console.warn(error.message);
            });

    }
};
lzLogin.init();