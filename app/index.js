import "styles/index.scss";
import $ from "jquery";
import parse from "./parser/parser"

$("#editor #text").on("input", () => {
    $("#editor #preview").html(parse($("#editor #text").val()))
})

$("#top-bar #save").click(() => {
    const file = new Blob([$("#editor #text").val()], {
        type: "text/plain"
    })
    saveBlob(file, "document.bte")
})

$("#top-bar #open").click(() => {
    $("#hidden-file-input").click()
    $("#hidden-file-input").on("change", (e) => {
        const file = e.target.files[0];
        if (!file) {
            return
        }
        const reader = new FileReader()
        reader.onload = function (e) {
            const contents = e.target.result
            $("#editor #text").text(contents)
            $("#editor #preview").html(parse($("#editor #text").val()))
            $(e.target).remove()
            $("body").append(`<input type="file" accept=".bte" id="hidden-file-input" />`)
        }
        reader.readAsText(file)
    })
})

function saveBlob(blob, fileName) {
    const url = window.URL.createObjectURL(blob);

    const anchorElem = document.createElement("a");
    anchorElem.style = "display: none";
    anchorElem.href = url;
    anchorElem.download = fileName;

    document.body.appendChild(anchorElem);
    anchorElem.click();

    document.body.removeChild(anchorElem);

    setTimeout(function () {
        window.URL.revokeObjectURL(url);
    }, 1000);
}
