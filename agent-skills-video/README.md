# Agent Skills — a developer field guide

A 60-second, 1920 × 1080 animated explainer at 60 fps. The `AgentSkills`
composition shows how to build a `code-review` skill, from its folder and YAML
frontmatter to instructions, optional resources, and a test request.

## Preview

```sh
npm install
npm run dev
```

Select **AgentSkills** in Remotion Studio. The chapter tracks, headlines, and
selected text are editable in Studio. The video uses system fonts and has no
external media dependencies or audio track.

## Chapters

| Time | Topic |
| --- | --- |
| 0–7 s | What a skill adds |
| 7–15 s | Create the skill folder and `SKILL.md` |
| 15–27 s | Define the name and description |
| 27–39 s | Write actionable instructions |
| 39–48 s | Add optional resources |
| 48–60 s | Test, refine, and recap |

## Check and export

```sh
npm run lint
npm run build
npm run render
```

The export command writes `out/agent-skills.mp4`. Generated bundles and exports
are ignored by Git. On macOS, the config uses installed Google Chrome when
available; otherwise, the first render may download Remotion's headless browser.

Source: `src/Composition.tsx`. Registration and video dimensions:
`src/Root.tsx`.
