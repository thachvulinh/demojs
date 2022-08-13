apppend_menu();
function openNav() {
    var element=document.getElementById("sidenav_menu"); 
    if(element.style.width=="250px"){
        document.getElementById("sidenav_menu").style.width = "0";
    }
    else{
        document.getElementById("sidenav_menu").style.width = "250px";
    }
}
function closeNav() {
    document.getElementById("sidenav_menu").style.width = "0";
}
function apppend_menu(){
    setTimeout(function(){
        if(document.getElementById('menu-main')){
            var menu_main=document.getElementById('menu-main').innerHTML;
            var html='<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>';
                html+=menu_main;
            $("#sidenav_menu").html(html);
        }
        $(".parent a, .parent-left a").click(function(){
            $(this).parent().children(".child").toggle();
        })
    },1000);
}

