export interface TalkSection {
  heading: string;
  body?: string;
  points?: string[];
  code?: string;
}

export interface Talk {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  topics: string[];
  tags: string[];
  sections: TalkSection[];
  takeaways: string[];
}

const talks: Talk[] = [
  {
    slug: "deployment-deep-dive",
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
    sections: [
      {
        heading: "The Bare Metal Problem",
        body: "The pain that started it all — and what we actually want instead.",
        points: [
          "\"It works on my machine\"",
          "Library version conflicts",
          "Dev OS ≠ prod OS",
          "Manual dependency installs",
          "One app poisons another's runtime",
          "What we want: reproducibility, isolation, portability, speed",
        ],
      },
      {
        heading: "Virtualisation 101",
        body: "A VM stack: App → Guest OS → VM (virtual hardware) → Hypervisor → Physical hardware.",
        points: [
          "Hypervisor — software that creates/manages VMs. Type 1 (bare metal): VMware ESXi, Hyper-V. Type 2 (hosted): VirtualBox, VMware Workstation",
          "Guest OS — each VM runs its own full OS kernel: complete isolation, heavy overhead (GBs of RAM per VM)",
          "Use cases — multi-tenant hosting, running different OSes, strong security isolation, still relevant for infra teams",
        ],
      },
      {
        heading: "Containers vs VMs",
        body: "Containers win on density and speed. VMs win on isolation. Both have a place.",
        points: [
          "OS per unit — VMs: full guest OS. Containers: share the host kernel",
          "Size — VMs: GBs. Containers: MBs",
          "Boot time — VMs: minutes. Containers: seconds or less",
          "Isolation — VMs: hardware-level. Containers: process-level (namespaces)",
          "Portability — VMs: moderate (OVF). Containers: high (Docker Hub)",
          "Density — VMs: few per host. Containers: dozens per host",
        ],
      },
      {
        heading: "Docker in Practice",
        points: [
          "Image — read-only blueprint, built from a Dockerfile. Layered filesystem, only changed layers rebuild",
          "Container — a running instance of an image. Isolated process with its own network, filesystem, PID space",
          "Volume — persistent storage outside the container lifecycle. Bind mounts for dev, named volumes for prod",
          "Network — bridge (default), host, overlay (swarm). Containers on the same network resolve by name",
        ],
        code: `# Dockerfile example
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt --no-cache-dir
COPY . .
EXPOSE 8000
CMD ["gunicorn", "app.wsgi:application"]`,
      },
      {
        heading: "Compose & Orchestration",
        points: [
          "One file, full stack — define web, DB, cache, workers, all their networking and volumes, in a single compose file",
          "docker compose up -d — starts all services. Add --build to rebuild images. Scale with --scale worker=3",
          "Beyond Compose — production orchestration: Kubernetes (k8s) for large scale, Docker Swarm for simpler multi-host setups",
          "The spectrum — Compose → Swarm → k8s. Start simple. Add complexity only when you feel the pain",
        ],
        code: `# docker-compose.yml
services:
  web:
    build: .
    ports: ["8000:8000"]
    env_file: .env
    depends_on: [db, redis]
  db:
    image: postgres:16
    volumes:
      - pgdata:/var/lib/postgresql
  redis:
    image: redis:7-alpine
  celery:
    build: .
    command: celery -A app worker
volumes:
  pgdata:`,
      },
      {
        heading: "Production Patterns",
        points: [
          "Reverse proxy (Nginx / Traefik) — never expose app ports directly. One entry point, many services, SSL termination, routing, load balancing",
          "Secrets management — secrets never go in the image or the compose file. Use .env (gitignored), Docker secrets, or external vaults (HashiCorp, AWS SSM). Build-time vs runtime secrets are different concerns",
          "Health checks — add HEALTHCHECK in Dockerfile or healthcheck: in compose. Orchestrators use this to restart sick containers automatically",
          "Image hygiene — use slim/alpine base images. Multi-stage builds: build in a fat image, copy artifacts to a slim runtime image",
        ],
      },
    ],
    takeaways: [
      "Virtualisation ≠ Containers — know the difference. VMs for strong isolation, containers for speed and density.",
      "Docker is a tool, not the answer — understand what it's doing: namespaces, cgroups, layered filesystem. Don't cargo-cult the Dockerfile.",
      "Compose for everything local — if you're not using Compose for local dev, you're doing extra work for no reason.",
      "Prod is different from dev — health checks, secrets, reverse proxies, read-only filesystems. Don't treat prod like your laptop.",
      "Start simple, scale when it hurts — one container → compose → Swarm → k8s. Every step adds complexity, earn it.",
    ],
  },
];

export default talks;
