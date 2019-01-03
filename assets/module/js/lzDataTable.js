/*
*** HTML TABLE MODEL ***
<table id="ltsIdentificacao" class="table table-sm nowrap mt-2" style="width: 100%">
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
    //options = {data, page, tabId, pageId}
    setTable: (options) => {
        let table = document.querySelector(options.tabId);
        let theadTr = document.querySelector(options.tabId.concat(' > thead > tr'));
        let tbody =  document.querySelector(options.tabId.concat(' > tbody'));
        
        //LIMPA TABELA A CADA PESQUISA
        document.querySelectorAll(options.tabId.concat(' > tbody tr')).forEach((row) => {
            row.remove();
        });

        options.data.content.forEach(keyValue => {
            let tr = document.createElement('tr');
            for(let th in theadTr.cells){
                if (theadTr.cells[th] instanceof HTMLElement){
                    let colName = theadTr.cells[th].getAttribute('data-column'); 
                    let colAlias = theadTr.cells[th].getAttribute('data-alias');
                    let colMask = theadTr.cells[th].getAttribute('data-mask'); 
                    let colLimit = theadTr.cells[th].getAttribute('data-limit'); 
                    let colIcon = theadTr.cells[th].getAttribute('data-icon');
                    let colOptions = {
                        mask: colMask,
                        limit: colLimit,
                        icons: colIcon,
                        alias: colAlias
                    }; 
                    if(colOptions.icons){
                        let icons = colOptions.icons.split(',');
                        lzDataTable.__setTdIcons(icons, tr);
                    }else{   
                        for(let key in keyValue) {
                            if(colName == key){  
                                if(colOptions.alias) colName = colAlias;                            
                                let value = lzDataTable.setMask(keyValue[colName], colOptions);
                                lzDataTable.__setTdValue(colOptions, value, tr);
                            }
                        }
                    }
                }
            }
            tbody.appendChild(tr);
        });
        if(options.pageId && new Number(options.data.totalPages)>0){ 
            let total = new Number(options.data.totalPages);
            let objPagination = document.querySelector(options.pageId);
            objPagination.innerHTML = "";
            for(let i=0; i<new Number(options.data.totalPages); i++){
                lzDataTable.setPageBtn(objPagination, options, i);
            }
        }
    },
    __setTdIcons:(icons, tr) => {
        let td = document.createElement('td');            
        td.setAttribute('class', 'text-nowrap text-right');
        for(let i=0; i<icons.length; i++){        
            let iTag = lzDataTable.__getTableIcon(icons[i]);
            td.appendChild(iTag);
        }
        tr.appendChild(td);
    },
    __setTdValue: (colOptions, value, tr) => {
        let txt = document.createTextNode(lzDataTable.setLimit(colOptions, value));
        let td = document.createElement('td');
            td.setAttribute('title', value);
            td.setAttribute('class', 'text-nowrap');
            td.appendChild(txt);
            tr.appendChild(td);
    },
    __getTableIcon: (icon) => {
        let fa = 'fa-bug';
        switch(icon){
            case '_TRASH':
                fa = 'fa-trash';
                break;
            case '_EDIT':
                fa = 'fa-pencil-square-o';
                break;
        }
        let i = document.createElement('i');
            i.setAttribute('class', 'ml-3 fa fa-lg '+fa);
            i.setAttribute('aria-hidden', true);
        return i;
    },
    setPageBtn: (objPagination, options, i) => {
        let more = false;
        let label = i+1;
        if(i>=9){
            more = true;
            label = '...';
        }
        let li = document.createElement('li');
        if(i==new Number(options.page)){
            li.setAttribute('class', 'page-item active');
        }else{
            if(more){
                li.setAttribute('class', 'page-item desabled');
            }else{
                li.setAttribute('class', 'page-item')
            }
        }
        let a = document.createElement('a');
            a.setAttribute('class', 'page-link');
            a.setAttribute('href', '#');
        let aNumber = document.createTextNode(label);

        a.appendChild(aNumber);
        li.appendChild(a);
        objPagination.appendChild(li);
    },
    setLimit: (colOptions, str) => {
        //LIMIT
        if(colOptions.limit){
            if(str.length > new Number(colOptions.limit)){
                str = str.slice(0, colOptions.limit).concat('...');
            }
        }
        return str;
    },
    setMask: (value, colOptions) => {
        let str = new String(value);
        let mask = colOptions.mask;

        //NULL
        if(str=="null"){
            return str.replace("null", "- - -");
        }

        //MASK
        if(mask){
            switch(mask){
                case 'TELEFONE':
                    if(str.length==11) mask = '(00) 00000-0000';
                    if(str.length==9) mask = '00000-0000';
                    if(str.length==10) mask = '(00) 0000-0000';
                    if(str.length==8) mask = '0000-0000';
                    break;
                case 'CPF_CNPJ': //184.840.038-17
                    if(str.length>11) mask = '00.000.000/000-00';
                    if(str.length<=11) mask = '000.000.000-00';
                    break;
                case 'RG_IE': //20.330.138-8
                    mask = '00.000.000-0';
                    break;
            }

            var formatter = new StringMask(mask, {reverse: true});
            return formatter.apply(str);
        }

        return new String(str);
    }
};