
$( document ).ready(function() {
   
    $("ul.tabs li").click(function() {
        
        $("ul.tabs li.clicked").removeClass("clicked");
         $("ul.tabs li").removeClass("unclicked");
        
        $(this).addClass("clicked");
        $("ul.tabs li").not( $(this) ).addClass("unclicked");
        
        return false;
    });
 
});