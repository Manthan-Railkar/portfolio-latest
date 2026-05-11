"use client";

import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";

export default function Effects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={1.5}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new Vector2(0.0015, 0.0015)}
        radialModulation={false}
        modulationOffset={0.0}
      />
      <Noise
        blendFunction={BlendFunction.OVERLAY}
        opacity={0.15}
      />
      <Vignette
        offset={0.3}
        darkness={0.9}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
