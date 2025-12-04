# TouchDeisgner OKLCH

This is a set of Toxes that make it easy to use the OKLCH color space in TouchDesigner.

## Lightness, Chroma, and Hue

LCH is based on the OKLAB perceptual color space, designed to be uniform in how humans perceive color differences.

- **Lightness (L)**: Perceived brightness from 0 (black) to 1 (white). Perceptually uniform—equal steps look equally different.

- **Chroma (C)**: Colorfulness/saturation intensity. Capped at ~0.3 because sRGB monitors can only display colors up to about 0.3-0.4 chroma. Higher values produce out-of-gamut colors that clip when converted to RGB.

- **Hue (H)**: Angular position on the color wheel, expressed in radians (-π to π). Radians are used because GLSL trig functions (`atan2`, `sin`, `cos`) work natively in radians, avoiding conversion overhead.

| Color   | Radians | Degrees |
|---------|---------|---------|
| Red     | 0.0     | 0°      |
| Yellow  | ~1.1    | ~63°    |
| Green   | ~2.3    | ~132°   |
| Cyan    | ~3.14   | 180°    |
| Blue    | ~-1.9   | ~-109°  |
| Magenta | ~-0.9   | ~-52°   |

## Toxes

### LCHPicker

A simple LCH color picker.

### LCHAdjust

This tox supports a few of the common options of the native HSVAdjust top, and supports clamping the lightness and chroma, which can be useful especially in feedback loops.

### LCHFeedbackEdge

Lterally the same FeedbackEdge from the palette, but with the HSVAdjust swapped out for LCHAdjust. I've left the chroma and lightness capped, as they tend to become way too strong and wash out the image. I've also replaced the normal red with one within the color space.
