$("document").ready(function() {

    $(".cbalink").remove();

    $(".sign .cancel").click(()=> {
        $(".sign").slideUp();
        $(".cog").show();
    })

    $(".cog").click(()=> {
        $(".sign").show("swift");
        $(".cog").hide();
    })

    $(".sign .cancelForm").click(function() {
        $(".formSignup").slideUp();
    })

    $(".sign .btnsignup").click(function() {
        $(".formSignup").show("swift");
        $(".formSignup").css({display:"flex"});

    })

    $(".mainNews .big, .mainNews .medium").hover(function() {
        $(this).find(".content").toggleClass("showContent");
    })

    window.onscroll = function() {scrollFunction()};

    function scrollFunction(){
       if($("html").scrollTop()>100) $(".uparrow").show();
       else $(".uparrow").hide();
    }
    

    $(".uparrow").click(function() {
        $("html").animate({scrollTop: 0},500);
    });

    $(".language .select, .language .droparrow").click(function() {
        console.log("drop")
        $(".language .wrapper").toggle("slow");
    })
    
    $(".eng .back").click(function() {
        window.history.back();
    })

    ///SignUp

    $(".formSignup .sendSignup").click(function() {
        var email = $(".formSignup #signupEmail").val();
        var login = $(".formSignup #signupLogin").val();
        var password = $(".formSignup #signupPassword").val();
        var repassword = $(".formSignup #signupRePassword").val();

        if(email && login && password &&  repassword){
            if(password === repassword){
                $.ajax({
                    url: "/signUp",
                    type: "POST",
                    data:{
                        email,
                        login,
                        password,
                        repassword
                    }
                }).done(function(res) {
                    if(res)  alert("You Signuped!");
                       
                    
                }).fail(function(err) {
                    if(err) alert(err);
                })
            }
        }
        
    })

    ///SignIn

    $(".sign .btnsignin").click(function() {
        var login = $(".sign #signinLogin").val();
        var password = $(".sign #signinPassword").val();

        if(login && password) {
            $.ajax({
                url: "/signIn",
                type: "POST",
                data: {
                    login,
                    password
                }
            }).done(function(res) {
                if(res) alert(res.login);
            })
        }
    })

});

