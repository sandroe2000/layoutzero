/*
*** HTML TABLE MODEL ***
<table id="ltsIdentificacao" class="table table-condensed nowrap mt-2" style="width: 100%">
    <thead>
        <tr>
            <th data-column="id">Matrícula</th>
            <th data-column="nome">Nome/Empresa</th>
            <th data-column="CPF">CPF/CNPJ</th>
            <th data-column="dataNascimento">Dt. Nascimento</th>
            <th data-column="telefone">Telefone</th>
        </tr>
    </thead>
    <tbody></tbody>
</table>
*/
let lzDataTable = {
    setTable: (data, tableId) => {
        let table = document.querySelector(tableId);
        let theadTr = document.querySelector(tableId.concat(' > thead > tr'));
        let tbody =  document.querySelector(tableId.concat(' > tbody'));
        data.forEach(keyValue => {
            let tr = document.createElement('tr');
            for(let th in theadTr.cells){
                if (theadTr.cells[th] instanceof HTMLElement){
                    let colName = theadTr.cells[th].getAttribute('data-column');                
                    for(let key in keyValue) {
                        let value = keyValue[key];
                        let txt = document.createTextNode(value);
                        let td = document.createElement('td');
                        if(colName == key){        
                            td.appendChild(txt);
                            tr.appendChild(td);
                        }
                    }
                }
            }
            tbody.appendChild(tr);
        });
    }
};