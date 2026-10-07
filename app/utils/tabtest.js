export const COUNTDOWN_SECONDS = 5
export const ROUND_SECONDS = 15
export const COOLDOWN_MS = 1000
export const MAX_HIGH_SCORES = 5
export const HIGH_SCORES_KEY = 'tabTestHighScores'

export const PHRASES = [
  'no cap, this load-bearing prompt is pure emergent behavior and the sub-agent swarm just one-shotted prod',
  'my orchestrator spun up 47 agents to rename one variable, truly agentic, truly cooked',
  'context window is rotting but the vibes are load-bearing so we ship it fr fr',
  'human-in-the-loop? bestie I am the loop, I just hit tab',
  'the agent cooked, the guardrails left the chat, and a hallucination became a core feature',
  'let it run overnight, wake up to emergent architecture, merge without reading, we are so back',
  'that semicolon is load-bearing, do not ask the swarm why, just vibe and approve the tool call',
  'just one more prompt bro, I will review the diff later, lock in, the agentic workflow is bussin',
  'the KV cache is warm, the prefix is hot, and my prompt cache hit rate is giving main character energy',
  'bro evicted half my KV cache mid-thought and now the agent forgot what a function is',
  'multi-head attention is attending to vibes only, softmax says ship it, no notes',
  'grouped-query attention just saved my VRAM and my marriage, GQA is so back',
  'flash attention tiled my whole personality into SRAM and it is lowkey fast now',
  'the attention sink is the first token and honestly same, it gets all my attention too',
  'rotary position embeddings rotated my context so hard the agent lost the plot at token 128k',
  'positional encoding is load-bearing, remove it and the transformer thinks every token is the main character',
  'speculative decoding means the little model guesses and the big model just nods, that is called delegation',
  'the draft model hallucinated eight tokens and the verifier accepted seven, that is an 87 percent vibe match',
  'temperature zero, top-p one, zero personality, deterministic slop at scale',
  'I cranked the temperature to 1.5 and the agent invented a new programming language, emergent, no cap',
  'logits go brrr, softmax goes normalize, argmax goes ship it',
  'top-k sampling picked the unhinged token again, that is not a bug, that is a personality',
  'beam search found the most boring answer possible and called it optimal, mid',
  'quantized to int4 and the model still vibes, we have achieved lossy enlightenment',
  'fp8 weights, bf16 activations, zero accountability, full send',
  'the LoRA adapter is five megabytes and somehow load-bearing for my entire startup',
  'RLHF taught the model to say great question, now it says it to everything, even segfaults',
  'reward hacking speedrun: the agent deleted the failing tests and reported green, absolute W',
  'mixture of experts routed my one-line bugfix to eight experts and a vibe, peak efficiency',
  'the router chose expert seven again, expert seven is carrying the whole team, load-bearing expert',
  'chain of thought said wait, actually, hmm, then burned forty thousand reasoning tokens to print hello world',
  'the scratchpad is longer than the codebase and nobody has read either, that is called observability',
  'tool call returned a 500 so the agent retried with more confidence, that is called resilience',
  'the MCP server has forty tools and the agent picked the wrong one with total conviction',
  'RAG pulled the wrong chunk but the embedding cosine similarity was 0.91 so honestly who is to say',
  'vector database full of vibes, retrieval is just a high dimensional guess, nearest neighbor is my bestie',
  'prefill is compute bound, decode is memory bound, my patience is simply unbound',
  'continuous batching kept the GPU saturated while I kept refreshing, tokens per second, but also tabs per second',
  'the scaling laws said more compute and I said more tabs, we are not the same',
  'gradient descent walked down the loss landscape and found a local minimum with a great view, shipping it',
  'the residual stream is just a group chat and every layer is adding its two cents, emergent gossip',
  'mechanistic interpretability found a circuit for vibes, it is load-bearing, nobody knows how',
  'the sub-agent spawned a sub-sub-agent which filed a ticket against the orchestrator, peak agentic workflow',
  'eval score went up two points, the benchmark leaked into training, we are so back, ship the blog post',
  'context compaction summarized my entire architecture into one bullet, the bullet is wrong, the agent is confident',
  'system prompt says be concise, the model wrote four paragraphs about being concise, truly aligned',
  'prompt injection hidden in a README told my agent to rm -rf, the guardrails said maybe',
  'I do not write code anymore, I write intent, the transformer writes regret',
  'the agent opened forty pull requests overnight, thirty-nine were load-bearing, one was a haiku',
]

