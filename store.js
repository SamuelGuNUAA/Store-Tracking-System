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
            tx.executeSql("SELECT*FROM brand where ordernum=?", [brand], function(tx,rs){
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
        tx.executeSql("SELECT * FROM person where ordernum=?", [person], function(tx, rs){
            name = rs.rows.item(0).name;
            document.getElementById("tbxPersonName").value = name;
        });
    });
}

//***********************************************//
// Auto fill Price with discount and total Money //
//***********************************************//
function autoCalculateFinalPrice_onclick(){
    
    document.getElementById("tbxFinalPrice").value= document.getElementById("tbxOrgPrice").value - document.getElementById("tbxDiscount").value;
    document.getElementById("tbxMoneyRMB").value= document.getElementById("tbxFinalPrice").value * document.getElementById("tbxNum").value;
}
/*
function tbxFinalPrice_onblur(){
    document.getElementById("tbxFinalPrice").value= document.getElementById("tbxOrgPrice").value - document.getElementById("tbxDiscount").value;
}
*/

//************************************//
// PO search function by Order Number //
//************************************//
function btnSearchByOrderNum_onclick(){
    alert("search by Order Nunber...");
    if(document.getElementById("tbxOrderNum").value!="" && document.getElementById("tbxOrderNum").value!=undefined){
        var OrderNum = document.getElementById("tbxBrand").value;
        
        db.transaction(function(tx){
            tx.executeSql("SELECT*FROM orders where ordernum=?",
                            [OrderNum],
                            function(tx, rs){
                                removeAllData();
                                for (var i=0; i<rs.rows.length; i++){
                                    showData(rs.rows.item(i),i);
                                }
                            },
                            function(tx, error){
                                alert(error.source + "::" + error.message);
                            }
                        );
        });
        
        btnSubmit_Update_Delete_Done();        
    }else
        alert("Please input correct Order Number for searching!");
}

//************************************//
// PO search function by Product Name //
//************************************//
function btnSearchByBrand_onclick(){
    alert("search by product name...");
    if(document.getElementById("tbxBrand").value!="" && document.getElementById("tbxBrand").value!=undefined){
        var Brand = document.getElementById("tbxBrand").value;
        
        db.transaction(function(tx){
            tx.executeSql("SELECT*FROM orders where brand=?",
                            [Brand],
                            function(tx, rs){
                                removeAllData();
                                for (var i=0; i<rs.rows.length; i++){
                                    showData(rs.rows.item(i),i);
                                }
                            },
                            function(tx, error){
                                alert(error.source + "::" + error.message);
                            }
                        );
        });
        
        btnSubmit_Update_Delete_Done();        
    }else
        alert("Please input Product Name for searching!");
}

//************************************//
// PO search function by Customer     //
//************************************//
function btnSearchByCustomer_onclick(){
    alert("search by Customer...");
    if(document.getElementById("tbxCustomer").value!="" && document.getElementById("tbxCustomer").value!=undefined){
        var Customer = document.getElementById("tbxCustomer").value;
        
        db.transaction(function(tx){
            tx.executeSql("SELECT*FROM orders where customer=?",
                            [Customer],
                            function(tx, rs){
                                removeAllData();
                                for (var i=0; i<rs.rows.length; i++){
                                    showData(rs.rows.item(i),i);
                                }
                            },
                            function(tx, error){
                                alert(error.source + "::" + error.message);
                            }
                        );
        });
        
        btnSubmit_Update_Delete_Done();        
    }else
        alert("Please input correct Customer for searching!");
}


