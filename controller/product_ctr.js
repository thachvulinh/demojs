
import constant from '../common/constant.js';
import load_html from '../common/load_html.js';
import func from '../common/func.js';
import {router} from '../router.js';
let c_func=new func();
let c_load_html=new load_html();
var complete_cate=0,complete_product=0,complete_product_similar_caro=0;
var complete_details_info=0,complete_details_hot=0,complete_product_detail_similar_caro=0;
var page_search=0,searched_keywords='';
export default class  product_ctr{
    constructor(id,page,cateid){
        this.id=id;
        this.page=page;
        this.cateid=cateid;
    }
    load_categorys(){
        var id_categorys_products = document.getElementById("categorys_products");
        if(id_categorys_products){
            c_func.get_api(constant.url_server+'/categorys/listParent','').then((response) => {
                const list = JSON.parse(response);
                id_categorys_products.innerHTML=c_load_html.load_category(list,"1");
                complete_cate=1;
                this.hide_loading();
                //const list= await c_func.get_api2(constant.url_server+'/categorys/listParent','');
                //id_categorys_products.innerHTML=c_load_html.load_category(list);
                //complete_cate=1;
                //this.hide_loading();
              });
           // const list= await c_func.get_api2(constant.url_server+'/categorys/listParent','');
            
        }
    }
    async load_list_product(o_id_cateid,i_id_cateid,i_id_page,i_id_keyword,o_id_keyword){
        var id_list_product_all = document.getElementById('list_product_all');
        var id_pagination_product=document.getElementById('pagination_product');
        if(id_list_product_all && id_pagination_product){
            var keywords= (o_id_keyword!=""?$(o_id_keyword).val():'');
            var user_id= '';
            var min= 0;
            var max= 50000000;
            var sort= 0;
            var page =  this.page || 1;
            var perPage= 6;
            var skip=(perPage * page) - perPage;
            var cateid=this.cateid || (o_id_cateid!=""?$(o_id_cateid).val():'');
            await c_func.post_api(constant.url_server+"/products/list_products_category",{id_category:cateid,min:min,max:max,sort:sort,page:page,perPage:perPage,keywords:keywords,user_id:user_id},'').then((response) => {
                const list_products = JSON.parse(response);
                var pages=Math.ceil((JSON.stringify(list_products.all_list)!="[]"?list_products.all_list.length:0) / perPage);
                id_list_product_all.innerHTML=c_load_html.load_product_all(list_products);
                id_pagination_product.innerHTML=c_load_html.load_pagination(pages,page,"product_list");

                $(i_id_page).val(page);
                $(i_id_cateid).val(cateid);
                $(i_id_keyword).val(keywords);
                complete_product=1;
                this.hide_loading(this.page);
            });
        }
        // total_products:(JSON.stringify(list_products.all_list)!="[]"?list_products.all_list.length:0),
        // skip_product:(JSON.stringify(list_products.list)!="[]"?skip:0),
        
    }
    
