import func from '../common/func.js';
import constant from '../common/constant.js';
import load_html from '../common/load_html.js';
import cart_ctr from './cart_ctr.js';
import {router} from '../router.js';
let c_func=new func();
let c_load_html=new load_html();
let c_cart_ctr =new cart_ctr();
export default class  orders_ctr{
    constructor(data,id,status){
        this.data=data;
        this.id=id;
        this.status=status;
    }
   load_table_order(){
        if(!sessionStorage.getItem('us_id')){
            common.Sweet_Notifi("error", "Thông Báo", "Bạn chưa đăng nhập. Đã chuyển qua trang đăng nhập để tiếp tục","OK", "#3085d6", "error");
            router("login");
            location.href=constant.url_default+'login';
            return;
        }
        if(typeof this.data ==='undefined'){
            if($("#count_list_cart").val()=="0"){
                common.Sweet_Notifi("error", "Thông Báo", "Đơn hàng rỗng đã chuyển qua trang chủ","OK", "#3085d6", "error");
                router("");
                location.href=constant.url_default;
                return;
            }
            common.Sweet_Notifi("error", "Thông Báo", "Đơn hàng rỗng đã chuyển qua trang giỏ hàng","OK", "#3085d6", "error");
            router("cart_list");
            location.href=constant.url_default+'cart_list';
            return;
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
            payment:data['payment'],
            delivery_price:data["delivery_price"],
            receiver:sessionStorage.getItem('us_name'),
            receiver_phone:sessionStorage.getItem('us_phone'),
            receiver_address:sessionStorage.getItem('us_address_ship'),
            receiver_postcode: sessionStorage.getItem('us_postcode')
        }
        await c_func.post_api(constant.url_server+"/orders/insert",data_post,'').then((response) => {const list_products = JSON.parse(response);});
    }
   }
   event__order_insert_multip(){
        $(document).on("click","#content #complete_orders", function () {
            var arr_id=$("input[name='id[]']").map(function(){return $(this).val();}).get();
            if(sessionStorage.getItem('us_address_ship') && sessionStorage.getItem('us_postcode')){
                var payment=$("input[type='radio'][name='payment']:checked").val();
                if(payment=="COD"){
                    arr_id.forEach(async function(id,key){
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
                        router("list_order?status=-3");
                        location.href=constant.url_default+"list_order?status=-3";
                    },1000)
                }
                else{
                    var product_id = $("#product_id_"+arr_id[0]).val();
                    var product_price_id = $("#product_price_id_"+arr_id[0]).val();
                    var quantity = $("#quantity_"+arr_id[0]).val();
                    var delivery_price = $("#ship_"+arr_id[0]).val();
                    var _total_price=$("#_total_price").val();
                    router('payment_order_atm');
                    location.href=constant.url_default+"payment_order_atm";
                    setTimeout(function(){
                        var date = new Date();
                        var desc = 'Thanh toan don hang thoi gian: ' + common.Format_DateTime(date,'ddmmyyyyhhiiss');
                        var list_bank=c_func.list_bank_atm();
                        $("#product_id").val(product_id);
                        $("#product_price_id").val(product_price_id);
                        $("#user_id").val(sessionStorage.getItem('us_id'));
                        $("#receiver").val(sessionStorage.getItem('us_name'));
                        $("#receiver_phone").val(sessionStorage.getItem('us_phone'));
                        $("#receiver_address").val(sessionStorage.getItem('us_address_ship'));
                        $("#receiver_postcode").val(sessionStorage.getItem('us_postcode'));
                        $("#quantity").val(quantity);
                        $("#payment").val(payment);
                        $("#delivery_price").val(delivery_price);
                        $("#amount").val(_total_price);
                        $("#orderType").val("billpayment");
                        $("#bankCode").html(c_load_html.load_cmb(list_bank,'value','name',false));
                        $("#orderDescription").html(desc);
                        $("#payment_total_price").html(common.number_format(_total_price));
                    },500);
                    return;
                }
            }
            else{
                common.Sweet_Notifi("error", "Thông Báo", "Tài khoản chưa có địa chỉ giao hàng không thể đặt hàng. Vui lòng cập nhât nhật.","OK", "#3085d6", "error");
                setTimeout(function(){router("change_users");},800)
                location.href=constant.url_default+'change_users';
                return;
            }
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
        c_load_html.update_btn_group("#btn_list_order_"+status,status);
        c_func.get_api(constant.url_server+'/orders/list_user/'+users_id+'/'+status,'').then((response) => {
            const list = JSON.parse(response); 
            id_table_list_orders_users.innerHTML=c_load_html.load_table_list_orders_users(list);
        });
    }
   }
   load_page_list(){
        this.load_list_order(this.status);
   }
   event_load_list_order(){
        $(document).on("click","#content .btn_group_orders", function () {
           var status=$(this).data('status');
           var id_table_list_orders_users=document.getElementById('table_list_orders_users');
           id_table_list_orders_users.innerHTML='<tr><td colspan="5"><div class="loader" id="loader"></div></td></tr>';
           c_load_html.update_btn_group(this,status);
           new  orders_ctr().load_list_order(status);
           location.href=constant.url_default+"list_order?status="+status;
        });
   }
    //details
    load_details_orders(){
        var order_id=  this.id;
        c_func.get_api(constant.url_server+'/orders/info/'+order_id,'').then((response) => {
            const info = JSON.parse(response); 
            c_load_html.load_info_orders_details(info,"#info_orders_details","#info_ship_orders","#info_shop");

        });
    }
    load_page_order_details(){
        this.load_details_orders();
    }

    event_canncel_orders_users(){
        $(document).on("click","#content #canncel_orders_users", function () {
            $("#reason").val("");
            $("#modal_cancel_orders").modal('show');
         });
    }
    event_btn_submit_ok_canncel_orders(){
        $(document).on("click","#content #btn_submit_ok_canncel_orders", function () {
            Swal.fire({title: 'Thông báo', text: "Bạn có chắc chắn muốn hủy đơn hàng",icon: 'question',showCancelButton: true,cancelButtonText: 'Hủy',confirmButtonColor: '#3085d6',cancelButtonColor: '#d33',confirmButtonText: 'Đồng ý!'}).then((result) => {
                if (result.isConfirmed) {
                    var user_id=sessionStorage.getItem("us_id");
                    var order_id=$("#order_id").val();
                    var reason=$("#reason").val();
                     c_func.post_api(constant.url_server+"/orders/order_cancel",{user_id:user_id,order_id:order_id,reason:reason},'').then((response) => {
                        const result = JSON.parse(response);
                        if(result["result"]==1){
                            common.Sweet_Notifi("success", "Thông báo", result["message"],"OK", "#3085d6", "success");
                            setTimeout(()=>{
                                location.reload();
                            },2000);
                           
                           
                        }
                        else{
                            common.Sweet_Notifi("error", "Thông báo",result["message"] ,"OK", "#3085d6", "error");
                        }
                    });
                   
                }
            })
            $("#modal_cancel_orders").modal('hide');
         });
    }
    //reviews_orders
    load_info_orders_reviews(){
        var order_id= this.id;
        var id_info_products_reviews = document.getElementById('info_products_reviews');
        if(id_info_products_reviews){
            c_func.get_api(constant.url_server+'/orders/info/'+order_id,'').then((response) => {
                const info = JSON.parse(response); 
                id_info_products_reviews.innerHTML=c_load_html.load_info_orders_reviews(info);
    
            });
        }
    }
    load_page_reviews(){
        this.load_info_orders_reviews();
    }
    create_reviews_product(data){
        var data_form= {order_id:data["order_id"],product_id:data["product_id"],content_products:data["content_products"],review_products:data["review_products"],review_ship:"0",review_shop:"0",user_id:sessionStorage.getItem('us_id'),reply_reviews_product_id:''}; 
        $.ajax({cache: false,url: url_server+"/reviews/insert",type: "POST",data: data_form,dataType: "json",success: function (res) {
                if (res["result"]==1) {
                    common.Sweet_Notifi("success", res["message"], '',"OK", "#3085d6", "success");
                    setTimeout(function(){
                        router('list_order?status=4')
                        location.href=constant.url_default+"list_order?status=4";
                    },1000)
                }
                else {
                    common.Sweet_Notifi("error", res["message"], '',"OK", "#3085d6", "error");
                }
            },
            error: function (error) {
                alert("lỗi");
            }
        });
    }
    event_btn_submit_reviews_orders(){
        $(document).on("click","#content #btn_submit_reviews_orders", function () {
            var order_id=$("#order_id").val();
            var product_id=$("#product_id").val();
            var content_products=$("#content_products").val();
            var review_products=$("input[type='radio'][name='review_products']:checked").val();
            var form_data={order_id:order_id,product_id:product_id,content_products:content_products,review_products:review_products};
            new orders_ctr().create_reviews_product(form_data);
        });
    }

}
//
