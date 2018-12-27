let dbName ='lzDB';
let lzIndexedDB = {
    init: () => {
        let request = window.indexedDB.open(dbName, 2);
        request.onupgradeneeded = event => {
            const db = event.target.result;
            //TABLE AUTH
            const authStore = db.createObjectStore("auth", {keyPath: "login"});
                  authStore.createIndex("Authorization", "Authorization", {
                      unique: false
                  });
        };
    }
};
lzIndexedDB.init();