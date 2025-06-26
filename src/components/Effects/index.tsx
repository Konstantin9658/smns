import { EffectComposer } from "@react-three/postprocessing";

// const chromaticOffsetVector = new Vector2(0.0002, 0.0002);

export const Effects = () => {
  return (
    <EffectComposer multisampling={8}>
      <></>
      { <SMAA
        predicationMode={PredicationMode.DISABLED}
        preset={SMAAPreset.ULTRA}
        edgeDetectionMode={EdgeDetectionMode.COLOR}
      />
      <ChromaticAberration
        offset={chromaticOffsetVector}
        blendFunction={BlendFunction.NORMAL}
        modulationOffset={0.15}
        radialModulation={false}
      /> }
    </EffectComposer>
  );
};
