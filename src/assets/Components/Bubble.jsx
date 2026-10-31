import React from "react";
import { accent } from "./redesignTheme";

// Soft decorative bubble, echoing the logo's bubble motif. Used sparingly
// across section backgrounds on /new-* pages — big, light opacity, no
// hard edges. Pass `color="#ffffff"` for use on dark backgrounds.
const Bubble = ({ size, top, left, right, bottom, opacity = 0.1, color = accent }) => (
  <div
    className="absolute rounded-full pointer-events-none"
    style={{ width: size, height: size, top, left, right, bottom, backgroundColor: color, opacity }}
  />
);

export default Bubble;
