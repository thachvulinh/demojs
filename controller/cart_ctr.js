import func from '../common/func.js';
import constant from '../common/constant.js';
import load_html from '../common/load_html.js';
import {router} from '../router.js';
let c_func=new func();
let c_load_html=new load_html();
export default class  cart_ctr{
    //constructor(){}
     add_cart(info_form){
        if(sessionStorage.getItem("us_id")){
            Swal.fire({title: 'Thông báo', text: "Đồng ý để thêm sản phẩm vào giỏ hàng",icon: 'question',showCancelButton: true,cancelButtonText: 'Hủy',confirmButtonColor: '#3085d6',cancelButtonColor: '#d33',confirmButtonText: 'Đồng ý!'}).then((result) => {
                if (result.isConfirmed) {
                    var user_id=sessionStorage.getItem("us_id");
                     c_func.post_api(constant.url_server+"/cart/save",{product_id:info_form["product_id"],product_price_id:info_form["product_price_id"],quantity:info_form["quantity"],user_id:user_id},'').then((response) => {
                        const result = JSON.parse(response);
                        if(result["result"]==1){
                            common.Sweet_Notifi("success", "Thông báo", result["message"],"OK", "#3085d6", "success");
                            c_load_html.load_cart_menu();
                        }
                        else{
                            common.Sweet_Notifi("error", "Thông báo",result["message"] ,"OK", "#3085d6", "error");
                        }
                    });
                   
                }
            })
        }
        else{
            Swal.fire({title: 'Vui lòng đăng nhập để đặt hàng !', text: "Nhấn vào để đồng ý đăng nhập",icon: 'warning',showCancelButton: true,cancelButtonText: 'Hủy',confirmButtonColor: '#3085d6',cancelButtonColor: '#d33',confirmButtonText: 'Đồng ý'}).then((result) => {
                if (result.isConfirmed) {
                    router("login");
                    location.href=constant.url_default+"login";
                }
            });
        }
        
    }
    event_add_cart(){
        $(document).on("click","#content .btn_add_cart", function () {
            var price_products=$("#price_products").val();
            if(price_products >0){
                var product_id=$("#product_id").val();
                var product_price_id=$("#product_price_id").val();
                var quantity=$("#quantity").val();
                new  cart_ctr().add_cart({product_id:product_id,product_price_id:product_price_id,quantity:quantity});
            }
            else{
                common.Sweet_Notifi("error", "Thông Báo", "Chưa chọn loại sản phẩm","OK", "#3085d6", "error");
            }
            
        });
    }
    //list cart
    load_list_cart(){
        if(!sessionStorage.getItem('us_id')){
            common.Sweet_Notifi("error", "Thông Báo", "Bạn chưa đăng nhập. Đã chuyển qua trang đăng nhập để tiếp tục","OK", "#3085d6", "error");
            router("login");
            location.href=constant.url_default+'login';
            return;
        }
        var id_table_list_cart = document.getElementById("table_list_cart");
        if(id_table_list_cart){
            c_func.get_api(constant.url_server+'/cart/list/'+sessionStorage.getItem('us_id'),'').then((response) => {
                const list = JSON.parse(response);
                id_table_list_cart.innerHTML=c_load_html.load_table_list_cart(list);
                (document.getElementById('loading_fullpage')?document.getElementById('loading_fullpage').style.display="none":'');
                setTimeout(()=>{
                    common.update_total_price();
                },2000);
                
                
                });
                
            
        }
       
    }
    load_page_list_cart(){
        this.load_list_cart();
    }
    //create order
    event_create_orders_multip(){
        $(document).on("click","#content #cart_submit", function () {
            var check_cart=$("input[name='check_cart[]']").map(function(){if(this.checked==true){return $(this).val();}}).get();
            if(JSON.stringify(check_cart)!="[]"){
                var data=[];
                check_cart.forEach(async function(id,key){
                    var product_id=$("#product_id_"+id).val();
                    var product_price_id=$("#product_price_id_"+id).val();
                    var quantity=$("#quantity_"+id).val();
                    var delivery_price=$("#ship_"+id).val();
                    var name=$("#name_"+id).val();
                    var image=$("#image_"+id).val();
                    var price=$("#price_"+id).val();
                    data.push({_id:id,product_id:product_id,product_price_id:product_price_id,name:name,image:image,quantity:quantity,price:price,delivery_price:delivery_price})
                });
                router("create_order","","","",data);
                location.href=constant.url_default+"create_order";
            }
            else
            {
                common.Sweet_Notifi("error", "Thông Báo", "Chưa chọn sản phẩm đặt hàng","OK", "#3085d6", "error");
            }
       });
    }
    //
    delete_cart(id){
        c_func.get_api(constant.url_server+'/cart/delete/'+id,'').then((response) => {const list = JSON.parse(response); });
    }

}

