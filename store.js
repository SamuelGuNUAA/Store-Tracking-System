/*Script Coding*/
var data = new Object;
var datatable = null;
var db = openDatabase("MyData","", "My Sotre Database", 1024*1024*2);

function init(){
    //trace
    //alert("yyy5");
    //trace    
    datatable = document.getElementById("datatable");
    showAllData(true);
 //   ClearData();
}


    function tbxBrand_onblur(){
        //alert("onblur 1");
        return;
        var brand=document.getElementById("tbxBrand").value;
        document.getElementById("tbxBrandName").value="";
        var name;
        db.transaction(function(tx){
            tx.executeSql("SELECT*FROM brand where code=?", [brand], function(tx,rs){
                name=rs.rows.time(0).name;
                document.getElementById("tbxBrandName").value=name;
            });
        });
    }

function tbxPerson_onblur(){
    var person = document.getElementById("tbxPerson").value;
    document.getElementById("tbxPersonName").value="";
    var name;
    db.transaction(function(tx){
        tx.executeSql("SELECT * FROM person where code=?", [person], function(tx, rs){
            name = rs.rows.item(0).name;
            document.getElementById("tbxPersonName").value = name;
        });
    });
}

function autoCalculateFinalPrice_onclick(){
    
    document.getElementById("tbxFinalPrice").value= document.getElementById("tbxOrgPrice").value - document.getElementById("tbxDiscount").value;
    document.getElementById("tbxMoneyRMB").value= document.getElementById("tbxFinalPrice").value * document.getElementById("tbxNum").value;
}
/*
function tbxFinalPrice_onblur(){

    document.getElementById("tbxFinalPrice").value= document.getElementById("tbxOrgPrice").value - document.getElementById("tbxDiscount").value;
}
*/

function btnSearchGoods_onclick(){
    alert("search 1");
    
    var rc,w;
    rc = window.showModalDialog('SearchGoods.html','','dialogHeight:720px;dialogWidth:700px;scroll:no');
    //alert("search 1b");
    if (rc==null){
        alert("search 1a");
        return;
    }
    document.all.item("tbxGoodsCode").value=rc;
    
}

function btnSearchBrand_onclick(){
    alert("search 2");
}

function checkOrderNumExist(){
    alert("cp119")
    db.transaction(function(tx){
        tx.executeSql("SELECT ordernum FROM orders", [], function(tx, rs){
            alert("cp111");
            for (var i=0; i<rs.rows.length; i++){
                alert("CP22");
                alert(rs.rows.item(i).ordernum + "::" + data.Code);
                if(rs.rows.item(i).ordernum == data.Code){
                    alert("Order Number already exists!!!");
                    return true;
                }
            }
        },
        function(tx, error){
            alert(error.source + "::" + error.message);
        });
    });
    alert("8899");
    return false;
}

function testWW2()
    {
        alert("777");
        if(ffg)
            return;
        db.transaction(function(bx){
        bx.executeSql("INSERT INTO orders VALUES(?,?,?,?,?,?,?,?,?,?,?)",
                        [data.Code, data.Date, data.GoodsCode, data.Customer, data.Brand, data.Num, data.OrgPrice, data.Discount, data.FinalPrice, data.MoneyRMB, data.Comment],
                     function(bx, rx){
                        alert(ffg + "Data saved!");
                        showAllData(false);
                        btnNew_onclick();
                    },
                     function(bx, error){
                        alert(error.source + "::" + error.message);
                    }
                     );
    });}

function btnAdd_onclick(){
    alert("cp11");
//var ffg=true;
//tbxCode, tbxDate, tbxGoodsCode, tbxCustomer, tbxBrand, tbxNum, tbxOrgPrice, tbxDiscount, tbxFinalPrice, tbxMoneyRMB, tbxComment    
    data.Code = document.getElementById("tbxCode").value;
    data.Date = document.getElementById("tbxDate").value;
    data.GoodsCode = document.getElementById("tbxGoodsCode").value;
    data.Customer = document.getElementById("tbxCustomer").value;
    //alert(data.Brand);
    data.Brand = document.getElementById("tbxBrand").value;
    data.Num = document.getElementById("tbxNum").value;
    data.OrgPrice = document.getElementById("tbxOrgPrice").value;
    data.Discount = document.getElementById("tbxDiscount").value;
    data.FinalPrice = document.getElementById("tbxFinalPrice").value;
    data.MoneyRMB = document.getElementById("tbxMoneyRMB").value;
    data.Comment = document.getElementById("tbxComment").value;

//ffg=checkOrderNumExist();

//alert("CP333");
//    testWW2(ffg);
    
    db.transaction(function(tx){
        tx.executeSql("INSERT INTO orders VALUES(?,?,?,?,?,?,?,?,?,?,?)",
                        [data.Code, data.Date, data.GoodsCode, data.Customer, data.Brand, data.Num, data.OrgPrice, data.Discount, data.FinalPrice, data.MoneyRMB, data.Comment],
                     function(tx, rs){
                        alert("Data saved!");
                        showAllData(false);
                        btnNew_onclick();
                    },
                     function(tx, error){
                        alert(error.source + "::" + error.message);
                    }
                     );
    });
    
}

