import func from '../common/func.js';
import constant from '../common/constant.js';
import load_html from '../common/load_html.js';
import cart_ctr from './cart_ctr.js';
import {router} from '../router.js';
let c_func=new func();
let c_load_html=new load_html();
let c_cart_ctr =new cart_ctr();
export default class  orders_ctr{
    constructor(data){
        this.data=data;
    }
   load_table_order(){
        if(!sessionStorage.getItem('us_id')){
            common.Sweet_Notifi("error", "Thông Báo", "Bạn chưa đăng nhập. Đã chuyển qua trang đăng nhập để tiếp tục","OK", "#3085d6", "error");
            router("login");
            location.href=constant.url_default+'login';
            return;
        }
        if(typeof this.data ==='undefined'){
            common.Sweet_Notifi("error", "Thông Báo", "Đơn hàng rỗng, đã chuyển qua trang giỏ hàng","OK", "#3085d6", "error");
            router("cart_list");
            location.href=constant.url_default+'cart_list';
            return
        }
        var id_table_list_orders = document.getElementById("table_list_orders");
        var id_total_price_orders = document.getElementById("total_price_orders");
        if(id_table_list_orders && id_total_price_orders){
            c_load_html.load_table_list_order_create(this.data,"#table_list_orders","#total_price_orders");
        }
         
   }
   load_info_user(){
    var id_info_orders=document.getElementById('info_orders');
    if(info_orders){
        id_info_orders.innerHTML=c_load_html.load_info_orders(); 
    }
   }
   load_page_create(){
    this.load_table_order();
    this.load_info_user();
   }
   async insert_order(data){
    if(JSON.stringify(data)!="[]"){
        var data_post={
            product_id:data["product_id"],
            product_price_id:(data['product_price_id']?data['product_price_id']:''),
            quantity :data['quantity'],
            user_id:sessionStorage.getItem('us_id'),
            payment:'COD',
            delivery_price:data["delivery_price"],
            receiver:sessionStorage.getItem('us_name'),
            receiver_phone:sessionStorage.getItem('us_phone'),
            receiver_address:'351/9 Trung Phú 1, Vĩnh Phú, Thoại Sơn, An Giang',
            receiver_postcode:'An Giang - Huyện Thoại Sơn - Xã Vĩnh Phú'
        }
        await c_func.post_api(constant.url_server+"/orders/insert",data_post,'').then((response) => {const list_products = JSON.parse(response);});
    }
   }
   event__order_insert_multip(){
        $(document).on("click","#content #complete_orders", function () {
            var arr_id=$("input[name='id[]']").map(function(){return $(this).val();}).get();
            arr_id.forEach(async function(id,key){
                var arr={};
                var product_id=$("#product_id_"+id).val();
                var product_price_id=$("#product_price_id_"+id).val();
                var quantity=$("#quantity_"+id).val();
                var delivery_price=$("#ship_"+id).val();
                var name=$("#name_"+id).val();
                var image=$("#image_"+id).val();
                var price=$("#price_"+id).val();
                await new  orders_ctr().insert_order({product_id:product_id,product_price_id:product_price_id,quantity:quantity,delivery_price:delivery_price});
                c_cart_ctr.delete_cart(id);
            });
            setTimeout(function(){  
                common.Sweet_Notifi("success", "Thông Báo", "Đã hoàn tất đơn đặt hàng","OK", "#3085d6", "success");
                c_load_html.load_cart_menu();
                router("list_order");
                location.href=constant.url_default+"list_order";
            },1000)
        });
   }
   //list
   load_list_order(status){
    if(!sessionStorage.getItem('us_id')){
        common.Sweet_Notifi("error", "Thông Báo", "Bạn chưa đăng nhập. Đã chuyển qua trang đăng nhập để tiếp tục","OK", "#3085d6", "error");
        router("login");
        location.href=constant.url_default+'login';
        return;
    }
    var id_table_list_orders_users=document.getElementById('table_list_orders_users');
    
    if(id_table_list_orders_users){
        var users_id=  sessionStorage.getItem('us_id');
        c_func.get_api(constant.url_server+'/orders/list_user/'+users_id+'/'+status,'').then((response) => {
            const list = JSON.parse(response); 
            id_table_list_orders_users.innerHTML=c_load_html.load_table_list_orders_users(list);
        });
    }
   }
   load_page_list(){
        this.load_list_order("-3");
   }
   event_load_list_order(){
        $(document).on("click","#content .btn_group_orders", function () {
           var status=$(this).data('status');
           var id_table_list_orders_users=document.getElementById('table_list_orders_users');
           id_table_list_orders_users.innerHTML='<tr><td colspan="4"><div class="loader" id="loader"></div></td></tr>';
           c_load_html.update_btn_group(this,status);
           new  orders_ctr().load_list_order(status);
        });
   }
    

}
//