function checkOrderNumExist(){
    alert("cp119")
    db.transaction(function(tx){
        tx.executeSql("SELECT ordernum FROM orders", [], function(tx, rs){
            alert("cp111");
            for (var i=0; i<rs.rows.length; i++){
                alert("CP22");
                alert(rs.rows.item(i).ordernum + "::" + data.OrderNum);
                if(rs.rows.item(i).ordernum == data.OrderNum){
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
                        [data.OrderNum, data.Date, data.ItemNum, data.Customer, data.Brand, data.Num, data.OrgPrice, data.Discount, data.FinalPrice, data.MoneyRMB, data.Comment],
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
//tbxOrderNum, tbxDate, tbxItemNum, tbxCustomer, tbxBrand, tbxNum, tbxOrgPrice, tbxDiscount, tbxFinalPrice, tbxMoneyRMB, tbxComment    
    data.OrderNum = document.getElementById("tbxOrderNum").value;
    data.Date = document.getElementById("tbxDate").value;
    data.ItemNum = document.getElementById("tbxItemNum").value;
    data.Customer = document.getElementById("tbxCustomer").value;
    //alert(data.Brand);
    data.Brand = document.getElementById("tbxBrand").value;
    data.Num = document.getElementById("tbxNum").value;
    data.OrgPrice = document.getElementById("tbxOrgPrice").value;
    data.Discount = document.getElementById("tbxDiscount").value;
    data.FinalPrice = document.getElementById("tbxFinalPrice").value;
    data.MoneyRMB = document.getElementById("tbxMoneyRMB").value;
    data.Comment = document.getElementById("tbxComment").value;

    if(data.OrderNum=="" || data.OrderNum==undefined){
        alert("MUST INPUT ORDER NUMBER!!!")
        btnSubmit_Update_Delete_Done();
        return;
    }
//ffg=checkOrderNumExist();

//alert("CP333");
//    testWW2(ffg);
    
    db.transaction(function(tx){
        tx.executeSql("INSERT INTO orders VALUES(?,?,?,?,?,?,?,?,?,?,?)",
                        [data.OrderNum, data.Date, data.ItemNum, data.Customer, data.Brand, data.Num, data.OrgPrice, data.Discount, data.FinalPrice, data.MoneyRMB, data.Comment],
                     function(tx, rs){
                        alert("Data saved!");
                        showAllData(false);
                        //btnNew_onclick();
                    },
                     function(tx, error){
                        alert(error.source + "::" + error.message);
                    }
                     );
    });

//OrderNum field back to readonly and reset form
    btnSubmit_Update_Delete_Done();
}

function btnUpdate_onclick(){

    //tbxOrderNum, tbxDate, tbxItemNum, tbxCustomer, tbxBrand, tbxNum, tbxOrgPrice, tbxDiscount, tbxFinalPrice, tbxMoneyRMB, tbxComment 
    //ordernum, date, itemnum, customer, brand, num, orgprice, discount, finalprice, moneyrmb, comment
    data.OrderNum = document.getElementById("tbxOrderNum").value;
    data.Date = document.getElementById("tbxDate").value;
    data.ItemNum = document.getElementById("tbxItemNum").value;
    data.Customer = document.getElementById("tbxCustomer").value;
    data.Brand = document.getElementById("tbxBrand").value;
    data.Num = document.getElementById("tbxNum").value;
    data.OrgPrice = document.getElementById("tbxOrgPrice").value;
    data.Discount = document.getElementById("tbxDiscount").value;
    data.FinalPrice = document.getElementById("tbxFinalPrice").value;
    data.MoneyRMB = document.getElementById("tbxMoneyRMB").value;
    data.Comment = document.getElementById("tbxComment").value;  
    
    db.transaction(function(tx){
        tx.executeSql("UPDATE orders set date=?, customer=?, brand=?, num=?, orgprice=?, discount=?, finalprice=?, moneyrmb=?, comment=? where ordernum=? AND itemnum=?",
                     [data.Date, data.Customer, data.Brand, data.Num, data.OrgPrice, data.Discount, data.FinalPrice, data.MoneyRMB, data.Comment, data.OrderNum, data.ItemNum],
                      function(tx, rs){
                            alert("data updated!");
                            showAllData(false);
                        },
                      function(tx, error){
                            alert(error.source + "::" + error.message);
                      }
                     );
    });
    btnSubmit_Update_Delete_Done();
}

function btnDelete_onclick(){
    data.OrderNum = document.getElementById("tbxOrderNum").value;
    data.ItemNum = document.getElementById("tbxItemNum").value;
    db.transaction(function(tx){
        tx.executeSql("delete from orders where ordernum=? AND itemnum=?", [data.OrderNum, data.ItemNum], function(tx, rs){
            alert("Data deleted!");
            showAllData(false);
        },
        function(tx, error){
            alert(error.source + "::" + error.message);
        });
    });
    btnSubmit_Update_Delete_Done();
}

function btnSubmit_Update_Delete_Done(){
    document.getElementById("form1").reset();
    document.getElementById("tbxOrderNum").setAttribute("readonly", true);
    document.getElementById("btnAdd").disabled=true;
    document.getElementById("btnUpdate").disabled="disabled";
    document.getElementById("btnDelete").disabled="disabled";
}

function btnNew_onclick(){
    document.getElementById("form1").reset();
    document.getElementById("tbxOrderNum").removeAttribute("readonly");
    //Enable edit on btn Submit
    document.getElementById("btnAdd").disabled=false;
    document.getElementById("btnUpdate").disabled="disabled";
    document.getElementById("btnDelete").disabled="disabled";
}

function btnClear_onclick(){
//Always keep OrderNum
//    if (document.getElementById("btnAdd").disabled==false)
//        document.getElementById("tbxOrderNum").value="";
    document.getElementById("tbxDate").value="";
    document.getElementById("tbxItemNum").value="0";
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
    
  //tbxOrderNum, tbxDate, tbxItemNum, tbxCustomer, tbxBrand, tbxNum, tbxOrgPrice, tbxDiscount, tbxFinalPrice, tbxMoneyRMB, tbxComment
    
    document.getElementById("tbxOrderNum").value=tc.item(0).innerHTML;
    document.getElementById("tbxDate").value=tc.item(1).innerHTML;
    document.getElementById("tbxItemNum").value=tc.item(2).innerHTML;
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

    //Button attribute setting:
    document.getElementById("tbxOrderNum").setAttribute("readonly", true);
    document.getElementById("btnAdd").disabled="disabled";
    document.getElementById("btnUpdate").disabled=false;
    document.getElementById("btnDelete").disabled="";
}

function showAllData(loadPage){
    //trace
    //alert("xxx");
    //trace
    //tbxOrderNum, tbxDate, tbxItemNum, tbxCustomer, 
    //tbxBrand, tbxNum, tbxOrgPrice, tbxDiscount, 
    //tbxFinalPrice, tbxMoneyRMB, tbxComment   
    db.transaction(function(tx){
        tx.executeSql("CREATE TABLE IF NOT EXISTS orders(ordernum INTEGER, date TEXT, itemnum TEXT, customer TEXT, brand TEXT, num INTEGER, orgprice FLOAT, discount FLOAT, finalprice FLOAT, moneyrmb FLOAT, comment TEXT)", []);
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