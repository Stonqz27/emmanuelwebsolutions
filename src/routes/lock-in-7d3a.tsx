import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  BriefcaseBusiness,
  Check,
  Clock3,
  Dumbbell,
  Footprints,
  LockKeyhole,
  LogOut,
  Moon,
  ShieldCheck,
  Utensils,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const STORAGE_KEY = "emmanuel-lock-in:v1";
const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

type DayName = (typeof DAY_NAMES)[number];
type ClassItem = { time: string; title: string; place: string };
type EncryptedEnvelope = {
  v: number;
  salt: string;
  iv: string;
  ciphertext: string;
};
type PlannerData = {
  version: number;
  profile: {
    name: string;
    startWeight: number;
    goalWeight: number;
    proteinGoal: number;
    stepsGoal: number;
    bedtime: string;
    wakeTime: string;
  };
  classSchedule: Record<DayName, ClassItem[]>;
  commitments: {
    cleaningAnchor: string;
    cleaningPlace: string;
    cleaningAddress: string;
    cleaningTime: string;
    cleaningPayLow: number;
    cleaningPayHigh: number;
    sundayChurchTime: string;
    hollyMowPlan: string;
    hollyPay: number;
  };
  completions: Record<string, boolean>;
  [key: string]: unknown;
};
type PlanKind = "class" | "food" | "gym" | "walk" | "work" | "sleep";
type PlanItem = {
  id: string;
  start: number;
  end: number;
  time: string;
  title: string;
  detail: string;
  kind: PlanKind;
};

const INITIAL_ENVELOPE: EncryptedEnvelope = {
  v: 1,
  salt: "06SSguTSDE7PVawFR/Mtzw==",
  iv: "y3FyasDgbfkkrvoW",
  ciphertext:
    "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",
};

const FOOD = {
  breakfast: "3 eggs + 1 bowl oatmeal + 1 banana. Drink water.",
  main: "One plate: 2 palms lean protein, 1 fist rice or potatoes, 2 fists vegetables, plus fruit. Water only.",
  snack:
    "Greek yogurt + one piece of fruit. If unavailable: protein shake + banana.",
};
const GYM_WORKOUT =
  "5-minute treadmill warm-up. Then leg press, chest press, lat pulldown, seated row, and leg curl — 3 sets of 10 each. Plank 3 × 30 seconds. Finish with a 10-minute incline walk.";

export const Route = createFileRoute("/lock-in-7d3a")({
  head: () => ({
    meta: [
      { title: "Do This Today" },
      { name: "description", content: "Emmanuel's fixed daily plan." },
      { name: "robots", content: "noindex, nofollow, noarchive" },
      { name: "theme-color", content: "#ff1493" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black-translucent",
      },
      { name: "apple-mobile-web-app-title", content: "Do This" },
    ],
    links: [
      { rel: "manifest", href: "/lock-in.webmanifest" },
      { rel: "apple-touch-icon", href: "/favicon.svg" },
    ],
  }),
  component: LockInRoute,
});

function bytesFromBase64(value: string) {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}
function base64FromBytes(value: ArrayBuffer | Uint8Array) {
  const bytes = value instanceof Uint8Array ? value : new Uint8Array(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}
async function deriveKey(passphrase: string, salt: Uint8Array) {
  const material = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations: 310_000 },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}
