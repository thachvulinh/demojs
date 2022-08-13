import func from './common/func.js';
import {router,update_link_load} from './router.js';
import product_ctr from './controller/product_ctr.js';
import users_ctr from './controller/users_ctr.js';
import cart_ctr from './controller/cart_ctr.js';
import load_html from '../common/load_html.js';
import orders_ctr from './controller/orders_ctr.js';
let c_load_html=new load_html();
let c_cart_ctr=new cart_ctr();
let c_product_ctr=new product_ctr("","","");
let c_func=new func();
let c_users_ctr=new users_ctr();
let c_orders_ctr=new orders_ctr(null);
c_func.load_html('./view/layout/header.html',document.getElementById('header'),"");
c_func.load_html('./view/layout/footer.html',document.getElementById('footer'),"");
// function getapi(){c_func.get_api('https://onlineshop-server.herokuapp.com/users');}
router(location.href);
$('.link_reload').click;
setTimeout(function(){
    c_orders_ctr.event_load_list_order();
    c_cart_ctr.event_create_orders_multip();
    c_cart_ctr.event_add_cart();
    c_load_html.load_menu_account();
    c_load_html.load_cart_menu();
    c_users_ctr.event_login();
    c_users_ctr.event_logout();
    c_users_ctr.event_to_manage();
    c_users_ctr.event_resgister();
    c_orders_ctr.event__order_insert_multip();
    c_users_ctr.event_changepassword();
    c_users_ctr.event_update_info_users();
    c_users_ctr.event_submit_btn_address_users();

    c_product_ctr.event_create_orders();
    var page_search=1;
    var timeout = null;
    $(document).on("click keyup",".header #input-search-page", function () {
        $("#div-quick-search").show();
        clearTimeout(timeout);
        timeout = setTimeout( function () {
            page_search=1;
            c_product_ctr.search_quick_products(page_search);
            $("#totalpage").val(0);
            c_product_ctr.clear_search();
        },1000);
       
    });
    $(document).click(function() {
        $("#totalpage").val(0);
        $("#div-quick-search").hide();
    });
    
    $("#div-quick-search").scroll(function(){
        var totalpage= $("#totalpage").val();
        var scroll_start= 0 * page_search;
        var scroll_end= 5 * (page_search + 1);
        var scrolltop=$("#div-quick-search").scrollTop();
        if(Number(totalpage) >= Number(page_search+1)){
            if(scrolltop <= scroll_end  && scrolltop >= scroll_start ){
                page_search++;
                c_product_ctr.search_quick_products(page_search);
            }
        }
    })
    update_link_load();
    document.getElementById("body").style.display = "block";
},500);