import func from '../common/func.js';
import constant from '../common/constant.js';
let c_func=new func();
export default class load_html{
    constructor(){}
    load_category(data,current){
        var html='<ul>';
        if(data.length > 0){
            for(var item of data){
                if(JSON.stringify(item["childcategory"])=="[]"){
                    html+=`<li><a href="#home">${item["name"]}</a></li>`;
                }
                else{
                    html+=`<li>
                    <a href="#">${item["name"]} <span class="expand">►</span></a>
                    <ul class="sub-menu">`;
                        for(var item_child of item["childcategory"]){
                            html+=`<li><a href="#product_list" class="link_reload" data-current="${(current)}"  data-cateid="${item_child["_id"]}" >${item_child["name"]}</a></li>`;
                        }
                html+=`</ul>
                </li>`;
                }
            }
        }
        html+='</ul>';
        return html;
    }
    load_carosel(data){
        var html='';
        html+=`<ol class="carousel-indicators">`;
            if(data.length > 0){
                for(var i=0;i<data.length;i++){
                    html+=`<li data-target="#carousel_content" data-slide-to="${i}" class="${(i==0?'active':'')}"></li>`;
                }
                
            }
        html+=`</ol>
            <div class="carousel-inner">`;
            if(data.length > 0){
                for(var i=0;i<data.length;i++){
                    html+=`<div class="carousel-item ${(i==0?'active':'')}">
                        <img class="d-block w-100" style="height:318px;" src="${data[i].image}" alt="First slide">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>${data[i].name}</h5>
                            <p>${data[i].content}</p>
                        </div>
                    </div>`;
                }
            }
        html+=`</div>
            <a class="carousel-control-prev" href="#carousel_content" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carousel_content" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>`;
        return html;
    }
    load_product_18(data){
        var html='';
        if(data.length > 0){
            for(var i=0;i<data.length;i++){
                html+=`<div class="col-md-3">
                        <a href="#product_detail?id=${data[i]["_id"]}" class="link_reload">
                            <div class="card">
                                <div class="img-hover-zoom">
                                    <img class="card-img-top" src="${data[i]["image"]}" alt="${data[i]["name"]}">
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">${data[i]["name"]}</h5>
                                    <span class="card-span">${(data[i]["price"]==0?data[i]["price_min"]:data[i]["price"])}</span>
                                </div>
                            </div>
                        </a>
                    </div>`;

            }
        }
        return html;
    }
    load_product_9(data){
        var html='';
        if(data.length > 0){
            for(var i=0;i<data.length;i++){
                html+=`<div class="col-md-3">
                        <a href="#product_detail?id=${data[i]["_id"]}" class="link_reload">
                            <div class="card">
                                <img class="card-img-top" src="${data[i]["image"]}" alt="${data[i]["name"]}">
                                <div class="card-content">
                                    <h5 class="card-title">${data[i]["name"]}</h5>
                                    <span class="card-span">${(data[i]["price"]==0?data[i]["price_min"]:data[i]["price"])}</span>
									</div>
                            </div>
                        </a>
                    </div>`;

            }
        }
        return html;
    }
    load_product_10_caro(data){
        var html='';
        if(data.length > 0){
            for(var i=0;i<data.length;i++){
                
                html+=`<div class="carousel-item col-12 col-sm-6 col-md-4 col-lg-3 ${(i==0?'active':'')}">
                        <a href="#product_detail?id=${data[i]["_id"]}" class="link_reload">
                            <div class="card">
                                <img class="card-img-top" src="${data[i]["image"]}" alt="${data[i]["name"]}">
                                <div class="card-body">
                                    <h5 class="card-title">${data[i]["name"]}</h5>
                                    <span class="card-span">${(data[i]["price"]==0?data[i]["price_min"]:data[i]["price"])}</span>
                                </div>
                            </div>
                        </a>
                </div>`;
            }
        }
        return html;
    }
    load_posts_12(data){
        var html='';
        if(data.length > 0){
            for(var i=0;i<data.length;i++){
                html+=`<div class="col-md-4">
                        <a href="#" class="link_reload">
                            <div class="card">
                                <img class="card-img-top" src="${data[i]["image"]}" alt="${data[i]["name"]}">
                                <div class="card-body">
                                    <h5 class="card-title">${data[i]["name"]}</h5>
                                    <p class="card-text">${data[i]["summary"]}</p>
                                </div>
                                <div class="card-footer">
                                    <small class="text-muted"><i class="fa fa-eye"> ${data[i]["vew"]}</i></small>
                                </div>
                            </div>
                        </a>
                    </div>`;
            }
        }
        return html;
    }
    load_product_all(data){
        var html='';
        if(data["list"].length > 0){
            for(var i=0;i<data["list"].length;i++){
                html+=`<div class="col-md-4">
                    <a href="#product_detail?id=${data["list"][i]["_id"]}" class="link_reload">
                        <div class="card">
                            <div class="img-hover-zoom">
                                <img class="card-img-top" src="${data["list"][i]["image"]}" alt="${data["list"][i]["name"]}">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">${data["list"][i]["name"]}</h5>
                                <span class="card-span">${(data["list"][i]["price"]==0?data["list"][i]["price_min"]:data["list"][i]["price"])}</span>
                            </div>
                        </div>
                    </a>
                </div>`;
            }
        }
        else{
            html+=`<div class="col-md-12"><h1 class="text-center"> Không tìm thấy</h1></div>`;
        }
        return html;
    }
    load_cmb_example(data){
        var html='';
        if(data["result"].length > 0){
            for(var i=0;i<data["result"].length;i++){
                html+=`<option value="${data["result"][i]["id"]}">${data["result"][i]["name"]}</option>`;
            }
        }
        return html;
    }
    load_pagination(pages,current,href){
        var html='';
        html+=` <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">`;
                if(pages > 0){
                    html+=`<li class="page-item ${(current==1?'disabled':'')}" ><a class="page-link link_reload" href="#${href}" data-page="${Number(current) - 1}" ><<</a></li>`;
                }
                var i = (Number(current) > 3 ? Number(current) - 2 : 1);
                if(i !==1){
                    html+=`<li class="page-item disabled"><a class="page-link " href="#">...</a></li>`;
                }
                for(; i <= (Number(current) + 2) && i <= pages; i++){
                    html+=`<li class="page-item ${(i == current?'active':'')}"  ><a class="page-link link_reload" data-page="${i}" href="#${href}">${i}</a></li>`;
                    if(i == Number(current) + 2 && i < pages){
                        html+= `<li class="page-item disabled"><a class="page-link" href="#">...</a></li>`;
                    }
                }
                if(pages > 0){
                    html+=`<li class="page-item ${(current == pages?'disabled':'')}"><a data-page="${Number(current) + 1}" class="page-link link_reload" href="#${href}">>></a></li>`;
                }
            html+=`</ul>
        </nav>`;
      return html;
    }
    load_search_quick_products(data){
        var html='';
        html+=`<div class="menu-lengthwise-multip mt-1">
                    <ul>`;
                        if(data["list"].length > 0){
                            for(var i=0;i<data["list"].length;i++){
                                html+=`<li>
                                            <a href="#product_detail?id=${data["list"][i]["_id"]}" class="link_reload" >
                                                <div class="item-quick-search">
                                                    <div class="item-left-quick-search">
                                                        <img src="${data["list"][i]["image"]}" class="img-quick-search"/>
                                                    </div>

                                                    <div class="item-right-quick-search">
                                                        <h5 class="title-quick-search">${data["list"][i]["name"]}</h5>
                                                        <h5 class="span-quick-search">${(data["list"][i]["price"]==0?data["list"][i]["price_min"]:data["list"][i]["price"])}</h5>
                                                    </div>
                                               <div>
                                            </a>
                                        </li>`;
                            }
                        }
                        else{
                            html+=`<h1 class="text-center bg-white text-dark"><i class="fa fa-exclamation-circle"></i>  Không tìm thấy </h1>`;
                        }
                    html+=`</ul>
                </div>`;
        return html;
     }
    load_product_detail(data){
        var html= `
        <div class="col-md-6 product-details-left">
            <div class="img-products">
                <div class="img-zoom-container">
                    <img id="myimage" src="${data["info"]["image"]}" class="w-100 ">
                    <div id="myresult" class="img-zoom-result" style="z-index:0;" ></div>
                </div>
            </div>
            <div id="carousel-multip-products" class="carousel slide carousel-multip" data-ride="carousel">
                <div class="carousel-inner row w-100 mx-auto list-item-12" role="listbox">
                    <div class="carousel-item col-12 col-sm-6 col-md-4 col-lg-3 active" >
                        <div class="card">
                            <img class="card-img-top" src="${data["info"]['image']}" onclick="common.choose_img(this,'#myimage')">
                        </div>
                    </div>`;
                    if(JSON.stringify(data['info']['moreimage'])!="[]"){
                        data['info']['moreimage'].forEach(function(item,key){
                            html+=`
                            <div class="carousel-item col-12 col-sm-6 col-md-4 col-lg-3 " >
                                <div class="card">
                                    <img class="card-img-top" src="${item}"   onclick="common.choose_img(this,'#myimage')">
                                </div>
                            </div>`;
                        });
                    }
                html+=`</div>
                <a class="carousel-control-prev " style="left:-5px; top:38px;width:30px;height:30px" href="#carousel-multip-products" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon text-dark" aria-hidden="true"></span>
                    <span class="sr-only"  >Previous</span>
                </a>
                <a class="carousel-control-next " style="right:-5px; top:38px;width:30px;height:30px" href="#carousel-multip-products" role="button" data-slide="next">
                    <span class="carousel-control-next-icon text-dark"  aria-hidden="true"></span>
                    <span class="sr-only" >Next</span>
                </a>
            </div>
        </div>
        <div class="col-md-6 product-details-right">
            <input type="hidden" name="name" id="name" value="${data["info"]["name"]}">
            <input type="hidden" name="product_id" id="product_id" value="${data["info"]["_id"]}">
            <input type="hidden" name="product_price_id" id="product_price_id">
            <input type="hidden" name="user_id" id="user_id" value="${(sessionStorage.getItem('us_id')?sessionStorage.getItem('us_id'):'')}">
            <input type="hidden" name="product_user_id" id="product_user_id" value="${data["info"]["user_id"]}">
            <input type="hidden" name="user_avatar" id="user_avatar" value="${(sessionStorage.getItem('us_avatar')?sessionStorage.getItem('us_avatar'):'')}>">
            <input type="hidden" name="price_products" id="price_products" value="${data["info"]["price"]}">
            <input type="hidden" name="page_comment" id="page_comment" value="1">
            <input type="hidden" name="page_review" id="page_review" value="1">
            <input type="hidden" name="image" id="image" value="${data["info"]["image"]}">
            <h1>${data["info"]["name"]}</h1>
            <hr/>
            <h2 id="price">${(data["info"]["price"]==0?data["info"]["price_min"]+' - '+ data["info"]["price_max"]:data["info"]["price"])}</h2>`;
            var list_price_product=JSON.stringify(data['list_price_product']);
            if(JSON.stringify(data["color_image"])!="[]"){ 
                html+=`
                <div class="w-100">
                    <label style="font-weight:bold;color: black;">Màu: </label>
                    <span class="color:#17273F" id="span_color"></span>
                </div>
                <div class="w-100 ml-5">`;
                    for(var i=0;i < data["color_image"].length;i++){
                    html+=`<label  for="color_${i}" style="display:inline-block; width:35px;height:35px;cursor: pointer;">
                        <div class="label_color" style="width:35px;height:35px;">
                            <img class="w-100 h-100" src="${data["color_image"][i]['_id']['image'] }" alt="${data["color_image"][i]['_id']['color']}" onclick="common.choose_img(this,'#myimage'); "/>
                            <input type="radio" name="color" id="color_${i}" value="${data["color_image"][i]["_id"]['color']}" style="display:none" ${(data["color_image"][0]['_id']['color']==data["color_image"][i]['_id']['color']?'checked':'')} onclick='common.check_radio_active(this,".label_color","#span_color");common.update_price(${list_price_product},"#price")'>
                        </div>
                    </label>`;
                    }
                html+=`
                </div>`;
            }
            if(JSON.stringify(data["condition1"])!="[]" && JSON.stringify(data["value_condition1"])!="[]"){
                html+=`
                <div class="${(data['condition1'][0]["_id"]=='/'?'d-none':'')}">
                    <div class="w-100">
                        <input type="hidden" name="condition1" value="${data["condition1"][0]["_id"]}">
                        <label style="font-weight:bold;color: black;">${data["condition1"][0]["_id"]} :</label>
                        <span class="color:#17273F" id="span_condition1">${data["value_condition1"][0]["_id"]} </span>
                    </div>
                    <div  class="w-100 ml-5">`;
                        for(var i=0;i < data['value_condition1'].length;i++){
                        
                        html+=`<label class="label_condition1" for="value_condition1_${i}" style="float:left;margin-right:5px; font-size: 10px; padding:0 5px;cursor: pointer; ${data["value_condition1"][0]['_id']==data["value_condition1"][i]['_id']?'border: thin solid #F57224':'border: thin solid #DEE2E6;'}" >
                            ${data['value_condition1'][i]['_id'] }
                            <input type="radio" name="value_condition1" id="value_condition1_${i}" value="${data['value_condition1'][i]["_id"]}" style="display:none" ${(data["value_condition1"][0]['_id']==data["value_condition1"][i]["_id"]?'checked':'')}  onclick='common.check_radio_active(this,".label_condition1","#span_condition1");common.update_price(${list_price_product},"#price")' >
                        </label>`;
                        }
                        html+= `<div class="clearfix"></div>
                    </div>
                </div>`;
            }
            if(JSON.stringify(data['condition2'])!="[]" && JSON.stringify(data['value_condition2'])!="[]"){
                html+=`
                <div class="${(data['condition2'][0]['_id']=='/'?'d-none':'')}">
                    <div class="w-100">
                        <input type="hidden" name="condition2" value="${data["condition2"][0]['_id']}">
                        <label style="font-weight:bold;color: black;">${data["condition2"][0]["_id"]} :</label>
                        <span class="color:#17273F" id="span_condition2">${data["value_condition2"][0]["_id"]}</span>
                    </div>
                    <div  class="w-100 ml-5">`;
                        for(var i=0;i < data['value_condition2'].length;i++){
                            html+=`<label class="label_condition2" for="value_condition2_${i}" style="float:left;margin-right:5px; font-size: 10px; padding:0 5px;cursor: pointer; ${(data['value_condition2'][0]['_id']==data['value_condition2'][i]['_id']?'border: thin solid #F57224':'border: thin solid #DEE2E6;')}" class="border">
                                ${data['value_condition2'][i]['_id'] }
                                <input type="radio" name="value_condition2" id="value_condition2_${i}" value="${data['value_condition2'][i]['_id']}" style="display:none" ${(data['value_condition2'][0]['_id']==data['value_condition2'][i]['_id']?'checked':'')} onclick='common.check_radio_active(this,'.label_condition2','#span_condition2');common.update_price(${list_price_product},'#price')' >
                            </label>`;
                        }
                        html+=`<div class="clearfix"></div>
                    </div>
                </div>`;
            }
            html+=`
            <div class="quantity_box">
                <label for="quantity">Số lượng :</label>
                <input type="number" min="1" value="1" max="1000000" id="quantity" name="quantity" style="width:80px;">
            </div>
            <div>
                <button class="btn-hover color-6 btn_add_cart">Thêm Giỏ Hàng</button>
                <button class="btn-hover color-9" id="btn_buy_product">Mua Ngay</button>
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="col-md-12">
            <div class="card mt-3">
                <div class="card-header">
                    <h3>Tóm tắt</h3>
                </div>
                <div class="card-body">
                    ${data["info"]["description"]}
                </div>
            </div>
            <div class="card mt-3">
                <div class="card-header">
                    <h3>Mô tả</h3>
                </div>
                <div class="card-body">
                    ${data["info"]["details"]}
                </div>
            </div>
        </div>
        `;
        return html;
    }
    load_product_hot_column(data){
        var html=``;
        html+=`<div class="menu-lengthwise-multip mt-1">
            <ul>`;
                if(data.length > 0){
                    for(var i=0;i<data.length;i++){
                        html+=`<li >
                                    <a href="#product_detail?id=${data[i]["_id"]}" class="link_reload" >
                                        <div class="item-quick-search">
                                            <div class="item-left-quick-search">
                                                <img src="${data[i]["image"]}" class="img-quick-search"/>
                                            </div>

                                            <div class="item-right-quick-search">
                                                <h5 class="title-quick-search">${data[i]["name"]}</h5>
                                                <h5 class="span-quick-search">${(data[i]["price"]==0?data[i]["price_min"]:data[i]["price"])}</h5>
                                            </div>
                                    <div>
                                    </a>
                                </li>`;
                    }
                }
            html+=`</ul>
        </div>`;
        return html;
    }
    load_cart_menu(){
        $(".menu_cart").remove();
        if(sessionStorage.getItem("us_id")){
            c_func.get_api(constant.url_server+'/cart/list/'+sessionStorage.getItem("us_id"),'').then((response) => {
                const list_cart = JSON.parse(response);
                var html=`<li class="parent menu_cart ">
                    <a href="#cart_list" data-current="${list_cart.length}" class="link_reload">Giỏ hàng (${list_cart.length})</a>
                    <input type="hidden" id="count_list_cart" value="${list_cart.length}">
                 </li>`;
                $("#menu-account-cart").prepend(html);
            });
        }
    }
    load_menu_account(){
        $(".menu_account").remove();
        var html= ``;
        if(sessionStorage.getItem("us_id")){
            html+=`
            <li class="parent-left menu_account">
                <a href="#">${sessionStorage.getItem("us_name")}</a>
                <ul class="child">
                    <li><a href="#change_users" class="link_reload">Thay đổi thông tin</a></li>
                    <li><a href="#change_password" class="link_reload" >Đổi mật khẩu</a></li>
                    <li><a href="#list_order" class="link_reload">Đơn đặt hàng</a></li>
                    <li><a href="#" id="logout">Đăng xuất</a></li>
                </ul>
            </li>`;
        }
        else{
            html+=`
            <li class="parent menu_account"><a href="#login" class="link_reload">Đăng nhập</a> </li>
            <li class="parent menu_account"><a href="#resgister" class="link_reload">Đăng ký</a> </li>`;
        }
        $("#menu-account-cart").append(html);
    }
    load_alert_total(id_alert_total,str){
        var html_total=`
        <div id="alert_error_total" class="alert alert-warning alert-dismissible fade show" role="alert">
            <span>${str}</span><br/>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`;
        $(id_alert_total).html(html_total);
    }
    load_alert_error(id_alert_total,arr_error,arr_fields,show_item,show_total){
        if(show_item){
            if(JSON.stringify(arr_error)!="[]"){
                arr_fields.forEach(function(item_arr,key_arr){
                    var error='';
                    arr_error.forEach(function(item,key){
                        if(item["id"] == item_arr ){
                            error+=item["value"]+'<br/>';
                        }
                    });
                    $("#"+item_arr+"_error").html(error);
                });
            }
        }
        if(show_total){
            var html_total=`
            <div id="alert_error_total" class="alert alert-warning alert-dismissible fade show" role="alert">`;
                arr_error.forEach(function(item,key){
                    html_total+=`<span>${item["value"]}</span><br/>`;
                });
                html_total+=`<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`;
            $(id_alert_total).html(html_total);
        }
        
        
    }
    load_table_list_cart(data){
        var html=`
        <table id="table_cart" class="table table-bordered table-striped" >
            <thead>
                <tr>
                    <th style="width:5%"><button type="button" class="btn btn-danger btn-sm" onclick="common.delete_cart_multip();"><i class="fa fa-trash-o"></i></button></th>
                    <th style="width:55%">Thông tin sản phẩm</th>
                    <th style="witdh:10%">Số lượng</th>
                    <th style="witdh:15%">Giá ship</th>
                </tr>
            </thead>
            <tbody>`;
                if(data.length > 0){
                    data.forEach((item, key)=>{
                        html+=`
                        <tr class="row_cart" id="row_cart_${item["_id"]}">
                            <td class="text-center">
                                <input type="checkbox" name="check_cart[]" ${(item["check"]==1?'checked':'')} onclick="common.update_check_cart(this) ;common.update_total_price()" value="${item["_id"]}" >
                            </td>
                            <td >
                            <input type="hidden" id="ship_one_order_${item["_id"]}" value="0" >
                            <input type="hidden" id="name_${item["_id"]}" value="${item["products"][0]["name"]}" >
                            `;
                                if(JSON.stringify(item["price_products"])!="[]"){
                                    html+=`
                                    <input type="hidden" id="image_${item["_id"]}" value="${item["price_products"][0]["image"]}" >
                                    <input type="hidden" id="price_${item["_id"]}" value="${item["price_products"][0]["price"]}" >
                                    <div style="float:left; width:80px;">
                                        <img src="${item["price_products"][0]["image"]}" style="width:100%;">
                                    </div>
                                    <div style="float:left;width:calc(100% - 80px);" class="p-2">
                                        <h4>${item["products"][0]["name"]}</h4>
                                        <span>Giá bán: ${common.number_format(item["price_products"][0]["price"])}</span>
                                        <button type="button" class="btn btn-danger btn-sm" onclick="common.delete_cart('${item["_id"]}')" ><i class="fa fa-trash-o"></i></button>
                                    </div>
                                    
                                    `;
                                }
                                else{
                                    html+=`
                                    <input type="hidden" id="image_${item["_id"]}" value="${item["products"][0]["image"]}" >
                                    <input type="hidden" id="price_${item["_id"]}" value="${item["products"][0]["price"]}" >
                                    <div style="float:left; width:80px;">
                                        <img src="${item["products"][0]["image"]}" style="width:100%;">
                                    </div>
                                    <div style="float:left" class="p-2">
                                        <h4>${item["products"][0]["name"]}</h4>
                                        <span>Giá bán: ${common.number_format(item["products"][0]["price"])}</span>
                                        <button type="button" class="btn btn-danger btn-sm" onclick="common.delete_cart('${item["_id"]}')" ><i class="fa fa-trash-o"></i></button>
                                    </div>`;
                                    
                                }
                            html+=`
                            </td>
                            <td>
                                <input type="hidden" name="product_id_${item["_id"]}" id="product_id_${item["_id"]}" value="${item["product_id"]}" >
                                <input type="hidden" name="product_price_id_${item["_id"]}" id="product_price_id_${item["_id"]}" value="${item["product_price_id"]}" >
                                <input type="number" min="1" max="100000000"   id="quantity_${item["_id"]}" value="${item["quantity"]}" onchange="common.update_quantity_cart(this,'${item["_id"]}');common.update_total_price()" />
                            </td>
                            <td>
                                <input type="hidden" id="ship_${item["_id"]}" name="ship_${item["_id"]}" value="0" >
                                0
                            </td>
                        </tr>
                        `;
                    });
                }
               
            html+=`
            </tbody>
        </table>
        `;
        return html;
    }
    load_table_list_order_create(data,id_list_order,id_total){
        var total_delivery_prices=0;
        var total_price_temp=0;
        var total_price=0;
        var html_list=`
        <table class="table table-bordered table-striped" >
            <thead>
                <tr>
                    <th style="width:55%">Thông tin sản phẩm</th>
                    <th style="witdh:10%">Số lượng</th>
                    <th style="witdh:15%">Giá ship</th>
                </tr>
            </thead>
            <tbody>`;
                if(data.length > 0){
                    data.forEach((item, key)=>{
                        html_list+=`
                        <input type="hidden" name="id[]" id="id_${item["_id"]}" value="${item["_id"]}" >
                        <input type="hidden" name="product_id_${item["_id"]}" id="product_id_${item["_id"]}" value="${item["product_id"]}" >
                        <input type="hidden" name="product_price_id_${item["_id"]}" id="product_price_id_${item["_id"]}" value="${item["product_price_id"]}" >
                        <input type="hidden" id="quantity_${item["_id"]}" value="${item["quantity"]}"/>
                        <input type="hidden" id="ship_${item["_id"]}" name="ship_${item["_id"]}" value="0" >
                        <tr class="row_cart" id="row_cart_${item["_id"]}">
                            <td >
                                <input type="hidden" id="price_${item["_id"]}" value="${item["price"]}" >
                                <div style="float:left; width:80px;">
                                    <img src="${item["image"]}" style="width:100%;">
                                </div>
                                <div style="float:left;width:calc(100% - 80px);" class="p-2">
                                    <h4>${item["name"]}</h4>
                                    <span>Giá bán: ${common.number_format(item["price"])}</span>
                                </div>
                            </td>
                            <td>
                                ${item["quantity"]}
                            </td>
                            <td>
                                0
                            </td>
                        </tr>
                        `;
                        total_delivery_prices+= 0;
                        total_price_temp+= parseInt(item["price"] * item["quantity"]);

                    });
                }
               
             html_list+=`
            </tbody>
        </table>
        `;
        $(id_list_order).html(html_list);
        total_price= parseInt(total_delivery_prices) + parseInt(total_price_temp);
        var html_total=` 
            <input type="hidden" id="_total_delivery_prices" value="${total_delivery_prices}" >
            <input type="hidden" id="_total_price_temp" value="${total_price_temp}" >
            <input type="hidden" id="_total_price" value="${total_price }" >
            <h1><b>Giá giao hàng:</b> ${common.number_format(total_delivery_prices)}  </h1>
            <h1><b>Tổng giỏ hàng:</b> ${common.number_format(total_price_temp)}  </h1>
            <h1><b>Tổng cộng giá:</b> ${common.number_format(total_price)}  </h1>
        `;
        $(id_total).html(html_total);
    }
    load_info_orders(){
        var html=`
            <div class="row">
                <div class="col-md-3">
                    <img src="${sessionStorage.getItem('us_avatar')}" alt="${sessionStorage.getItem('us_name')}" class="w-100" />
                </div>
                <div class="col-md-9">
                    <h1>${sessionStorage.getItem('us_name')}</h1><br/>
                    <span><b>Email:</b> ${sessionStorage.getItem('us_email')}</span><br/>
                    <span><b>Điên thoại:</b> ${sessionStorage.getItem('us_phone')}</span><br/>
                    <span><b>Địa chỉ giao hàng: </b></span><br/>

                </div>
            </div>
        `;
        return html; 
    }
    load_table_list_orders_users(data){
        var html=``;
        if(JSON.stringify(data)!="[]"){
            data.forEach((item,key)=>{
                html+=`
                <tr >
                    <td >
                        <div style="float:left; width:80px;">
                            <img src="${item["image"]}" style="width:100%;">
                        </div>
                        <div style="float:left;width:calc(100% - 80px);" class="p-2">
                            <h4>${item["name"]}</h4>
                            <span>Giá bán: ${common.number_format(item["price"])}</span>
                        </div>
                    </td>
                    <td>${item["quantity"]}</td>
                    <td>${item["str_delivery_price"]}</td>
                    <td>${item["str_status"]}</td>
                    <td>
                        <a href="#order_details?id=${item['_id']}"  class="btn-hover color-5 link_reload">chi tiết </a>
                    </td>
                </tr>
                `;
            }); 
        }
        else{
            html+= `
            <tr>
                <td colspan="5" class="text-center">Không có đơn hàng</td>
            </tr>
            `
        }   
        return html;
    }
    update_btn_group(e,status){
        $(".btn_group_orders").removeClass("btn-danger");
        $(e).addClass("btn-danger");
    }
    load_body_table_address_users(data){
        var html=``;
        if(JSON.stringify(data)!="[]"){
            data.forEach((item,key)=>{
                html+=`
                <tr class="row_address" id="row_address_${item._id}">
                    <td class="text-center">
                        <button class="btn btn-info btn-sm mb-1" onclick="common.info_user_address_form('${item._id}')" ><i class="fa fa-pencil"></i></button><br/>
                        <button class="btn btn-danger btn-sm" onclick="common.delete_user_address_form('${item._id}')"><i class="fa fa-trash-o"></i></button>
                    </td>
                    <td>
                        ${item.name}<br/>
                        ${item.phone}
                    </td>
                    <td> <span class="d-inline bg-danger text-white rounded p-1">${(item.type=="home"?'Nhà riêng':'Văn phòng')}  </span> <br/>
                        ${item.address}<br/>
                        <b>Postcode: </b>${item.value_province_city} - ${item.value_district} -  ${item.value_wards}
                    </td>
                    <td>
                        <label>
                            <input type="radio" name="use_shippting" ${(item.use_shippting==1?'checked':'')}  onchange="common.update_address_use_shipping_billing(this,'${sessionStorage.getItem('us_id')}','shopping')" value="${item._id}" /> Giao hàng<br/>
                        <label>
                        <label>
                            <input type="radio" name="use_billing" ${(item.use_billing==1?'checked':'')} onchange="common.update_address_use_shipping_billing(this,'${sessionStorage.getItem('us_id')}','billing')" value="${item._id}" /> Thanh toán
                        <label>
                    </td>
                    
                </tr>
               `;
            })
        }
        else{
            html+=`<tr><td colspan="4" class="text-center"> Không có địa chỉ</td></tr>`
        }
        
        return html;
    }
    load_info_orders_details(data,id_product,id_ship,info_shop){
        $(id_product).html(`
            <div class="row">
                <div class="col-md-4">
                    <img src="${data["info"]["image"]}" class="w-100" />
                </div>
                <div class="col-md-8">
                    <input type="hidden" id="order_id" name="order_id" value="${data["info"]["_id"]}" >
                    <h2 class="font-weight-bold">${data["info"]["name"]}</h2>
                    <h3>Mã đơn hàng : ${data["info"]["_id"]}</h3>
                    <h4>Số lượng : ${data["info"]["str_quantity"]}</h4>
                    <h4>Giá bán: ${data["info"]["str_price"]}</h4>
                    <h4>Giao hàng : ${data["info"]["str_delivery_price"]}</h4>
                    <h4>Thành tiền: ${data["info"]["str_total_price"]}</h4>
                    <h4>Trạng thái thanh toán: ${data["info"]["paid"]}</h4>
                    <h4>Cách thức thanh toán: ${data["info"]["payment"]}</h4>
                    <h4>Thời gian đặt hàng: ${data["info"]["createdAt"]}</h4>
                    <h4>Trạng thái đơn hàng: ${data["info"]["str_status"]}</h4>
                    <div>
                        ${(data["info"]["status"]!="-2" || data["info"]["status"]!="-1"  ?'<button id="canncel_orders_users" class="btn-hover color-2">Hủy đơn hàng</button>':'')}
                        <a href="#list_order" class="btn-hover color-2 link_reload">Quay lại danh sách</a>
                    </div>
                </div>
            </div>
        `);
        $(id_ship).html(`
            <div class="row">
                <div class="col-md-12">
                    <h3>Người đặt hàng: ${data["info"]["receiver"]}</h3>
                    <h4>Số điện thoại : ${data["info"]["receiver_phone"]}</h4>
                    <h4>Địa chỉ giao hàng: ${data["info"]["receiver_address"]}</h4>
                    <h4>PostCode: ${data["info"]["receiver_postcode"]}</h4>
                </div>
            </div>  

        `);
        $(info_shop).html(`
        <div class="row">
            <div class="col-md-12">
                <h3>Chủ cửa hàng: ${data["info"]["product_shop"]["name"]}</h3>
                <h4>Email : ${data["info"]["product_shop"]["email"]}</h4>
                <h4>Điện thoại: ${data["info"]["product_shop"]["phone"]}</h4>
            </div>
        </div> 
        `);
    }
}