async function decryptEnvelope(
  passphrase: string,
  envelope: EncryptedEnvelope,
) {
  const salt = bytesFromBase64(envelope.salt);
  const key = await deriveKey(passphrase, salt);
  const plaintext = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: bytesFromBase64(envelope.iv) },
    key,
    bytesFromBase64(envelope.ciphertext),
  );
  return {
    key,
    data: JSON.parse(new TextDecoder().decode(plaintext)) as PlannerData,
  };
}
async function encryptData(data: PlannerData, key: CryptoKey, salt: string) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(JSON.stringify(data)),
  );
  return {
    v: 1,
    salt,
    iv: base64FromBytes(iv),
    ciphertext: base64FromBytes(ciphertext),
  } satisfies EncryptedEnvelope;
}
function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function parseLocalDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}
function isCleaningSaturday(date: Date, anchor: string) {
  if (date.getDay() !== 6) return false;
  const days = Math.round(
    (parseLocalDate(localDateKey(date)).getTime() -
      parseLocalDate(anchor).getTime()) /
      86_400_000,
  );
  return days >= 0 && days % 14 === 0;
}
function classRange(value: string) {
  const match = value.match(
    /(\d+):(\d+)\s*(AM|PM)?\s*[–-]\s*(\d+):(\d+)\s*(AM|PM)/i,
  );
  if (!match) return { start: 0, end: 0 };
  const period = match[3] || match[6];
  return {
    start: toMinutes(Number(match[1]), Number(match[2]), period),
    end: toMinutes(Number(match[4]), Number(match[5]), match[6]),
  };
}
function toMinutes(hour: number, minute: number, period: string) {
  return ((hour % 12) + (period.toUpperCase() === "PM" ? 12 : 0)) * 60 + minute;
}
function iconFor(kind: PlanKind) {
  const props = { className: "size-5", "aria-hidden": true } as const;
  if (kind === "food") return <Utensils {...props} />;
  if (kind === "gym") return <Dumbbell {...props} />;
  if (kind === "walk") return <Footprints {...props} />;
  if (kind === "class") return <BookOpen {...props} />;
  if (kind === "work") return <BriefcaseBusiness {...props} />;
  return <Moon {...props} />;
}

