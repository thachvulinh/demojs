import func from '../common/func.js';
import load_html from '../common/load_html.js';
import asyncSequence from '../common/asyncSequence.js';
import sequence from '../common/sequence.js';
let c_func=new func();
let c_load_html=new load_html();
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js'
var token_api_example='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJwYXRyaWNrLnBoYW1AcGFwLXRlY2guY29tIiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiJZWkFLWVhVRkJUTlA1VjdFTUQ3RTVGVklON0s2QVVKTyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiaHR0cDovL3d3dy5hc3BuZXRib2lsZXJwbGF0ZS5jb20vaWRlbnRpdHkvY2xhaW1zL3RlbmFudElkIjoiMiIsInN1YiI6IjMiLCJqdGkiOiIwMzQwMjIyNS1kNjRjLTRlNmYtOTZjZS1jYzg1ZjA5NDhiMzMiLCJpYXQiOjE2NjA4Nzg4MjEsIm5iZiI6MTY2MDg3ODgyMSwiZXhwIjoxNjYwOTY1MjIxLCJpc3MiOiJTMlJldGFpbCIsImF1ZCI6IlMyUmV0YWlsIn0.NMPdLIDxQ5LgndxiQxi21ojGCnlE_7uVzxTRGUwwAwk';
export default class  example_ctr{
    //constructor(){}
    
    async loadapi_example(){
        var url_example='https://api.s2retail.xyz/api/services/app/UnitOfMeasure/GetUOMListForComboBox';
        var id_table_api_test = document.getElementById("table_api_test");
        if(id_table_api_test){
            // c_func.get_api(url_example,token_api_example).then((response) => {
            //     const list = JSON.parse(response); 
            //      id_loadcmb.innerHTML=c_load_html.load_cmb_example(list);
            // });
            c_func.get_api_example(url_example,token_api_example).then((response) => {
                const list = JSON.parse(response); 
                id_table_api_test.innerHTML = c_load_html.load_table_api_test(list);
            }).catch((error)=>{
                id_table_api_test.innerHTML=`<tr><td colspan="3" class="text-center">Không lấy được dữ liệu server: Lỗi status:${error} </td></tr>`
            });
        }
    }

