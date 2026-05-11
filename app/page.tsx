'use client'
import { useState } from 'react'

const BIAS: Record<string, { type: string; suggestion: string }> = {
  ninja: { type: 'gender', suggestion: 'Use "expert" or "specialist"' },
  rockstar: { type: 'gender', suggestion: 'Use "top performer" or "skilled professional"' },
  guru: { type: 'gender', suggestion: 'Use "expert" or "lead"' },
  dominant: { type: 'gender', suggestion: 'Use "strong" or "effective"' },
  aggressive: { type: 'gender', suggestion: 'Use "driven" or "results-oriented"' },
  competitive: { type: 'gender', suggestion: 'Use "motivated" or "goal-oriented"' },
  manpower: { type: 'gender', suggestion: 'Use "workforce" or "staff"' },
  chairman: { type: 'gender', suggestion: 'Use "chairperson"' },
  salesman: { type: 'gender', suggestion: 'Use "sales representative"' },
  young: { type: 'age', suggestion: 'Remove age references entirely' },
  energetic: { type: 'age', suggestion: 'Use "motivated" or "enthusiastic"' },
  digital_native: { type: 'age', suggestion: 'Use "proficient with technology"' },
  recent_graduate: { type: 'age', suggestion: 'Specify skills needed instead' },
  culture_fit: { type: 'exclusion', suggestion: 'Use "culture add" or describe values explicitly' },
  native_speaker: { type: 'exclusion', suggestion: 'Use "fluent in English"' },
  must_have: { type: 'exclusion', suggestion: 'Separate must-haves from nice-to-haves' },
  exceptional: { type: 'exclusion', suggestion: 'Use "skilled" or "experienced"' },
  superhero: { type: 'gender', suggestion: 'Use "high-impact contributor"' },
  hustle: { type: 'exclusion', suggestion: 'Use "dedicated" or "committed"' },
}

const TYPE_COLOR: Record<string, string> = {
  gender: 'bg-pink-900 text-pink-200',
  age: 'bg-yellow-900 text-yellow-200',
  exclusion: 'bg-red-900 text-red-200',
}

function analyze(text: string) {
  const lower = text.toLowerCase()
  return Object.entries(BIAS).filter(([word]) => lower.includes(word.replace('_', ' ')))
}

export default function Page() {
  const [text, setText] = useState('')
  const [results, setResults] = useState<[string, { type: string; suggestion: string }][] | null>(null)

  function scan() { setResults(analyze(text)) }

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      {/* Hero */}
      <section className="text-center mb-14">
        <span className="text-xs uppercase tracking-widest text-[#58a6ff] font-semibold">HR Tool</span>
        <h1 className="text-4xl font-bold text-white mt-3 mb-4">Detect Biased Language in Job Descriptions</h1>
        <p className="text-[#8b949e] text-lg max-w-xl mx-auto">Paste any job posting below. Get instant analysis of gender-biased, ageist, and exclusionary words — with actionable suggestions.</p>
      </section>

      {/* Scanner */}
      <section className="mb-14">
        <textarea
          className="w-full h-44 bg-[#161b22] border border-[#30363d] rounded-lg p-4 text-[#c9d1d9] placeholder-[#484f58] resize-none focus:outline-none focus:border-[#58a6ff] text-sm"
          placeholder="Paste your job description here..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button
          onClick={scan}
          className="mt-3 w-full bg-[#58a6ff] hover:bg-[#79b8ff] text-[#0d1117] font-bold py-3 rounded-lg transition-colors"
        >Scan for Bias</button>

        {results !== null && (
          <div className="mt-6">
            {results.length === 0 ? (
              <p className="text-green-400 font-semibold text-center">No biased language detected.</p>
            ) : (
              <ul className="space-y-3">
                {results.map(([word, info]) => (
                  <li key={word} className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono font-bold text-white">{word.replace('_', ' ')}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${TYPE_COLOR[info.type]}`}>{info.type}</span>
                    </div>
                    <p className="text-[#8b949e] text-sm">{info.suggestion}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </section>

      {/* Pricing */}
      <section className="mb-14" id="pricing">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Simple Pricing</h2>
        <div className="max-w-sm mx-auto bg-[#161b22] border border-[#58a6ff] rounded-xl p-8 text-center">
          <p className="text-[#58a6ff] font-semibold uppercase tracking-widest text-xs mb-2">Pro</p>
          <p className="text-5xl font-bold text-white mb-1">$9<span className="text-xl text-[#8b949e]">/mo</span></p>
          <p className="text-[#8b949e] text-sm mb-6">Unlimited scans, all bias categories, export reports</p>
          <ul className="text-left text-sm text-[#c9d1d9] space-y-2 mb-8">
            <li>✓ Gender bias detection</li>
            <li>✓ Age bias detection</li>
            <li>✓ Exclusionary language flags</li>
            <li>✓ Actionable suggestions</li>
            <li>✓ Unlimited job descriptions</li>
          </ul>
          <a
            href={process.env.NEXT_PUBLIC_LS_CHECKOUT_URL || '#'}
            className="block w-full bg-[#58a6ff] hover:bg-[#79b8ff] text-[#0d1117] font-bold py-3 rounded-lg transition-colors"
          >Get Started</a>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-8" id="faq">
        <h2 className="text-2xl font-bold text-white text-center mb-8">FAQ</h2>
        <div className="space-y-6 max-w-2xl mx-auto">
          <div>
            <h3 className="font-semibold text-white mb-1">How does the bias detection work?</h3>
            <p className="text-[#8b949e] text-sm">We use a curated dictionary of known biased terms across gender, age, and exclusion categories, matched against your job description text instantly in the browser.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-1">Is my job description data stored?</h3>
            <p className="text-[#8b949e] text-sm">No. All analysis happens client-side in your browser. We never send your text to any server.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-1">Can I cancel my subscription anytime?</h3>
            <p className="text-[#8b949e] text-sm">Yes. Cancel anytime from your Lemon Squeezy customer portal with no questions asked.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