    async search_quick_products(current){
        var keywords=$("#input-search-page").val();
        if(searched_keywords!=keywords){
            $("#list-item-searh").empty();   
            page_search=0;
        }
        var user_id= '';
        var min= 0;
        var max= 50000000;
        var sort= 0;
        var page = current;
        var perPage= 4;
        if((page_search < current) && keywords!=""){
            if(current==1){
                $("#loader_search").show();
                $("#list-item-searh").empty();
                await c_func.post_api(constant.url_server+"/products/list_products_category",{min:min,max:max,sort:sort,page:page,perPage:perPage,keywords:keywords,user_id:user_id},'').then((response) => {
                    const list_products = JSON.parse(response);
                    var pages=Math.ceil((JSON.stringify(list_products.all_list)!="[]"?list_products.all_list.length:0) / perPage);
                    $("#list-item-searh").append(c_load_html.load_search_quick_products(list_products));
                    $("#totalpage").val(pages);
                    $("#loader_search").hide();
                    searched_keywords=keywords;
                    page_search = current;
                });
            }
            else{
                $("#loader_search").show();
                await c_func.post_api(constant.url_server+"/products/list_products_category",{min:min,max:max,sort:sort,page:page,perPage:perPage,keywords:keywords,user_id:user_id},'').then((response) => {
                    const list_products = JSON.parse(response);
                    $("#list-item-searh").append(c_load_html.load_search_quick_products(list_products));
                    page_search = current;
                    $("#loader_search").hide();
                    searched_keywords=keywords;
                });
            }
           
        }
        // else{
        //     $("#list-item-searh").empty();
        // }
    }
    async list_products_similar_caro(){
        var id_list_products_similar_caro = document.getElementById("list_products_similar_caro");
        if(id_list_products_similar_caro){
            c_func.get_api(constant.url_server+'/products/list_top?limit=12','').then((response) => {
                const list = JSON.parse(response);
                id_list_products_similar_caro.innerHTML=c_load_html.load_product_10_caro(list);
                complete_product_similar_caro=1;
                this.hide_loading();
            });
            // const list= await c_func.get_api2(constant.url_server+'/products/list_top?limit=12','');
            // id_list_products_similar_caro.innerHTML=c_load_html.load_product_10_caro(list);;
            // complete_product_similar_caro=1;
            // this.hide_loading();
            c_func.refresh_carousel_multip();
        }
    }
    hide_loading(page){
        if(page){
            if(complete_product==1){
                (document.getElementById('loader')?document.getElementById('loader').style.display="none":'');
                $('.link_reload').click;
            }
        }
        else{
            if(complete_product==1){
                (document.getElementById('loader')?document.getElementById('loader').style.display="none":'');
            }
            if(complete_product==1 && complete_cate==1 && complete_product_similar_caro==1){
                (document.getElementById('loading_fullpage')?document.getElementById('loading_fullpage').style.display="none":'');
                (document.getElementById('loader')?document.getElementById('loader').style.display="none":'');
                $('.link_reload').click;
            }

        }
        
    }
    load_list(){
        var o_id_keyword=($("#input-search-page").length > 0 ? "#input-search-page":'');
        this.load_list_product("#cateid","#cateid","#page","#keywords",o_id_keyword);
        this.load_categorys();
        this.list_products_similar_caro();
        
    }
    load_list_page(){
        this.load_list_product("#cateid","#cateid","#page","#keywords","");
    }
    clear_tick(){
        complete_cate=0,complete_product=0,complete_product_similar_caro=0;
    }
    clear_search(){
        //page_search=0;

    }
    //prodcut details
    load_product_detail(){
        var id_product_detail = document.getElementById("product_detail");
        if(id_product_detail){
            c_func.get_api(constant.url_server+'/products/info/'+this.id,'').then((response) => {
                const info = JSON.parse(response);
                id_product_detail.innerHTML =c_load_html.load_product_detail(info);
                complete_details_info=1;
                this.hide_loading_details();
                setTimeout(function(){
                    common.imageZoom("myimage", "myresult");c_func.refresh_carousel_multip_products();
                    new product_ctr().load_star_product_comment("1");
                    new product_ctr().load_comment_products("1");
                },1000);
              });
             
        }
    }
    async load_product_details_hot(){
        var id_list_products_hot = document.getElementById("products_hot_column");
        if(id_list_products_hot){
            c_func.get_api(constant.url_server+'/products/list_top?limit=12','').then((response) => {
                const list = JSON.parse(response);
                id_list_products_hot.innerHTML=c_load_html.load_product_hot_column(list);
                complete_details_hot=1;
                this.hide_loading_details();
            });
        }
    }
    async list_products_detail_similar_caro(){
        var id_list_products_detail_similar_caro = document.getElementById("list_products_detail_similar_caro");
        if(id_list_products_detail_similar_caro){
            c_func.get_api(constant.url_server+'/products/list_top?limit=12','').then((response) => {
                const list = JSON.parse(response);
                id_list_products_detail_similar_caro.innerHTML=c_load_html.load_product_10_caro(list);
                complete_product_similar_caro=1;
                this.hide_loading();
                c_func.refresh_carousel_multip();
                complete_product_detail_similar_caro=1;
                this.hide_loading_details();
               
            });
           
        }
    }
    load_star_product(){
        var id_star_products=document.getElementById('star_products');
        if(id_star_products){
            c_func.get_api(constant.url_server+'/reviews/star_products/'+this.id,'').then((response) => {
                const list = JSON.parse(response);
                id_star_products.innerHTML=c_load_html.load_star_products(list);
               
            });
        }
    }
    load_star_product_comment(page){
        var id_reviews_comment=document.getElementById('reviews_comment');
        var perPage=5;
        var product_id=$("#product_id").val();
        $("#page_review").val(page);
        if(id_reviews_comment){
            $.ajax({cache: false,url: constant.url_server+"/reviews/list_product_id",type: "POST",data: {product_id:product_id,page:page,perPage:perPage},dataType: "json",success: function (res) {
                id_reviews_comment.innerHTML=c_load_html.load_reviews_comment(res,product_id);
            }});
        }
    }
    load_comment_products(page){
        var id_comments=document.getElementById('comments');
        var perPage=5;
        var product_id=$("#product_id").val();
        var data={product_id:product_id,page:page,perPage:perPage};
       
        if(id_comments){
            $.ajax({cache: false,url: constant.url_server+"/comment_products/list_comment_product_id",type: "POST",data:data ,dataType: "json",success: function (res) {
                id_comments.innerHTML=c_load_html.load_comments_product(res,product_id);
            },
            error: function (error) {
                alert("lỗi");
            }
        });
        }
    }
    create_comment_product(data){
        var content=data["content"];
        var product_id=data["product_id"];
        var user_id=data["user_id"];
        var reply_comment_product_id=data["reply_comment_product_id"]
        var data_form={content:content,product_id:product_id,user_id:user_id,reply_comment_product_id:reply_comment_product_id};
        $.ajax({cache: false,url: constant.url_server+"/comment_products/insert",type: "POST",data: data_form,dataType: "json",success: function (res) {
            if (res["result"]==1) {
                new product_ctr().load_comment_products("1");
            }
            else {
                common.Sweet_Notifi("error", res["message"], '',"OK", "#3085d6", "error");
            }
        }});
    }
    event_create_comment_product(){
        $(document).on("click","#content #btn_comment_products", function () {
            var content=$("#content_product").val();
            var product_id=$("#product_id").val();
            var user_id=sessionStorage.getItem('us_id');
            var reply_comment_product_id="";
            var data={content:content,product_id:product_id,user_id:user_id,reply_comment_product_id:reply_comment_product_id};
            new product_ctr().create_comment_product(data);
        });
    }
    event_create_reply_comment_product(){
        $(document).on("click","#content #btn_reply_comment_products", function () {
            var content=$("#content_reply_product").val();
            var product_id=$("#product_id").val();
            var user_id=sessionStorage.getItem('us_id');
            var reply_comment_product_id=$("#id_reply_comment_product").val();
            var data={content:content,product_id:product_id,user_id:user_id,reply_comment_product_id:reply_comment_product_id};
            new product_ctr().create_comment_product(data);
        });
    }
    load_detail(){
        this.load_product_detail();
        this.load_star_product();
        this.load_product_details_hot();
        this.list_products_detail_similar_caro();
    }
    hide_loading_details(){
        if(complete_details_info==1 && complete_details_hot==1 && complete_product_detail_similar_caro==1 ){
            (document.getElementById('loading_fullpage')?document.getElementById('loading_fullpage').style.display="none":'');
            $('.link_reload').click;
        } 
    }
    clear_details_tick(){
        complete_details_info=0,complete_details_hot=0,complete_product_detail_similar_caro=0;
    }
     //create order
     event_create_orders(){
        $(document).on("click","#content #btn_buy_product", function () {
            var price=$("#price_products").val();
            if(price!=0){
                if(sessionStorage.getItem("us_id")){
                    var data=[];
                    var product_id=$("#product_id").val();
                    var product_price_id=$("#product_price_id").val();
                    var quantity=$("#quantity").val();
                    var delivery_price=0;
                    var name=$("#name").val();
                    var image=$("#image").val();
                    
                    data.push({_id:0,product_id:product_id,product_price_id:product_price_id,name:name,image:image,quantity:quantity,price:price,delivery_price:delivery_price});
                    router("create_order","","","",data);
                    location.href=constant.url_default+"create_order";
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
            else{
                common.Sweet_Notifi("error", "Thông Báo", "Chưa chọn loại sản phẩm","OK", "#3085d6", "error");
            }
            
       });
    }
}