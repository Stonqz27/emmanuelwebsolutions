import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  CalendarDays,
  Check,
  Dumbbell,
  Footprints,
  LockKeyhole,
  LogOut,
  Moon,
  Plus,
  Scale,
  Settings,
  ShieldCheck,
  Trash2,
  Utensils,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const INITIAL_ENVELOPE: EncryptedEnvelope = {
  v: 1,
  salt: "QQ27Im/mLF10wbqa/G+PmA==",
  iv: "Fma/BezXKfWbYU9W",
  ciphertext:
    "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",
};

type DayName = (typeof DAY_NAMES)[number];
type ClassItem = { time: string; title: string; place: string };
type TrainingItem = { time: string; title: string; detail: string };
type MealItem = { time: string; name: string; detail: string };
type WeightEntry = { date: string; value: number };
type EarningEntry = { id: string; date: string; label: string; amount: number };
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
  training: Record<DayName, TrainingItem>;
  meals: MealItem[];
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
  weights: WeightEntry[];
  earnings: EarningEntry[];
};

export const Route = createFileRoute("/lock-in-7d3a")({
  head: () => ({
    meta: [
      { title: "Lock In" },
      { name: "description", content: "Private personal planner." },
      { name: "robots", content: "noindex, nofollow, noarchive" },
      { name: "theme-color", content: "#ff1493" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black-translucent",
      },
      { name: "apple-mobile-web-app-title", content: "Lock In" },
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

async function encryptData(
  data: PlannerData,
  key: CryptoKey,
  salt: string,
): Promise<EncryptedEnvelope> {
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
  };
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

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
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
      setSaveState("Saved on this device");
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
      setSaveState("Saved on this device");
    } catch {
      setUnlockError(
        "That key did not unlock your planner. Check it and try again.",
      );
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
      <main className="min-h-svh bg-background px-5 py-10 text-foreground sm:grid sm:place-items-center">
        <section className="mx-auto w-full max-w-md border-2 border-foreground bg-surface p-6 sm:p-9">
          <div className="mb-10 flex items-center justify-between">
            <div className="grid size-12 place-items-center border-2 border-primary bg-primary text-primary-foreground">
              <LockKeyhole aria-hidden="true" />
            </div>
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Private
            </span>
          </div>
          <h1 className="font-display text-5xl font-bold leading-[0.88]">
            Lock in.
            <br />
            Stay ready.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Your routine and records are encrypted. Enter your private key to
            open them.
          </p>
          <form onSubmit={unlock} className="mt-8 space-y-4">
            <label className="block font-mono text-sm font-semibold uppercase tracking-wider">
              Private key
              <Input
                id="lock-in-private-key"
                name="private-key"
                autoFocus
                autoCapitalize="none"
                autoCorrect="off"
                autoComplete="current-password"
                className="mt-2"
                onChange={(event) => setPassphrase(event.target.value)}
                placeholder="Paste your saved key"
                type="password"
                value={passphrase}
              />
            </label>
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
              {unlocking ? "Unlocking…" : "Open planner"}
            </Button>
          </form>
          <div className="mt-8 flex gap-3 border-t-2 border-border pt-5 text-sm leading-relaxed text-muted-foreground">
            <ShieldCheck
              className="mt-0.5 size-5 shrink-0 text-primary"
              aria-hidden="true"
            />
            The key is never stored. Save it in Apple Passwords so you do not
            lose access.
          </div>
        </section>
      </main>
    );
  }

  return (
    <Planner data={data} lock={lock} saveState={saveState} setData={setData} />
  );
}

function Planner({
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
  const today = new Date();
  const todayKey = localDateKey(today);
  const dayName = DAY_NAMES[today.getDay()];
  const [weight, setWeight] = useState("");
  const [earningAmount, setEarningAmount] = useState("");
  const [earningLabel, setEarningLabel] = useState("Church cleaning");
  const latestWeight = data.weights.at(-1)?.value ?? data.profile.startWeight;
  const poundsLost = Math.max(0, data.profile.startWeight - latestWeight);
  const goalDistance = Math.max(
    1,
    data.profile.startWeight - data.profile.goalWeight,
  );
  const progress = Math.min(100, (poundsLost / goalDistance) * 100);
  const classes = data.classSchedule[dayName];
  const cleaningToday = isCleaningSaturday(
    today,
    data.commitments.cleaningAnchor,
  );

  const tasks = useMemo(() => {
    const daily = [
      {
        id: "weigh",
        title: "Morning weigh-in",
        detail: "After bathroom, before food.",
      },
      {
        id: "protein",
        title: `${data.profile.proteinGoal} g protein`,
        detail: "Split it across three meals and one snack.",
      },
      {
        id: "steps",
        title: `${data.profile.stepsGoal.toLocaleString()} steps`,
        detail: "Campus walking counts.",
      },
      {
        id: "water",
        title: "Water with every meal",
        detail: "Skip liquid calories today.",
      },
      {
        id: "sleep",
        title: `Lights out ${data.profile.bedtime}`,
        detail: `Wake at ${data.profile.wakeTime}.`,
      },
    ];
    const scheduled = classes.map((item, index) => ({
      id: `class-${index}`,
      title: `${item.time} · ${item.title}`,
      detail: item.place,
    }));
    const workout = {
      id: "training",
      title: data.training[dayName].title,
      detail: `${data.training[dayName].time} · ${data.training[dayName].detail}`,
    };
    const commitments: { id: string; title: string; detail: string }[] = [];
    if (cleaningToday) {
      commitments.push({
        id: "church-cleaning",
        title: data.commitments.cleaningPlace,
        detail: `${data.commitments.cleaningTime} · ${data.commitments.cleaningAddress} · expected ${money(data.commitments.cleaningPayLow)}–${money(data.commitments.cleaningPayHigh)}`,
      });
    }
    if (dayName === "Sunday") {
      commitments.push(
        {
          id: "sunday-church",
          title: "Sunday church",
          detail: data.commitments.sundayChurchTime,
        },
        {
          id: "holly-lawn",
          title: "Check whether Holly needs the lawn mowed",
          detail: `${data.commitments.hollyMowPlan} · ${money(data.commitments.hollyPay)}`,
        },
      );
    }
    return [...scheduled, ...commitments, workout, ...daily];
  }, [classes, cleaningToday, data, dayName]);

  const completedCount = tasks.filter(
    (task) => data.completions[`${todayKey}:${task.id}`],
  ).length;
  const dayProgress = tasks.length ? (completedCount / tasks.length) * 100 : 0;
  const totalEarnings = data.earnings.reduce(
    (sum, item) => sum + item.amount,
    0,
  );

  function mutate(mutator: (current: PlannerData) => PlannerData) {
    setData((current) => (current ? mutator(current) : current));
  }

  function toggleTask(id: string) {
    const key = `${todayKey}:${id}`;
    mutate((current) => ({
      ...current,
      completions: {
        ...current.completions,
        [key]: !current.completions[key],
      },
    }));
  }

  function addWeight(event: React.FormEvent) {
    event.preventDefault();
    const value = Number(weight);
    if (!Number.isFinite(value) || value < 80 || value > 500) return;
    mutate((current) => ({
      ...current,
      weights: [
        ...current.weights.filter((entry) => entry.date !== todayKey),
        { date: todayKey, value },
      ].sort((a, b) => a.date.localeCompare(b.date)),
    }));
    setWeight("");
  }

  function addEarning(event: React.FormEvent) {
    event.preventDefault();
    const amount = Number(earningAmount);
    if (!earningLabel.trim() || !Number.isFinite(amount) || amount <= 0) return;
    mutate((current) => ({
      ...current,
      earnings: [
        ...current.earnings,
        {
          id: crypto.randomUUID(),
          date: todayKey,
          label: earningLabel.trim(),
          amount,
        },
      ],
    }));
    setEarningAmount("");
  }

  return (
    <main className="min-h-svh bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b-2 border-foreground bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {dayName}
            </p>
            <h1 className="font-display text-xl font-bold uppercase">
              Lock In
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-muted-foreground sm:inline">
              {saveState}
            </span>
            <Button
              aria-label="Lock planner"
              onClick={lock}
              size="icon"
              variant="outline"
            >
              <LogOut aria-hidden="true" />
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-9">
        <section className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="border-2 border-foreground bg-surface p-5 sm:p-7">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Today’s score
                </p>
                <p className="mt-2 font-display text-5xl font-bold">
                  {completedCount}
                  <span className="text-muted-foreground">/{tasks.length}</span>
                </p>
              </div>
              <p className="max-w-40 text-right text-sm text-muted-foreground">
                Finish the next action. Don’t negotiate with the whole day.
              </p>
            </div>
            <Progress className="mt-5 h-3 rounded-none" value={dayProgress} />
          </div>
          <div className="border-2 border-primary bg-primary p-5 text-primary-foreground sm:p-7">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em]">
              Current weight
            </p>
            <div className="mt-2 flex items-end gap-2">
              <span className="font-display text-5xl font-bold">
                {latestWeight}
              </span>
              <span className="pb-1 font-mono text-sm">LB</span>
            </div>
            <p className="mt-3 text-sm font-medium">
              {poundsLost.toFixed(1)} lb down · goal {data.profile.goalWeight}{" "}
              lb
            </p>
          </div>
        </section>

        <Tabs defaultValue="today" className="mt-6">
          <TabsList className="grid h-auto w-full grid-cols-5 rounded-none border-2 border-foreground bg-surface p-1">
            {[
              ["today", Check, "Today"],
              ["week", CalendarDays, "Week"],
              ["food", Utensils, "Food"],
              ["money", Wallet, "Money"],
              ["settings", Settings, "Setup"],
            ].map(([value, Icon, label]) => (
              <TabsTrigger
                aria-label={String(label)}
                key={String(value)}
                value={String(value)}
                className="h-12 rounded-none px-1 text-[11px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground sm:text-sm"
              >
                {typeof Icon !== "string" ? (
                  <Icon className="size-4 sm:mr-2" aria-hidden="true" />
                ) : null}
                <span className="hidden sm:inline">{String(label)}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent
            value="today"
            className="mt-5 grid gap-5 lg:grid-cols-[1.3fr_0.7fr]"
          >
            <section className="border-2 border-foreground bg-surface">
              <div className="border-b-2 border-foreground px-5 py-4">
                <h2 className="font-display text-2xl font-bold">Today</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {today.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="divide-y-2 divide-border">
                {tasks.map((task) => {
                  const checked = Boolean(
                    data.completions[`${todayKey}:${task.id}`],
                  );
                  return (
                    <label
                      key={task.id}
                      className="flex cursor-pointer gap-4 p-5 hover:bg-surface-2"
                    >
                      <Checkbox
                        id={`task-${task.id}`}
                        name={`task-${task.id}`}
                        checked={checked}
                        className="mt-0.5 size-6 rounded-none"
                        onCheckedChange={() => toggleTask(task.id)}
                      />
                      <span className="min-w-0">
                        <span
                          className={`block text-base font-semibold ${checked ? "text-muted-foreground line-through" : ""}`}
                        >
                          {task.title}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                          {task.detail}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </section>

            <aside className="space-y-5">
              <section className="border-2 border-foreground bg-surface p-5">
                <div className="flex items-center gap-3">
                  <Scale className="text-primary" aria-hidden="true" />
                  <h2 className="font-display text-xl font-bold">Log weight</h2>
                </div>
                <form onSubmit={addWeight} className="mt-4 flex gap-2">
                  <Input
                    aria-label="Weight in pounds"
                    id="weight-log"
                    inputMode="decimal"
                    max="500"
                    min="80"
                    name="weight"
                    onChange={(event) => setWeight(event.target.value)}
                    placeholder={`${latestWeight}`}
                    step="0.1"
                    type="number"
                    value={weight}
                  />
                  <Button aria-label="Add weight" size="icon">
                    <Plus />
                  </Button>
                </form>
                <Progress className="mt-5 h-3 rounded-none" value={progress} />
                <p className="mt-3 text-sm text-muted-foreground">
                  Use the weekly average. Normal daily changes are noise.
                </p>
              </section>

              <section className="border-2 border-foreground bg-surface p-5">
                <div className="flex items-center gap-3">
                  <Moon className="text-primary" aria-hidden="true" />
                  <h2 className="font-display text-xl font-bold">
                    Sleep anchor
                  </h2>
                </div>
                <p className="mt-4 text-3xl font-bold">
                  {data.profile.bedtime}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Phone down 30 minutes earlier · wake {data.profile.wakeTime}
                </p>
              </section>

              <section className="border-2 border-foreground bg-surface p-5">
                <div className="flex items-center gap-3">
                  <Footprints className="text-primary" aria-hidden="true" />
                  <h2 className="font-display text-xl font-bold">
                    First target
                  </h2>
                </div>
                <p className="mt-4 text-3xl font-bold">195 lb</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Aim for about 1–2 lb per week. No crash diet.
                </p>
              </section>
            </aside>
          </TabsContent>

          <TabsContent value="week" className="mt-5 space-y-5">
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {DAY_NAMES.slice(1)
                .concat("Sunday")
                .map((day) => (
                  <article
                    key={day}
                    className="border-2 border-foreground bg-surface p-5"
                  >
                    <h2 className="font-display text-2xl font-bold">{day}</h2>
                    <div className="mt-4 space-y-4">
                      {data.classSchedule[day].map((item) => (
                        <div key={`${item.time}-${item.title}`}>
                          <p className="font-mono text-xs text-primary">
                            {item.time}
                          </p>
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.place}
                          </p>
                        </div>
                      ))}
                      {data.classSchedule[day].length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          No scheduled class.
                        </p>
                      ) : null}
                      <div className="border-t-2 border-border pt-4">
                        <p className="font-mono text-xs text-primary">
                          {data.training[day].time}
                        </p>
                        <p className="font-semibold">
                          {data.training[day].title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {data.training[day].detail}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
            </section>
            <section className="border-2 border-primary bg-primary p-5 text-primary-foreground">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider">
                FIN 101
              </p>
              <p className="mt-2 text-lg font-bold">
                Online course: reserve Tuesday and Thursday, 2:00–3:00 p.m.
              </p>
            </section>
          </TabsContent>

          <TabsContent
            value="food"
            className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.7fr]"
          >
            <section className="border-2 border-foreground bg-surface">
              <div className="border-b-2 border-foreground p-5">
                <h2 className="font-display text-2xl font-bold">
                  Daily food script
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Repeatable beats perfect.
                </p>
              </div>
              <div className="divide-y-2 divide-border">
                {data.meals.map((meal) => (
                  <article key={meal.name} className="p-5">
                    <p className="font-mono text-xs font-semibold text-primary">
                      {meal.time}
                    </p>
                    <h3 className="mt-1 text-lg font-bold">{meal.name}</h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {meal.detail}
                    </p>
                  </article>
                ))}
              </div>
            </section>
            <aside className="space-y-5">
              <section className="border-2 border-foreground bg-surface p-5">
                <h2 className="font-display text-xl font-bold">
                  Non-negotiables
                </h2>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <li>• Track everything for the first 14 days.</li>
                  <li>• Hit {data.profile.proteinGoal} g protein.</li>
                  <li>• Water or zero-calorie drinks.</li>
                  <li>• Takeout no more than twice weekly.</li>
                  <li>• One flexible meal, never a whole cheat day.</li>
                </ul>
              </section>
              <section className="border-2 border-primary bg-primary p-5 text-primary-foreground">
                <h2 className="font-display text-xl font-bold">
                  Dining-hall plate
                </h2>
                <p className="mt-3 leading-relaxed">
                  ½ vegetables or fruit
                  <br />¼ lean protein
                  <br />¼ rice, potatoes, or pasta
                </p>
              </section>
            </aside>
          </TabsContent>

          <TabsContent
            value="money"
            className="mt-5 grid gap-5 lg:grid-cols-[0.7fr_1.3fr]"
          >
            <section className="border-2 border-foreground bg-surface p-5">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Logged total
              </p>
              <p className="mt-2 font-display text-5xl font-bold text-primary">
                {money(totalEarnings)}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Church cleaning: two Saturdays monthly, expected{" "}
                {money(data.commitments.cleaningPayLow)}–
                {money(data.commitments.cleaningPayHigh)} each. Holly’s lawn:{" "}
                {money(data.commitments.hollyPay)} when completed.
              </p>
              <form
                onSubmit={addEarning}
                className="mt-6 space-y-3 border-t-2 border-border pt-5"
              >
                <label className="block text-sm font-semibold">
                  Job
                  <Input
                    className="mt-2"
                    id="earning-job"
                    name="earning-job"
                    onChange={(event) => setEarningLabel(event.target.value)}
                    value={earningLabel}
                  />
                </label>
                <label className="block text-sm font-semibold">
                  Amount
                  <Input
                    className="mt-2"
                    id="earning-amount"
                    inputMode="decimal"
                    min="1"
                    name="earning-amount"
                    onChange={(event) => setEarningAmount(event.target.value)}
                    placeholder="225"
                    type="number"
                    value={earningAmount}
                  />
                </label>
                <Button className="w-full">
                  <Plus /> Log payment
                </Button>
              </form>
            </section>
            <section className="border-2 border-foreground bg-surface">
              <div className="border-b-2 border-foreground p-5">
                <h2 className="font-display text-2xl font-bold">Payments</h2>
              </div>
              {data.earnings.length ? (
                <div className="divide-y-2 divide-border">
                  {[...data.earnings].reverse().map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between gap-4 p-5"
                    >
                      <div>
                        <p className="font-semibold">{entry.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {entry.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-primary">
                          {money(entry.amount)}
                        </span>
                        <Button
                          aria-label={`Delete ${entry.label} payment`}
                          onClick={() =>
                            mutate((current) => ({
                              ...current,
                              earnings: current.earnings.filter(
                                (item) => item.id !== entry.id,
                              ),
                            }))
                          }
                          size="icon"
                          variant="ghost"
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="p-5 text-muted-foreground">
                  No payments logged yet.
                </p>
              )}
            </section>
          </TabsContent>

          <TabsContent
            value="settings"
            className="mt-5 grid gap-5 lg:grid-cols-2"
          >
            <SettingsCard title="Fitness targets">
              <NumberSetting
                label="Starting weight"
                value={data.profile.startWeight}
                onChange={(value) =>
                  mutate((current) => ({
                    ...current,
                    profile: { ...current.profile, startWeight: value },
                  }))
                }
              />
              <NumberSetting
                label="Goal weight"
                value={data.profile.goalWeight}
                onChange={(value) =>
                  mutate((current) => ({
                    ...current,
                    profile: { ...current.profile, goalWeight: value },
                  }))
                }
              />
              <NumberSetting
                label="Daily protein (g)"
                value={data.profile.proteinGoal}
                onChange={(value) =>
                  mutate((current) => ({
                    ...current,
                    profile: { ...current.profile, proteinGoal: value },
                  }))
                }
              />
              <NumberSetting
                label="Daily steps"
                value={data.profile.stepsGoal}
                onChange={(value) =>
                  mutate((current) => ({
                    ...current,
                    profile: { ...current.profile, stepsGoal: value },
                  }))
                }
              />
            </SettingsCard>
            <SettingsCard title="Work and church">
              <TextSetting
                label="Next cleaning Saturday"
                type="date"
                value={data.commitments.cleaningAnchor}
                onChange={(value) =>
                  mutate((current) => ({
                    ...current,
                    commitments: {
                      ...current.commitments,
                      cleaningAnchor: value,
                    },
                  }))
                }
              />
              <TextSetting
                label="Cleaning start time"
                value={data.commitments.cleaningTime}
                onChange={(value) =>
                  mutate((current) => ({
                    ...current,
                    commitments: {
                      ...current.commitments,
                      cleaningTime: value,
                    },
                  }))
                }
              />
              <NumberSetting
                label="Cleaning pay — low estimate"
                value={data.commitments.cleaningPayLow}
                onChange={(value) =>
                  mutate((current) => ({
                    ...current,
                    commitments: {
                      ...current.commitments,
                      cleaningPayLow: value,
                    },
                  }))
                }
              />
              <NumberSetting
                label="Cleaning pay — high estimate"
                value={data.commitments.cleaningPayHigh}
                onChange={(value) =>
                  mutate((current) => ({
                    ...current,
                    commitments: {
                      ...current.commitments,
                      cleaningPayHigh: value,
                    },
                  }))
                }
              />
              <TextSetting
                label="Sunday church time"
                value={data.commitments.sundayChurchTime}
                onChange={(value) =>
                  mutate((current) => ({
                    ...current,
                    commitments: {
                      ...current.commitments,
                      sundayChurchTime: value,
                    },
                  }))
                }
              />
              <TextSetting
                label="Holly lawn plan"
                value={data.commitments.hollyMowPlan}
                onChange={(value) =>
                  mutate((current) => ({
                    ...current,
                    commitments: {
                      ...current.commitments,
                      hollyMowPlan: value,
                    },
                  }))
                }
              />
              <NumberSetting
                label="Holly lawn pay"
                value={data.commitments.hollyPay}
                onChange={(value) =>
                  mutate((current) => ({
                    ...current,
                    commitments: { ...current.commitments, hollyPay: value },
                  }))
                }
              />
              <p className="text-sm leading-relaxed text-muted-foreground">
                Confirm the church-cleaning start time, whether the pay is $200
                or $250, and your Sunday service time once. The planner will
                remember them on this device.
              </p>
            </SettingsCard>
            <section className="border-2 border-primary bg-primary p-5 text-primary-foreground lg:col-span-2">
              <h2 className="font-display text-2xl font-bold">
                Add to iPhone home screen
              </h2>
              <ol className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                <li>
                  <strong>1.</strong> Open this page in Safari.
                </li>
                <li>
                  <strong>2.</strong> Tap Share, then “Add to Home Screen.”
                </li>
                <li>
                  <strong>3.</strong> Name it “Lock In” and tap Add.
                </li>
              </ol>
            </section>
            <section className="border-2 border-foreground bg-surface p-5 text-sm leading-relaxed text-muted-foreground lg:col-span-2">
              This is a practical fitness planner, not medical care. Stop and
              get medical help for chest pain, fainting, severe shortness of
              breath, or another concerning symptom. Talk with a clinician
              before aggressive weight loss if you have a medical condition,
              take medication affecting weight or heart rate, or have a history
              of disordered eating.
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

function SettingsCard({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <section className="space-y-4 border-2 border-foreground bg-surface p-5">
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

function NumberSetting({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: number) => void;
  value: number;
}) {
  const id = useId();

  return (
    <label className="block text-sm font-semibold" htmlFor={id}>
      {label}
      <Input
        className="mt-2"
        id={id}
        min="0"
        name={label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
        onChange={(event) => onChange(Number(event.target.value))}
        type="number"
        value={value}
      />
    </label>
  );
}

function TextSetting({
  label,
  onChange,
  type = "text",
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  type?: string;
  value: string;
}) {
  const id = useId();

  return (
    <label className="block text-sm font-semibold" htmlFor={id}>
      {label}
      <Input
        className="mt-2"
        id={id}
        name={label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        value={value}
      />
    </label>
  );
}
