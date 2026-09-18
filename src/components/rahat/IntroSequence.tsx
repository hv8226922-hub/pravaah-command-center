import { useEffect, useRef, useState } from "react";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

type IntroSequenceProps = {
  onComplete: () => void;
};

export function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [closing, setClosing] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const beginClose = window.setTimeout(() => setClosing(true), 3100);
    const finish = window.setTimeout(() => onCompleteRef.current(), 3700);
    return () => {
      window.clearTimeout(beginClose);
      window.clearTimeout(finish);
    };
  }, []);

  const dismiss = () => {
    setClosing(true);
    window.setTimeout(() => onCompleteRef.current(), 450);
  };

  return (
    <div className={`intro-sequence ${closing ? "intro-closing" : ""}`} role="status" aria-live="polite">
      <div className="intro-grid" />
      <div className="intro-scan" />
      <div className="intro-corner intro-corner-tl" />
      <div className="intro-corner intro-corner-tr" />
      <div className="intro-corner intro-corner-bl" />
      <div className="intro-corner intro-corner-br" />

      <div className="intro-center">
        <div className="intro-emblem" aria-hidden="true">
          <span className="intro-orbit intro-orbit-outer" />
          <span className="intro-orbit intro-orbit-inner" />
          <span className="intro-crosshair intro-crosshair-x" />
          <span className="intro-crosshair intro-crosshair-y" />
          <div className="intro-shield"><ShieldAlert /></div>
        </div>

        <div className="intro-copy">
          <span className="intro-system-label">DISASTER DECISION SUPPORT SYSTEM</span>
          <h1>RAHAT</h1>
          <p>Risk Assessment &amp; Hazard Allocation<br />For Habitation Transfer</p>
          <div className="intro-rule"><i /><span /></div>
          <strong>FROM DISASTER RESPONSE TO PROACTIVE RELOCATION</strong>
        </div>

        <div className="intro-loader" aria-label="Initialising operational support">
          <div className="intro-loader-copy"><span>INITIALISING OPERATIONAL SUPPORT</span><b>SECURE DEMO</b></div>
          <div className="intro-progress"><i /><i /><i /><i /><i /><i /><i /><i /></div>
        </div>
      </div>

      <span className="intro-node">NODE RHT-AS-01 · SYSTEM READY</span>
      <Button variant="ghost" size="sm" className="intro-skip" onClick={dismiss}>Skip intro</Button>
    </div>
  );
}