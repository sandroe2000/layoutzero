let dbName ='lzDB';
let connection = new JsStore.Instance(new Worker('assets/components/jsstore/dist/jsstore.worker.js'));
let lzIndexedDB = {
    init: () => {
        connection.isDbExist(dbName).then((isExist) => {
            if (isExist) {
                connection.openDb(dbName);
            } else {
                let database = lzIndexedDB.getDbSchema();
                connection.createDb(database);
            }
        }).catch((err) => {
            console.error(err);
        });
    },
    get: (table, col, val) => {
        connection.select({
            from: table,
            where: {
                [col]: val
            }
        }).then((results) => {
            // results will be array of objects
            console.log(results.length + 'record found');
        }).catch((err) => {
            console.log(err);
        });
    },
    add: (table, value) => {
        connection.insert({
            into: table,
            values: [value]
        }).then((rowsInserted) => {
            if (rowsInserted > 0) {
                console.log('successfully added');
            }
        }).catch((err) => {
            console.log(err);
        });
    },
    update: (table, col, objJson) => {
        connection.update({ 
            in: table,
            where: {
                [col]: {
                    like: '%'+val+'%'
                }
            },
            set: objJson
        }).then((rowsUpdated) => {
            console.log(rowsUpdated + ' rows updated');
        }).catch((err) => {
            console.log(err);
        });
    },
    getDbSchema: () => {

        const tbAuth = {
            name: "auth",
            columns: [
                { 
                    name: 'login',
                    dataType: 'string'
                },
                { 
                    name: 'Authorization',
                    dataType: 'string'
                }
            ]
        };

        let lzDB = {
            name: dbName,
            tables: [tbAuth]
        };

        return lzDB;
    }
};
lzIndexedDB.init();