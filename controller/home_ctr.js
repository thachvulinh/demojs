import func from '../common/func.js';
import constant from '../common/constant.js';
import load_html from '../common/load_html.js';
let c_func=new func();
let c_load_html=new load_html();
var complete_cate=0, complete_caro=0,complete_product_new=0,complete_product_top=0,complete_product_caro=0,complete_posts_new=0;

export default class  home_ctr{
    //constructor(){}
     load_categorys(){
        var id_categorys_products = document.getElementById("categorys_products");
        if(id_categorys_products){
            c_func.get_api(constant.url_server+'/categorys/listParent','').then((response) => {
                const list = JSON.parse(response);
                id_categorys_products.innerHTML=c_load_html.load_category(list,"0");
                complete_cate=1;
                this.hide_loading();
              });
           // const list= await c_func.get_api2(constant.url_server+'/categorys/listParent','');
            
        }
    }
    async load_carosel(){
        var id_carousel_content = document.getElementById("carousel_content");
        if(id_carousel_content){
            c_func.get_api(constant.url_server+'/carousels/listall','').then((response) => {
                const list = JSON.parse(response);
                id_carousel_content.innerHTML=c_load_html.load_carosel(list);
                complete_caro=1;
                this.hide_loading();
              });
            // const list= await c_func.get_api2(constant.url_server+'/carousels/listall','');
            // id_carousel_content.innerHTML=c_load_html.load_carosel(list);;
            // complete_caro=1;
            // this.hide_loading();
            // c_func.refresh_carousel();
        }
    }
    async load_product_new(){
        var id_list_products_new = document.getElementById("list_products_new");
        if(id_list_products_new){
            c_func.get_api(constant.url_server+'/products/list_new?limit=12','').then((response) => {
                const list = JSON.parse(response);
                id_list_products_new.innerHTML=c_load_html.load_product_18(list);
                complete_product_new=1;
                this.hide_loading();
            });
            // const list= await c_func.get_api2(constant.url_server+'/products/list_new?limit=12','');
            // id_list_products_new.innerHTML=c_load_html.load_product_18(list);;
            // complete_product_new=1;
            // this.hide_loading();
        }
    }
    async load_product_top(){
        var id_list_products_top = document.getElementById("list_products_top");
        if(id_list_products_top){
            c_func.get_api(constant.url_server+'/products/list_top?limit=12','').then((response) => {
                const list = JSON.parse(response);
                id_list_products_top.innerHTML=c_load_html.load_product_9(list);
                complete_product_top=1;
                this.hide_loading();
            });
            // const list= await c_func.get_api2(constant.url_server+'/products/list_top?limit=12','');
            // id_list_products_top.innerHTML=c_load_html.load_product_9(list);;
            // complete_product_top=1;
            // this.hide_loading();
        }
    }
    async load_product_caro(){
        var id_list_products_caro = document.getElementById("list_products_caro");
        if(id_list_products_caro){
            c_func.get_api(constant.url_server+'/products/list_top?limit=12','').then((response) => {
                const list = JSON.parse(response);
                id_list_products_caro.innerHTML=c_load_html.load_product_10_caro(list);
                complete_product_caro=1;
                this.hide_loading();
            });
            // const list= await c_func.get_api2(constant.url_server+'/products/list_top?limit=12','');
            // id_list_products_caro.innerHTML=c_load_html.load_product_10_caro(list);;
            // complete_product_caro=1;
            // this.hide_loading();
            c_func.refresh_carousel_multip();
        }
    }
    async load_posts_new(){
        var id_list_posts_new = document.getElementById("list_posts_new");
        if(id_list_posts_new){
            c_func.get_api(constant.url_server+'/posts/list_new_posts?limit=3','').then((response) => {
                const list = JSON.parse(response);
                id_list_posts_new.innerHTML=c_load_html.load_posts_12(list);
                complete_posts_new=1;
                this.hide_loading();
            });

            // const list= await c_func.get_api2(constant.url_server+'/posts/list_new_posts?limit=3','');
            // id_list_posts_new.innerHTML=c_load_html.load_posts_12(list);;
            // complete_posts_new=1;
            // this.hide_loading();
        }
    }
    hide_loading(){
        if(complete_product_caro==1 && complete_product_new == 1 && complete_product_top == 1 && complete_posts_new == 1){
            (document.getElementById('loading_fullpage')?document.getElementById('loading_fullpage').style.display="none":'');
            $('.link_reload').click;
        }
        setTimeout(function(){
            (document.getElementById('loading_fullpage')?document.getElementById('loading_fullpage').style.display="none":'');
            $('.link_reload').click;
        },15000)
    }
    load(){ 
        this.load_categorys();
        this.load_carosel();
        this.load_product_caro();
        this.load_product_new();
        this.load_product_top();
        this.load_posts_new();
        window.addEventListener('scroll',function(e) {
            // if ((document.body.scrollTop < 450 || document.documentElement.scrollTop < 450) && (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) ) {
            //     document.getElementById('div_product_hot').style.display="block";
            // }
            if((document.body.scrollTop < 950 || document.documentElement.scrollTop < 950) && (document.body.scrollTop > 450 || document.documentElement.scrollTop > 450) ){
                (document.getElementById('div_product_new')?document.getElementById('div_product_new').style.display="block":'');
            }
            if ((document.body.scrollTop < 1630 || document.documentElement.scrollTop < 1630) && (document.body.scrollTop > 950 || document.documentElement.scrollTop > 950) ) {
                (document.getElementById('div_product_top')?document.getElementById('div_product_top').style.display="block":'');
            }
            if((document.body.scrollTop < 2282 || document.documentElement.scrollTop < 2282) && (document.body.scrollTop > 1630 || document.documentElement.scrollTop > 1630) ){
                //(document.getElementById('div_posts_new')?document.getElementById('div_posts_new').style.display="block":'');
            }
        });
    }
    clear_tick(){
        complete_cate=0, complete_caro=0,complete_product_new=0,complete_product_top=0,complete_product_caro=0,complete_posts_new=0;
    }
}
//
