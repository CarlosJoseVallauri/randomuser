"use strict";

$(() => {
    const THEMES = {LIGHT: lightTheme, DARK: darkTheme};

    $("#theme-btn").on("click", function(){
        if($(this).data("theme") === "DARK"){
            THEMES.LIGHT.call();
            $(this).data("theme", "LIGHT");
        }
        else{
            THEMES.DARK.call();
            $(this).data("theme", "DARK");
        }
    });

    const currentTheme = detectTheme();
    currentTheme.call();
    $("#theme-btn").data("theme", currentTheme === THEMES.DARK ? "DARK" : "LIGHT");

    function detectTheme(){
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEMES.DARK : THEMES.LIGHT;
    }

    function lightTheme(){
        $("#theme-icon").removeClass("bi-moon-fill").addClass("bi-sun-fill");
        $("body").removeClass("bg-dark text-light").addClass("bg-dark-subtle");
        $(".navbar").removeClass("navbar-dark bg-dark").addClass("navbar-light bg-light");
        $("#theme-btn").removeClass("btn-dark text-white").addClass("btn-light");
        $("#search").addClass("bg-dark-subtle");
        $("#main-view").removeClass("bg-light").addClass("bg-light-subtle");
        $(".dropdown-menu").removeClass("dropdown-menu-dark");

        if($("andypf-json-viewer").length === 1){
            $("andypf-json-viewer").attr("theme", "ia-light");
        }
    }

    function darkTheme(){
        $("#theme-icon").removeClass("bi-sun-fill").addClass("bi-moon-fill");
        $("body").removeClass("bg-dark-subtle").addClass("bg-dark text-light");
        $(".navbar").removeClass("navbar-light bg-light").addClass("navbar-dark bg-dark");
        $("#theme-btn").removeClass("btn-light").addClass("btn-dark text-white");
        $("#search").removeClass("bg-dark-subtle");
        $("#main-view").removeClass("bg-light-subtle").addClass("bg-light");
        $(".dropdown-menu").addClass("dropdown-menu-dark");

        if($("andypf-json-viewer").length === 1){
            $("andypf-json-viewer").attr("theme", "ia-dark");
        }
    }
})