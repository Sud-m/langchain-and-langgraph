import { Composition } from "remotion";
import { AgentSkills } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AgentSkills"
        component={AgentSkills}
        durationInFrames={3600}
        fps={60}
        width={1920}
        height={1080}
      />
    </>
  );
};
