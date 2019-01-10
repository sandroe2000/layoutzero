let dbName ='lzDB';
let lzIndexedDB = {
    init: () => {
        let request = window.indexedDB.open(dbName, );
        request.onupgradeneeded = event => {
            const db = event.target.result;
            //TABLE AUTH
            const authStore = db.createObjectStore("auth", {keyPath: "login"});
                  authStore.createIndex("Authorization", "Authorization", {unique: false});
                  authStore.createIndex("Grants", "Grants", {unique: false});
        };
    }
};
lzIndexedDB.init();