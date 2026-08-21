interface Talk {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  topics: string[];
  tags: string[];
  file?: string;
}

const talks: Talk[] = [
  {
    num: "01",
    title: "Deployment Deep Dive",
    subtitle: "Docker · Virtualisation · Systems",
    description:
      "First session in the Teddy Talks series. A ground-up walkthrough of why 'works on my machine' keeps killing products, how virtualisation and containers actually differ under the hood, and the Docker and Compose patterns that hold up in production.",
    topics: [
      "The Bare Metal Problem",
      "Virtualisation 101",
      "Containers vs VMs",
      "Docker in Practice",
      "Compose & Orchestration",
      "Production Patterns",
    ],
    tags: ["Docker", "Virtualisation", "Systems", "DevOps"],
    file: "/teddy-talks/teddy-talk-01-deployment-deep-dive.pptx",
  },
];

export default talks;
