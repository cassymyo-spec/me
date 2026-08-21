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
      "Multi-Stage Builds",
      "Orchestrating a Real Stack",
      "systemd",
      "Production Patterns",
    ],
    tags: ["Docker", "Virtualisation", "systemd", "Systems", "DevOps"],
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
        heading: "Multi-Stage Builds in Production",
        body: "The single-stage Dockerfile above is fine for a talk. It's not what runs in production. A real image needs to be small, and it needs to not run as root. Multi-stage builds solve the first problem; a dedicated user solves the second.",
        points: [
          "Builder stage — has the compiler toolchain (build-essential, libpq-dev), installs Python deps into an isolated prefix. This stage is thrown away.",
          "Runtime stage — starts fresh from the same slim base, copies only the installed packages from the builder, never the toolchain that built them",
          "Non-root user — groupadd/useradd creates a dedicated appuser, chown hands it the app directory, USER appuser drops root before the container ever runs",
          "PYTHONDONTWRITEBYTECODE / PYTHONUNBUFFERED — no stray .pyc files, and logs stream immediately instead of buffering, which matters when `docker logs` is your only view into the container",
          "ENTRYPOINT script — a shell script (migrations, waiting on the DB, then handing off to gunicorn) rather than a bare CMD, so the container does its own setup on boot",
        ],
        code: `# Builder Stage
FROM python:3.12-slim AS builder

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y \\
    build-essential \\
    libpq-dev

COPY requirements.txt .

RUN pip install --upgrade pip
RUN pip install --prefix=/install -r requirements.txt


# Runtime Stage
FROM python:3.12-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN groupadd -r appuser && \\
    useradd -r -g appuser -m -d /home/appuser appuser

COPY --from=builder /install /usr/local

COPY . .

RUN chown -R appuser:appuser /app

USER appuser

EXPOSE 8001

ENTRYPOINT ["/app/entrypoint.sh"]`,
      },
      {
        heading: "Orchestrating a Real Stack",
        body: "This is the Compose file behind DigitalTouch POS's backend — Postgres, Redis, a Django API, and three separate Celery processes, none of which are optional once a real product depends on background work.",
        points: [
          "Healthchecks everywhere — db and redis both define a healthcheck, and web/worker/beat all depends_on: condition: service_healthy. Nothing starts against a database that isn't actually ready yet.",
          "Named containers, one network — every service sits on the same bridge network and resolves the others by container_name, so DATABASE_URL just says 'db', not an IP",
          "web binds to 127.0.0.1 only — the Django container is never exposed to the internet directly; a reverse proxy in front of it terminates SSL and forwards traffic. This is the same 'never expose app ports directly' rule from earlier, now actually enforced.",
          "Three Celery processes, three jobs — worker handles the default queue, worker_news is a separate queue (news_push) with its own concurrency so a slow push job can't starve everything else, and beat only schedules — it never executes",
          "Why beat is isolated — beat just writes to a schedule file and enqueues tasks; the existing worker picks them up because unrouted tasks land on the default celery queue. Running two beat containers would double-fire every scheduled job, so there is deliberately only ever one.",
        ],
        code: `services:
  db:
    image: postgres:16-alpine
    container_name: hs_postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: \${DB_NAME}
      POSTGRES_USER: \${DB_USER}
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U \${DB_USER} -d \${DB_NAME}"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s
    networks:
      - backend

  redis:
    image: redis:7-alpine
    container_name: hs_redis
    restart: unless-stopped
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s
    networks:
      - backend

  web:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: hs_api
    restart: unless-stopped
    env_file:
      - .env
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    ports:
      - "127.0.0.1:8001:8001"
    healthcheck:
      test:
        [
          "CMD",
          "python",
          "-c",
          "import urllib.request; urllib.request.urlopen('http://localhost:8001/api/v1/health/')"
        ]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 30s
    networks:
      - backend
    volumes:
      - /home/deploy/xyz/media:/app/media

  worker:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: hs_celery_worker
    restart: unless-stopped
    command: celery -A core worker -l info -Q celery --hostname=default@%h
    env_file:
      - .env
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - backend

  worker_news:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: hs_celery_worker_news
    restart: unless-stopped
    command: celery -A core worker -l info -Q news_push --hostname=news@%h --concurrency=2
    env_file:
      - .env
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - backend

  beat:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: hs_celery_beat
    restart: unless-stopped
    # beat only schedules tasks — it never executes them. The \`worker\`
    # service above picks up whatever beat enqueues. Never run more than
    # one beat container: two would each fire the schedule independently
    # and double-generate recurring tasks.
    command: celery -A core beat -l info --schedule /tmp/celerybeat-schedule
    env_file:
      - .env
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - backend

volumes:
  postgres_data:
  redis_data:

networks:
  backend:
    driver: bridge`,
      },
      {
        heading: "systemd — Keeping the Stack Alive",
        body: "Compose starts your stack. It doesn't survive a server reboot on its own, and 'restart: unless-stopped' only helps once Docker itself is already running. That's a systemd job, not a Docker job.",
        points: [
          "One layer down — Docker's own daemon is a systemd service (dockerd.service). systemd starts it on boot; Docker then starts any container with a restart policy",
          "A unit for the stack — a small .service file that runs `docker compose up` on start and `docker compose down` on stop, enabled with `systemctl enable`, gives the whole stack a single point of control: start, stop, status, logs, all through systemctl",
          "Why not just cron / rc.local — systemd tracks process state properly: it knows if the stack failed to start, restarts it on failure, and journalctl -u gives structured, timestamped logs instead of a scattered log file",
          "Division of labour — systemd supervises 'is Docker running', Docker/Compose supervises 'are my containers healthy'. Two layers, each responsible for the level below it",
        ],
        code: `# /etc/systemd/system/dtpos-backend.service
[Unit]
Description=DigitalTouch POS backend stack
Requires=docker.service
After=docker.service network-online.target
Wants=network-online.target

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/home/deploy/dtpos-backend
ExecStart=/usr/bin/docker compose up -d
ExecStop=/usr/bin/docker compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target

# systemctl enable --now dtpos-backend.service
# systemctl status dtpos-backend.service
# journalctl -u dtpos-backend.service -f`,
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
      "Multi-stage builds aren't optional for prod — a fat single-stage image with root as the default user is a smaller, slower, less safe version of what you actually want to ship.",
      "Compose for everything local — if you're not using Compose for local dev, you're doing extra work for no reason.",
      "Queues are not one blob — routing Celery workers by queue (default vs news_push) means one slow job type can't starve another, and beat stays a single, isolated scheduler.",
      "Docker restarts containers, systemd restarts Docker — 'restart: unless-stopped' means nothing if the daemon itself never comes back up after a reboot. A systemd unit closes that gap.",
      "Prod is different from dev — health checks, secrets, reverse proxies, read-only filesystems. Don't treat prod like your laptop.",
      "Start simple, scale when it hurts — one container → compose → Swarm → k8s. Every step adds complexity, earn it.",
      "This isn't theoretical — this exact Dockerfile and Compose pattern runs DigitalTouch POS's backend today.",
    ],
  },
];

export default talks;