    async loadapi_example3(){
      var url_example='https://api.s2retail.xyz/api/services/app/UnitOfMeasure/GetUnitOfMeasureName';
      var id_table_api_test3 = document.getElementById("table_api_test3");
      if(id_table_api_test3){
          c_func.get_api_example(url_example,token_api_example).then((response) => {
              const list = JSON.parse(response); 
              id_table_api_test3.innerHTML = c_load_html.load_table_api_test(list);
          }).catch((error)=>{
            id_table_api_test3.innerHTML=`<tr><td colspan="3" class="text-center">Không lấy được dữ liệu server: Lỗi status:${error} </td></tr>`
        });
      }
    }
    async loadapi_example4(){
      var url_example='https://api.s2retail.xyz/api/services/app/AR_Transaction/GetReasonCodeByReceiveType';
      var id_table_api_test4 = document.getElementById("table_api_test4");
      if(id_table_api_test4){
          c_func.get_api_example(url_example,token_api_example).then((response) => {
              const list = JSON.parse(response); 
              id_table_api_test4.innerHTML = c_load_html.load_table_api_test(list);
          }).catch((error)=>{
            id_table_api_test4.innerHTML=`<tr><td colspan="3" class="text-center">Không lấy được dữ liệu server: Lỗi status:${error} </td></tr>`
        });
      }
    }
    //example 5
    event_btn_submit_get_api_5(){
        $(document).on("click","#content #btnGet", function () {
            var url_example="https://www.javascripttutorial.net/sample/promise/api.json";
            const msg = document.querySelector('#Message');
            c_func.get_api_example(url_example,"").then((response) => {
                const result = JSON.parse(response); 
                msg.innerHTML = result.message;;
            }).catch((error)=>{
                msg.innerHTML= `Error getting the message, HTTP status: ${error}`
          });
        });
    }
    //example 6
    async load_api_example6(){
        var  id_table_api_test6= document.getElementById('table_api_test6');
        if(id_table_api_test6){
            try{
                var url_example="https://jsonplaceholder.typicode.com/users";
                var result=await c_func.get_api_example2(url_example,"");
                id_table_api_test6.innerHTML=c_load_html.load_table_api_test6(result);
            }
            catch(error){
                id_table_api_test6.innerHTML=`<tr><td colspan="8" class="text-center">Không lấy được dữ liệu server: Lỗi status:${error.status} </td></tr>`
            }
            
        }
    }
    //load_example7
    load_example7(){
        $("#id_example_7").empty();
        $("#id_example_7").html('<div id="id_example_7_temp"></div>');
        var id_example_7=document.getElementById('id_example_7_temp');
        if(id_example_7){
            (async()=>{
                let seq=new asyncSequence(1,100,1);
                for await(let value of seq){
                    id_example_7.innerHTML +=`<div class="bg-primary p-1  m-2 border text-white float-left">${value}</div>`;
                }
            })();
        }
    }
    evet_reset_example_7(){
        $(document).on("click","#content #reset_example_7", function () {
            new example_ctr().load_example7();
        });
    }
    //load_example_8
    load_example_8(){
        const d = new Date();
        $("#format_date_ddmmyyyyhhiiss").html(common.Format_DateTime(d,'ddmmyyyyhhiiss'));
        $("#format_date_mmddyyyyhhiiss").html(common.Format_DateTime(d,'mmddyyyyhhiiss'));
        $("#format_date_yyyymmddhhiiss").html(common.Format_DateTime(d,'yyyymmddhhiiss'));
        $("#format_date_ddmmyyyyhhii").html(common.Format_DateTime(d,'ddmmyyyyhhii'));
        $("#format_date_mmddyyyyhhii").html(common.Format_DateTime(d,'mmddyyyyhhii'));
        $("#format_date_ddmmyyyy").html(common.Format_DateTime(d,'ddmmyyyy'));
        $("#format_date_mmddyyyy").html(common.Format_DateTime(d,'mmddyyyy'));
        $("#format_date_day").html(common.Format_DateTime(d,'day'));
        $("#format_date_month").html(common.Format_DateTime(d,'month'));
        $("#format_date_year").html(common.Format_DateTime(d,'year'));
    }
    //load_example_9
    load_example_9(){
        var text="10000";
        $("#format_number_vi").html(common.number_format(text,"vi"));
        $("#format_number_en").html(common.number_format(text));
    }
    //load_example_10
    load_example_10(){
        var arr=[1,2,2,7,3,8,4,0];
        $("#arr_order").html(arr.toString());
        $("#ascending_order").html(arr.sort(function (a, b) {return a - b;}).toString());
        $("#descending_order").html(arr.sort(function (a, b) {return b - a;}).toString());
    }
    //load_example_11
    event_check_empty_11(){
        $(document).on("click","#content #btn_check_empty", function () {
            $("#alert_error_total").empty();
            $(".error_item").empty();
            $(".form-control").removeClass('is-invalid');
            var arr_error=new Array();
            var check_empty=$("#check_empty").val()
            c_func.check_empty(arr_error,"check_empty",check_empty,"Giá trị đang rỗng !");
            if(arr_error.length > 0){
                var arr_fields=["check_empty"];
                c_load_html.load_alert_error("#alert_error_total",arr_error,arr_fields,true,false);
            }
            else{
                common.Sweet_Notifi("success", "Thông báo","Giá trị hợp lệ !","OK", "#3085d6", "success");
            }
        });
    }
    event_check_number_11(){
        $(document).on("click","#content #btn_check_number", function () {
            $("#alert_error_total").empty();
            $(".error_item").empty();
            $(".form-control").removeClass('is-invalid');
            var arr_error=new Array();
            var check_number=$("#check_number").val()
            c_func.check_empty(arr_error,"check_number",check_number,"Giá trị đang rỗng !");
            c_func.check_number(arr_error,"check_number",check_number,"Giá trị không phải là số !");
            if(arr_error.length > 0){
                var arr_fields=["check_number"];
                c_load_html.load_alert_error("#alert_error_total",arr_error,arr_fields,true,false);
            }
            else{
                common.Sweet_Notifi("success", "Thông báo","Giá trị hợp lệ !","OK", "#3085d6", "success");
            }
        });
    }
    event_check_email_11(){
        $(document).on("click","#content #btn_check_email", function () {
            $("#alert_error_total").empty();
            $(".error_item").empty();
            $(".form-control").removeClass('is-invalid');
            var arr_error=new Array();
            var check_email=$("#check_email").val();
            c_func.check_empty(arr_error,"check_email",check_email,"Giá trị đang rỗng !");
            c_func.check_email(arr_error,"check_email",check_email,"Giá trị không đúng định dạng email !");
            if(arr_error.length > 0){
                var arr_fields=["check_email"];
                c_load_html.load_alert_error("#alert_error_total",arr_error,arr_fields,true,false);
            }
            else{
                common.Sweet_Notifi("success", "Thông báo","Giá trị hợp lệ !","OK", "#3085d6", "success");
            }
        });
    }
    event_check_date_ddmmyy_11(){
        $(document).on("click","#content #btn_check_date_ddmmyy", function () {
            $("#alert_error_total").empty();
            $(".error_item").empty();
            $(".form-control").removeClass('is-invalid');
            var arr_error=new Array();
            var check_date_ddmmyy=$("#check_date_ddmmyy").val();
            c_func.check_empty(arr_error,"check_date_ddmmyy",check_date_ddmmyy,"Giá trị đang rỗng !");
            c_func.check_date(arr_error,"check_date_ddmmyy",check_date_ddmmyy,"Giá trị không đúng định dạng ngày!","ddmmyyyy");
            if(arr_error.length > 0){
                var arr_fields=["check_date_ddmmyy"];
                c_load_html.load_alert_error("#alert_error_total",arr_error,arr_fields,true,false);
            }
            else{
                common.Sweet_Notifi("success", "Thông báo","Giá trị hợp lệ !","OK", "#3085d6", "success");
            }
        });
    }
    event_check_date_mmddyyyy_11(){
        $(document).on("click","#content #btn_check_date_mmddyy", function () {
            $("#alert_error_total").empty();
            $(".error_item").empty();
            $(".form-control").removeClass('is-invalid');
            var arr_error=new Array();
            var check_date_mmddyy=$("#check_date_mmddyy").val();
            c_func.check_empty(arr_error,"check_date_mmddyy",check_date_mmddyy,"Giá trị đang rỗng !");
            c_func.check_date(arr_error,"check_date_mmddyy",check_date_mmddyy,"Giá trị không đúng định dạng ngày!","mmddyyyy");
            if(arr_error.length > 0){
                var arr_fields=["check_date_mmddyy"];
                c_load_html.load_alert_error("#alert_error_total",arr_error,arr_fields,true,false);
            }
            else{
                common.Sweet_Notifi("success", "Thông báo","Giá trị hợp lệ !","OK", "#3085d6", "success");
            }
        });
    }
    event_check_date_hhii_11(){
        $(document).on("click","#content #btn_check_date_hhii", function () {
            $("#alert_error_total").empty();
            $(".error_item").empty();
            $(".form-control").removeClass('is-invalid');
            var arr_error=new Array();
            var check_date_hhii=$("#check_date_hhii").val();
            c_func.check_empty(arr_error,"check_date_hhii",check_date_hhii,"Giá trị đang rỗng !");
            c_func.check_date(arr_error,"check_date_hhii",check_date_hhii,"Giá trị không đúng định dạng ngày!","hhii");
            if(arr_error.length > 0){
                var arr_fields=["check_date_hhii"];
                c_load_html.load_alert_error("#alert_error_total",arr_error,arr_fields,true,false);
            }
            else{
                common.Sweet_Notifi("success", "Thông báo","Giá trị hợp lệ !","OK", "#3085d6", "success");
            }
        });
    }
    event_btn_check_12(){
        $(document).on("click","#content #btn_check_prime,#content #btn_check_perfect,#content #btn_check_odd,#content #btn_ascending_order,#content #btn_descending_order", function () {
            var id_btn=$(this).attr('id');
            $("#div_result_check_number").empty();
            $("#alert_error_total").empty();
            $(".error_item").empty();
            $(".form-control").removeClass('is-invalid');
            var arr_error=new Array();
            var number_check=$("#number_check").val();
            c_func.check_empty(arr_error,"number_check",number_check,"Giá trị đang rỗng !");
            //c_func.check_number(arr_error,"number_check",number_check,"Giá trị không phải là số !");
            if(arr_error.length > 0){
                var arr_fields=["number_check"];
                c_load_html.load_alert_error("#alert_error_total",arr_error,arr_fields,true,false);
            }
            else{
                var id_div_result_check_number=document.getElementById("div_result_check_number");
                if(id_div_result_check_number){
                    var arr_number_check = number_check.split(",");
                    var arr=new Array();
                    var arr_not=new Array();
                    var arr_str=new Array();
                    if(arr_number_check.length >0){
                        if(id_btn=="btn_check_prime"){
                            arr_number_check.forEach((item,key)=>{c_func.check_prime(arr,arr_not,arr_str,item); });
                            id_div_result_check_number.innerHTML =`
                                ${(arr.length >0?`<p class="font-weight-bold"> Giá trị là số nguyên tố: ${arr.toString()}</p>`:'')}
                                ${(arr_not.length >0?`<p class="font-weight-bold"> Giá trị là không phải số nguyên tố: ${arr_not.toString()}</p>`:'')}
                                ${(arr_str.length >0?`<p class="font-weight-bold text-danger">Giá trị không phải số: ${arr_str.toString()}</p>`:'')}
                            ` ;
                        }
                        else if(id_btn == "btn_check_perfect"){
                            arr_number_check.forEach((item,key)=>{c_func.check_perfect(arr,arr_not,arr_str,item); });
                            id_div_result_check_number.innerHTML =`
                                ${(arr.length >0?`<p class="font-weight-bold"> Giá trị là số hoàn hảo: ${arr.toString()}</p>`:'')}
                                ${(arr_not.length >0?`<p class="font-weight-bold"> Giá trị là không phải số hoàn hảo: ${arr_not.toString()}</p>`:'')}
                                ${(arr_str.length >0?`<p class="font-weight-bold text-danger">Giá trị không phải số: ${arr_str.toString()}</p>`:'')}
                            ` ;
                        
                        }
                        else if(id_btn=="btn_check_odd"){
                            arr_number_check.forEach((item,key)=>{c_func.check_odd_even(arr,arr_not,arr_str,item); });
                            id_div_result_check_number.innerHTML =`
                                ${(arr.length >0?`<p class="font-weight-bold"> Giá trị là số chẵn: ${arr.toString()}</p>`:'')}
                                ${(arr_not.length >0?`<p class="font-weight-bold"> Giá trị là số lẻ: ${arr_not.toString()}</p>`:'')}
                                ${(arr_str.length >0?`<p class="font-weight-bold text-danger">Giá trị không phải số: ${arr_str.toString()}</p>`:'')}
                            ` ;
                        }
                        else if(id_btn == "btn_ascending_order"){
                            arr_number_check = arr_number_check.sort(function (a, b) {return a - b;});
                            id_div_result_check_number.innerHTML =`<p class="font-weight-bold"> Sắp xếp tăng: ${arr_number_check.toString()}</p>`;
                        }
                        else if(id_btn == "btn_descending_order"){
                            arr_number_check = arr_number_check.sort(function (a, b) {return b - a;});
                            id_div_result_check_number.innerHTML =`<p class="font-weight-bold"> Sắp xếp giảm: ${arr_number_check.toString()}</p>`;
                        }
                       
                    }  
                }
                
            }
        });
    }
    load_example_13(){
            var seconds = 0; 
            var tens = 0; 
            var appendTens = document.getElementById("tens")
            var appendSeconds = document.getElementById("seconds")
            var Interval ;
            $(document).on("click","#content #button-start",function(){
                clearInterval(Interval);
                Interval = setInterval(startTimer, 10);
            });
            $(document).on("click","#content #button-stop",function(){
                clearInterval(Interval);
            });
            $(document).on("click","#content #button-reset",function(){
              clearInterval(Interval);
              tens = "00";
              seconds = "00";
              appendTens.innerHTML = tens;
              appendSeconds.innerHTML = seconds;
            });
            function startTimer () {
              tens++; 
              if(tens <= 9){
                appendTens.innerHTML = "0" + tens;
              }
              if (tens > 9){
                appendTens.innerHTML = tens;
              } 
              if (tens > 99) {
                seconds++;
                appendSeconds.innerHTML = "0" + seconds;
                tens = 0;
                appendTens.innerHTML = "0" + 0;
              }
              if (seconds > 9){
                appendSeconds.innerHTML = seconds;
              }
            }
         
    }
    load_example_14(){
        var inputTop = document.getElementById("input-top");
		var inputBottom = document.getElementById("input-bottom");
		var nums = document.querySelectorAll(".num");
		var op = document.querySelectorAll(".op");
		var reset = document.getElementById("reset");
		var equal = document.getElementById("equal");
		var opHistoryContainer = document.getElementById("op-history-container");
		var opHistory = [];
		var toggleHistory = document.getElementById("toggle-history");
		var done = false;
        for (let i = 0; i < nums.length; i++) {
        nums[i].addEventListener("click", () => {
            if (done) {inputBottom.value = nums[i].getAttribute("data-set");done = false;
            } else {inputBottom.value += nums[i].getAttribute("data-set");}
            gsap.to(nums[i], 0.25, {scale: 1.8,transformOrigin: "center",ease: Back.easeOut});
            gsap.to(nums[i], 0.25, {scale: 1,delay: 0.25,transformOrigin: "center",ease: Back.easeOut});
            inputBottomLength();
        });
        }
        for (let i = 0; i < op.length; i++) {
        op[i].addEventListener("click", () => {
            done = false;
            inputBottom.value += op[i].getAttribute("data-set");
            gsap.to(op[i], 0.25, {scale: 1.2, transformOrigin: "center",ease: Power3.easeOut});
            gsap.to(op[i], 0.25, {scale: 1, delay: 0.25,transformOrigin: "center",ease: Back.easeOut});
            inputBottomLength();
        });
        }
        equal.addEventListener("click", () => {
        if (inputBottom.value != "" && inputBottom.value != "undefined") {
            inputTop.value = inputBottom.value;
            inputBottom.value = "";
            try {
                inputBottom.value = eval(inputTop.value);
                opHistory.push(`${inputTop.value} = ${inputBottom.value}`);
                done = true;
                var newOpItem = `${inputTop.value} = ${inputBottom.value}`;
                opHistoryContainer.insertAdjacentHTML("afterbegin", newOpItem);
                createHistoryOp();
            } catch {}
        }
        gsap.to(equal, 0.15, { scaleX: 0.95, scaleY: 0.95 });
        gsap.to(equal, 1, {delay: 0.15,scaleX: 1,scaleY: 1,ease: Elastic.easeOut});});
        reset.addEventListener("click", () => {
            inputTop.value = "";
            inputBottom.value = "";
            inputBottom.style.fontSize = "60px";
            done = false;
        });
        function inputBottomLength() {
            var inputBottomValue = inputBottom.value;
            if (inputBottomValue.length < 6) {       inputBottom.style.fontSize = "60px";} 
            else if (inputBottomValue.length === 6) {inputBottom.style.fontSize = "42px";} 
            else if (inputBottomValue.length === 9) {inputBottom.style.fontSize = "30px";} 
            else if (inputBottomValue.length === 12) {inputBottom.style.fontSize = "24px";}
            else if (inputBottomValue.length === 18) {inputBottom.style.fontSize = "12px";}
        }
        function createHistoryOp() {opHistory.forEach((item) => {}); }
        toggleHistory.addEventListener("click", () => {
            opHistoryContainer.classList.toggle("hide");
            toggleHistory.classList.toggle("fa-history-toggle");
        });
    }
    load_example_15(){
        function clock() {
            const day = document.querySelector(".day");
            const month = document.querySelector(".month");
            const year = document.querySelector(".year");
            const hours = document.querySelector(".hours");
            const minutes = document.querySelector(".minutes");
            const seconds = document.querySelector(".seconds");
            if(day !== null && month !== null && year !== null  > 0 && hours !== null  > 0 && minutes !== null  > 0 && seconds !== null ){
                day.innerHTML = new Date().getDate();
                month.innerHTML = new Date().getMonth() + 1;
                year.innerHTML = new Date().getFullYear();
                hours.innerHTML = new Date().getHours();
                minutes.innerHTML = new Date().getMinutes();
                seconds.innerHTML = new Date().getSeconds();
                if (month.innerHTML.toString().length == 1) {
                    month.innerHTML = "0" + month.innerHTML;
                }
                if (day.innerHTML.toString().length == 1) {
                    day.innerHTML = "0" + day.innerHTML;
                }
                if (minutes.innerHTML.toString().length == 1) {
                    minutes.innerHTML = "0" + minutes.innerHTML;
                }
                if (seconds.innerHTML.toString().length == 1) {
                    seconds.innerHTML = "0" + seconds.innerHTML;
                }
                if (hours.innerHTML.toString().length == 1) {
                    hours.innerHTML = "0" + hours.innerHTML;
                }
            }
            
        }
        const interval = setInterval(clock, 1000);
        
    }
    load_example_17(){
        var insides=document.querySelectorAll('.inside');
        document.addEventListener('mousemove',function() {
            var x = event.clientX *100/window.innerWidth+ '%';
            var y = event.clientY *100/window.innerHeight+ '%';
            insides[0].style.left=x;
            insides[0].style.top=y;
            insides[1].style.left=x;
            insides[1].style.top=y;
        })
    }
    load_example_19(){
        //bar-chart
        new Chart(document.getElementById("bar-chart"), {
            type: 'bar',data: {
              labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
              datasets: [
                {
                  label: "Population (millions)",
                  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                  data: [2478,5267,734,784,433]
                }
              ]
            },
            options: {
              legend: { display: false },
              title: {
                display: true,
                text: 'Predicted world population (millions) in 2050'
              }
            }
         });
         //End bar-chart
         //Line-chart
         new Chart(document.getElementById("line-chart"), {
          type: 'line',
          data: {
            labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
            datasets: [{ 
                data: [86,114,106,106,107,111,133,221,783,2478],
                label: "Africa",
                borderColor: "#3e95cd",
                fill: false
              }, { 
                data: [282,350,411,502,635,809,947,1402,3700,5267],
                label: "Asia",
                borderColor: "#8e5ea2",
                fill: false
              }, { 
                data: [168,170,178,190,203,276,408,547,675,734],
                label: "Europe",
                borderColor: "#3cba9f",
                fill: false
              }, { 
                data: [40,20,10,16,24,38,74,167,508,784],
                label: "Latin America",
                borderColor: "#e8c3b9",
                fill: false
              }, { 
                data: [6,3,2,2,7,26,82,172,312,433],
                label: "North America",
                borderColor: "#c45850",
                fill: false
              }
            ]
          },
          options: {
            title: {
              display: true,
              text: 'World population per region (in millions)'
            }
          }
         });
         //End line-chart
         //Pie-chart
         new Chart(document.getElementById("pie-chart"), {
            type: 'pie',
            data: {
              labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
              datasets: [{
                label: "Population (millions)",
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                data: [2478,5267,734,784,433]
              }]
            },
            options: {
              title: {
                display: true,
                text: 'Predicted world population (millions) in 2050'
              }
            }
         });
         //End Pie-chart
         //Radar-chart
         new Chart(document.getElementById("radar-chart"), {
            type: 'radar',
            data: {
              labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
              datasets: [
                {
                  label: "1950",
                  fill: true,
                  backgroundColor: "rgba(179,181,198,0.2)",
                  borderColor: "rgba(179,181,198,1)",
                  pointBorderColor: "#fff",
                  pointBackgroundColor: "rgba(179,181,198,1)",
                  data: [8.77,55.61,21.69,6.62,6.82]
                }, {
                  label: "2050",
                  fill: true,
                  backgroundColor: "rgba(255,99,132,0.2)",
                  borderColor: "rgba(255,99,132,1)",
                  pointBorderColor: "#fff",
                  pointBackgroundColor: "rgba(255,99,132,1)",
                  pointBorderColor: "#fff",
                  data: [25.48,54.16,7.61,8.06,4.45]
                }
              ]
            },
            options: {
              title: {
                display: true,
                text: 'Distribution in % of world population'
              }
            }
         });
         //End Radar-chart
         //Doughnut-chart
         new Chart(document.getElementById("doughnut-chart"), {
            type: 'doughnut',
            data: {
              labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
              datasets: [
                {
                  label: "Population (millions)",
                  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                  data: [2478,5267,734,784,433]
                }
              ]
            },
            options: {
              title: {
                display: true,
                text: 'Predicted world population (millions) in 2050'
              }
            }
         });
         //End doughnut-chart
         //Bar-chart-grouped-chart
         new Chart(document.getElementById("bar-chart-grouped"), {
            type: 'bar',
            data: {
              labels: ["1900", "1950", "1999", "2050"],
              datasets: [
                {
                  label: "Africa",
                  backgroundColor: "#3e95cd",
                  data: [133,221,783,2478]
                }, {
                  label: "Europe",
                  backgroundColor: "#8e5ea2",
                  data: [408,547,675,734]
                }
              ]
            },
            options: {
              title: {
                display: true,
                text: 'Population growth (millions)'
              }
            }
         });
         //End bar-chart-grouped-chart
    }
    load_example_20(){
    }
    load_page(){
        this.loadapi_example();
        this.loadapi_example3();
        this.loadapi_example4();
        this.event_btn_submit_get_api_5();
        this.load_api_example6();
        this.load_example7();
        this.evet_reset_example_7();
        this.load_example_8();
        this.load_example_9();
        this.load_example_10();
        this.event_check_empty_11();
        this.event_check_number_11();
        this.event_check_email_11();
        this.event_check_date_ddmmyy_11();
        this.event_check_date_mmddyyyy_11();
        this.event_check_date_hhii_11();
        this.event_btn_check_12();
        this.load_example_13();
        this.load_example_14();
        this.load_example_15();
        this.load_example_17();
        this.load_example_19();
    }
}