function btnUpdate_onclick(){

    //tbxCode, tbxDate, tbxGoodsCode, tbxCustomer, tbxBrand, tbxNum, tbxOrgPrice, tbxDiscount, tbxFinalPrice, tbxMoneyRMB, tbxComment 
    //ordernum, date, itemnum, customer, brand, num, orgprice, discount, finalprice, moneyrmb, comment
    data.Code = document.getElementById("tbxCode").value;
    data.Date = document.getElementById("tbxDate").value;
    data.GoodsCode = document.getElementById("tbxGoodsCode").value;
    data.Customer = document.getElementById("tbxCustomer").value;
    data.Brand = document.getElementById("tbxBrand").value;
    data.Num = document.getElementById("tbxNum").value;
    data.OrgPrice = document.getElementById("tbxOrgPrice").value;
    data.Discount = document.getElementById("tbxDiscount").value;
    data.FinalPrice = document.getElementById("tbxFinalPrice").value;
    data.MoneyRMB = document.getElementById("tbxMoneyRMB").value;
    data.Comment = document.getElementById("tbxComment").value;  
    
    db.transaction(function(tx){
        tx.executeSql("UPDATE orders set date=?, itemnum=?, customer=?, brand=?, num=?, orgprice=?, discount=?, finalprice=?, moneyrmb=?, comment=? where ordernum=?",
                     [data.Date, data.GoodsCode, data.Customer, data.Brand, data.Num, data.OrgPrice, data.Discount, data.FinalPrice, data.MoneyRMB,data.Comment, data.Code],
                      function(tx, rs){
                            alert("data updated!");
                            showAllData(false);
                        },
                      function(tx, error){
                            alert(error.source + "::" + error.message);
                      }
                     );
    });
}

function btnNew_onclick(){
    document.getElementById("form1").reset();
    document.getElementById("tbxCode").removeAttribute("readonly");
    document.getElementById("btnAdd").disable="";
    document.getElementById("btnUpdate").disable="disabled";
    document.getElementById("btnDelete").disable="disabled";
}

function btnDelete_onclick(){
    data.Code = document.getElementById("tbxCode").value;
    data.GoodsCode = document.getElementById("tbxGoodsCode").value;
    db.transaction(function(tx){
        tx.executeSql("delete from orders where ordernum=? AND itemnum=?", [data.Code, data.GoodsCode], function(tx, rs){
            alert("Data deleted!");
            showAllData(false);
        },
        function(tx, error){
            alert(error.source + "::" + error.message);
        });
    });
    btnNew_onclick();
}

function btnNew_onclick(){
    document.getElementById("form1").reset();
//    document.getElementById("tbxCode").removeAttribute("readonly");
//    document.getElementById("btnAdd").disable="";
//    document.getElementById("btnUpdate").disable="disabled";
//    document.getElementById("btnDelete").disable="disabled";
}

function btnClear_onclick(){
    if (document.getElementById("btnAdd").disabled==false)
        document.getElementById("tbxCode").value="";
    document.getElementById("tbxDate").value="";
    document.getElementById("tbxGoodsCode").value="";
    document.getElementById("tbxCustomer").value="";
    document.getElementById("tbxBrand").value="";
    document.getElementById("tbxNum").value="0";
    document.getElementById("tbxOrgPrice").value="0";
    document.getElementById("tbxDiscount").value="0";
    document.getElementById("tbxFinalPrice").value="0";
    document.getElementById("tbxMoneyRMB").value="0";
    document.getElementById("tbxComment").value="";
}

