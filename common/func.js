
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
      let h=new Headers();
      h.append('Authentication',`Bearer ${token}`);
      h.append('Access-Control-Allow-Origin',`*`);
      h.append('Access-Control-Allow-Methods',`GET, POST, OPTIONS, PUT, PATCH, DELETE`);
      h.append('Access-Control-Allow-Headers',`X-Requested-With,content-type`);
      h.append('Access-Control-Allow-Credentials',`true`);
      let req =new Request(url,{
        method:'GET',
        mode :'no-cors',
        headers:h
      })
      fetch(req)
      .then(resp =>resp.json())
      .catch(err=>{
        console.error(err.message);
      })
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
            }); ;
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
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Origin':'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                    'Access-Control-Allow-Headers':'X-Requested-With,content-type',
                    'Access-Control-Allow-Credentials':true,
                    'Authorization': 'Bearer '+token, 
                    'Content-Type': 'application/json'
                   
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
}
 
