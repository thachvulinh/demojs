import func from '../common/func.js';
import constant from '../common/constant.js';
import load_html from '../common/load_html.js';
import {router} from '../router.js';
let c_func=new func();
let c_load_html=new load_html();
export default class  users_ctr{
    //constructor(){}
    async post_login(id_username,id_password){
        $("#alert_error_total").empty();
        $(".error_item").empty();
        var arr_error=new Array();
        var type='client';
        var username=$(id_username).val();
        var password=$(id_password).val();
        if(username.trim()==""){
            arr_error.push({id:"username",value:"Tài khoản rỗng !"});
        }
        if(password.trim()==""){
            arr_error.push({id:"password",value:"Mật khẩu rỗng !"});
        }
        if(arr_error.length > 0){
            var arr_fields=["username","password"];
            c_load_html.load_alert_error("#alert_error_total",arr_error,arr_fields,true,false);
        }
        else{
            await c_func.post_api(constant.url_server+"/users/login",{type:type,username:username,password:password},'').then((response) => {
                const result = JSON.parse(response);
                if(result["result"]==1){
                    sessionStorage.setItem("us_id",result["data"]["_id"]);
                    sessionStorage.setItem("us_name",result["data"]["name"]);
                    sessionStorage.setItem("us_username",result["data"]["username"]);
                    sessionStorage.setItem("us_address",result["data"]["address"]);
                    sessionStorage.setItem("us_avatar",result["data"]["avatar"]);
                    sessionStorage.setItem("us_bgavatar",result["data"]["bgavatar"]);
                    sessionStorage.setItem("us_email",result["data"]["email"]);
                    sessionStorage.setItem("us_phone",result["data"]["phone"]);
                    sessionStorage.setItem("us_rank_id",result["data"]["rank_id"]);
                    c_load_html.load_menu_account();
                    c_load_html.load_cart_menu();
                    c_load_html.load_chat();
                    if(result["data_address"]["use_shipping"]){
                        sessionStorage.setItem("us_address_ship",result["data_address"]["use_shipping"]["address"]);
                        sessionStorage.setItem("us_postcode",result["data_address"]["use_shipping"]["value_province_city"]+" - "+ result["data_address"]["use_shipping"]["value_district"]+" - "+ result["data_address"]["use_shipping"]["value_wards"]);
                    }
                    else{
                        common.Sweet_Notifi("error", "Thông Báo", "Tài khoản chưa có địa chỉ giao hàng. Vui lòng cập nhật được hàng đặt hàng","OK", "#3085d6", "error");
                        router("change_users");
                        location.href=constant.url_default+'change_users';
                        return;
                    }
                    router("");
                    location.href=constant.url_default;
                    location.reload();
                }
                else{
                    c_load_html.load_alert_total("#alert_error_total",result["data"]);
                }
            });
        }
    }
    logout(){
        sessionStorage.clear();
        c_load_html.load_menu_account();
        c_load_html.load_cart_menu();
        c_load_html.load_chat();
        router("");
        location.href=constant.url_default;
        location.reload();
    }
    event_logout(){
        $(document).on("click","#header #logout", function () {
            new  users_ctr().logout();
       });
    }
    event_login(){
        $(document).on("click","#content #btn_login", function () {
             new  users_ctr().post_login("#username","#password");
        });
    }
    event_to_manage(){
        $(document).on("click","#header #to_manage", function () {
            window.location="http://localhost:3001/login";
       });
    }
    //
    load_changepassword(){
        if(!sessionStorage.getItem('us_id')){
            common.Sweet_Notifi("error", "Thông Báo", "Bạn chưa đăng nhập. Đã chuyển qua trang đăng nhập để tiếp tục","OK", "#3085d6", "error");
            router("login");
            location.href=constant.url_default+'login';
            return;
        }
        $("#avatar_users").attr("src",sessionStorage.getItem('us_avatar'));
        $("#username").val(sessionStorage.getItem('us_username'));
        setTimeout(function(){
            (document.getElementById('loading_fullpage')?document.getElementById('loading_fullpage').style.display="none":'');
        },1000);
    }
    load_page_password(){
        this.load_changepassword();
    }
    async changepassword(data){
        $("#alert_error_total").empty();
        $(".error_item").empty();
        $(".form-control").removeClass('is-invalid');
        var arr_error=new Array();

        var id=sessionStorage.getItem("us_id");
        var username = data["username"];
        var password_old = data["password_old"];
        var password = data["password"];
        var re_password = $("#re_password").val();
        if(username.trim()==""){arr_error.push({id:"username",value:"Tài khoản rỗng !"});}
        if(password_old.trim()==""){arr_error.push({id:"password_old",value:"Mật khẩu cũ rỗng !"});}
        if(password.trim()==""){arr_error.push({id:"password",value:"Mật khẩu mới rỗng !"}); }
        if(re_password.trim()==""){arr_error.push({id:"re_password",value:"Xác nhận mật khẩu rỗng !"});}
        if(password && re_password & password != re_password){arr_error.push({id:"re_password",value:"Xác nhận mật khẩu không chính  xác !"});}
        if(arr_error.length > 0){
            var arr_fields=["username","password_old","password","re_password"];
            c_load_html.load_alert_error("#alert_error_total",arr_error,arr_fields,true,false);
        }
        else{
            var data_form= {id:id,username:username,password:password_old,password_new:password,password_reply:re_password};
            await c_func.post_api(constant.url_server+"/users/update_password",data_form,'').then((response) => {
                const result = JSON.parse(response);
                if(result["result"]==1){
                    common.Sweet_Notifi("success", "Thông báo", 'Đổi mật khẩu thành công',"OK", "#3085d6", "success");
                }
                else{
                    c_load_html.load_alert_total("#alert_error_total",result["message"]);
                }
            });
        }
    }
    event_changepassword(){
        $(document).on("click","#content #submit_btn_change_password", function () {
            var username = $("#username").val();
            var password_old = $("#password_old").val();
            var password= $("#password").val();
            var re_password = $("#re_password").val(); 
            var data={username:username,password_old:password_old,password:password,re_password:re_password}; 
            new users_ctr().changepassword(data);
       });
    }
    async resgister(data){
        $("#alert_error_total").empty();
        $(".error_item").empty();
        $(".form-control").removeClass('is-invalid');
        var arr_error=new Array();
        var name = data["name"];
        // var email = data["email"];
        var phone = data["phone"];
        var username = data["username"];
        var password = data["password"];
        var password_reply = data["password_reply"];
        var rank_id = data["rank_id"];
        c_func.check_empty(arr_error,"name",name,"Họ và tên rỗng !");
        // c_func.check_empty(arr_error,"email",email,"Email rỗng !");
        // c_func.check_email(arr_error,"email",email,"Email không hợp lệ !");
        c_func.check_empty(arr_error,"phone",phone,"Điện thoại rỗng !");
        c_func.check_empty(arr_error,"username",username,"Tài khoản rỗng !");
        c_func.check_empty(arr_error,"password",password,"Mật khẩu rỗng !");
        c_func.check_empty(arr_error,"password_reply",password_reply,"Xác nhận mật khẩu rỗng !");
        c_func.check_pass_repass(arr_error,"password_reply",password,password_reply,"Xác nhận mật khẩu không chính  xác !");
        if(arr_error.length > 0){
            var arr_fields=["name","email","phone","username","password","password_reply"];
            c_load_html.load_alert_error("#alert_error_total",arr_error,arr_fields,true,false);
        }
        else{
            var data_form={name:name,phone:phone,username:username,password:password,password_reply:password_reply,rank_id:rank_id};
            await c_func.post_api(constant.url_server+"/users/resgister",data_form,'').then((response) => {
                const result = JSON.parse(response);
                if(result["result"]==1){
                    new users_ctr().post_login("#username","#password");
                }
                else{
                    c_load_html.load_alert_total("#alert_error_total",result["message"]);
                }
            });
        }
    }
    event_resgister(){
        $(document).on("click","#content #submit_btn_resgister", function () {
            var name=$("#name").val();
            // var email=$("#email").val();
            var phone=$("#phone").val();
            var username=$("#username").val();
            var password=$("#password").val();
            var password_reply=$("#password_reply").val();
            var rank_id=$("#rank_id").val();
            var data={name:name,phone:phone,username:username,password:password,password_reply:password_reply,rank_id:rank_id}
            new users_ctr().resgister(data);
        });
    }
    //change_users
    load_info_user(){
        $("#id").val(sessionStorage.getItem('us_id'));
        $("#_avatar").val(sessionStorage.getItem('us_avatar'));
        $("#_bgavatar").val(sessionStorage.getItem('us_bgavatar'));
        $("#name").val(sessionStorage.getItem('us_name'));
        $("#phone").val(sessionStorage.getItem('us_phone'));
        $("#email").val((sessionStorage.getItem('us_email') == "undefined"?'':sessionStorage.getItem('us_email')));
        $("#preview_avatar").attr('src',sessionStorage.getItem('us_avatar'));
        $("#preview_bgavatar").css("background-image","url('" + sessionStorage.getItem('us_bgavatar') + "')");
        $("#preview_bgavatar").css("background-size",'100% 100%');
        setTimeout(function(){
            (document.getElementById('loading_fullpage')?document.getElementById('loading_fullpage').style.display="none":'');
        },1000);
        $("#user_id").val(sessionStorage.getItem('us_id'));
        $("#phone_address").val(sessionStorage.getItem('us_phone'));
        $("#name_address").val(sessionStorage.getItem('us_name'));
    }
    load_list_address_users(){
        var id_body_table_address_users = document.getElementById("body_table_address_users");
        if(id_body_table_address_users){
            var user_id=sessionStorage.getItem('us_id');
            c_func.get_api(constant.url_server+'/users/list_address_user/'+user_id,'').then((response) => {
                const list = JSON.parse(response);
                id_body_table_address_users.innerHTML=c_load_html.load_body_table_address_users(list);
            });
        }
        
    }
    load_page_change_users(){
        this.load_info_user();
        this.load_list_address_users();
    }
   async update_info_users(data){
        $("#alert_error_total").empty();
        $(".error_item").empty();
        $(".form-control").removeClass('is-invalid');
        var arr_error=new Array();

        var name = data["name"];
        var email = data["email"];
        var phone = data["phone"];
        c_func.check_empty(arr_error,"name",name,"Họ và tên rỗng !");
        c_func.check_empty(arr_error,"email",email,"Email rỗng !");
        c_func.check_email(arr_error,"email",email,"Email không hợp lệ !");
        c_func.check_empty(arr_error,"phone",phone,"Điện thoại rỗng !");
        if(arr_error.length > 0){
            var arr_fields=["name","email","phone"];
            c_load_html.load_alert_error("#alert_error_total",arr_error,arr_fields,true,false);
        }
        else{
            var form = document.getElementById("form_users_info");
            let formData = new FormData(form);
            $.ajax({cache: false,url: url_server+"/users/update",type: "POST",data:formData,contentType: false,processData: false,dataType: "json",success: function (res) {
                    if (res["result"]==1) {
                        sessionStorage.setItem("us_name",res["data"]["name"]);
                        sessionStorage.setItem("us_username",res["data"]["username"]);
                        sessionStorage.setItem("us_address",res["data"]["address"]);
                        sessionStorage.setItem("us_avatar",res["data"]["avatar"]);
                        sessionStorage.setItem("us_bgavatar",res["data"]["bgavatar"]);
                        sessionStorage.setItem("us_email",res["data"]["email"]);
                        sessionStorage.setItem("us_phone",res["data"]["phone"]);
                        sessionStorage.setItem("us_rank_id",res["data"]["rank_id"]);
                        common.Sweet_Notifi("success", res["message"], '',"OK", "#3085d6", "success");
                    }
                    else {
                        common.Sweet_Notifi("error", res["message"], '',"OK", "#3085d6", "error");
                    }
                },
                error: function (error) {
                    common.Sweet_Notifi("error", "Thông báo", 'Đã xảy ra lỗi ',"OK", "#3085d6", "error");
                }
            });
            // await c_func.post_api(constant.url_server+"/users/update",$('#form_users_info').serialize(),'').then((response) => {
            //     const result = JSON.parse(response);
            //     if(result["result"]==1){
            //         common.Sweet_Notifi("success", "Thông báo", 'Đổi thông tin thành công',"OK", "#3085d6", "success");
            //     }
            //     else{
            //         c_load_html.load_alert_total("#alert_error_total",result["message"]);
            //     }
            // });
        }
    }
    event_update_info_users(){
        $(document).on("click","#content #submit_btn_update_users", function () {
            var name = $("#name").val();
            var email = $("#email").val();
            var phone = $("#phone").val();
            var data={name:name,email:email,phone:phone};
            new users_ctr().update_info_users(data);
        });
    }
    save_address_users(data){
        $("#alert_error_total_address").empty();
        $(".error_item").empty();
        $(".form-control").removeClass('is-invalid');
        var arr_error=new Array();
        var name_address = data["name_address"];
        var address = data["address"];
        var phone_address = data["phone_address"];
        var province_city = data["province_city"];
        var district = data["district"];
        var wards = data["wards"];
        var type = data["type"];
        c_func.check_empty(arr_error,"name_address",name_address,"Họ và tên người nhận rỗng !");
        c_func.check_empty(arr_error,"address",address,"Địa chỉ rỗng !");
        c_func.check_empty(arr_error,"phone_address",phone_address,"Điện thoại rỗng !");
        c_func.check_empty(arr_error,"province_city",province_city,"Tỉnh/ Thành phố chưa chọn !");
        c_func.check_empty(arr_error,"district",district," Quận/ huyện chưa chọn !");
        c_func.check_empty(arr_error,"wards",wards," Phường/ xã chưa chọn !");
        if(arr_error.length > 0){
            var arr_fields=["name_address","address","phone_address","province_city","district","wards","type"];
            c_load_html.load_alert_error("#alert_error_total_adress",arr_error,arr_fields,true,false);
        }
        else{
            var form = document.getElementById("form_users_address");
            let formData = new FormData(form);
            $.ajax({cache: false,url: url_server+"/users/save_address",type: "POST",data:formData,contentType: false,processData: false,dataType: "json",success: function (res) {
                    if (res["result"]==1) {
                        new users_ctr().load_list_address_users();
                        $("#f_users_address").hide();
                        common.update_session_ship(res["row"]["user_id"]);
                        common.Sweet_Notifi("success", res["message"], '',"OK", "#3085d6", "success");
                       
                    }
                    else {
                        common.Sweet_Notifi("error", res["message"], '',"OK", "#3085d6", "error");
                    }
                },
                error: function (error) {
                    common.Sweet_Notifi("error", "Thông báo", 'Đã xảy ra lỗi ',"OK", "#3085d6", "error");
                }
            });
        }
    }
    event_submit_btn_address_users(){
        $(document).on("click","#content #submit_btn_address_users",function(){
            var name_address=$("#name_address").val();
            var phone_address=$("#phone_address").val();
            var address=$("#address").val();
            var province_city=$("#province_city").val();
            var district=$("#district").val();
            var wards=$("#wards").val();
            var type=$("input[name='type']").val();
            var data={name_address:name_address,phone_address:phone_address,address:address,province_city:province_city,district:district,wards:wards,type:type};
            new users_ctr().save_address_users(data);
        });
    }
    
    
}