function buildPlan(date: Date, data: PlannerData): PlanItem[] {
  const day = DAY_NAMES[date.getDay()];
  const items: PlanItem[] = [];
  const add = (item: PlanItem) => items.push(item);
  const weekday = date.getDay() >= 1 && date.getDay() <= 5;
  const cleaningSaturday = isCleaningSaturday(
    date,
    data.commitments.cleaningAnchor,
  );
  add({
    id: "wake",
    start: weekday ? 495 : cleaningSaturday ? 480 : 540,
    end: weekday ? 510 : cleaningSaturday ? 495 : 555,
    time: weekday ? "8:15 AM" : cleaningSaturday ? "8:00 AM" : "9:00 AM",
    title: "Get up. Water. Get dressed.",
    detail: "No scrolling in bed.",
    kind: "sleep",
  });

  if (weekday) {
    add({
      id: "breakfast",
      start: 510,
      end: 555,
      time: "8:30 AM",
      title: "Breakfast — Thurgood Marshall",
      detail: FOOD.breakfast,
      kind: "food",
    });
    for (const course of data.classSchedule[day] || []) {
      const range = classRange(course.time);
      add({
        id: `class-${course.title}`,
        start: range.start,
        end: range.end,
        time: course.time,
        title: course.title,
        detail: course.place,
        kind: "class",
      });
    }
    add({
      id: "lunch",
      start: 720,
      end: 780,
      time: "12:00 PM",
      title: "Lunch — Thurgood Marshall",
      detail: FOOD.main,
      kind: "food",
    });
    if (day === "Tuesday" || day === "Thursday") {
      add({
        id: "finance",
        start: 840,
        end: 900,
        time: "2:00–3:00 PM",
        title: "FIN 101 online work",
        detail: "Open Canvas and finish the next listed item.",
        kind: "class",
      });
      add({
        id: "walk",
        start: 930,
        end: 960,
        time: "3:30–4:00 PM",
        title: "Brisk campus walk",
        detail: "Walk fast enough that you can talk, but not sing.",
        kind: "walk",
      });
      add({
        id: "snack",
        start: 975,
        end: 1005,
        time: "4:15 PM",
        title: "Snack",
        detail: FOOD.snack,
        kind: "food",
      });
      const dinnerTime = day === "Tuesday" ? "6:10 PM" : "6:00 PM";
      add({
        id: "dinner",
        start: day === "Tuesday" ? 1090 : 1080,
        end: 1140,
        time: dinnerTime,
        title: "Dinner — Thurgood Marshall",
        detail: FOOD.main,
        kind: "food",
      });
    } else {
      add({
        id: "snack",
        start: 975,
        end: 1005,
        time: "4:15 PM",
        title: "Snack",
        detail: FOOD.snack,
        kind: "food",
      });
      add({
        id: "gym",
        start: 1085,
        end: 1145,
        time: "6:05–7:05 PM",
        title: "Hurt Gym — full body",
        detail: GYM_WORKOUT,
        kind: "gym",
      });
      add({
        id: "dinner",
        start: 1155,
        end: 1200,
        time: "7:15 PM",
        title: "Dinner — Thurgood Marshall",
        detail: FOOD.main,
        kind: "food",
      });
    }
  } else if (day === "Saturday") {
    if (cleaningSaturday) {
      add({
        id: "quick-breakfast",
        start: 495,
        end: 525,
        time: "8:15 AM",
        title: "Quick breakfast",
        detail: "Greek yogurt + banana + water.",
        kind: "food",
      });
      add({
        id: "cleaning",
        start: 540,
        end: 720,
        time: data.commitments.cleaningTime,
        title: data.commitments.cleaningPlace,
        detail: `${data.commitments.cleaningAddress} · expected $${data.commitments.cleaningPayLow}–$${data.commitments.cleaningPayHigh}`,
        kind: "work",
      });
      add({
        id: "brunch",
        start: 750,
        end: 810,
        time: "12:30 PM",
        title: "Brunch — Thurgood Marshall",
        detail: FOOD.main,
        kind: "food",
      });
    } else {
      add({
        id: "brunch",
        start: 630,
        end: 690,
        time: "10:30 AM",
        title: "Brunch — Thurgood Marshall",
        detail: `Eggs first, then ${FOOD.main.toLowerCase()}`,
        kind: "food",
      });
      add({
        id: "walk",
        start: 720,
        end: 765,
        time: "12:00–12:45 PM",
        title: "Brisk walk",
        detail: "Outside or treadmill. Keep moving for 45 minutes.",
        kind: "walk",
      });
    }
    add({
      id: "dinner",
      start: 1080,
      end: 1140,
      time: "6:00 PM",
      title: "Dinner — Thurgood Marshall",
      detail: FOOD.main,
      kind: "food",
    });
  } else {
    add({
      id: "church",
      start: 600,
      end: 690,
      time: data.commitments.sundayChurchTime,
      title: "Church",
      detail: "Get dressed and leave early enough to be seated on time.",
      kind: "work",
    });
    add({
      id: "brunch",
      start: 735,
      end: 795,
      time: "12:15 PM",
      title: "Brunch — Thurgood Marshall",
      detail: `Eggs first, then ${FOOD.main.toLowerCase()}`,
      kind: "food",
    });
    add({
      id: "holly",
      start: 810,
      end: 870,
      time: "1:30–2:30 PM",
      title: "Mow Holly’s lawn",
      detail: `Do it when confirmed · $${data.commitments.hollyPay}`,
      kind: "work",
    });
    add({
      id: "reset",
      start: 960,
      end: 1020,
      time: "4:00–5:00 PM",
      title: "Reset for Monday",
      detail: "Laundry, bag packed, clothes ready, check Canvas once.",
      kind: "work",
    });
    add({
      id: "dinner",
      start: 1080,
      end: 1140,
      time: "6:00 PM",
      title: "Dinner — Thurgood Marshall",
      detail: FOOD.main,
      kind: "food",
    });
  }
  add({
    id: "phone-down",
    start: 1425,
    end: 1455,
    time: "11:45 PM",
    title: "Phone down",
    detail: "Shower, set alarm, lights out at 12:15 AM.",
    kind: "sleep",
  });
  return items.sort((a, b) => a.start - b.start);
}

