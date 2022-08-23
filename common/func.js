
export default  class func{
     load_html(url,id_html,type) {
        const promise= new Promise(function (resolve, reject) {
            const request = new XMLHttpRequest();
            request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resolve(this.response);
            } 
            // else {
            //   reject(this.status);
            // }
            };
            request.open('GET', url, true);
            request.setRequestHeader("Access-Control-Allow-Origin", "*");
            request.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
            request.setRequestHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
            request.setRequestHeader("Access-Control-Allow-Credentials", true);
            request.send();
        });
        promise.then((response) => {
            if(type=="append"){
                id_html.innerHTML += response;
            }
            else{
                id_html.innerHTML = response;
            }
            
        })
        .catch((error) => {
            id_html.innerHTML = `Error getting the message, HTTP status: ${error}`;
        });
    }
    dynamicallyLoadScript(url) {
        var script = document.createElement("script");
        script.type="module";
        script.src = url;
        script.className ="ctr_class";
        //document.body.appendChild(script); 
        const div=document.getElementById('script_footer');
        div.parentNode.insertBefore(script, div);
    }
    dynamicallyLoadScript_default(url,module=true) {
        var script = document.createElement("script");
        if(module){
            script.type="module";
        }
        script.src = url;
        script.className ="ctr_class_default";
        //document.body.appendChild(script); 
        const div=document.getElementById('script_footer_default');
        div.parentNode.insertBefore(script, div);
    }
    removedynamicallyScript_default(url){
        $('.ctr_class_default').map((index,e)=>{
            if($(e).attr('src')==url){
                $(e).remove();
            }
        })
    }
    get_api(url,token){
        return new Promise(function (resolve, reject) {
             const xmlhttp=new XMLHttpRequest();
              xmlhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                  resolve(this.response);
                } 
              };
              xmlhttp.open('GET', url,true);
              if(token!=""){
                xmlhttp.setRequestHeader("Authorization", "Bearer " + token);
                xmlhttp.withCredentials = true;
              }
              xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencode;application/x-www-form-urlencoded;");
              //xmlhttp.setRequestHeader("Access-Control-Allow-Origin" , "*");
              xmlhttp.send();
            });
    }
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // res.setHeader('Access-Control-Allow-Credentials', true);
    get_api_example(url,token){
        var proxyUrl="https//cors-anywhere.herokuapp.com/"
        return new Promise(function (resolve, reject) {
            const xmlhttp=new XMLHttpRequest();
             xmlhttp.withCredentials = true;
             xmlhttp.open('GET', `${url}`,true);
             xmlhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                  resolve(this.response);
                } 
                else if (this.status != 200){
                    reject(this.status);
                }
              };
             xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "http://demojs.local");
             xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencode");
             xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');  
             xmlhttp.setRequestHeader("Authorization", "Bearer " + token);
             xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT");
             xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept,Authorization,Methods");
             xmlhttp.send();
           });
    }
   async get_api_example2(url,token){
        const response = await fetch(url, { 
            //mode: 'no-cors',
            method: 'GET', 
            headers: new Headers({
                'Content-Type':'application/x-www-form-urlencode',
                //'accept':'text/json',
                //'Access-Control-Allow-Origin':'*',
                //"Access-Control-Allow-Origin": window.location.origin,
                'Authorization':(token!=""?'Bearer '+ token:''), 
            }) 
        }); 
        return await response.json();
    }
    async get_api2(url,token){
        try{
            const response = await fetch(url, { 
                //mode: 'no-cors',
                method: 'GET', 
                headers: new Headers({
                    'Content-Type':'application/x-www-form-urlencode',
                    //'accept':'text/json',
                    //'Access-Control-Allow-Origin':'*',
                    //"Access-Control-Allow-Origin": window.location.origin,
                    'Authorization':'Bearer '+ token, 
                }) 
            }); 
            return await response.json();
        }
        catch(error){
            throw new Error(`Error server:`+error)
        }
    }
    post_api(url,para,token){
        return new Promise(function (resolve, reject) {
            const xmlhttp=new XMLHttpRequest();
             xmlhttp.onreadystatechange = function () {
               if (this.readyState == 4 && this.status == 200) {
                 resolve(this.response);
               } 
             };
             xmlhttp.open('POST', url, true);
             xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
             if(token!=""){
               xmlhttp.setRequestHeader('Authorization', 'Bearer ' + token);
             }
             //xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
             xmlhttp.send(JSON.stringify(para));
           });
    }
    async post_api2(url,para,token){
        try{
            const response = await fetch(url, { 
                method: 'post', 
                headers: new Headers({
                    'Authorization': 'Bearer '+token, 
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                    'Access-Control-Allow-Headers':'X-Requested-With,content-type',
                    'Access-Control-Allow-Credentials':true,
                }), 
                body:JSON.stringify(para)
            }); 
            return await response.json();
        }
        catch(error){
            throw new Error(`Error server:`+error)
        }
        
    }
    refresh_carousel_multip(){
        $('#carousel-multip').on('slide.bs.carousel', function (e) {
            var $e = $(e.relatedTarget);
            var idx = $e.index();
            var itemsPerSlide = 5;
            var totalItems = $('#carousel-multip .carousel-item').length;
            if (idx >= totalItems-(itemsPerSlide-1)) {
                var it = itemsPerSlide - (totalItems - idx);
                for (var i=0; i<it; i++) {
                    // append slides to end
                    if (e.direction=="left") {
                        $('#carousel-multip .carousel-item').eq(i).appendTo('#carousel-multip .carousel-inner');
                    }
                    else {
                        $('#carousel-multip .carousel-item').eq(0).appendTo('#carousel-multip .carousel-inner');
                    }
                }
            }
        });
    }
    refresh_carousel_multip_products(){
        $('#carousel-multip-products').on('slide.bs.carousel', function (e) {
            var $e = $(e.relatedTarget);
            var idx = $e.index();
            var itemsPerSlide = 5;
            var totalItems = $('#carousel-multip-products .carousel-item').length;
            if (idx >= totalItems-(itemsPerSlide-1)) {
                var it = itemsPerSlide - (totalItems - idx);
                for (var i=0; i<it; i++) {
                    // append slides to end
                    if (e.direction=="left") {
                        $('#carousel-multip-products .carousel-item').eq(i).appendTo('#carousel-multip-products .carousel-inner');
                    }
                    else {
                        $('#carousel-multip-products .carousel-item').eq(0).appendTo('#carousel-multip-products .carousel-inner');
                    }
                }
            }
        });
    }
    refresh_carousel(){
        $('#carousel_content').carousel({interval: 500});
    }
    imageZoom(imgID, resultID) {
        var img, lens, result, cx, cy;
        img = document.getElementById(imgID);
        result = document.getElementById(resultID);
        
        /*create lens:*/
        lens = document.createElement("DIV");
        lens.setAttribute("class", "img-zoom-lens");
        lens.style.opacity='0';
        /*insert lens:*/
        img.parentElement.insertBefore(lens, img);
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

        lens.addEventListener("mouseover", function(){result.style.opacity="1";result.style.zIndex=9999;});
        lens.addEventListener("mouseout", function(){result.style.opacity="0";result.style.zIndex=0;});

        img.addEventListener("mouseover", function(){result.style.opacity="1";result.style.zIndex=9999;});
        img.addEventListener("mouseout", function(){result.style.opacity="0";result.style.zIndex=0;});
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
      }
      convert_url_search_object(url_search){
        var objURL = {};
        url_search.replace(
            new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
            function( $0, $1, $2, $3 ){
                objURL[ $1 ] = $3;
            }
        );
        return objURL;
      }
    check_empty(arr,field,text,message){  
        if(text==null || text.trim()==""){
            arr.push({id:field,value:message});
        }
    }
    check_pass_repass(arr,field,pass,re_pass,message){
        if(pass && re_pass && re_pass != pass){
            arr.push({id:field,value:message});
        }
    }
    check_email(arr,field,text,message){
        var emailPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(text && !emailPattern.test(text)){
            arr.push({id:field,value:message});
        }
    }
    check_number(arr,field,text,message){
        if(text && isNaN(text)){
            arr.push({id:field,value:message});
        }
    }
    check_date(arr,field,text,message,type){
        if(type == "ddmmyyyy"){
            var re = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
            if(text != '') {
                var regs = text.match(re);
                if(text.match(re)) {
                    if(regs[1] < 1 || regs[1] > 31) {
                        arr.push({id:field,value:"Ngày không hợp lệ :"+regs[1]});
                    }
                    if(regs[2] < 1 || regs[2] > 12) {
                        arr.push({id:field,value:"Tháng không hợp lệ :"+regs[2]});
                    }
                    if(regs[3] < 1902 || regs[3] > (new Date()).getFullYear()) {
                        arr.push({id:field,value:"Năm không hợp lệ :"+regs[3]+". Năm trong khoảng 1902 đến "+ (new Date()).getFullYear()});
                    }
                } else {
                    arr.push({id:field,value:message});
                }
            }
        }
        else if(type == "mmddyyyy"){
            var re = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
            if(text != '') {
                var regs = text.match(re);
                if(text.match(re)) {
                    if(regs[1] < 1 || regs[1] > 12) {
                        arr.push({id:field,value:"Tháng không hợp lệ :"+regs[1]});
                    }
                    if(regs[2] < 1 || regs[2] > 31) {
                        arr.push({id:field,value:"Ngày không hợp lệ :"+regs[2]});
                    }
                    if(regs[3] < 1902 || regs[3] > (new Date()).getFullYear()) {
                        arr.push({id:field,value:"Năm không hợp lệ :"+regs[3]+". Năm trong khoảng 1902 đến "+ (new Date()).getFullYear()});
                    }
                } else {
                    arr.push({id:field,value:message});
                }
            }
        }
        else if(type =="hhii"){
            var re = /^(\d{1,2}):(\d{2})([ap]m)?$/;
            if(text != '') {
                var regs =text.match(re);
                if(text.match(re)) {
                  if(regs[3]) {
                    if(regs[1] < 1 || regs[1] > 12) {
                        arr.push({id:field,value:"Giờ không hợp lệ :"+regs[1]});
                    }
                  } else {
                    if(regs[1] > 23) {
                        arr.push({id:field,value:"Giờ không hợp lệ :"+regs[1]});      
                    }
                  }
                  if(regs[2] > 59) {
                    arr.push({id:field,value:"Phút không hợp lệ :"+regs[2]});      
                  }
                } else {
                    arr.push({id:field,value:message});
                }
              }
        }
       

    }
    star_number(number,font_size){
        var html ='';
        var color='#f5dd42';
        if(number == 0){
            html+=`
                <i class="fa fa-star-0" style="${font_size};color:${color};"></i>
                <i class="fa fa-star-o" style="${font_size};color:${color};"></i>
                <i class="fa fa-star-o" style="${font_size};color:${color};"></i>
                <i class="fa fa-star-o" style="${font_size};color:${color};"></i>
                <i class="fa fa-star-o" style="${font_size};color:${color};"></i>
            `;
        }
        else if(number > 0 && number <= 1){
            html+=`
                <i class="fa fa-star" style="${font_size};color:${color};"></i>
                <i class="fa fa-star-o" style="${font_size};color:${color};"></i>
                <i class="fa fa-star-o" style="${font_size};color:${color};"></i>
                <i class="fa fa-star-o" style="${font_size};color:${color};"></i>
                <i class="fa fa-star-o" style="${font_size};color:${color};"></i>
            `;
        }
        else if(number > 1 && number <= 2){
            html+=`
            <i class="fa fa-star" style="${font_size};color:${color};"></i>
            <i class="fa fa-star" style="${font_size};color:${color};"></i>
            <i class="fa fa-star-o" style="${font_size};color:${color};"></i>
            <i class="fa fa-star-o" style="${font_size};color:${color};"></i>
            <i class="fa fa-star-o" style="${font_size};color:${color};"></i>
        `;
        }
        else if(number > 2 && number <= 3){
            html+=`
            <i class="fa fa-star" style="${font_size};color:${color};"></i>
            <i class="fa fa-star" style="${font_size};color:${color};"></i>
            <i class="fa fa-star" style="${font_size};color:${color};"></i>
            <i class="fa fa-star-o" style="${font_size};color:${color};"></i>
            <i class="fa fa-star-o" style="${font_size};color:${color};"></i>
        `;
        }
        else if(number > 3 && number <= 4){
            html+=`
            <i class="fa fa-star" style="${font_size};color:${color};"></i>
            <i class="fa fa-star" style="${font_size};color:${color};"></i>
            <i class="fa fa-star" style="${font_size};color:${color};"></i>
            <i class="fa fa-star" style="${font_size};color:${color};"></i>
            <i class="fa fa-star-o" style="${font_size};color:${color};"></i>
        `;
        }
        else if(number > 4 && number <= 5){
            html+=`
            <i class="fa fa-star" style="${font_size};color:${color};"></i>
            <i class="fa fa-star" style="${font_size};color:${color};"></i>
            <i class="fa fa-star" style="${font_size};color:${color};"></i>
            <i class="fa fa-star" style="${font_size};color:${color};"></i>
            <i class="fa fa-star" style="${font_size};color:${color};"></i>
        `;
        }
        return html;
    }
    check_prime(arr_prime,arr_not_prime,arr_str,n){
        if(isNaN(n)){
            arr_str.push(n);
            return;
        }
        var flag = true;
        if (n < 2){flag = false;}
        else if (n == 2){flag = true;}
        else if (n % 2 == 0){ flag = false;}
        else{
            // lặp từ 3 tới n-1 với bước nhảy là 2 (i+=2)
            for (var i = 3; i < Math.sqrt(n); i+=2){
                if (n % i == 0){
                    flag = false;
                    break;
                }
            }
        }
        // Kiểm tra biến flag
        if (flag == true){
            arr_prime.push(n);
        }
        else{
            arr_not_prime.push(n);
        }
    }
    
    check_perfect(arr_perfect,arr_not_perfect,arr_str,n){
        if(isNaN(n)){
            arr_str.push(n);
            return;
        }
        var total=0;
        //Tìm tổng ước số   
        for (var i=1;i<n; i++){
            if (n % i == 0) total+=i;//Nếu là ước số thì cộng vào tổng
        }
        //So sánh tổng ước số với số đã cho để tìm ra số hoàn hảo
        if (total == n & n!=0){
            arr_perfect.push(n);
        }
        else{
            arr_not_perfect.push(n);
        }
    }
    check_odd_even(arr_even,arr_odd,arr_str,n){
        if(isNaN(n)){
            arr_str.push(n);
            return;
        }
        if(n%2==0){
            arr_even.push(n);
        }
        else{
            arr_odd.push(n);
        }
    }
    async post_token_api_s2retail(){
        var url='https://api.s2retail.xyz/api/TokenAuth/Authenticate';
        var para={
            "userNameOrEmailAddress": "admin",
            "password": "123qwE",
            "tenantName": "s2r",
            "rememberClient": true
        }
        var token= await this.post_api2(url,para,'');
        return (token["result"]["accessToken"]?token["result"]["accessToken"]:'')
    }
    list_bank_atm(){
        return [
            //{value:'',name:'Không chọn'},
            {value:'VNPAYQR',name:'Ngân hàng VNPAYQR'},
            {value:'NCB',name:'Ngân hàng NCB'},
            {value:'SCB',name:'Ngân hàng SCB'},
            {value:'SACOMBANK',name:'Ngân hàng SACOMBANK'},
            {value:'EXIMBANK',name:'Ngân hàng EXIMBANK'},
            {value:'MSBANK',name:'Ngân hàng MSBANK'},
            {value:'NAMABANK',name:'Ngân hàng NAMABANK'},
            {value:'VISA',name:'Ngân hàng VISA'},
            {value:'VNMART',name:'Ngân hàng VNMART'},
            {value:'VIETINBANK',name:'Ngân hàng VIETINBANK'},
            {value:'VIETCOMBANK',name:'Ngân hàng VIETCOMBANK'},
            {value:'HDBANK',name:'Ngân hàng HDBANK'},
            {value:'DONGABANK',name:'Ngân hàng Dong A'},
            {value:'TPBANK',name:'Ngân hàng Tp Bank'},
            {value:'OJB',name:'Ngân hàng OceanBank'},
            {value:'BIDV',name:'Ngân hàng BIDV'},
            {value:'TECHCOMBANK',name:'Ngân hàng Techcombank'},
            {value:'VPBANK',name:'Ngân hàng VPBank'},
            {value:'AGRIBANK',name:'Ngân hàng AGRIBANK'},
            {value:'MBBANK',name:'Ngân hàng MBBank'},
            {value:'ACB',name:'Ngân hàng ACB'},
            {value:'OCB',name:'Ngân hàng OCB'},
            {value:'SHB',name:'Ngân hàng SHB'},
            {value:'IVB',name:'Ngân hàng IVB'}]
    }
    
}
 
