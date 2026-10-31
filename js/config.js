/* ==========================================================================
   SITE CONFIG — edit content here. Every section is rendered from this file.
   Optional fields: leave empty ("" or []) and the UI hides them automatically.
   ========================================================================== */
window.SITE = {
  artist: {
    name: "Gurwinder Singh",
    designation: ["3D Generalist", "Multimedia Artist", "Video Editor"],
    email: "singhguri1718@gmail.com",
    linkedin: "https://www.linkedin.com/in/gurwinder-singh-01772530a/"
  },

  nav: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Software", href: "#software" },
    { label: "Showreel", href: "#showreel" },
    { label: "Contact", href: "#contact" }
  ],

  hero: {
    kicker: ["3D Generalist", "Multimedia Artist"],
    headline: "Crafting Digital Worlds Through Art & Technology.",
    description: "Creating immersive 3D environments, detailed digital assets, and engaging visual experiences through creativity and technical precision.",
    primaryCta: { label: "Explore My Work", href: "#work" },
    secondaryCta: { label: "Watch Showreel", href: "#showreel" }
  },

  about: {
    heading: "Beyond the Pixels.",
    subheading: "A creative mind. A multidisciplinary approach.",
    blocks: [
      {
        index: "01",
        heading: "3D Generalist & Multimedia Artist",
        tags: ["3D Modeling", "Texturing", "Environment Design", "Animation", "Concept Development", "Real-time / Unreal Engine"],
        paragraphs: [
          "I am a 3D Generalist and Multimedia Artist passionate about building immersive environments, creating detailed 3D assets, and bringing imaginative digital worlds to life. My creative expertise spans 3D modeling, texturing, environment design, animation, and concept development, with a particular interest in real-time environments and game development using Unreal Engine.",
          "I enjoy combining artistic vision with technical problem-solving, transforming initial concepts into refined, visually compelling experiences. From shaping individual assets to developing complete digital environments, I continuously explore new tools, workflows, and techniques to expand my creative capabilities and deliver meaningful visual experiences."
        ]
      },
      {
        index: "02",
        heading: "Video Editor & Multimedia Artist",
        tags: ["Video Editing", "Storytelling", "Sound Design", "Color Grading", "Motion Graphics"],
        paragraphs: [
          "I am a Video Editor and Multimedia Artist with a passion for transforming ideas into engaging visual stories. My approach combines creative storytelling, precise editing, thoughtful pacing, and strong visual composition to produce content that captures attention and communicates effectively.",
          "With a keen interest in cinematic visuals, sound design, color grading, and motion graphics, I enjoy experimenting with different editing techniques and visual styles to develop distinctive creative experiences. I continuously refine my craft, explore emerging workflows, and push creative boundaries to produce polished, purposeful, and visually engaging content."
        ]
      }
    ]
  },

  software: {
    heading: "The Creative Toolkit",
    subheading: "Tools that turn ideas into experiences.",
    items: [
      { name: "Autodesk Maya", short: "MAYA", abbr: "My", color: "#37A5CC", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/maya/maya-original.svg", description: "3D modeling, animation, and digital asset creation." },
      { name: "Blender", short: "BLENDER", abbr: "Bl", color: "#EA7600", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg", description: "3D modeling, sculpting, texturing, and rendering." },
      { name: "Adobe After Effects", short: "AFTER EFFECTS", abbr: "Ae", color: "#9999FF", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/aftereffects/aftereffects-original.svg", description: "Motion graphics, compositing, and visual effects." },
      { name: "Adobe Premiere Pro", short: "PREMIERE PRO", abbr: "Pr", color: "#9999FF", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-original.svg", description: "Video editing, storytelling, and post-production." },
      { name: "Unreal Engine", short: "UNREAL ENGINE", abbr: "UE", color: "#F2F4F7", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unrealengine/unrealengine-original.svg", invertIcon: true, description: "Real-time environments, immersive worlds, and interactive visualization." }
    ]
  },

  /* Videos are referenced by id from projects and the showcase. */
  videos: {
    walkthrough: {
      type: "file",
      label: "Project Walkthrough",
      title: "Architectural Environment — Walkthrough",
      // Original: "WhatsApp Video 2026-10-13 at 2.04.12 AM.mp4" (83.8 MB, too large to bundle).
      // Replace with "projects/architectural-environment/walkthrough.mp4" or an R2/CDN URL when available.
      src: "https://www.genspark.ai/api/files/s/V1D5NwDO",
      poster: "projects/architectural-environment/wide-view.jpg",
      duration: "03:52",
      description: "A camera walkthrough of the 3D architectural model, presenting the domed structure, stairs, surrounding buildings and figures from multiple perspectives."
    },
    featured: {
      type: "file",
      label: "Featured Visual",
      title: "Cinematic Edit",
      // Original: "batman2.mp4" (62.5 MB). Replace with "videos/batman2.mp4" or an R2/CDN URL when available.
      src: "https://www.genspark.ai/api/files/s/tpvhtZCX",
      poster: "",
      duration: "01:47",
      description: "A dark, atmospheric cinematic montage built around pacing, mood, music and sound."
    },
    youtube: {
      type: "youtube",
      label: "3D Render Montage",
      title: "3D Render Montage",
      id: "fSiI2Zq4NzI",
      url: "https://youtu.be/fSiI2Zq4NzI",
      duration: "01:16",
      description: "A 3D render and animation montage following an armoured character running across a variety of terrains and landscapes."
    }
  },

  works: {
    heading: "Selected Works",
    subheading: "A collection of ideas brought to life."
  },

  projects: [
    {
      slug: "architectural-environment",
      featured: true,
      title: "Architectural Environment",
      category: ["3D Modeling", "Architectural Visualization", "Environment Design"],
      summary: "A detailed 3D architectural environment with domed elements, decorative arches and an expansive courtyard.",
      description: [
        "A detailed 3D architectural environment exploring structural composition, architectural detailing, spatial design, and environmental presentation.",
        "The project features a distinctive structure with domed elements, decorative arches, detailed facade work, and an expansive courtyard. Through carefully arranged architectural components and environmental elements, the scene brings together structural modeling and visual storytelling to create a cohesive digital environment."
      ],
      cover: "projects/architectural-environment/wide-view.jpg",
      hero: 0, // index into images used as the hero render
      images: [
        { src: "projects/architectural-environment/wide-view.jpg", caption: "Wide environmental perspective", alt: "High-angle 3D render of a walled architectural complex: a white building with a central dome, two side domes and green facade framing sits in a paved courtyard, with arched gateways in the perimeter wall and a small group of figures outside." },
        { src: "projects/architectural-environment/detail-view.jpg", caption: "Closer architectural perspective with characters", alt: "Eye-level 3D render showing a robed figure and five figures with raised arms in front of the courtyard wall, with the green and white domed building and its brown arched doorways behind them." }
        // Add a third render here: { src: "projects/architectural-environment/main-view.jpg", caption: "Main architectural composition", alt: "..." }
      ],
      video: "walkthrough",
      // Verified details only — leave "" to hide a field.
      details: {
        "Project Type": "3D Architectural Environment",
        "Creative Focus": "Structural composition, architectural detailing, spatial design, environmental presentation",
        "Software Used": "Blender",
        "Modeling Process": "",
        "Environment Details": "Domed main structure, decorative arches, detailed facade, stairs, perimeter walls with arched gateways, expansive courtyard and placed character figures"
      }
    },
    {
      slug: "cinematic-edit",
      title: "Cinematic Edit",
      category: ["Video Editing"],
      summary: "A dark, atmospheric montage built around pacing, mood, music and sound.",
      video: "featured",
      cover: ""
    },
    {
      slug: "3d-render-montage",
      title: "3D Render Montage",
      category: ["3D Animation", "Rendering"],
      summary: "An armoured character running across a variety of terrains and landscapes.",
      video: "youtube",
      cover: "https://i.ytimg.com/vi/fSiI2Zq4NzI/hqdefault.jpg"
    }
  ],

  showcase: {
    heading: "Visual Stories in Motion.",
    subheading: "A selection of cinematic and creative work.",
    videos: ["featured", "youtube"]
  },

  contact: {
    heading: "Let's Create Something Extraordinary.",
    text: "Have an idea, a creative project, or an opportunity in mind? I'm always interested in exploring new possibilities and collaborating on meaningful visual experiences.",
    primaryCta: "Get In Touch",
    secondaryCta: "Connect on LinkedIn"
  }
};
