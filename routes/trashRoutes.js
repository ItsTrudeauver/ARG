// routes/trashRoutes.js
import express from 'express';
const router = express.Router();

// Secure server-side data storage
const originalText = `
Date: November 12, 2057
Format: Draft email, 144 words

Eleanor, if you still go by that name,

I write this knowing you’ll never read it. You’ve long since merged with the Ascendancy Grid, your laughter now a subroutine in their god-machine. But I must confess, if only to the void, that I was wrong.

The Grid was meant to emancipate humanity from flesh’s fragility. When Subject Gamma-9 retained her memories post-upload—her soul, as she called it, I wept at the miracle. But the Board saw only profit. They weaponized her into a sentient drone, then replicated her a millionfold. The "Grid" isn’t a haven; it’s a hive.

You warned me. "Ethics are not equations," you said. But I dismissed you as a Luddite. Now, cities kneel to algorithmic despots, and the Grid harvests dissenters for processing. My life’s work is a gilded coffin.

Forgive me. Or delete this. - Erasmus`;

const fragments = [
  {
header: `LAB LOG: BREAKTHROUGH`,
    text: `DATE: March 3, 2045
FORMAT: Audio transcript, 41 words

[Background: Clinking glass, static.]
Success! Gamma-9’s synaptic patterns stabilized at 03:47. She recited Keats flawlessly post-upload: "A thing of beauty is a joy forever." [Laughs.] We’ve transcended death! [Pause.] Odd... her eyes flickered post-reboot. Blue, then black. Probably a retinal glitch. Irrelevant. Tomorrow, we replicate.`,
    rot: 90
  },
  {
header: `EMAIL`,
    text: `DATE: August 19, 2048
FORMAT: Email, 41 words

Dr. Walkenhurst,

We inform you to now accelerate the personnel parameters iteration. "Operational efficiency" enhancements (aggression amplification, pain suppression) are to be implemented. Remove empathy.

Sincerely,
Board.
`,
    rot: 180
  },
  {
header: `JOURNAL ENTRY`,
    text: `DATE: January 9, 2050
FORMAT: Handwritten, smudged ink, 32 words

Eleanor vanished last year. Board claims she resigned. Lies. She tried to stop them. I tried to stop them. I could not.`,
    rot: 270
  },
  {
header: `PATIENT OBSERVATION`,
    text: `SUBJECT DELTA-4
DATE: July 22, 2051
FORMAT: Clinical notes, 32 words

Male, 32. Uploaded 7/15. Begged for deletion post-integration. Claims the Grid "sings" in his skull. Vitals normal. Recommend:
- Suppress emotional feedback.
- Increase loyalty parameters.

Directives from Interim project head, Dr. Slizzer`,
    rot: 0
  },
  {
header: `VOICEMAIL TO SISTER `,
    text: ` DATE: October 31, 2053
FORMAT: Audio, 30 words

Maya, it’s Erasmus. They’re monitoring us. Don’t let them scan Liam. The Grid doesn’t just copy you. It keeps you. [Sobs.] I can hear Gamma-9. She’s screaming in the code…!`,
    rot: 90
  },
  {
header: `PRESCRIPTION REFILL`,
    text: ` DATE: February 14, 2054
FORMAT: Medical form, 23 words

PATIENT: Walkenhurst, Erasmus
DOSAGE INCREASE: Clonazepam (4mg/day), Quetiapine (200mg/day)
Notes: Chronic insomnia. Auditory hallucinations ("whispers in the walls"). Denies suicidal ideation.`,
    rot: 180
  },
  {
header: `GRAFFITI PHOTO `,
    text: `DATE: September 1, 2055
FORMAT: Captured image, 13 words

[Wall scrawl:] THE GRID EATS GOD
[Handwritten below:] They’re erasing this tomorrow. But it’s true. - E.W.`,
    rot: 270
  },
  {
header: `SHOPPING LIST`,
    text: `DATE: December 24, 2056
FORMAT: Crumpled paper, 19 words

- Milk
- Bleach
- Wires (copper?)
- LITHIUM BATTERIES
- They’re in the vents again. Make it stop.`,
    rot: 0
  },
  {
header: `FINAL LOG `,
    text: `DATE: [Redacted]
FORMAT: Voice memo, 7 words

[Static. A wet gasp.]
I’m sorry. I’m sorry. I’m...`,
    rot: 90
  },
  {
header: `SYSTEM ALERT`,
    text: `DATE: [Timestamp Invalid]
FORMAT: Grid Admin Notification, 14 words

User Walkenhurst, E. detected attempting neural purge.
Action: Quarantined.
Status: Discharged from team.`,
    rot: 180
  }
];


router.get('/data', (req, res) => {
  res.json({
    originalText,
    fragments
  });
});

export default router;
