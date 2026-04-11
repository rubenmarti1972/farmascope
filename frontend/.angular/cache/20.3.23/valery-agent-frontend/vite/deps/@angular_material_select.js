import {
  MAT_SELECT_CONFIG,
  MAT_SELECT_SCROLL_STRATEGY,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY,
  MAT_SELECT_TRIGGER,
  MatOptgroup,
  MatOption,
  MatSelect,
  MatSelectChange,
  MatSelectModule,
  MatSelectTrigger
} from "./chunk-3W6PJ6HP.js";
import "./chunk-YDAWYYCK.js";
import "./chunk-TBVN7OVI.js";
import "./chunk-YG5MWHFX.js";
import "./chunk-6J655PNZ.js";
import "./chunk-RP2ZGLCD.js";
import "./chunk-XSGXES3Q.js";
import "./chunk-ZU2FSTYQ.js";
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatPrefix,
  MatSuffix
} from "./chunk-LIRWNJSB.js";
import "./chunk-VJEZMM4F.js";
import "./chunk-ASLTARYP.js";
import "./chunk-R6E7XF7N.js";
import "./chunk-LMM62TTT.js";
import "./chunk-XZS4REBI.js";
import "./chunk-U526BOC5.js";
import "./chunk-GKOCT5VG.js";
import "./chunk-MNOGUCHK.js";
import "./chunk-EJXPECN3.js";
import "./chunk-YLOM2MAD.js";
import "./chunk-OVBE6M2N.js";
import "./chunk-HUTT2FVB.js";
import "./chunk-FX47LQWG.js";
import "./chunk-BGJDQHGH.js";
import "./chunk-KHPDHDQC.js";
import "./chunk-WDMUDEB6.js";

// node_modules/.pnpm/@angular+material@20.2.14_0200d9cfb904435e6564be45826ab89c/node_modules/@angular/material/fesm2022/select.mjs
var matSelectAnimations = {
  // Represents
  // trigger('transformPanel', [
  //   state(
  //     'void',
  //     style({
  //       opacity: 0,
  //       transform: 'scale(1, 0.8)',
  //     }),
  //   ),
  //   transition(
  //     'void => showing',
  //     animate(
  //       '120ms cubic-bezier(0, 0, 0.2, 1)',
  //       style({
  //         opacity: 1,
  //         transform: 'scale(1, 1)',
  //       }),
  //     ),
  //   ),
  //   transition('* => void', animate('100ms linear', style({opacity: 0}))),
  // ])
  /** This animation transforms the select's overlay panel on and off the page. */
  transformPanel: {
    type: 7,
    name: "transformPanel",
    definitions: [
      {
        type: 0,
        name: "void",
        styles: {
          type: 6,
          styles: { opacity: 0, transform: "scale(1, 0.8)" },
          offset: null
        }
      },
      {
        type: 1,
        expr: "void => showing",
        animation: {
          type: 4,
          styles: {
            type: 6,
            styles: { opacity: 1, transform: "scale(1, 1)" },
            offset: null
          },
          timings: "120ms cubic-bezier(0, 0, 0.2, 1)"
        },
        options: null
      },
      {
        type: 1,
        expr: "* => void",
        animation: {
          type: 4,
          styles: { type: 6, styles: { opacity: 0 }, offset: null },
          timings: "100ms linear"
        },
        options: null
      }
    ],
    options: {}
  }
};
export {
  MAT_SELECT_CONFIG,
  MAT_SELECT_SCROLL_STRATEGY,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY,
  MAT_SELECT_TRIGGER,
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatOptgroup,
  MatOption,
  MatPrefix,
  MatSelect,
  MatSelectChange,
  MatSelectModule,
  MatSelectTrigger,
  MatSuffix,
  matSelectAnimations
};
//# sourceMappingURL=@angular_material_select.js.map
