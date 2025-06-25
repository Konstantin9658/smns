import { useEffect, type JSX } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";

interface Props {
  scene: string;
  animation_name?: string;
}

export const Model = (props: Props & JSX.IntrinsicElements["group"]) => {
  const { animation_name, scene } = props;

  const { scene: model, animations } = useGLTF(scene);

  const { actions } = useAnimations(animations, model);

  useEffect(() => {
    if (!actions || !animation_name) return;

    const anim = actions[animation_name];

    if (!anim) return;
    anim.play();
  }, [actions, animation_name]);

  return <primitive {...props} object={model} />;
};
