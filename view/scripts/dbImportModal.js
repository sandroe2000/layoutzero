let dbImportModal = {
    init: () => {
        
        document.querySelector('#dbImportModalDriver').addEventListener('change', dbImportModal.setDriverName, false);        
        document.querySelector('#dbImportModalHost').addEventListener('change', dbImportModal.setHost, false);
        document.querySelector('#dbImportModalPort').addEventListener('change', dbImportModal.setPort, false);
        document.querySelector('#dbImportModalDBName').addEventListener('change', dbImportModal.setDatabaseName, false);
        document.querySelector('#btDbImportModalTest').addEventListener('click', dbImportModal.connTest, false);

        dbImportModal.loadTable();
        document.querySelector('#tableDbImportModal > tbody').addEventListener('click', dbImportModal.edit ,false);
    },
    loadTable: () => {
        let url = lzInicial.host.concat('/dbimportconnections/pageable');
        url += '?page='.concat(dbImportModal.page);
        url += '&size='.concat(document.querySelector('#sizeDbImportModal').value);

        fetch(url, { 
            method: 'GET',
            headers: lzInicial.headers
        }).then(response => {
                return response.json();            
        }).then(response => {
            return lzDataTable.list = response;
        }).then(data => {
            let options = {
                data: data, 
                page: dbImportModal.page, 
                tabId: '#tableDbImportModal', 
                pageId: '#paginationDbImportModal'
            };
            lzDataTable.setTable(options);
        });
    },
    edit: (event) => {
        event.preventDefault();
        dbImportModal.tr = event.target.closest('tr');
        let el = event.target.classList.contains('fa-pencil-square-o');
        let chk = '';
        if(el){
            if(!lzInicial.hasAccess('DB_IMPORT_MODAL', 'W')) {
                //alertify.error('Você não possui acesso a esta função!');
                //return false;
            }
            if(isDate(dbImportModal.tr.children[2].textContent, 'dd/MM/yyyy')){
                chk = 'DISABLED';
            }

            let url = lzInicial.host.concat('/dbimportconnections/').concat(dbImportModal.tr.children[0].textContent);
            fetch(url, { 
                method: 'GET',
                headers: lzInicial.headers
            }).then(response => {
                    return response.json();            
            }).then(response => {
                return lzDataTable.list = response;
            }).then(data => {
                dbImportModal.item = {
                    dbImportModalId: data.id,
                    dbImportModalConnName: data.connection,
                    dbImportModalDriver: data.driver,
                    dbImportModalHost: data.host,
                    dbImportModalPort: data.port,
                    dbImportModalDBName: data.dbName,
                    dbImportModalOwner: data.owner,
                    dbImportModalUserName: data.userName,
                    dbImportModalPassword: data.password,
                    dbImportModalURL: data.url,
                    dbImportModalDisabled: chk
                };
                lzInicial.populate(document.querySelector('#formDbImportModal'), dbImportModal.item);
            });
        }
    },
    item: {},
    tr: null,
    page: 0,
    list: [],
    driver: "",
    hostname: "",
    port: "",
    databaseName: "",
    setDriverName: (event) => {

        /** Java JDBC Driver for Microsoft Access Database
            <dependency>
                <groupId>net.sf.ucanaccess</groupId>
                <artifactId>ucanaccess</artifactId>
                <version>4.0.4</version>
            </dependency>
         */
        
        let driverName = document.querySelector('#dbImportModalDriver');        

        switch (driverName[driverName.selectedIndex].value) {
            case 'ORACLE':
                dbImportModal.driver = 'jdbc:oracle:thin:';
                break;
            case 'MYSQL':
                dbImportModal.driver = 'jdbc:mysql:';
                break;
            case 'POSTGRE':
                dbImportModal.driver = 'jdbc:postgresql:';
                break;
            case 'SQL_SERVER':
                dbImportModal.driver = 'jdbc:ucanaccess:';
                break;
            case 'ACCESS':
                dbImportModal.driver = 'jdbc:ucanaccess:';
                break;
        }
        dbImportModal.setURL();        
    },
    setHost: () => {
        let separador = '//';
        if(dbImportModal.driver.includes('oracle')) separador = '@';
        dbImportModal.hostname = separador + event.target.value;
        dbImportModal.setURL(); 
    },
    setPort: () => {
        let separador = ':';
        dbImportModal.port = separador + event.target.value;
        dbImportModal.setURL(); 
    },
    setDatabaseName: () => {
        let separador = '/';
        dbImportModal.databaseName = separador + event.target.value;
        dbImportModal.setURL(); 
    },
    setURL: () => {
        let url = document.querySelector('#dbImportModalURL');
        url.value = dbImportModal.driver + dbImportModal.hostname + dbImportModal.port + dbImportModal.databaseName;
    },
    connTest: () => {

        let driverName = document.querySelector('#dbImportModalDriver');

        if(driverName[driverName.selectedIndex].value.includes('ORACLE')){
            alertify.success('Connection successfully tested!'); 
        }else{
            alertify.error('Cannot open connection!');
        }
    }
};
dbImportModal.init();