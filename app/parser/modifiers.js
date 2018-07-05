function newLine(line) {
    return line.split("\n").join("<br>").split(";").join("");
}

function basicText(line) {
    const customLine = line.trim()

    if (customLine[0] === "." && customLine[1] === ".") {
        let command = ""

        for (let i = 0; i < customLine.length; i++) {
            if (customLine[i] !== " ") {
                command += customLine[i]
            } else {
                break
            }
        }

        function htmlify(tag) {
            line = line.split(command).join(`${tag}`)
            if (line.indexOf("\n") !== -1) {
                line = line.split("\n").join(`${tag.split("<").join("</")}<br>`)
            } else {
                line = line.split(";").join(tag.split("<").join("</"))
            }
        }

        switch (command) {
            case "..bold":
                {
                    htmlify("<b>")
                    break
                }

            case "..title":
                {
                    htmlify("<h1>")
                    break
                }

            default:
                break
        }
    }

    return line
}


const modifiers = [
    basicText,
    newLine
]

export default modifiers