function LockInRoute() {
  const [data, setData] = useState<PlannerData | null>(null);
  const [passphrase, setPassphrase] = useState("");
  const [unlockError, setUnlockError] = useState("");
  const [unlocking, setUnlocking] = useState(false);
  const [saveState, setSaveState] = useState("Locked");
  const keyRef = useRef<CryptoKey | null>(null);
  const saltRef = useRef(INITIAL_ENVELOPE.salt);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!data || !keyRef.current) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    setSaveState("Saving…");
    saveTimerRef.current = setTimeout(async () => {
      if (!keyRef.current) return;
      const envelope = await encryptData(data, keyRef.current, saltRef.current);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(envelope));
      setSaveState("Saved");
    }, 350);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [data]);

  async function unlock(event: React.FormEvent) {
    event.preventDefault();
    setUnlocking(true);
    setUnlockError("");
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const envelope = stored
        ? (JSON.parse(stored) as EncryptedEnvelope)
        : INITIAL_ENVELOPE;
      const result = await decryptEnvelope(passphrase.trim(), envelope);
      keyRef.current = result.key;
      saltRef.current = envelope.salt;
      setData(result.data);
      setPassphrase("");
      setSaveState("Saved");
    } catch {
      setUnlockError("Wrong key. Check it and try again.");
    } finally {
      setUnlocking(false);
    }
  }
  function lock() {
    keyRef.current = null;
    setData(null);
    setSaveState("Locked");
  }

  if (!data) {
    return (
      <main className="grid min-h-svh place-items-center bg-background px-5 py-10 text-foreground">
        <section className="w-full max-w-md border-2 border-foreground bg-surface p-6 sm:p-9">
          <div className="mb-8 grid size-12 place-items-center border-2 border-primary bg-primary text-primary-foreground">
            <LockKeyhole aria-hidden="true" />
          </div>
          <h1 className="font-display text-5xl font-bold leading-[0.9]">
            Your day.
            <br />
            No guessing.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Open the plan. Do the first unfinished thing.
          </p>
          <form onSubmit={unlock} className="mt-8 space-y-4">
            <label
              className="block font-mono text-sm font-semibold uppercase tracking-wider"
              htmlFor="lock-in-private-key"
            >
              Private key
            </label>
            <Input
              id="lock-in-private-key"
              name="private-key"
              autoFocus
              autoCapitalize="none"
              autoCorrect="off"
              autoComplete="current-password"
              onChange={(event) => setPassphrase(event.target.value)}
              placeholder="Paste your saved key"
              type="password"
              value={passphrase}
            />
            {unlockError ? (
              <p role="alert" className="text-sm font-medium text-primary">
                {unlockError}
              </p>
            ) : null}
            <Button
              className="w-full"
              disabled={!passphrase || unlocking}
              size="lg"
            >
              {unlocking ? "Opening…" : "SHOW ME WHAT TO DO"}
            </Button>
          </form>
          <p className="mt-6 flex gap-3 border-t-2 border-border pt-5 text-sm text-muted-foreground">
            <ShieldCheck
              className="size-5 shrink-0 text-primary"
              aria-hidden="true"
            />
            Your plan stays encrypted on this device.
          </p>
        </section>
      </main>
    );
  }
  return (
    <DailyPlan
      data={data}
      lock={lock}
      saveState={saveState}
      setData={setData}
    />
  );
}

