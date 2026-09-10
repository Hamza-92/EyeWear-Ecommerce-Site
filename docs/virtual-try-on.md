# Virtual Try-On

Virtual Try-On is planned, not implemented in this milestone.

## Runtime flow

```text
Camera consent
-> getUserMedia stream
-> MediaPipe Face Landmarker
-> pose/transformation smoothing
-> Three.js scene
-> hidden head occluder
-> calibrated glasses GLB
-> live canvas rendering
```

## Isolation boundary

The feature must live in a dedicated client-only module dynamically imported after explicit user
intent. MediaPipe, Three.js, GLTFLoader, camera code, model decoders, and GLB assets must not enter
the normal storefront layout or product-detail initial bundle. The product page should render a
server-known availability flag and an accessible launch control before loading WebAR code.

## Calibration contract

A compatible product will eventually reference a versioned GLB asset plus physical frame width,
bridge width, scale adjustment, XYZ position offsets, and XYZ rotation offsets. Calibration belongs
to a product-model association so one asset can be versioned without silently changing every
product. Store units explicitly and validate safe ranges in Laravel.

## Privacy, resilience, and accessibility

- Explain camera use before requesting permission; request only on user action.
- Process frames locally by default and do not persist video or landmarks.
- Handle denial, missing APIs, low-power devices, tab suspension, and WebGL context loss.
- Stop media tracks when the experience closes or the page is hidden.
- Provide a non-camera 3D/image fallback and preserve the standard product purchase path.
- Measure capability and failures without transmitting biometric or prescription data.

The first VTO milestone should be a separate technical spike with a synthetic GLB and no product
checkout coupling.
