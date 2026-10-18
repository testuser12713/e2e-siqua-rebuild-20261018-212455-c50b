export function text(value) {
  return document.createTextNode(value == null ? "" : String(value));
}

export function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);

  if (props) {
    for (const [name, value] of Object.entries(props)) {
      if (value == null || value === false) continue;

      if (name === "text") {
        node.textContent = String(value);
        continue;
      }

      if (name.startsWith("on") && typeof value === "function") {
        node.addEventListener(name.slice(2).toLowerCase(), value);
        continue;
      }

      node.setAttribute(name, value === true ? "" : String(value));
    }
  }

  for (const child of children.flat(Infinity)) {
    if (child == null || child === false) continue;
    node.append(child instanceof Node ? child : text(child));
  }

  return node;
}
