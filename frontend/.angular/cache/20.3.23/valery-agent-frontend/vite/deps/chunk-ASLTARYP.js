// node_modules/.pnpm/@angular+cdk@20.2.14_@angular+common@20.3.18_@angular+core@20.3.18_@angular+compiler@20_da0bbf751e74ef82af85aa85695a7b8f/node_modules/@angular/cdk/fesm2022/css-pixel-value.mjs
function coerceCssPixelValue(value) {
  if (value == null) {
    return "";
  }
  return typeof value === "string" ? value : `${value}px`;
}

// node_modules/.pnpm/@angular+cdk@20.2.14_@angular+common@20.3.18_@angular+core@20.3.18_@angular+compiler@20_da0bbf751e74ef82af85aa85695a7b8f/node_modules/@angular/cdk/fesm2022/coercion.mjs
function coerceBooleanProperty(value) {
  return value != null && `${value}` !== "false";
}

export {
  coerceCssPixelValue,
  coerceBooleanProperty
};
//# sourceMappingURL=chunk-ASLTARYP.js.map
