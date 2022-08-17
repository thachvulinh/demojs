import func from '../common/func.js';
import load_html from '../common/load_html.js';
let c_func=new func();
let c_load_html=new load_html();
var token_api_example='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJwYXRyaWNrLnBoYW1AcGFwLXRlY2guY29tIiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiJZWkFLWVhVRkJUTlA1VjdFTUQ3RTVGVklON0s2QVVKTyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiaHR0cDovL3d3dy5hc3BuZXRib2lsZXJwbGF0ZS5jb20vaWRlbnRpdHkvY2xhaW1zL3RlbmFudElkIjoiMiIsInN1YiI6IjMiLCJqdGkiOiJiZGQwYmZkOS1iYTA0LTQ0MjUtODc2MC1mMjA3Y2ZmODBiOGUiLCJpYXQiOjE2NjA1NTg2NjAsIm5iZiI6MTY2MDU1ODY2MCwiZXhwIjoxNjYwNjQ1MDYwLCJpc3MiOiJTMlJldGFpbCIsImF1ZCI6IlMyUmV0YWlsIn0.fwT7GhIBw-7hsELAl8ci3aOCNVukMkDivXC7OPCFb1E';
export default class  example_ctr{
    //constructor(){}
    
    async loadapi_example(){
        var url_example='https://api.s2retail.xyz/api/services/app/UnitOfMeasure/GetUOMListForComboBox';
        var id_table_api_test = document.getElementById("table_api_test");
        if(id_table_api_test){
            // c_func.get_api(url_example,token_api_example).then((response) => {
            //     const list = JSON.parse(response); 
            //     console.log(response);
            //      id_loadcmb.innerHTML=c_load_html.load_cmb_example(list);
            // });
            c_func.get_api_example(url_example,token_api_example).then((response) => {
                const list = JSON.parse(response); 
                id_table_api_test.innerHTML = c_load_html.load_table_api_test(list);
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
          });
      }
    }
    load_page(){
        this.loadapi_example();
        this.loadapi_example3();
        this.loadapi_example4();
    }
}