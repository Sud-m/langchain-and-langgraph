import type { CSSProperties, ReactNode } from "react";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  Sequence,
  Track,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const sans = "Arial, Helvetica, sans-serif";
const mono = "Menlo, Consolas, monospace";

const Reveal = ({
  children,
  delay = 0,
  style,
}: {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        ...style,
        opacity: interpolate(frame, [delay * fps, (delay + 0.45) * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: interpolate(
          frame,
          [delay * fps, (delay + 0.7) * fps],
          ["0px 34px", "0px 0px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
      }}
    >
      {children}
    </div>
  );
};

const Chapter = ({ number, label }: { number: string; label: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
    <div style={{ width: 48, height: 48, background: "#ed5a2a", color: "#fff", display: "grid", placeItems: "center", fontFamily: mono, fontSize: 23, borderRadius: 8 }}>
      {number}
    </div>
    <span style={{ fontSize: 24, letterSpacing: 3, fontWeight: 700 }}>{label}</span>
  </div>
);

const Heading = ({ children }: { children: ReactNode }) => (
  <Reveal style={{ position: "absolute", left: 128, top: 199, right: 128 }}>
    <Interactive.H1 name="Scene headline" style={{ fontSize: 96, lineHeight: 1.06, letterSpacing: -5, fontWeight: 700, margin: 0 }}>
      {children}
    </Interactive.H1>
  </Reveal>
);

const Scene = ({ number, label, children }: { number: string; label: string; children: ReactNode }) => (
  <AbsoluteFill>
    <div style={{ position: "absolute", left: 128, top: 106 }}>
      <Chapter number={number} label={label} />
    </div>
    {children}
  </AbsoluteFill>
);

const Editor = ({ children, label, style }: { children: ReactNode; label: string; style: CSSProperties }) => (
  <Reveal delay={0.15} style={style}>
    <div style={{ height: "100%", background: "#15202e", borderRadius: 22, color: "#f2f3ee", overflow: "hidden", boxShadow: "0 24px 50px #18202b18", border: "1px solid #293544" }}>
      <div style={{ height: 74, display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #334151", padding: "0 30px", background: "#1d2938" }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ed5a2a" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#d3b579" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#92bba8" }} />
        <span style={{ marginLeft: 18, fontFamily: mono, fontSize: 23, color: "#c3ccd8" }}>{label}</span>
        <span style={{ marginLeft: "auto", fontSize: 18, color: "#95a6b8", letterSpacing: 2 }}>MARKDOWN</span>
      </div>
      <div style={{ position: "relative", padding: "24px 0" }}>{children}</div>
    </div>
  </Reveal>
);

const CodeLine = ({ number, children, muted = false }: { number: number; children?: ReactNode; muted?: boolean }) => (
  <div style={{ position: "relative", display: "flex", alignItems: "center", height: 58, fontFamily: mono, fontSize: 34, whiteSpace: "pre", color: muted ? "#9baabd" : "#edf0f4" }}>
    <span style={{ width: 78, textAlign: "center", flexShrink: 0, color: "#6e8095", fontSize: 21 }}>{number}</span>
    <span>{children}</span>
  </div>
);

const Highlight = ({ from, to, row, rows = 1 }: { from: number; to: number; row: number; rows?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", top: 24 + row * 58, left: 66, right: 20, height: rows * 58, borderLeft: "3px solid #ef966f", borderRadius: 4, background: "#ed5a2a18", opacity: interpolate(frame, [from * fps, (from + 0.3) * fps, (to - 0.2) * fps, to * fps], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }} />
  );
};

const SideNote = ({ tag, title, children }: { tag: string; title: ReactNode; children: ReactNode }) => (
  <Reveal delay={0.25} style={{ position: "absolute", left: 1320, top: 410, width: 472 }}>
    <div style={{ width: 62, height: 5, background: "#ed5a2a", marginBottom: 28 }} />
    <div style={{ color: "#ad3e1a", fontSize: 22, letterSpacing: 2, fontWeight: 700, marginBottom: 25 }}>{tag}</div>
    <div style={{ fontSize: 55, fontWeight: 700, lineHeight: 1.1, letterSpacing: -2, marginBottom: 27 }}>{title}</div>
    <div style={{ fontSize: 35, lineHeight: 1.35, color: "#62615a" }}>{children}</div>
  </Reveal>
);

const Intro = () => {
  const { fps } = useVideoConfig();
  return (
    <Scene number="00" label="AGENT SKILLS / A DEVELOPER FIELD GUIDE">
      <Reveal style={{ position: "absolute", left: 128, top: 242, width: 1010 }}>
        <Interactive.H1 name="Opening title" style={{ margin: 0, fontSize: 116, fontWeight: 700, lineHeight: 1.03, letterSpacing: -6 }}>
          Teach your agent<br />a repeatable<br /><span style={{ color: "#ed5a2a" }}>skill.</span>
        </Interactive.H1>
      </Reveal>
      <Reveal delay={0.35} style={{ position: "absolute", left: 1190, top: 252, width: 570, height: 510 }}>
        <div style={{ position: "absolute", inset: "22px -18px -22px 18px", border: "1px solid #d2cdc2", borderRadius: 24, rotate: "5deg" }} />
        <div style={{ position: "relative", height: "100%", borderRadius: 24, background: "#15202e", padding: 48, color: "#f6f3eb", boxShadow: "0 24px 60px #1b20241a" }}>
          <div style={{ color: "#ee9a75", fontFamily: mono, fontSize: 24, letterSpacing: 2 }}>YOUR AGENT’S PLAYBOOK</div>
          <div style={{ fontFamily: mono, fontSize: 76, letterSpacing: -4, marginTop: 68 }}>SKILL.md</div>
          <div style={{ marginTop: 35, borderTop: "1px solid #354152", paddingTop: 30, fontSize: 30, lineHeight: 1.5, color: "#bdc9d7" }}>A clear trigger.<br />A reliable set of instructions.</div>
        </div>
      </Reveal>
      <Sequence name="Skill definition" from={2 * fps} layout="none">
        <Reveal style={{ position: "absolute", left: 132, top: 784, width: 1010 }}>
          <Interactive.Div name="What a skill adds" style={{ fontSize: 36, lineHeight: 1.35, color: "#62615a" }}>
            Reusable instructions.<br />Not new tools or permissions.
          </Interactive.Div>
        </Reveal>
      </Sequence>
    </Scene>
  );
};

const FolderScene = () => (
  <Scene number="01" label="CREATE THE FILE">
    <Heading>Start with one folder.</Heading>
    <Editor label="project / skill structure" style={{ position: "absolute", left: 128, top: 370, width: 1104, height: 462 }}>
      <div style={{ padding: "22px 50px", fontFamily: mono, fontSize: 42, lineHeight: 1.8 }}>
        <Reveal delay={0.5}><div style={{ color: "#c9d3df" }}>.agents/</div></Reveal>
        <Reveal delay={0.9}><div style={{ paddingLeft: 48 }}><span style={{ color: "#62768c" }}>└─ </span>skills/</div></Reveal>
        <Reveal delay={1.3}><div style={{ paddingLeft: 96, color: "#f6a37e" }}><span style={{ color: "#62768c" }}>└─ </span>code-review/</div></Reveal>
        <Reveal delay={1.7}><div style={{ paddingLeft: 144, color: "#a9dbbe" }}><span style={{ color: "#62768c" }}>└─ </span>SKILL.md</div></Reveal>
      </div>
    </Editor>
    <SideNote tag="SMALLEST USEFUL SKILL" title={<>One folder.<br />One Markdown file.</>}>
      Use a clear, lowercase,<br />hyphenated name.
    </SideNote>
    <Reveal delay={2.2} style={{ position: "absolute", left: 130, top: 870 }}>
      <Interactive.Div name="Directory compatibility note" style={{ fontSize: 31, color: "#62615a" }}>
        Example project path. The discovery location depends on your agent.
      </Interactive.Div>
    </Reveal>
  </Scene>
);

const MetadataScene = () => {
  const { fps } = useVideoConfig();
  return (
    <Scene number="02" label="DEFINE THE TRIGGER">
      <Heading>Tell it when to show up.</Heading>
      <Editor label="code-review / SKILL.md" style={{ position: "absolute", left: 128, top: 350, width: 1104, height: 570 }}>
        <Highlight from={0.6} to={4} row={1} />
        <Highlight from={4} to={12} row={2} rows={4} />
        <CodeLine number={1} muted>---</CodeLine>
        <CodeLine number={2}><span style={{ color: "#a8c5ee" }}>name: </span><span style={{ color: "#f6a37e" }}>code-review</span></CodeLine>
        <CodeLine number={3}><span style={{ color: "#a8c5ee" }}>description: </span><span style={{ color: "#f6a37e" }}>&gt;</span></CodeLine>
        <CodeLine number={4}>{"  Review code for bugs and"}</CodeLine>
        <CodeLine number={5}>{"  missing tests. Use when asked"}</CodeLine>
        <CodeLine number={6}>{"  to review a diff or pull request."}</CodeLine>
        <CodeLine number={7} muted>---</CodeLine>
      </Editor>
      <Sequence name="Name guidance" durationInFrames={4 * fps} layout="none">
        <SideNote tag="REQUIRED FIELD / NAME" title={<>Name matches<br />the folder.</>}>
          Put YAML frontmatter between two <span style={{ fontFamily: mono }}>---</span> lines.
        </SideNote>
      </Sequence>
      <Sequence name="Description guidance" from={4 * fps} durationInFrames={8 * fps} layout="none">
        <SideNote tag="REQUIRED FIELD / DESCRIPTION" title={<>The trigger<br />lives here.</>}>
          Say what the skill does<br />and when to use it.<br /><br />Be specific, not generic.
        </SideNote>
      </Sequence>
    </Scene>
  );
};

const InstructionsScene = () => {
  const { fps } = useVideoConfig();
  return (
    <Scene number="03" label="WRITE THE INSTRUCTIONS">
      <Heading>Write the actual playbook.</Heading>
      <Editor label="SKILL.md / below the frontmatter" style={{ position: "absolute", left: 128, top: 350, width: 1140, height: 570 }}>
        <Highlight from={0.6} to={4} row={2} />
        <Highlight from={4} to={8} row={4} />
        <Highlight from={8} to={12} row={6} />
        <CodeLine number={8}><span style={{ color: "#a9dbbe" }}># Code review</span></CodeLine>
        <CodeLine number={9} />
        <CodeLine number={10}>1. Read the diff and nearby context.</CodeLine>
        <CodeLine number={11} />
        <CodeLine number={12}>2. Flag concrete defects with file:line.</CodeLine>
        <CodeLine number={13} />
        <CodeLine number={14}>3. Suggest the smallest fix and a test.</CodeLine>
      </Editor>
      <Sequence name="Read context guidance" durationInFrames={4 * fps} layout="none">
        <SideNote tag="01 / UNDERSTAND" title={<>Context before<br />conclusions.</>}>
          Tell the agent what to inspect first.
        </SideNote>
      </Sequence>
      <Sequence name="Evidence guidance" from={4 * fps} durationInFrames={4 * fps} layout="none">
        <SideNote tag="02 / BE CONCRETE" title={<>Evidence,<br />not opinions.</>}>
          Specify the output:<br />a defect, its impact,<br />and its location.
        </SideNote>
      </Sequence>
      <Sequence name="Fix guidance" from={8 * fps} durationInFrames={4 * fps} layout="none">
        <SideNote tag="03 / MAKE IT ACTIONABLE" title={<>Small fix.<br />Focused test.</>}>
          Use direct steps.<br />Define what a useful<br />result looks like.
        </SideNote>
      </Sequence>
    </Scene>
  );
};

const ResourceCard = ({ label, title, children, delay }: { label: string; title: string; children: ReactNode; delay: number }) => (
  <Reveal delay={delay} style={{ flex: 1 }}>
    <div style={{ height: 280, border: "1px solid #d7d2c8", borderRadius: 16, padding: "34px 36px", background: "#faf8f2" }}>
      <div style={{ color: "#ad3e1a", fontFamily: mono, fontSize: 30, marginBottom: 26 }}>{label}</div>
      <div style={{ fontSize: 42, letterSpacing: -1, fontWeight: 700, marginBottom: 15 }}>{title}</div>
      <div style={{ fontSize: 29, color: "#62615a", lineHeight: 1.4 }}>{children}</div>
    </div>
  </Reveal>
);

const ResourcesScene = () => (
  <Scene number="04" label="ADD ONLY WHAT YOU NEED">
    <Heading>Keep the core small.</Heading>
    <div style={{ position: "absolute", left: 128, right: 128, top: 362, display: "flex", gap: 24 }}>
      <ResourceCard label="scripts/" title="Repeatable code" delay={0.15}>Deterministic helpers.<br />Optional, not required.</ResourceCard>
      <ResourceCard label="references/" title="Deeper context" delay={0.4}>Detailed docs.<br />Link them from SKILL.md.</ResourceCard>
      <ResourceCard label="assets/" title="Reusable files" delay={0.65}>Templates and images.<br />Used in the output.</ResourceCard>
    </div>
    <Reveal delay={2} style={{ position: "absolute", left: 128, right: 128, top: 698 }}>
      <div style={{ color: "#62615a", fontSize: 23, letterSpacing: 2, fontWeight: 700, marginBottom: 26 }}>PROGRESSIVE DISCLOSURE</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#15202e", padding: "31px 38px", borderRadius: 16, color: "#f6f3eb" }}>
        <div><div style={{ fontSize: 35 }}>Metadata</div><div style={{ fontSize: 25, color: "#a3b3c5", marginTop: 8 }}>first</div></div>
        <span style={{ color: "#ef966f", fontSize: 48 }}>→</span>
        <div><div style={{ fontSize: 35 }}>Instructions</div><div style={{ fontSize: 25, color: "#a3b3c5", marginTop: 8 }}>when relevant</div></div>
        <span style={{ color: "#ef966f", fontSize: 48 }}>→</span>
        <div><div style={{ fontSize: 35 }}>Resources</div><div style={{ fontSize: 25, color: "#a3b3c5", marginTop: 8 }}>as needed</div></div>
      </div>
    </Reveal>
  </Scene>
);

const TestWalkthrough = () => (
  <>
    <Heading>Test it on a real request.</Heading>
    <Reveal delay={0.2} style={{ position: "absolute", left: 128, top: 360, width: 1050 }}>
      <div style={{ background: "#15202e", borderRadius: 20, color: "#f6f3eb", padding: "34px 40px" }}>
        <div style={{ fontSize: 21, letterSpacing: 2, color: "#ef966f", marginBottom: 23 }}>TEST PROMPT</div>
        <div style={{ fontSize: 42, lineHeight: 1.3, letterSpacing: -1 }}>“Review this diff for bugs<br />and missing tests.”</div>
      </div>
    </Reveal>
    <Reveal delay={1.5} style={{ position: "absolute", left: 128, top: 630, width: 1050 }}>
      <div style={{ border: "1px solid #d3cec3", borderRadius: 20, background: "#faf8f2", padding: "26px 40px" }}>
        <div style={{ fontSize: 21, letterSpacing: 2, color: "#62615a", marginBottom: 19 }}>ILLUSTRATIVE RESULT / NOT AN EXECUTION</div>
        <div style={{ fontFamily: mono, fontSize: 32, color: "#ad3e1a", marginBottom: 10 }}>parser.py:42 — empty input crashes</div>
        <div style={{ fontSize: 31, lineHeight: 1.4 }}>Add an empty-input guard.<br />Test an empty payload.</div>
      </div>
    </Reveal>
    <Reveal delay={0.6} style={{ position: "absolute", left: 1270, top: 382, width: 515 }}>
      <div style={{ fontSize: 23, letterSpacing: 2, color: "#ad3e1a", fontWeight: 700, marginBottom: 31 }}>VERIFY, THEN REFINE</div>
      <div style={{ fontSize: 38, lineHeight: 1.4, borderBottom: "1px solid #d3cec3", paddingBottom: 24 }}>01 &nbsp; Was the skill selected?</div>
      <div style={{ fontSize: 38, lineHeight: 1.4, borderBottom: "1px solid #d3cec3", padding: "24px 0" }}>02 &nbsp; Did it follow the steps?</div>
      <div style={{ fontSize: 38, lineHeight: 1.4, paddingTop: 24 }}>03 &nbsp; Refine and test again.</div>
    </Reveal>
  </>
);

const Recap = () => (
  <>
    <Reveal style={{ position: "absolute", left: 128, top: 240 }}>
      <Interactive.H1 name="Closing recap" style={{ fontSize: 112, letterSpacing: -6, lineHeight: 1.05, margin: 0, fontWeight: 700 }}>
        Name it. Trigger it.<br />Guide it. <span style={{ color: "#ed5a2a" }}>Test it.</span>
      </Interactive.H1>
    </Reveal>
    <Reveal delay={0.25} style={{ position: "absolute", left: 132, top: 545 }}>
      <div style={{ fontSize: 43, lineHeight: 1.35, color: "#62615a" }}>One useful skill beats a wall of generic instructions.</div>
    </Reveal>
    <Reveal delay={0.5} style={{ position: "absolute", left: 128, top: 690, right: 128 }}>
      <div style={{ background: "#15202e", borderRadius: 18, padding: "37px 45px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#f6f3eb" }}>
        <span style={{ fontFamily: mono, fontSize: 34 }}>.agents/skills/code-review/SKILL.md</span>
        <span style={{ fontSize: 24, color: "#a9dbbe", letterSpacing: 2 }}>START SMALL → ITERATE</span>
      </div>
    </Reveal>
  </>
);

const TestScene = () => {
  const { fps } = useVideoConfig();
  return (
    <Scene number="05" label="TEST & REFINE">
      <Sequence name="Test the skill" durationInFrames={8.5 * fps} layout="none"><TestWalkthrough /></Sequence>
      <Sequence name="Final takeaway" from={8.5 * fps} durationInFrames={3.5 * fps} layout="none"><Recap /></Sequence>
    </Scene>
  );
};

const Progress = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <div style={{ position: "absolute", left: 128, right: 128, bottom: 65 }}>
      <div style={{ height: 2, background: "#d6d1c7", marginBottom: 22 }}>
        <div style={{ height: "100%", background: "#ed5a2a", width: `${interpolate(frame, [0, durationInFrames - 1], [0, 100], { extrapolateRight: "clamp" })}%` }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 19, letterSpacing: 2, fontWeight: 700, color: "#78756c" }}>
        <span>AGENT SKILLS</span>
        <span>BUILD A SKILL.md</span>
        <span style={{ fontFamily: mono, letterSpacing: 1 }}>60 SECOND FIELD GUIDE</span>
      </div>
    </div>
  );
};

export const AgentSkills = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: "#f3f0e8", fontFamily: sans, color: "#20231f", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: 100, top: 90, width: 370, height: 370, borderRadius: "50%", background: "radial-gradient(circle, #ed5a2a0b, transparent 70%)" }} />
      <Track name="Tutorial chapters">
        <Sequence name="00 — A repeatable skill" durationInFrames={7 * fps}><Intro /></Sequence>
        <Sequence name="01 — Create SKILL.md" from={7 * fps} durationInFrames={8 * fps}><FolderScene /></Sequence>
        <Sequence name="02 — Define the trigger" from={15 * fps} durationInFrames={12 * fps}><MetadataScene /></Sequence>
        <Sequence name="03 — Write the instructions" from={27 * fps} durationInFrames={12 * fps}><InstructionsScene /></Sequence>
        <Sequence name="04 — Add optional resources" from={39 * fps} durationInFrames={9 * fps}><ResourcesScene /></Sequence>
        <Sequence name="05 — Test and refine" from={48 * fps} durationInFrames={12 * fps}><TestScene /></Sequence>
      </Track>
      <Progress />
    </AbsoluteFill>
  );
};
