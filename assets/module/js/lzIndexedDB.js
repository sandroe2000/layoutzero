let lzDB;
let objectStore;
let lzIndexedDB = {
    init: () => {
        
        let lzDBOpenRequest = window.indexedDB.open("lzDB", 4);

        lzDBOpenRequest.onerror = (event) => {
            console.log('Error loading database.');
        };

        lzDBOpenRequest.onsuccess = (event) => {
            lzDB = event.target.result;
        };

        lzDBOpenRequest.onupgradeneeded = (event) => {

            if(!lzDB){
                lzDB = event.target.result;
            };

            objectStore = lzDB.createObjectStore("funcionarios", { keyPath: "id" });
            objectStore.createIndex("email", "email", { unique: true });

            objectStore = lzDB.createObjectStore("areas", { keyPath: "id" });
            objectStore.createIndex("descricao", "descricao", { unique: false });

            objectStore = lzDB.createObjectStore("areasFuncionarios", { keyPath: "idArea" });
            objectStore.createIndex("idFuncionario", "idFuncionario", { unique: true });

            objectStore = lzDB.createObjectStore("cargos", { keyPath: "id" });
            objectStore.createIndex("descricao", "descricao", { unique: false });
        };
    },
    add: (table, newItem) => {

        let transaction = lzDB.transaction([table], "readwrite");        
            
        transaction.oncomplete = () => {
            console.log('Transaction completed: database modification finished.');
        };

        let objectStore = transaction.objectStore(table);

        let objectStoreRequest = objectStore.add(newItem[0]);

        objectStoreRequest.onsuccess = (event) => {
            console.log('newItem added.');
        };
   }
};
lzIndexedDB.init();