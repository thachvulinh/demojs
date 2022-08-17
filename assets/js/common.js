var url_server =   'https://onlineshop-server.herokuapp.com'; 
$('.money_vi').mask("###,###,###,###", { reverse: true });
var common = {
    init: function () { },
    submit_page_list:function(page,id_form){
        $("#page").val(page);
        $(id_form).submit();
    },
    close_form:function(id_form){
        $(id_form).hide();
    },
    Sweet_Notifi:function(icon,title, text,text_btn,color_btn, type){
        Swal.fire({ icon: icon, title: title, html: text,showCancelButton: false,confirmButtonText: text_btn,confirmButtonColor: color_btn, type: type, footer: ''});
    },
    showNotification: function (icon, text, type, timer, from, align) {
        $.notify({icon: icon, message: text}, {type: type,timer: timer, placement: {from: from,align: align}});
    },
    Check_Input_Number:function(e){
        var value = $(e).val();
            if (isNaN(value)) {
                var thaydoi = value.replace(/[^Z0-9 ]/g, "");
                $(e).val(thaydoi);
            }
    },
    number_format:function(text,lang){
        if(lang=="vi"){
            return new Intl.NumberFormat('vi-VN').format(text);
        }
        else{
            return Intl.NumberFormat('en-US').format(text);;
        }
    },
    check_radio_active:function(e,class_label,id_span){
        $(class_label).css("border","thin solid #DEE2E6");
        $(e).parent().css("border","thin solid #F57224");
        $(id_span).html($(e).val());
    },
    choose_img:function(e,id_img){
        var src=$(e).attr("src");
        $(id_img).attr("src",src);
        common.imageZoom("myimage", "myresult");

    },
    select_file_upload: function (e,bg,id_img,id_value) {
        var files = !!e.files ? e.files : [];
        if (!files.length || !window.FileReader) {
            if(bg==1){
                $(id_img).css("background-image", url_server+"/upload/no-image.png");
            }
            else{
                $(id_img).attr('src', url_server+"/upload/no-image.png");
            }
            e.value = "";
        }
        else {
            if (/^image/.test(files[0].type)) {
                var reader = new FileReader();
                reader.readAsDataURL(files[0]);
                reader.onloadend = function () {
                    if(bg==1){
                        $(id_img).css("background-image", "url(" + this.result + ")");
                    }
                    else{
                        $(id_img).attr('src', this.result);
                    }
                    $(id_value).val('');
                    
                }
            }
        }
    },
    check_access_list_cart:function(user_id){
        if(user_id!=""){
            $.ajax({ url: url_server+'/users/list_address_user/'+user_id,dataType: 'json',type: 'GET',success: function (res) {
                    if(JSON.stringify(res)!="[]"){
                        var number_cart=$("#cart_number").attr("data-content");
                        if(number_cart==0){
                            common.Sweet_Notifi("error","Thông báo", 'Không có sản phẩm trong giỏ',"OK", "#3085d6", "error");
                        }
                        else{
                            location.href="/carts/list";
                        }
                    }
                    else{
                        Swal.fire({title: 'Tài khoản chưa có địa chỉ giao hàng. Vui lòng cập nhật ?', text: "Nhấn vào để đồng ý để truy cập",icon: 'warning',showCancelButton: true,cancelButtonText: 'Hủy',confirmButtonColor: '#3085d6',cancelButtonColor: '#d33',confirmButtonText: 'Đồng ý'}).then((result) => {
                            if (result.isConfirmed) {
                                location.href="/users/address";
                            }
                        });
                    }
                }
            })
        }
        else{
            Swal.fire({title: 'Vui lòng đăng nhập để xem giỏ hàng !', text: "Nhấn vào để đồng ý đăng nhập",icon: 'warning',showCancelButton: true,cancelButtonText: 'Hủy',confirmButtonColor: '#3085d6',cancelButtonColor: '#d33',confirmButtonText: 'Đồng ý'}).then((result) => {
                if (result.isConfirmed) {
                    location.href="/login";
                }
            });
        }
    },
    Format_DateTime:function(date,type){
        if(type=="ddmmyyyyhhiiss"){
            const d = new Date(date);
            const yyyy = d.getFullYear();
            let mm = d.getMonth() + 1; // Months start at 0!
            let dd = d.getDate();
            let hh = d.getHours();
            let ii = d.getMinutes();
            let ss = d.getSeconds();
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            
            if (hh < 10) hh = '0' + hh;
            if (ii < 10) ii = '0' + ii;
            if (ss < 10) ss = '0' + ss;
            const today = dd + '/' + mm + '/' + yyyy +' '+hh+':'+ii+':'+ss ;
            return today;
        }
    },
    item_pagination:function(pages,current,fuc){
        var html='';
        html+='<div class="product_pagination" style="border-top:none">';
            if(pages > 0) { 
                html+='<div class="left_btn"><a href="javascript:void(0)" onclick="'+fuc+'(\''+(Number(current) - 1)+'\')" class="'+(current==1?'disabled-link':'')+'"><i class="lnr lnr-arrow-left"></i> Quay lại </a></div>';
                html+='<div class="middle_list">';
                    html+='<nav aria-label="Page navigation example">';
                        html+='<ul class="pagination">';
                            var i = (Number(current) > 3 ? Number(current) - 2 : 1);
                            if(i !== 1) {
                            html+='<li class="page-item disabled"><a class="page-link" href="javascript:void(0)">...</a></li>';
                            }
                            for(; i <= (Number(current) + 2) && i <= pages; i++) {
                                html+='<li class="page-item  '+(i == current?'active':'')+'"><a href="javascript:void(0)" class="page-link" onclick="'+fuc+'(\''+i+'\')" >'+i+'</a></li>';
                                if (i == Number(current) + 2 && i < pages) { 
                                html+='<li class="page-item disabled"><a class="page-link" href="javascript:void(0)">...</a></li>';
                                }
                            }
                        html+='</ul>';
                    html+='</nav>';
                html+='</div>';
                html+='<div class="right_btn"><a href="javascript:void(0)" onclick="'+fuc+'(\''+(Number(current) + 1)+'\')" class="'+ (current == pages?'disabled-link':'')+'"> Tiếp <i class="lnr lnr-arrow-right"></i></a></div>';
            }
        html+='</div>';
        return html;
    },
    update_price:function(data,id_price){
        var color=$("input[name='color']").map(function(){if(this.checked==true){return $(this).val();}}).get();
        var condition1=$("input[name='condition1']").val();
        var value_condition1=$("input[name='value_condition1']").map(function(){if(this.checked==true){return $(this).val();}}).get();
        var condition2=$("input[name='condition2']").val();
        var value_condition2=$("input[name='value_condition2']").map(function(){if(this.checked==true){return $(this).val();}}).get();
        if(JSON.stringify(data)!="[]"){
            $.each(data, function (key, item) {
               if(item["color"]==color[0] && item["condition1"]==condition1 && item["value_condition1"]==value_condition1[0] && item["condition2"]==condition2 && item["value_condition2"]==value_condition2[0]){
                   $(id_price).html(common.number_format(item["price"]),"vi");
                   $("#price_products").val(item["price"]);
                   $("#product_price_id").val(item["_id"]);
               }
            });
        }
    },
    imageZoom(imgID, resultID) {
        var img, lens, result, cx, cy;
        img = document.getElementById(imgID);
        result = document.getElementById(resultID);

        /*create lens:*/
        lens = document.createElement("DIV");
        lens.setAttribute("class", "img-zoom-lens");
        /*insert lens:*/
        img.parentElement.insertBefore(lens, img);
        lens.style.opacity='0';
        /*calculate the ratio between result DIV and lens:*/
        cx = result.offsetWidth / lens.offsetWidth;
        cy = result.offsetHeight / lens.offsetHeight;
        /*set background properties for the result DIV:*/
        result.style.backgroundImage = "url('" + img.src + "')";
        result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
        /*execute a function when someone moves the cursor over the image, or the lens:*/
        lens.addEventListener("mousemove", moveLens);
        img.addEventListener("mousemove", moveLens);
        /*and also for touch screens:*/
        lens.addEventListener("touchmove", moveLens);
        img.addEventListener("touchmove", moveLens);

        lens.addEventListener("mouseover", function(){result.style.opacity="1";result.style.zIndex=9999});
        img.addEventListener("mouseover", function(){result.style.opacity="1";result.style.zIndex=9999});
        lens.addEventListener("mouseout", function(){result.style.opacity="0";result.style.zIndex=0});
        img.addEventListener("mouseout", function(){result.style.opacity="0";result.style.zIndex=0 });
        function moveLens(e) {
          
          var pos, x, y;
          /*prevent any other actions that may occur when moving over the image:*/
          e.preventDefault();
          /*get the cursor's x and y positions:*/
          pos = getCursorPos(e);
          /*calculate the position of the lens:*/
          x = pos.x - (lens.offsetWidth / 2);
          y = pos.y - (lens.offsetHeight / 2);
          /*prevent the lens from being positioned outside the image:*/
          if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
          if (x < 0) {x = 0;}
          if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
          if (y < 0) {y = 0;}
          /*set the position of the lens:*/
          lens.style.left = x + "px";
          lens.style.top = y + "px";
          /*display what the lens "sees":*/
          result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
          result.style.display='block';
        }
        function getCursorPos(e) {
          var a, x = 0, y = 0;
          e = e || window.event;
          /*get the x and y positions of the image:*/
          a = img.getBoundingClientRect();
          /*calculate the cursor's x and y coordinates, relative to the image:*/
          x = e.pageX - a.left;
          y = e.pageY - a.top;
          /*consider any page scrolling:*/
          x = x - window.pageXOffset;
          y = y - window.pageYOffset;
          return {x : x, y : y};
        }
      },
      update_total_price:function(){
        var list_id=$("input[name='check_cart[]']").map(function(){if(this.checked==true){return $(this).val();}}).get();
        var total=0;
        var total_temp=0;
        var total_delivery_prices=0;
        
        if(JSON.stringify(list_id)!="[]" ){
            $.each (list_id,function (key, item){
                var id=item;
                var price=$("#price_"+id).val();
                var ship_one_order=$("#ship_one_order_"+id).val();
                var quantity=$("#quantity_"+id).val();
                total_delivery_prices+=ship_one_order * quantity;
                total_temp+=price * quantity;
                $("#ship_"+id).val(ship_one_order * quantity);
                $("#span_ship_"+id).html(common.number_format(ship_one_order * quantity));
            });
            total=total_temp + total_delivery_prices;
        }
        $("#total_delivery_prices").html(common.number_format(total_delivery_prices));
        $("#_total_delivery_prices").val(total_delivery_prices);
        $("#total_price_temp").html(common.number_format(total_temp));
        $("#_total_price_temp").val(total_temp);
        $("#total_price").html(common.number_format(total));
        $("#_total_price").val(total);
    },
    update_check_cart:function(e){
        var id=$(e).val();
        $.ajax({cache: false,url: url_server+"/cart/update_check_cart",type: "POST",data: {id:id},dataType: "json",success: function (res) {
                if (res["result"]==1) {
                    //common.Sweet_Notifi("success", res["message"], '',"OK", "#3085d6", "success");
                }
                else {
                    ///common.Sweet_Notifi("error", res["message"], '',"OK", "#3085d6", "error");
                }
            },
            error: function (error) {
                alert("lỗi");
            }
        });
    },
    update_quantity_cart:function(e,id){
        var quantity=$(e).val();
        $.ajax({cache: false,url: url_server+"/cart/update_quantity_cart",type: "POST",data: {id:id,quantity:quantity},dataType: "json",success: function (res) {
                if (res["result"]==1) {
                    //common.Sweet_Notifi("success", res["message"], '',"OK", "#3085d6", "success");
                }
                else {
                    //common.Sweet_Notifi("error", res["message"], '',"OK", "#3085d6", "error");
                }
            },
            error: function (error) {
                alert("lỗi");
            }
        });
    },
    delete_cart :function(id){
        Swal.fire({title: 'Bạn có muốn xóa giỏ hàng này không ?', text: "Nhấn vào để đồng ý xóa",icon: 'warning',showCancelButton: true,cancelButtonText: 'Hủy',confirmButtonColor: '#3085d6',cancelButtonColor: '#d33',confirmButtonText: 'Đồng ý'}).then((result) => {
            if (result.isConfirmed) {
                $.ajax({ url: url_server+'/cart/delete/'+id,dataType: 'json',type: 'GET',success: function (res) {
                        if (res["result"]==1) {
                            $("#row_cart_"+id).remove();
                            var check_row_cart=$("tr").hasClass("row_cart");
                            if(check_row_cart==false){
                                var html='';
                                html+='<tr>';
                                    html+='<td colspan="4" class="text-center">Không có sản phẩm</td>';
                                html+='</tr>';
                                $("#table_cart").append(html);
                                $("#cart_submit").hide();
                            }
                            common.update_total_price()
                            common.Sweet_Notifi("success",'Thông báo' , res["message"],"OK", "#3085d6", "success");
                        }
                        else {
                            common.Sweet_Notifi("error",'Thông báo',res["message"],"OK", "#3085d6", "error");
                        }
                    },
                    error: function (error) {
                        common.Sweet_Notifi("error", "Thông báo", "Đã xảy ra lỗi","OK", "#3085d6", "error");
                    }
                })
            }
        }) 
    },
    delete_cart_multip:function(){
        Swal.fire({title: 'Bạn có muốn xóa không ?', text: "Nhấn vào để đồng ý xóa",icon: 'warning',showCancelButton: true,cancelButtonText: 'Hủy',confirmButtonColor: '#3085d6',cancelButtonColor: '#d33',confirmButtonText: 'Đồng ý, Xóa ngay!'}).then((result) => {
            if (result.isConfirmed) {
                var list_id=$("input[name='check_cart[]']").map(function(){if(this.checked==true){return $(this).val();}}).get();
                if(JSON.stringify(list_id)!="[]" ){
                    $.ajax({type: 'POST', url: url_server+'/cart/delete_multip',data:{list_id:list_id},dataType: 'json',success: function (res) {
                            if (res["result"]==1) {
                                $.each (list_id,function (key, item){
                                    $("#row_cart_"+item).remove();
                                });
                                var check_row_cart=$("tr").hasClass("row_cart");
                                if(check_row_cart==false){
                                    var html='';
                                    html+='<tr>';
                                        html+='<td colspan="4" class="text-center">Không có sản phẩm</td>';
                                    html+='</tr>';
                                    $("#table_cart").append(html);
                                    $("#cart_submit").hide();
                                }
                                common.update_total_price()
                                common.Sweet_Notifi("success",'Thông báo',res["message"],"OK", "#3085d6", "success");
                            }
                            else {
                                common.Sweet_Notifi("error",'Thông báo', res["message"],"OK", "#3085d6", "error");
                            }
                        },
                        error: function (error) {
                            common.Sweet_Notifi("error", "Thông Báo", "Đã xảy ra lỗi","OK", "#3085d6", "error");
                        }
                    })
                }
                else{
                    common.Sweet_Notifi("error", "Thông Báo", "Chưa chọn sản phẩm","OK", "#3085d6", "error");
                }
            }
        })
    },
    update_user:function(){
        var form = document.getElementById("form_users_info");
        let formData = new FormData(form);
        $.ajax({cache: false,url: url_server+"/users/update",type: "POST",data:formData,contentType: false,processData: false,dataType: "json",success: function (res) {
                if (res["result"]==1) {
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
    },
    info_user_address_form: function (id) {
        $("#alert_error_total_address").empty();
        $("#f_users_address").show();
        if(id!=""){
            $.ajax({ url: url_server+'/users/info_address/'+id,dataType: 'json',type: 'GET',success: function (res) {
                $("#id_address").val(res["_id"]);
                $("#value_province_city").val(res["value_province_city"]);
                $("#value_district").val(res["value_district"]);
                $("#value_wards").val(res["value_wards"]);
                $("#name").val(res["name"]);
                $("#phone").val(res["phone"]);
                $("#address").val(res["address"]);
                common.loadprovince("#province_city",res["province_city"]);
                setTimeout(function(){
                    common.loaddistrict('#district',res["district"],'#province_city','#wards');
                },1000);
                setTimeout(function(){
                    common.loadwards('#wards',res["wards"],'#province_city','#district');
                },2000);
                (res["type"]=="home"?$("#home").prop("checked",true):$("#works").prop("checked",true));
                }
            })
        }
        else{
            $("#id").val("");
            $("#value_province_city").val("");
            $("#value_district").val("");
            $("#value_wards").val("");
            $("#name").val("");
            $("#phone").val("");
            $("#address").val("");
            common.loadprovince("#province_city",'');
            $("#district").empty();
            $("#wards").empty();
            $("#type").val("home");
        }
    },
    loadprovince:function(id_select,select){
        $.ajax({
            url: url_server+'/users/loadprovince',
            type: "GET",
            dataType: "json",
            success: function (response) {
                var html = '<option value="">--Chọn tỉnh thành--</option>';
                $.each(response, function (i, item) {
                    var  provice=item._attributes;
                    html += '<option '+(parseInt(provice.id)==select?'selected':'')+' value="' + provice.id + '">' + provice.value + '</option>'
                });
                $(id_select).html(html);
            }
        })
    },
    loaddistrict:function(id_select,select,id_provice,id_wards){
        $(id_wards).html("");
        $(id_select).html("");
        var value_privice=$(id_provice).val();
        $.ajax({
            url: url_server+'/users/loaddistrict/'+value_privice,
            type: "GET",
            dataType: "json",
            success: function (response) {
                var html = '<option value="">--Chọn quận huyện--</option>';
                $.each(response, function (i, item) {
                    var  district=item._attributes;
                    html += '<option '+(select==district.id?'selected':'')+' value="' + district.id + '">' + district.value + '</option>'
                });
                $(id_select).html(html);
            }
        })
    },
    loadwards:function(id_select,select,id_provice,id_district){
        var value_privice=$(id_provice).val();
        var value_district=$(id_district).val();
        $.ajax({
            url: url_server+'/users/loadwards/'+value_privice+'/'+value_district,
            type: "GET",
            dataType: "json",
            success: function (response) {
                var html = '<option value="">--Chọn xã phường--</option>';
                $.each(response, function (i, item) {
                    var  wards=item._attributes;
                    html += '<option '+(select==wards.id?'selected':'')+' value="' + wards.id + '">' + wards.value + '</option>'
                });
                $(id_select).html(html);
            }
        })
    },
    update_address:function(){
        var e_province_city = document.getElementById("province_city");
        var e_district = document.getElementById("district");
        var e_wards = document.getElementById("wards");
        if(e_province_city.options[e_province_city.selectedIndex]){
            $("#value_province_city").val(e_province_city.options[e_province_city.selectedIndex].text);
        }
        if(e_district.options[e_district.selectedIndex]){
            $("#value_district").val(e_district.options[e_district.selectedIndex].text);
        }
        if(e_wards.options[e_wards.selectedIndex]){
            $("#value_wards").val(e_wards.options[e_wards.selectedIndex].text);
        }
    },
    delete_user_address_form:function(id){
        Swal.fire({title: 'Bạn có muốn xóa không ?', text: "Nhấn vào để đồng ý xóa",icon: 'warning',showCancelButton: true,cancelButtonText: 'Hủy',confirmButtonColor: '#3085d6',cancelButtonColor: '#d33',confirmButtonText: 'Đồng ý,Xóa ngay!'}).then((result) => {
            if (result.isConfirmed) {
                $.ajax({ url: url_server+'/users/delete_address/'+id,dataType: 'json',type: 'GET',success: function (res) {
                        if (res["result"]==1) {
                            $("#row_address_"+id).remove();
                            console.log($(".row_address").length);
                            if($(".row_address").length == 0 ){
                                $("#body_table_address_users").html('<tr><td colspan="4" class="text-center"> Không có dữ liệu</td></tr>');
                            }
                            common.Sweet_Notifi("success", res["message"], '',"OK", "#3085d6", "success");
                        }
                        else {
                            common.Sweet_Notifi("error", res["message"], '',"OK", "#3085d6", "error");
                        }
                    },
                    error: function (error) {
                        common.Sweet_Notifi("error", "Xóa Không Thành Công", "error","OK", "#3085d6", "error");
                    }
                })
            }
          })
    },
    update_address_use_shipping_billing:function(e,user_id,use_type){
        var id=$(e).val();
        $.ajax({ url: url_server+'/users/update_address_use_shipping_billing',data:{id:id,user_id:user_id,use_type:use_type},dataType: 'json',type: 'GET',success: function (res) {
                if (res["result"]==1) {
                    common.Sweet_Notifi("success", res["message"], '',"OK", "#3085d6", "success");
                    common.update_session_ship(user_id);
                }
                else {
                    common.Sweet_Notifi("error", res["message"], '',"OK", "#3085d6", "error");
                }
            },
            error: function (error) {
                common.Sweet_Notifi("error", "Xóa Không Thành Công", "error","OK", "#3085d6", "error");
            }
        })
    },
    update_session_ship:function(user_id){
        $.ajax({ url: url_server+'/users/info_address_use_shipping_billing/'+user_id,dataType: 'json',type: 'GET',success: function (res) {
            if(JSON.stringify(res["data_address"])!="{}" && JSON.stringify(res["data_address"])!="[]" ){
                sessionStorage.setItem("us_address_ship",res["use_shipping"]["address"]);
                sessionStorage.setItem("us_postcode",res["use_shipping"]["value_province_city"]+" - "+ res["use_shipping"]["value_district"]+" - "+ res["use_shipping"]["value_wards"]);
                }
                
            }
        })
    },
    load_reply_comment:function(id_comment){
        $(".div_reply_comment").empty();
        var html=`
        <input type="hidden" name="id_reply_comment_product" id="id_reply_comment_product" value="${id_comment}" />
         <div class="input-group mb-3" style="padding-left:80px">
            <input type="text" name="content_reply_product" id="content_reply_product" class="form-control" placeholder="Nhập câu trả lời ...">
            <div class="input-group-append">
            <span class="input-group-text" style="cursor: pointer;" id="btn_reply_comment_products"><i class="fa fa-play"></i></span>
            </div>
        </div>`
        $("#div_reply_comment_"+id_comment).html(html);
    }
    

}
common.init();
