let loadedArray = [];

listeners();
datasets();
firstload();

function firstload(){
    load(
        {
            results: 1,
            nat: "",
            gender: ""
        },
        // Content dataset 
        (person) => {
            Object.entries({
                name: `${person?.name?.first} ${person?.name?.last}`,
                mail: person?.email,
                birthday: new Date(person?.dob?.date).toLocaleDateString(),
                address: `${person?.location?.street?.name} ${person?.location?.street?.number}`,
                phone: person?.cell,
                password: person?.login?.password
            }).forEach(content => $(`#icons li[data-fn=${content[0]}]`).data("content", content[1]));

            $("#image").attr("src", person?.picture?.large);
            $("#content").text($("#icons li.active").data("content"));
        }
    );
}

function listeners(){
    $("#icons").on("mouseover", "li", function(){
        $("#icons li.active").removeClass("active");
        $(this).addClass("active");
        $("#title").text($(this).data("title"));
        $("#content").text($(this).data("content"));
    });
}

function datasets(){
    // Title dataset
    Object.entries({
        name: "Ciao, il mio nome è",
        mail: "La mia mail è",
        birthday: "Il mio compleanno è il",
        address: "Abito in",
        phone: "Il mio numero di telefono è",
        password: "La mia password è"
    }).forEach(title => $(`#icons li[data-fn=${title[0]}]`).data("title", title[1]));
}