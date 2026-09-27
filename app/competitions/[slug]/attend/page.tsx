"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  AlertTriangle,
  Camera,
  CheckCircle,
  Maximize,
  Mic,
  X,
} from "lucide-react";

interface Competition {
  id: string;
  title: string;
  slug: string;
  organizer: string;
  mode: string;
  competitionStart: string;
  competitionEnd: string;
  description: string;
}

export default function AttendCompetitionPage() {
  const params = useParams();
  const router = useRouter();

  const slug = params.slug as string;

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const violationCountRef = useRef(0);
  const inactiveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inactiveSinceRef = useRef<number | null>(null);
  const inactiveReasonRef = useRef("");

  const startedRef = useRef(false);
  const cancelledRef = useRef(false);

  const [competition, setCompetition] = useState<Competition | null>(null);

  const [loading, setLoading] = useState(true);

  const [cameraReady, setCameraReady] = useState(false);
  const [micReady, setMicReady] = useState(false);

  const [setupError, setSetupError] = useState("");

  const [started, setStarted] = useState(false);

  const [cancelled, setCancelled] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const [violationCount, setViolationCount] = useState(0);

  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    startedRef.current = started;
  }, [started]);

  useEffect(() => {
    cancelledRef.current = cancelled;
  }, [cancelled]);

  useEffect(() => {
    async function loadCompetition() {
      try {
        const response = await fetch(
          `/api/competitions/by-slug/${slug}`
        );

        if (!response.ok) {
          throw new Error("Competition not found");
        }

        const data = await response.json();

        setCompetition(data);
      } catch (error) {
        console.error(error);
        setSetupError("Unable to load competition.");
      } finally {
        setLoading(false);
      }
    }

    loadCompetition();
  }, [slug]);

  useEffect(() => {
    return () => {
      if (inactiveTimerRef.current) {
        clearTimeout(inactiveTimerRef.current);
      }

      streamRef.current?.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, []);

  useEffect(() => {
    if (!started) {
      return;
    }

    if (!videoRef.current) {
      return;
    }

    if (!streamRef.current) {
      return;
    }

    const video = videoRef.current;

    video.srcObject = streamRef.current;
    video.muted = true;
    video.playsInline = true;

    video.play().catch((error) => {
      console.error("Camera preview failed:", error);
    });
  }, [started]);

  const stopCamera = () => {
    if (!streamRef.current) {
      return;
    }

    streamRef.current.getTracks().forEach((track) => {
      track.stop();
    });

    streamRef.current = null;
  };

  const cancelTest = (reason: string) => {
    if (cancelledRef.current) {
      return;
    }

    cancelledRef.current = true;

    startedRef.current = false;

    if (inactiveTimerRef.current) {
      clearTimeout(inactiveTimerRef.current);
      inactiveTimerRef.current = null;
    }

    inactiveSinceRef.current = null;

    setCancelReason(reason);
    setCancelled(true);
    setStarted(false);

    stopCamera();

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  };

  const registerViolation = (reason: string) => {
    if (cancelledRef.current) {
      return;
    }

    violationCountRef.current += 1;

    const count = violationCountRef.current;

    setViolationCount(count);

    if (count >= 3) {
      cancelTest(
        `You reached the maximum number of test violations. ${reason}`
      );

      return;
    }

    setWarningMessage(
      `Warning ${count} of 2. ${reason}`
    );

    setShowWarning(true);
  };

  const startInactiveTimer = (reason: string) => {
    if (
      !startedRef.current ||
      cancelledRef.current ||
      inactiveSinceRef.current !== null
    ) {
      return;
    }

    inactiveSinceRef.current = Date.now();

    inactiveReasonRef.current = reason;

    if (inactiveTimerRef.current) {
      clearTimeout(inactiveTimerRef.current);
    }

    inactiveTimerRef.current = setTimeout(() => {
      if (
        !startedRef.current ||
        cancelledRef.current
      ) {
        return;
      }

      inactiveTimerRef.current = null;

      inactiveSinceRef.current = null;

      cancelTest(
        `${inactiveReasonRef.current} The screen remained inactive for more than 3 seconds.`
      );

      inactiveReasonRef.current = "";
    }, 3000);
  };

  const stopInactiveTimer = () => {
    if (inactiveSinceRef.current === null) {
      return;
    }

    const inactiveDuration =
      Date.now() - inactiveSinceRef.current;

    if (inactiveTimerRef.current) {
      clearTimeout(inactiveTimerRef.current);

      inactiveTimerRef.current = null;
    }

    inactiveSinceRef.current = null;

    if (
      inactiveDuration <= 3000 &&
      startedRef.current &&
      !cancelledRef.current
    ) {
      registerViolation(inactiveReasonRef.current);
    }

    inactiveReasonRef.current = "";
  };

  useEffect(() => {
    if (!started || cancelled) {
      return;
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        startInactiveTimer(
          "You switched away from the competition."
        );
      } else {
        stopInactiveTimer();
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        startInactiveTimer(
          "You exited fullscreen mode."
        );
      } else {
        stopInactiveTimer();
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );

      if (inactiveTimerRef.current) {
        clearTimeout(inactiveTimerRef.current);

        inactiveTimerRef.current = null;
      }

      inactiveSinceRef.current = null;
    };
  }, [started, cancelled]);

  const startCamera = async () => {
    setSetupError("");

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error(
          "Camera access is not supported by this browser."
        );
      }

      stopCamera();

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
          },
          audio: true,
        });

      streamRef.current = stream;

      const videoTracks = stream.getVideoTracks();
      const audioTracks = stream.getAudioTracks();

      setCameraReady(videoTracks.length > 0);
      setMicReady(audioTracks.length > 0);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
        videoRef.current.playsInline = true;

        await videoRef.current.play();
      }
    } catch (error) {
      console.error(error);

      stopCamera();

      setCameraReady(false);
      setMicReady(false);

      setSetupError(
        "Camera and microphone access is required to attend this competition."
      );
    }
  };

  const startChallenge = async () => {
    if (!cameraReady || !micReady) {
      setSetupError(
        "Please allow both camera and microphone access before starting."
      );

      return;
    }

    setSetupError("");

    violationCountRef.current = 0;

    inactiveSinceRef.current = null;

    inactiveReasonRef.current = "";

    cancelledRef.current = false;

    startedRef.current = false;

    setViolationCount(0);

    try {
      await document.documentElement.requestFullscreen();
    } catch (error) {
      console.error(error);

      setSetupError(
        "Fullscreen mode is required to start the competition."
      );

      return;
    }

    startedRef.current = true;

    setStarted(true);
  };

  const submitTest = () => {
    if (!startedRef.current) {
      return;
    }

    if (inactiveTimerRef.current) {
      clearTimeout(inactiveTimerRef.current);

      inactiveTimerRef.current = null;
    }

    inactiveSinceRef.current = null;

    startedRef.current = false;

    setStarted(false);

    stopCamera();

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }

    router.push(
      `/competitions/${slug}/success`
    );
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#EFF1F9] flex items-center justify-center">
        <p className="font-semibold text-[#0B1E4A]">
          Loading competition...
        </p>
      </main>
    );
  }

  if (!competition) {
    return (
      <main className="min-h-screen bg-[#EFF1F9] flex items-center justify-center px-5">
        <div className="w-full max-w-md rounded-[24px] border border-[#DDE2F0] bg-white p-8 text-center shadow-[0_4px_18px_rgba(11,30,74,0.06)]">
          <h1 className="text-2xl font-extrabold text-[#0B1E4A]">
            Competition not found
          </h1>

          <button
            onClick={() => router.push("/")}
            className="mt-6 rounded-full bg-[#2E58D7] px-6 py-3 font-semibold text-white hover:bg-[#1C3FA8]"
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  if (cancelled) {
    return (
      <main className="fixed inset-0 z-[999999] flex h-screen w-screen items-center justify-center overflow-auto bg-[#091838] px-5 py-10">
        <div className="w-full max-w-lg rounded-[28px] bg-white p-8 shadow-2xl md:p-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFE2EB]">
            <X
              size={32}
              className="text-[#C1205B]"
            />
          </div>

          <h1 className="mt-6 text-3xl font-extrabold tracking-[-0.035em] text-[#0B1E4A]">
            Test Cancelled
          </h1>

          <p className="mt-3 leading-7 text-[#5B6487]">
            Your competition test has been cancelled because
            a test rule was violated.
          </p>

          <div className="mt-6 rounded-[18px] border border-[#FFE2EB] bg-[#FFE2EB] p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle
                size={22}
                className="mt-0.5 shrink-0 text-[#C1205B]"
              />

              <div>
                <p className="font-bold text-[#9A2A2A]">
                  Violation detected
                </p>

                <p className="mt-2 text-sm leading-6 text-[#5B6487]">
                  {cancelReason}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between rounded-[14px] border border-[#DDE2F0] bg-[#EFF1F9] p-4">
            <span className="font-semibold text-[#0B1E4A]">
              Violations
            </span>

            <span className="font-bold text-[#C1205B]">
              {violationCount}
            </span>
          </div>

          <button
            onClick={() =>
              router.push(`/competitions/${slug}`)
            }
            className="mt-7 w-full rounded-full bg-[#2E58D7] px-6 py-3.5 font-semibold text-white hover:bg-[#1C3FA8]"
          >
            Return to Competition
          </button>
        </div>
      </main>
    );
  }

  if (started) {
    return (
      <main className="fixed inset-0 z-[99999] h-screen w-screen overflow-hidden bg-[#091838] text-white">
        <div className="relative flex h-screen w-screen flex-col overflow-hidden">
          <header className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4 md:px-7">
            <div className="min-w-0">
              <h1 className="truncate text-lg font-extrabold md:text-xl">
                {competition.title}
              </h1>

              <p className="mt-1 text-sm text-[#DDE2F0]">
                Competition in progress
              </p>
            </div>

            <div className="ml-4 flex shrink-0 items-center gap-2 rounded-full bg-[#E8F9FC] px-4 py-2 text-xs font-bold text-[#0B1E4A]">
              <span className="h-2 w-2 rounded-full bg-[#00CBE8]" />
              TEST ACTIVE
            </div>
          </header>

          <section className="flex min-h-0 flex-1 items-center justify-center overflow-auto p-5 md:p-8">
            <div className="w-full max-w-6xl">
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 md:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#7AD9E8]">
                  Challenge
                </p>

                <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
                  Your competition challenge
                </h2>

                <p className="mt-3 max-w-2xl text-[#DDE2F0]">
                  Complete all the required tasks before
                  submitting your competition test.
                </p>

                <div className="mt-8 min-h-[300px] rounded-[20px] border border-white/10 bg-black/10 p-6">
                  <p className="text-[#DDE2F0]">
                    Challenge content will appear here.
                  </p>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={submitTest}
                    className="rounded-full bg-[#2E58D7] px-8 py-3.5 font-semibold text-white transition hover:bg-[#1C3FA8]"
                  >
                    Submit Test
                  </button>
                </div>
              </div>
            </div>
          </section>

          <div className="fixed bottom-5 right-5 z-[100000] w-[230px] overflow-hidden rounded-[18px] border-2 border-[#7AD9E8] bg-black shadow-2xl md:bottom-6 md:right-6 md:w-[260px]">
            <div className="relative aspect-video w-full bg-black">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold text-white">
                <span className="h-2 w-2 rounded-full bg-[#00CBE8]" />
                Camera active
              </div>
            </div>
          </div>
        </div>

        {showWarning && (
          <div className="fixed inset-0 z-[100001] flex items-center justify-center bg-black/75 px-5">
            <div className="w-full max-w-md rounded-[24px] bg-white p-7 shadow-2xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFE2EB]">
                <AlertTriangle
                  size={28}
                  className="text-[#C1205B]"
                />
              </div>

              <h2 className="mt-5 text-2xl font-extrabold text-[#0B1E4A]">
                Competition Warning
              </h2>

              <p className="mt-3 leading-6 text-[#5B6487]">
                {warningMessage}
              </p>

              <div className="mt-4 rounded-[14px] bg-[#EFF1F9] p-4">
                <p className="font-bold text-[#0B1E4A]">
                  Violation {violationCount} of 3
                </p>

                <p className="mt-1 text-sm text-[#7C849E]">
                  A third violation will cancel your test.
                </p>
              </div>

              <button
                onClick={() => setShowWarning(false)}
                className="mt-6 w-full rounded-full bg-[#2E58D7] px-6 py-3.5 font-semibold text-white hover:bg-[#1C3FA8]"
              >
                Continue Test
              </button>
            </div>
          </div>
        )}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#EFF1F9] px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-[28px] border border-[#DDE2F0] bg-white shadow-[0_4px_18px_rgba(11,30,74,0.06)]">
          <div className="bg-gradient-to-br from-white via-[#EFF1F9] to-[#FFE2EB] px-6 py-8 md:px-10">
            <p className="text-sm font-bold uppercase tracking-wider text-[#2E58D7]">
              Competition Setup
            </p>

            <h1 className="mt-3 text-3xl font-extrabold tracking-[-0.035em] text-[#0B1E4A] md:text-4xl">
              {competition.title}
            </h1>

            <p className="mt-3 max-w-2xl text-[#5B6487]">
              Allow your camera and microphone before starting
              the competition.
            </p>
          </div>

          <div className="grid gap-8 p-6 md:grid-cols-[1.3fr_0.7fr] md:p-10">
            <div>
              <div className="relative aspect-video overflow-hidden rounded-[20px] bg-[#091838]">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />

                {!cameraReady && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
                    <Camera
                      size={32}
                      className="text-white"
                    />

                    <p className="mt-4 font-semibold text-white">
                      Camera Preview
                    </p>

                    <p className="mt-1 text-sm text-[#DDE2F0]">
                      Allow camera access to see your video
                    </p>
                  </div>
                )}

                {cameraReady && (
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/70 px-3 py-2 text-xs font-semibold text-white">
                    <span className="h-2 w-2 rounded-full bg-[#00CBE8]" />
                    Camera active
                  </div>
                )}
              </div>

              <button
                onClick={startCamera}
                className="mt-4 w-full rounded-full bg-[#2E58D7] px-6 py-3.5 font-semibold text-white transition hover:bg-[#1C3FA8]"
              >
                {cameraReady
                  ? "Camera & Microphone Connected"
                  : "Allow Camera & Microphone"}
              </button>

              {setupError && (
                <div className="mt-4 rounded-[14px] border border-[#FFE2EB] bg-[#FFE2EB] p-4 text-sm leading-6 text-[#9A2A2A]">
                  {setupError}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-[#0B1E4A]">
                Device Check
              </h2>

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between rounded-[14px] border border-[#DDE2F0] p-4">
                  <div className="flex items-center gap-3">
                    <Camera
                      size={20}
                      className="text-[#2E58D7]"
                    />

                    <span className="font-semibold text-[#0B1E4A]">
                      Camera
                    </span>
                  </div>

                  {cameraReady ? (
                    <CheckCircle
                      size={20}
                      className="text-[#00AFC6]"
                    />
                  ) : (
                    <span className="text-sm text-[#7C849E]">
                      Required
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between rounded-[14px] border border-[#DDE2F0] p-4">
                  <div className="flex items-center gap-3">
                    <Mic
                      size={20}
                      className="text-[#2E58D7]"
                    />

                    <span className="font-semibold text-[#0B1E4A]">
                      Microphone
                    </span>
                  </div>

                  {micReady ? (
                    <CheckCircle
                      size={20}
                      className="text-[#00AFC6]"
                    />
                  ) : (
                    <span className="text-sm text-[#7C849E]">
                      Required
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between rounded-[14px] border border-[#DDE2F0] p-4">
                  <div className="flex items-center gap-3">
                    <Maximize
                      size={20}
                      className="text-[#2E58D7]"
                    />

                    <span className="font-semibold text-[#0B1E4A]">
                      Fullscreen
                    </span>
                  </div>

                  <span className="text-sm text-[#7C849E]">
                    On start
                  </span>
                </div>
              </div>

              <button
                onClick={startChallenge}
                disabled={!cameraReady || !micReady}
                className="mt-6 w-full rounded-full bg-[#2E58D7] px-6 py-3.5 font-semibold text-white transition hover:bg-[#1C3FA8] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Start Competition
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}