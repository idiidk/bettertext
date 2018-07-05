function tag(line) {
  if (line.trim().includes("..tag(")) {
    while(line.includes("..tag(") && line.includes(")")) {
      const tag = line.split("..tag(")[1].split(")")[0]
      line = line.replace(`..tag(${tag})`, `<${tag}>`)
      line += `</${tag}>`
    }
  }

  return line
}

const modifiers = [
  tag
]

export default modifiers