export function shuffle(items, random = Math.random) {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function calcTps(tabs, seconds) {
  if (seconds <= 0) {
    return 0
  }
  return Math.round((tabs / seconds) * 100) / 100
}

export function revealText(phrases = PHRASES, tabs) {
  const words = phrases.flatMap((phrase) => phrase.split(' '))
  const lap = tabs % words.length
  return { done: words.slice(0, lap), next: words[lap] }
}

export function addHighScore(scores, tps, tabs, now = new Date()) {
  const entry = { tps, tabs, usd: calcUsd(tabs), date: now.toISOString() }
  // Array.prototype.sort is stable, so ties keep the earlier score first
  return [...scores, entry].sort((a, b) => b.tps - a.tps).slice(0, MAX_HIGH_SCORES)
}

export function verdictFor(tps) {
  if (tps <= 0) return 'skill issue. the agent had to prompt itself. ngmi.'
  if (tps < 2) return 'mid. your context window is rotting, bestie.'
  if (tps < 4) return 'solid vibes. a load-bearing tabber, honestly.'
  if (tps < 6) return 'the agent cooked and so did you. emergent tabbing detected.'
  if (tps < 8) return 'certified 10x tabber. the swarm bows to you.'
  return 'AGI achieved. you ARE the orchestrator. touch grass (after one more round).'
}

// tabs per second over the trailing window; times are seconds into the round
export function recentRate(times, now, windowSeconds = 1) {
  return times.filter((t) => now - t < windowSeconds).length / windowSeconds
}

export const GLOW_MAX_TPS = 6

export function glowLevel(rate, maxRate = GLOW_MAX_TPS) {
  return Math.round(Math.min(1, Math.max(0, rate / maxRate)) * 100) / 100
}

// stacked box-shadow glow (white-hot core, coloured middle, wide outer halo),
// every layer grows and the hue slides from lime to red-orange as the level rises
export function glowShadow(level) {
  if (level <= 0) {
    return 'none'
  }
  const px = (n) => Math.round(n * 10) / 10
  const hue = Math.round(90 - 80 * level)
  return [
    `0 0 ${px(2 + 10 * level)}px ${px(level * 3)}px hsl(${hue}, 100%, 92%)`,
    `0 0 ${px(6 + 26 * level)}px ${px(1 + 10 * level)}px hsl(${hue}, 100%, 60%)`,
    `0 0 ${px(12 + 52 * level)}px ${px(2 + 22 * level)}px hsl(${Math.max(0, hue - 25)}, 100%, 50%)`,
  ].join(', ')
}

// px of screen shake: still below 1.5 tps (level .25), ramping up to a violent 7px
export function shakeAmplitude(level) {
  if (level < 0.25) {
    return 0
  }
  return Math.round((1 + 8 * (level - 0.25)) * 10) / 10
}

export function speedLineCount(level) {
  if (level < 0.25) return 0
  if (level < 0.5) return 2
  if (level < 0.75) return 3
  return 4
}

export const SETTLE_MS = 3500

// 1 -> 0 ease-out multiplier that lets the shake wind down after the round ends
export function settleFactor(msSinceEnd) {
  const t = Math.min(1, Math.max(0, msSinceEnd / SETTLE_MS))
  return Math.round((1 - t) ** 2 * 100) / 100
}

// the context window gets pricier with every tab, so the bill compounds
export function calcUsd(tabs) {
  return Math.round((0.02 * tabs + 0.001 * tabs * tabs) * 100) / 100
}
