import modifiers from "./modifiers"

const config = {
  endOfLine: ["\n", ";"],
  modifiers: modifiers
}

function extractLines(text) {
  let currentString = ""
  let lines = []

  for (let i = 0; i < text.length; i++) {
    if (config.endOfLine.includes(text[i])) {
      lines.push(currentString + (text[i] === "\n" ? "<br>" : ""))
      currentString = ""
    } else {
      currentString += text[i]
    }
  }

  lines.push(currentString)

  return lines
}

function parseLines(lines) {
  let finalText = ""

  for (let l = 0; l < lines.length; l++) {
    let line = lines[l]

    for (let i = 0; i < config.modifiers.length; i++) {
      line = config.modifiers[i](line)
    }

    finalText += line
  }

  return finalText
}

function parse(text) {
  let lines = extractLines(text)
  return parseLines(lines)
}

export default parse