function DailyPlan({
  data,
  lock,
  saveState,
  setData,
}: {
  data: PlannerData;
  lock: () => void;
  saveState: string;
  setData: React.Dispatch<React.SetStateAction<PlannerData | null>>;
}) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);
  const dateKey = localDateKey(now);
  const plan = buildPlan(now, data);
  const minutes = now.getHours() * 60 + now.getMinutes();
  const isDone = (id: string) => Boolean(data.completions[`${dateKey}:${id}`]);
  const unfinished = plan.filter((item) => !isDone(item.id));
  const current =
    unfinished.find((item) => item.end > minutes) || unfinished[0];
  const sleeping = minutes < 450;
  const completed = plan.length - unfinished.length;

  function toggle(id: string) {
    const key = `${dateKey}:${id}`;
    setData((currentData) =>
      currentData
        ? {
            ...currentData,
            completions: {
              ...currentData.completions,
              [key]: !currentData.completions[key],
            },
          }
        : currentData,
    );
  }

  return (
    <main className="min-h-svh bg-background px-4 py-5 text-foreground sm:px-6 sm:py-8">
      <div className="mx-auto max-w-3xl">
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              {now.toLocaleDateString("en-US", { weekday: "long" })}
            </p>
            <h1 className="mt-1 font-display text-4xl font-bold sm:text-5xl">
              DO THIS TODAY
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {completed}/{plan.length} done · {saveState}
            </p>
          </div>
          <Button
            aria-label="Lock plan"
            onClick={lock}
            size="icon"
            variant="outline"
          >
            <LogOut aria-hidden="true" />
          </Button>
        </header>

        <section className="mt-6 border-2 border-primary bg-primary p-5 text-primary-foreground sm:p-7">
          <div className="flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider">
            <Clock3 className="size-5" aria-hidden="true" />
            {sleeping || (current && current.start <= minutes)
              ? "RIGHT NOW"
              : "NEXT"}
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
            {sleeping
              ? "Sleep. Alarm at 8:15 AM."
              : current?.title || "You finished today."}
          </h2>
          <p className="mt-3 text-base leading-relaxed">
            {sleeping
              ? "Put the phone down. Sleep is part of losing weight."
              : current
                ? `${current.time} · ${current.detail}`
                : "Keep dinner light, drink water, and get to bed on time."}
          </p>
          {!sleeping && current ? (
            <Button
              className="mt-5 w-full border-2 border-primary-foreground bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              onClick={() => toggle(current.id)}
            >
              <Check aria-hidden="true" />
              MARK DONE
            </Button>
          ) : null}
        </section>

        <section className="mt-6 border-2 border-foreground bg-surface">
          <div className="border-b-2 border-foreground p-4">
            <h2 className="font-display text-2xl font-bold">TODAY’S ORDER</h2>
          </div>
          <div className="divide-y-2 divide-border">
            {plan.map((item) => {
              const done = isDone(item.id);
              return (
                <label
                  key={item.id}
                  className={`flex cursor-pointer gap-4 p-4 sm:p-5 ${done ? "bg-surface-2 text-muted-foreground" : ""}`}
                >
                  <Checkbox
                    id={`plan-${item.id}`}
                    name={`plan-${item.id}`}
                    checked={done}
                    onCheckedChange={() => toggle(item.id)}
                    className="mt-1 size-6 shrink-0 rounded-none"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 text-sm font-bold text-primary">
                      {iconFor(item.kind)}
                      {item.time}
                    </span>
                    <span
                      className={`mt-1 block text-lg font-bold ${done ? "line-through" : ""}`}
                    >
                      {item.title}
                    </span>
                    <span className="mt-1 block text-base leading-relaxed">
                      {item.detail}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="border-2 border-foreground bg-surface p-5">
            <div className="flex items-center gap-2 text-primary">
              <Utensils aria-hidden="true" />
              <h2 className="font-display text-xl font-bold">
                DINING-HALL RULE
              </h2>
            </div>
            <p className="mt-3 text-base leading-relaxed">
              <strong>One plate.</strong> Protein first, one fist of carbs, two
              fists of vegetables, fruit. Water or a zero-calorie drink. No
              second plate.
            </p>
          </div>
          <div className="border-2 border-foreground bg-surface p-5">
            <div className="flex items-center gap-2 text-primary">
              <Dumbbell aria-hidden="true" />
              <h2 className="font-display text-xl font-bold">GYM RULE</h2>
            </div>
            <p className="mt-3 text-base leading-relaxed">
              <strong>Monday, Wednesday, Friday at 6:05 PM.</strong> Do the
              listed workout. Do not add random exercises. Just finish it.
            </p>
          </div>
        </section>

        <section className="mt-4 border-2 border-foreground bg-surface p-5">
          <h2 className="font-display text-xl font-bold">THE ONLY 5 RULES</h2>
          <ol className="mt-3 space-y-2 text-base leading-relaxed">
            <li>
              1. Follow today’s order. If you miss something, do the next thing.
            </li>
            <li>
              2. Water or zero-calorie drinks. No regular soda, juice, or sweet
              tea.
            </li>
            <li>
              3. No second dining-hall plate. Protein and vegetables can be
              bigger.
            </li>
            <li>4. Weigh Monday morning after the bathroom, before eating.</li>
            <li>
              5. Lights out at 12:15 AM. Repeat this plan for 14 days before
              changing it.
            </li>
          </ol>
        </section>

        <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          Aim for steady progress, not a crash diet. If two Monday weigh-ins
          pass with no drop, message me and we’ll make one small food
          adjustment. Stop exercising and seek medical help for chest pain,
          fainting, or severe shortness of breath.
        </p>
      </div>
    </main>
  );
}
