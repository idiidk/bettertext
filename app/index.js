import "styles/index.scss"
import $ from "jquery"
import { saveAs } from "file-saver"
import parse from "./parser/parser"

let documentTitle = "Untitled Document"

$("#editor #text").on("change textInput input", () => {
  $("#editor #preview #editable").html(parse($("#editor #text").val()))
  $("#document-info-bar #document-info").text(`${documentTitle}`)
})

$("#toolbar #save-text").click(() => {
  saveAs(new Blob([$("#editor #text").val()], { type: "text/plain;charset=utf-8" }), "document.bte")
})

$("#toolbar #save-preview").click(() => {
  saveAs(new Blob([$("#editor #preview").html()], { type: "text/html;charset=utf-8" }), "document.html")
})

$("#toolbar #open-text").click(() => {
  $("#hidden-file-input").click()
})

$("#hidden-file-input").change((e) => {
  const file = e.target.files[0];
  if (!file) {
    return
  }
  const reader = new FileReader()
  reader.onload = function (e) {
    const contents = e.target.result
    $("#editor #text").val(contents)
    $("#editor #preview #editable").html(parse($("#editor #text").val()))
  }
  reader.readAsText(file)
  e.target.value = null
})
