import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { Headset, Send, X } from 'lucide-react';
import { resortFaq } from '../../data/resortFaq.js';
import { getResortReply } from '../../utils/resortChat.js';
import { openBooking } from '../../utils/links.js';

export default function ResortChat() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [replying, setReplying] = useState(false);
  const reduceMotion = useReducedMotion();
  const replyTimer = useRef(null);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Welcome to Resort Aruga! Ask about our cabanas, facilities, BBQ corner or planning your stay.' },
  ]);
  const launcher = useRef(null);
  const input = useRef(null);
  const log = useRef(null);

  useEffect(() => () => window.clearTimeout(replyTimer.current), []);

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  useEffect(() => {
    if (open && log.current) {
      log.current.scrollTo({ top: log.current.scrollHeight, behavior: reduceMotion ? 'instant' : 'smooth' });
    }
  }, [messages, open, replying, reduceMotion]);

  function close() {
    setOpen(false);
    launcher.current?.focus();
  }

  function send(text) {
    const question = text.trim().slice(0, 500);
    if (!question || replyTimer.current !== null) return;
    setMessages((previous) => [...previous, { role: 'user', text: question }]);
    setReplying(true);
    replyTimer.current = window.setTimeout(() => {
      setMessages((previous) => [...previous, { role: 'assistant', text: getResortReply(question) }]);
      setReplying(false);
      replyTimer.current = null;
    }, reduceMotion ? 0 : 650);
    setDraft('');
    input.current?.focus();
  }

  return (
    <>
      <AnimatePresence>
      {open && (
        <m.section
          key="chat-panel"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16, scale: reduceMotion ? 1 : 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : 10, scale: reduceMotion ? 1 : 0.98 }}
          transition={{ duration: reduceMotion ? 0 : 0.22, ease: 'easeOut' }}
          id="resort-chat"
          role="dialog"
          aria-labelledby="resort-chat-title"
          onKeyDown={(event) => { if (event.key === 'Escape') close(); }}
          className="pointer-events-auto fixed bottom-24 left-4 z-40 flex h-[min(36rem,calc(100dvh-7rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-sand-300 bg-white shadow-2xl sm:left-6"
        >
          <header className="flex shrink-0 items-center justify-between gap-3 bg-cocoa-950 px-5 py-4 text-white">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-400/40 bg-gold-200 text-cocoa-950" aria-hidden="true">
              <Headset className="h-6 w-6" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 id="resort-chat-title" className="font-serif text-2xl text-gold-200">Aruga Assistant</h2>
              <p className="text-sm text-sand-200">Quick answers from our resort FAQs</p>
            </div>
            <button type="button" onClick={close} aria-label="Close resort chat" className="rounded-full p-3 hover:bg-white/10">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </header>

          <div ref={log} role="log" aria-live="polite" aria-relevant="additions" aria-label="Chat messages" className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-sand-50 p-4">
            {messages.map((message, index) => (
              <m.div key={index}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeOut' }}
                className={`w-fit max-w-[92%] break-words rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.role === 'user' ? 'ml-auto bg-cocoa-900 text-white' : 'border border-sand-200 bg-white text-cocoa-950'}`}>
                <span className="sr-only">{message.role === 'user' ? 'You: ' : 'Aruga Assistant: '}</span>
                {message.text}
              </m.div>
            ))}
            {replying && (
              <div className="flex w-fit items-center gap-2 rounded-2xl border border-sand-200 bg-white px-4 py-3 text-ocean-700">
                <span className="sr-only">Aruga Assistant is preparing a reply.</span>
                <Headset className="mr-1 h-4 w-4" aria-hidden="true" />
                {[0, 1, 2].map((dot) => (
                  <span key={dot} aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ocean-600 motion-safe:animate-bounce" style={{ animationDelay: `${dot * 150}ms`, animationDuration: '900ms' }} />
                ))}
              </div>
            )}
          </div>

          <div className="shrink-0 border-t border-sand-200 px-4 py-3">
            <details>
              <summary className="cursor-pointer py-1 text-sm font-semibold text-ocean-700">Explore our 10 questions</summary>
              <div className="mt-2 max-h-36 space-y-2 overflow-y-auto">
                {resortFaq.map((item) => (
                  <button key={item.question} type="button" disabled={replying} onClick={() => send(item.question)} className="block w-full rounded-xl border border-sand-300 px-3 py-2 text-left text-sm text-cocoa-900 hover:bg-sand-100 disabled:opacity-50">
                    {item.question}
                  </button>
                ))}
              </div>
            </details>
            <button type="button" onClick={() => { close(); openBooking(); }} className="mt-2 text-sm font-semibold text-ocean-700 underline underline-offset-4">Enquire about a stay</button>
          </div>

          <form onSubmit={(event) => { event.preventDefault(); send(draft); }} className="flex shrink-0 gap-2 border-t border-sand-200 p-3">
            <label htmlFor="resort-chat-input" className="sr-only">Your question</label>
            <input ref={input} id="resort-chat-input" value={draft} onChange={(event) => setDraft(event.target.value)} maxLength={500} autoComplete="off" placeholder="Ask about your stay…" className="min-w-0 flex-1 rounded-xl border border-sand-300 px-3 py-3 text-base text-cocoa-950" />
            <button type="submit" disabled={!draft.trim() || replying} aria-label="Send question" className="rounded-xl bg-cocoa-900 p-3 text-gold-200 hover:bg-cocoa-800 disabled:opacity-40">
              <Send className="h-5 w-5" aria-hidden="true" />
            </button>
          </form>
        </m.section>
      )}
      </AnimatePresence>
      <button ref={launcher} type="button" onClick={() => open ? close() : setOpen(true)} aria-expanded={open} aria-controls="resort-chat" aria-label={open ? 'Close resort chat' : 'Chat with Aruga Assistant'} className="group pointer-events-auto flex min-h-14 items-center gap-3 rounded-full border border-gold-400 bg-cocoa-950 py-2 pl-2 pr-5 text-sm font-semibold text-gold-200 shadow-xl transition-colors hover:bg-cocoa-800">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-200 text-cocoa-950 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:-rotate-6" aria-hidden="true">
          {open ? <X className="h-5 w-5" /> : <Headset className="h-6 w-6" />}
        </span>
        <span className="text-left">
          <span className="block text-xs font-normal text-sand-200">Aruga Assistant</span>
          <span className="block">{open ? 'Close chat' : 'Chat with us'}</span>
        </span>
      </button>
    </>
  );
}
