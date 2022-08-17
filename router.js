import func from './common/func.js';
import home_ctr from './controller/home_ctr.js';
import example_ctr from './controller/example_ctr.js';
import product_ctr from './controller/product_ctr.js';
import users_ctr from './controller/users_ctr.js';
import constant from './common/constant.js';
import cart_str from './controller/cart_ctr.js';
import orders_ctr from './controller/orders_ctr.js';
let c_func=new func();
let c_home_ctr=new home_ctr();
let c_example_ctr=new example_ctr();
let c_users_ctr=new users_ctr();
let c_cart_str=new cart_str();
var param_href={};
export function router(href,cateid,current,page,data){
    var href_param = href.replace(constant.url_default,'');
    var param='';
    if(href_param!=""){
       
        var length_href=href_param.length;
        var index_key = href_param.indexOf("?");
        if(index_key==-1){
            param=href_param;
        }
        else{
            param=href_param.substring(0,index_key);
        }
        var str_param=href_param.substring(index_key,length_href);
        param_href=c_func.convert_url_search_object(str_param);
    }
    else{
        param=href_param;
    }
     if(param=='product_list' ){
        let c_product_ctr=new product_ctr(id,page,cateid);
        if(page || current==1){
            (document.getElementById('loader')?document.getElementById('loader').style.display="block":'');
            (document.getElementById('list_product_all')?document.getElementById('list_product_all').innerHTML="":'');
            setTimeout(function(){ c_product_ctr.load_list_page()},1000);
        }
        else{
            c_product_ctr.clear_tick();
            c_func.load_html('./view/product/list.html',document.getElementById('content'),"");
            $('.ctr_class').remove();
            c_func.dynamicallyLoadScript('./controller/product_ctr.js');
            setTimeout(function(){c_product_ctr.load_list();},1000);
        }
    }
    else if(param=='product_detail'){
        var id=param_href["id"];
        let c_product_ctr=new product_ctr(id,page,cateid);
        var page_reviews=param_href["page_reviews"];
        var page_comment=param_href["page_comment"];
        var check_product_id = $("#product_id_check").val();
        if(check_product_id){
            if(page_reviews==1){
                c_product_ctr.load_star_product_comment(page);
                return ;
            }
            if(page_comment==1){
                c_product_ctr.load_comment_products(page);
                return;
            }
        }
        c_product_ctr.clear_details_tick();
        c_func.load_html('./view/product/detail.html',document.getElementById('content'),"");
        $('.ctr_class').remove();
        c_func.dynamicallyLoadScript('./controller/product_ctr.js');
        setTimeout(function(){
            c_product_ctr.load_detail();
            //c_func.dynamicallyLoadScript('./assets/js/controller/product_ctr.js');
        },1000);  
    }
    else if(param=='example'){
        c_func.load_html('./view/example/load_api.html',document.getElementById('content'),"");
        $('.ctr_class').remove();
        c_func.dynamicallyLoadScript('./controller/example_ctr.js');
        setTimeout(function(){
            c_example_ctr.load_page();
        },1000);
    }
    else if(param=='login'){
        c_func.load_html('./view/users/login.html',document.getElementById('content'),"");
        $('.ctr_class').remove();
        c_func.dynamicallyLoadScript('./controller/users_ctr.js');
    }
    else if(param=='cart_list'){
        if($("#count_list_cart").val()=="0"){common.Sweet_Notifi("error", "Thông Báo", "Chưa có sản phẩm trong giỏ","OK", "#3085d6", "error");return;}
        c_func.load_html('./view/cart/list.html',document.getElementById('content'),"");
        $('.ctr_class').remove();
        c_func.dynamicallyLoadScript('./controller/cart_ctr.js');
        setTimeout(function(){c_cart_str.load_page_list_cart();},1000)
    }
    else if(param=='create_order'){
        let c_orders_str=new orders_ctr(data,'','');
        c_func.load_html('./view/orders/create.html',document.getElementById('content'),"");
        $('.ctr_class').remove();
        c_func.dynamicallyLoadScript('./controller/orders_ctr.js');
        setTimeout(function(){c_orders_str.load_page_create();},1000)
    }
    else if(param=='list_order'){
        var status=param_href["status"];
        let c_orders_str=new orders_ctr(data,'',status);
        c_func.load_html('./view/orders/list.html',document.getElementById('content'),"");
        $('.ctr_class').remove();
        c_func.dynamicallyLoadScript('./controller/orders_ctr.js');
        setTimeout(function(){c_orders_str.load_page_list();},1000)
    }
    else if(param == 'reviews'){
        check_login();
        var id=param_href["id"];
        let c_orders_str=new orders_ctr(data,id);
        c_func.load_html('./view/orders/reviews.html',document.getElementById('content'),"");
        $('.ctr_class').remove();
        c_func.dynamicallyLoadScript('./controller/orders_ctr.js');
        setTimeout(()=>{c_orders_str.load_page_reviews();},1000);
    }
    else if(param == "order_details"){
        check_login();
        var id=param_href["id"];
        let c_orders_str=new orders_ctr(data,id);
        c_func.load_html('./view/orders/detail.html',document.getElementById('content'),"");
        $('.ctr_class').remove();
        c_func.dynamicallyLoadScript('./controller/orders_ctr.js');
        setTimeout(function(){c_orders_str.load_page_order_details();},1000)
    }
    else if(param=='change_password'){
        c_func.load_html('./view/users/change_password.html',document.getElementById('content'),"");
        $('.ctr_class').remove();
        c_func.dynamicallyLoadScript('./controller/users_ctr.js');
        setTimeout(function(){c_users_ctr.load_page_password()},1000);
    }
    else if(param=='resgister'){
        c_func.load_html('./view/users/resgister.html',document.getElementById('content'),"");
        $('.ctr_class').remove();
        c_func.dynamicallyLoadScript('./controller/users_ctr.js');
    }
    else if(param=="change_users"){
        check_login();
        c_func.load_html('./view/users/change_info.html',document.getElementById('content'),"");
        $('.ctr_class').remove();
        c_func.dynamicallyLoadScript('./controller/users_ctr.js');
        setTimeout(function(){c_users_ctr.load_page_change_users()},1000);
        
    }
    else{
        c_home_ctr.clear_tick();
        c_func.load_html('./view/home/index.html',document.getElementById('content'),"");
        $('.ctr_class').remove();
        c_func.dynamicallyLoadScript('./controller/home_ctr.js');
        setTimeout(function(){c_home_ctr.load();},1000);
    }
}
export function update_link_load(){
    $(document).on("click",".link_reload", function () {
        var page=$(this).data('page');
        var cateid=$(this).data('cateid');
        var current=$(this).data('current');
        if(this.href!=""){
            router(this.href,cateid,current,page,null);
        }
    });
}
export function check_login(){
    if(!sessionStorage.getItem('us_id')){
        common.Sweet_Notifi("error", "Thông Báo", "Bạn chưa đăng nhập. Đã chuyển qua trang đăng nhập để tiếp tục","OK", "#3085d6", "error");
        setTimeout(function(){router("login");},800)
        location.href=constant.url_default+'login';
        return;
    }
}