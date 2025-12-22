let loadedArray = [];
let searchArray;
let currentPerson = 0;

listeners();
datasets();
firstload();

function firstload() {
    load({results: 1}, loadPerson);
}

function listeners() {
    $("#icons").on("mouseover", "li", function () {
        $("#icons li.active").removeClass("active");
        $(this).addClass("active");
        $("#title").text($(this).data("title"));
        $("#content").text($(this).data("content"));
    });

    $("#rnNum").on("input", function () { $(this).siblings("label").text(`Numero persone: ${this.value}`) });

    $(".bi-left").on("click", () => {
        if(--currentPerson < 0){
            if(searchArray){
                currentPerson = searchArray.length - 1;
            }
            else{
                currentPerson = loadedArray.length - 1;
            }
        }  
        if(searchArray){
            loadPerson(searchArray.at(currentPerson));
        }
        else{
            loadPerson(loadedArray.at(currentPerson));
        }
    });

    $(".bi-right").on("click", () => {
        if(searchArray){
            if(++currentPerson >= searchArray.length){
                currentPerson = 0;
            }
            loadPerson(searchArray.at(currentPerson));
        }
        else{
            if(++currentPerson >= loadedArray.length){
                currentPerson = 0;
            }
            loadPerson(loadedArray.at(currentPerson));
        }
    });

    $("#search").on("input", function(){
        const VALUE = $(this).val();
        const RESULT = loadedArray.deepSearch(VALUE);
        $("i").addClass("invisible");

        if(RESULT.at(0)){
            searchArray = RESULT;
            
            if(RESULT.length !== 1){
                $("i").removeClass("invisible");
            }

            loadPerson(RESULT.at(0));
        }
        else{
            searchArray = undefined;
            loadEmpty();
        }
    });

    $("#btnReset").on("click", () => {
        $("#genAll").prop("checked", true);
        $("input[name=chkNat]").prop("checked", false);
        $("#rnNum").val(1).siblings("label").text(`Numero persone: 1`);
    });

    $("#btnRequest").on("click", async () => {
        searchArray = undefined;

        const PARAMS = {
            results: parseInt($("#rnNum").val()),
            gender: $("input[name=rdGen]:checked").val(),
            nat: $("input[name=chkNat]:checked").map((_, ck) => ck.value).toArray().join(",")
        };
    
        await load(PARAMS, loadPerson);

        if(PARAMS.results === 1){
            $("i").addClass("invisible");
        }
        else{
            $("i").removeClass("invisible");
        }
    });

    $("#sortList li").on("click", function(){
        loadedArray.sort(SORTFUNCS[$(this).data("sort")]);
        loadPerson(loadedArray[currentPerson = 0]);
    });

    $("#btnShow").on("click", function(){
        if($(this).text() === "Nascondi JSON"){
            $("andypf-json-viewer").remove();
            $(this).text("Mostra JSON");
            return;
        }

        $("<andypf-json-viewer/>")
            .attr({
                "data": JSON.stringify(loadedArray[currentPerson]),
                "theme": "ia-dark",
                "indent": "3",
                "expanded": "true",
                "show-copy": "false"
            })
            .appendTo("#viewer");

        $(this).text("Nascondi JSON");
    });

    $("#btnDown").on("click", () => {
        const person = searchArray ? searchArray[currentPerson] : loadedArray[currentPerson];

        $("<a>")
            .attr({
                href: URL.createObjectURL(new Blob([JSON.stringify(person, null, 2)], {type: 'application/json'})),
                download: `${person.name.first}_${person.name.last}.json`
            })
            .get(0)
            .click();
    });

    $(window).on("resize", () => {
        if(bootstrapDetectBreakpoint().index < 2){
            $("#btnShow").attr("disabled", "true");
        }
        else{
            $("#btnShow").removeAttr("disabled");
        }
    })
}

function datasets() {
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

function loadPerson(person) {
    Object.entries({
        name: `${person?.name?.first} ${person?.name?.last}`,
        mail: person?.email,
        birthday: new Date(person?.dob?.date).toLocaleDateString(),
        address: `${person?.location?.street?.name} ${person?.location?.street?.number}`,
        phone: person?.cell,
        password: person?.login?.password
    }).forEach(content => $(`#icons li[data-fn=${content[0]}]`).data("content", content[1]));

    $("#title").show();
    $("#image").attr("src", person?.picture?.large);
    $("#content").text($("#icons li.active").data("content"));
}

function loadEmpty(){
    Object.entries({
        name: "Nessuna persona trovata",
        mail: "Nessuna persona trovata",
        birthday: "Nessuna persona trovata",
        address: "Nessuna persona trovata",
        phone: "Nessuna persona trovata",
        password: "Nessuna persona trovata"
    }).forEach(content => $(`#icons li[data-fn=${content[0]}]`).data("content", content[1]));

    $("#title").hide();
    $("#image").attr("src", "./img/default.png");
    $("#content").text($("#icons li.active").data("content"));
}