let usuario = {
    init: () => {
        document.querySelector('#btnUsuarioNovo').addEventListener('click', (event) => {
            usuario.tr = null;
            usuario.item = null;
            usuario.carregarModal();
        } ,false);
    },
    carregarModal: () => {
        let title = 'Cadastro - Usuário';
        let destiny = document.querySelector('#secModal');
        let urlHtml = 'view/pages/usuarioModal';
        let urlJs = 'view/scripts/usuarioModal';        
        lzModal.fetchToPage(destiny, urlHtml, urlJs, title);
    }
};
usuario.init();