function tr_onclick(tr,i){
    //var tempArray1, tempArray2, tempArray3;
    var tc=tr.children;
    //tempArray1 = document.getElementById("hiddenBrand").value.split(";");
    //tempArray2 = document.getElementById("hiddenPerson").value.split(";");
    //tempArray3 = document.getElementById("hiddenProduct").value.split(";");
    
  //tbxCode, tbxDate, tbxGoodsCode, tbxCustomer, tbxBrand, tbxNum, tbxOrgPrice, tbxDiscount, tbxFinalPrice, tbxMoneyRMB, tbxComment
    
    document.getElementById("tbxCode").value=tc.item(0).innerHTML;
    document.getElementById("tbxDate").value=tc.item(1).innerHTML;
    document.getElementById("tbxGoodsCode").value=tc.item(2).innerHTML;
    document.getElementById("tbxCustomer").value=tc.item(3).innerHTML;
    //document.getElementById("tbxBrand").value=tempArray1[i];
    document.getElementById("tbxBrand").value=tc.item(4).innerHTML;
    document.getElementById("tbxNum").value=tc.item(5).innerHTML;
    document.getElementById("tbxOrgPrice").value=tc.item(6).innerHTML;
    //document.getElementById("tbxPerson").value=tempArray2[i];
    document.getElementById("tbxDiscount").value=tc.item(7).innerHTML;
    //document.getElementById("tbxProduct").value=tempArray3[i];
    document.getElementById("tbxFinalPrice").value=tc.item(8).innerHTML;
    document.getElementById("tbxMoneyRMB").value=tc.item(9).innerHTML;
    document.getElementById("tbxComment").value=tc.item(10).innerHTML;

    //document.getElementById("tbxCode").setAttribute("readonly", true);
    document.getElementById("btnAdd").disable="disabled";
    document.getElementById("btnUpdate").disable="";
    document.getElementById("btnDelete").disable="";
}

function showAllData(loadPage){
    //trace
    //alert("xxx");
    //trace
    //tbxCode, tbxDate, tbxGoodsCode, tbxCustomer, 
    //tbxBrand, tbxNum, tbxOrgPrice, tbxDiscount, 
    //tbxFinalPrice, tbxMoneyRMB, tbxComment   
    db.transaction(function(tx){
        tx.executeSql("CREATE TABLE IF NOT EXISTS orders(ordernum TEXT, date TEXT, itemnum TEXT, customer TEXT, brand TEXT, num INTEGER, orgprice FLOAT, discount FLOAT, finalprice FLOAT, moneyrmb FLOAT, comment TEXT)", []);
        tx.executeSql("SELECT * FROM orders", [], function(tx, rs){
            if(!loadPage)
                removeAllData();
            for (var i=0; i<rs.rows.length; i++){
                showData(rs.rows.item(i),i);
            }
        },
        function(tx, error){
            alert(error.source + "::" + error.message);
        });
    });
    
/*
        db.transaction(function(tx){
        tx.executeSql("SELECT orders.*, brand.name as brandName, product.name as productName, person.name as personName FROM orders
        inner join brand on orders.brand=brand.code
        inner join person on orders.person=person.code
        inner join product on orders.product=product.code", [],
        function(tx, rs){
        if(!loadPage)
        removeAllData();
        for(var i=0; i<rs.rows.length; i++){
        showData(rs.rows.item(i),i);
        }
        },
        function(tx, error){
        alert(error.source + "::" + error.message);
        });
    });
*/
}

function removeAllData(){
alert("trace 2");        
    datatable=document.getElementById("datatable");
    for (var i=datatable.childNodes.length-1; i>1; i--){
        datatable.removeChild(datatable.childNodes[i]);
    }
    
}

function showData(row, i){
//alert("trace 4"+row.brandName);
//ordernum, date, itemnum, customer, brand, num, orgprice, discount, finalprice, moneyrmb, comment    
    var tr = document.createElement("tr");
    tr.setAttribute("onclick", "tr_onclick(this, "+i+")");
    var td1 = document.createElement("td");
    td1.innerHTML = row.ordernum;
    var td2 = document.createElement("td");
    td2.innerHTML = row.date;
    var td3 = document.createElement("td");
    td3.innerHTML = row.itemnum;
    var td4 = document.createElement("td");
    td4.innerHTML = row.customer;
    var td5 = document.createElement("td");
    td5.innerHTML = row.brand;
    var td6 = document.createElement("td");
    td6.innerHTML = row.num;
    var td7 = document.createElement("td");
    td7.innerHTML = row.orgprice
    var td8 = document.createElement("td");
    td8.innerHTML = row.discount; 
    var td9 = document.createElement("td");
    td9.innerHTML = row.finalprice;
    var td10 = document.createElement("td");
    td10.innerHTML = row.moneyrmb;
    var td11 = document.createElement("td");
    td11.innerHTML = row.comment;
        
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    tr.appendChild(td8);
    tr.appendChild(td9);
    tr.appendChild(td10);
    tr.appendChild(td11);
        
    datatable.appendChild(tr);
    if(document.getElementById("hiddenBrand").value!="")
         document.getElementById("hiddenBrand").value+=";";
     document.getElementById("hiddenBrand").value+=row.brand;
        
    if(document.getElementById("hiddenPerson").value!="")
        document.getElementById("hiddenPerson").value+=";";
    document.getElementById("hiddenPerson").value+=row.brand;
        
    if(document.getElementById("hiddenProduct").value!="")
        document.getElementById("hiddenProduct").value+=";";
    document.getElementById("hiddenProduct").value+=row.brand;
        
}

//Adminstrator
function ClearData(){
    db.transaction(function(tx){
        tx.executeSql("DROP TABLE orders");
    });
}