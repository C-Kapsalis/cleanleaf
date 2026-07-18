'use client';
import { useState } from 'react';
import Link from 'next/link';
import { GROUPS, ADMIN_CHALLENGES, ADMIN_MESSAGES, ADMIN_CONTACTS, SDG_COHORTS } from '@/lib/demo-data';

// Institution-side dashboard. Everything here renders fictional demo data;
// the "send" action is simulated locally.

const TABS = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'contacts', label: 'Contacts', icon: '👥' },
  { id: 'challenges', label: 'Challenges', icon: '🎯' },
  { id: 'messaging', label: 'Messaging', icon: '💬' },
  { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' },
  { id: 'sdg', label: 'SDG Reports', icon: '🌍' },
];

const SEND_SIMULATION_MS = 1500;
const SENT_CONFIRMATION_MS = 3000;

function MetricCard({ label, value, sub }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <p className="text-gray-500 text-xs uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold text-leaf-600 mt-1">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{sub}</p>
    </div>
  );
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [msgText, setMsgText] = useState('');
  const [segment, setSegment] = useState('All participants (1,284)');
  const [channel, setChannel] = useState('WhatsApp');

  const handleSend = () => {
    if (!msgText.trim()) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), SENT_CONFIRMATION_MS);
    }, SEND_SIMULATION_MS);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-leaf-600 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-white/70 text-lg" aria-label="Back to chat demo">←</Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gold-400 flex items-center justify-center text-leaf-700 text-xs font-bold" aria-hidden="true">CL</div>
            <div>
              <span className="font-semibold text-sm">CleanLeaf</span>
              <span className="text-white/70 text-xs ml-2">Syracuse University</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400" aria-hidden="true" />
          <span className="text-xs text-white/70">Live · Spring 2026</span>
        </div>
      </header>

      {/* Tab nav — scrollable on mobile */}
      <nav aria-label="Dashboard sections" className="bg-white border-b border-gray-200 overflow-x-auto sticky top-[52px] z-40">
        <div className="flex min-w-max px-2" role="tablist">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              type="button" role="tab" id={`tab-${tab.id}`}
              aria-selected={activeTab === tab.id} aria-controls={`panel-${tab.id}`}
              className={`px-4 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-leaf-600 text-leaf-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}>
              <span className="mr-1" aria-hidden="true">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="p-4 max-w-4xl mx-auto">

        {activeTab === 'overview' && (
          <div className="space-y-4 animate-fade-up" role="tabpanel" id="panel-overview" aria-labelledby="tab-overview">
            <div className="mb-2">
              <h2 className="text-lg font-bold text-leaf-600">Good morning, Admin <span aria-hidden="true">🌿</span></h2>
              <p className="text-xs text-gray-500">Spring 2026 cohort · Week 8 of 12 · 1,284 active</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <MetricCard label="Active Participants" value="1,284" sub="↑ +13% vs last month" />
              <MetricCard label="Avg Completion" value="68%" sub="↑ +5pts this week" />
              <MetricCard label="Messages Sent" value="9,410" sub="84% avg open rate" />
              <MetricCard label="Meals Logged Today" value="347" sub="↓ -8% vs yesterday" />
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Active Challenges</p>
              {ADMIN_CHALLENGES.map(ch => (
                <div key={ch.name} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${ch.color}`} />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{ch.name}</p>
                      <p className="text-xs text-gray-500">{ch.enrolled} enrolled · Day {ch.day}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden" aria-hidden="true">
                      <div className={`h-full ${ch.color} rounded-full`} style={{ width: `${ch.completion}%` }} />
                    </div>
                    <span className="text-xs text-gray-500 w-8 text-right">{ch.completion}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Top Groups This Week</p>
              {GROUPS.slice(0, 3).map(g => (
                <div key={g.rank} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-full ${g.color} flex items-center justify-center text-white text-xs font-bold`}>{g.abbr}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-700">{g.name}</p>
                      <p className="text-xs text-gray-500">{g.streak}-day streak</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-leaf-600">{g.pts.toLocaleString()}</p>
                    <p className="text-xs text-green-700">{g.today} today</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="space-y-4 animate-fade-up" role="tabpanel" id="panel-contacts" aria-labelledby="tab-contacts">
            <h2 className="text-lg font-bold text-leaf-600">Contacts & CRM</h2>
            <p className="text-xs text-gray-500">Import your community or sync your existing CRM</p>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p className="text-xs font-semibold text-gray-500 mb-3">Sync your CRM</p>
              {['Salesforce', 'HubSpot', 'Microsoft 365', 'Google Workspace'].map((crm, i) => (
                <div key={crm} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-700">{crm}</span>
                  <span className={`text-xs font-medium ${i % 2 === 0 ? 'text-green-700' : 'text-gold-600'}`}>
                    {i % 2 === 0 ? 'Connected' : 'Sync now'}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <p className="text-xs font-semibold text-gray-500">Imported Contacts</p>
                <span className="text-xs bg-leaf-50 text-leaf-600 px-2 py-1 rounded-full font-medium">1,284 total</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <caption className="sr-only">Imported contacts with cohort, active challenge, status, and streak</caption>
                  <thead className="bg-gray-50 text-gray-500 uppercase">
                    <tr>
                      <th scope="col" className="px-4 py-2 text-left">Name</th>
                      <th scope="col" className="px-4 py-2 text-left">Cohort</th>
                      <th scope="col" className="px-4 py-2 text-left">Challenge</th>
                      <th scope="col" className="px-4 py-2 text-left">Status</th>
                      <th scope="col" className="px-4 py-2 text-right">Streak</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ADMIN_CONTACTS.map(c => (
                      <tr key={c.name} className="border-b border-gray-50">
                        <td className="px-4 py-2.5 font-medium text-gray-700">{c.name}</td>
                        <td className="px-4 py-2.5 text-gray-500">{c.cohort}</td>
                        <td className="px-4 py-2.5 text-gray-500">{c.challenge}</td>
                        <td className="px-4 py-2.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            c.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                          }`}>{c.status}</span>
                        </td>
                        <td className="px-4 py-2.5 text-right">
                          {c.streak > 0
                            ? <><span aria-hidden="true">🔥 </span>{c.streak}<span className="sr-only"> days</span></>
                            : <><span aria-hidden="true">—</span><span className="sr-only">No streak</span></>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="space-y-4 animate-fade-up" role="tabpanel" id="panel-challenges" aria-labelledby="tab-challenges">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-leaf-600">Challenges & Tracks</h2>
                <p className="text-xs text-gray-500">AI-powered wellness programs</p>
              </div>
              <button type="button" className="bg-gold-400 text-leaf-700 text-xs font-semibold px-4 py-2 rounded-lg">
                <span aria-hidden="true">✨ </span>Generate with AI
              </button>
            </div>

            {ADMIN_CHALLENGES.map(ch => (
              <div key={ch.name} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-700 text-sm">{ch.name}</p>
                    <p className="text-xs text-gray-500">{ch.enrolled} enrolled · Day {ch.day}</p>
                  </div>
                  <span className="text-lg font-bold text-leaf-600">{ch.completion}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full mt-3 overflow-hidden" aria-hidden="true">
                  <div className={`h-full ${ch.color} rounded-full transition-all duration-1000`}
                    style={{ width: `${ch.completion}%` }} />
                </div>
              </div>
            ))}

            <div className="bg-gold-400/10 border border-gold-400/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-gold-600 uppercase tracking-wider mb-1">AI Suggestion</p>
              <p className="text-sm text-gray-700">The Engineering cohort shows lower fruit intake than the campus average. A &quot;Rainbow Plate&quot; 7-day challenge is predicted to achieve a 68% join rate.</p>
              <button type="button" className="mt-2 bg-gold-400 text-leaf-700 text-xs font-semibold px-4 py-2 rounded-lg">
                Launch this challenge
              </button>
            </div>
          </div>
        )}

        {activeTab === 'messaging' && (
          <div className="space-y-4 animate-fade-up" role="tabpanel" id="panel-messaging" aria-labelledby="tab-messaging">
            <h2 className="text-lg font-bold text-leaf-600">Messaging</h2>
            <p className="text-xs text-gray-500">Send targeted wellness nudges</p>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-3">
              <p className="text-xs font-semibold text-gray-500 uppercase">Compose Message</p>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="segment-select" className="sr-only">Audience segment</label>
                  <select id="segment-select" value={segment} onChange={e => setSegment(e.target.value)}
                    className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-white">
                    <option>All participants (1,284)</option>
                    <option>Active users (1,086)</option>
                    <option>Lapsed users (198)</option>
                    <option>Vegetarian track (438)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="channel-select" className="sr-only">Delivery channel</label>
                  <select id="channel-select" value={channel} onChange={e => setChannel(e.target.value)}
                    className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-white">
                    <option>WhatsApp</option>
                    <option>Teams</option>
                    <option>iMessage</option>
                  </select>
                </div>
              </div>

              <label htmlFor="message-text" className="sr-only">Message text</label>
              <textarea
                id="message-text"
                value={msgText}
                onChange={e => setMsgText(e.target.value)}
                placeholder="For example: Day 8 check-in! 🌱 Tap the link to log your meal and keep your streak alive."
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-500 resize-none h-20"
              />

              <p className="text-[10px] text-gray-500">AI will personalize this message per recipient using their name, challenge progress, and streak data.</p>

              <button type="button" onClick={handleSend} disabled={sending || !msgText.trim()}
                aria-live="polite"
                className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  sent ? 'bg-green-500 text-white' :
                  sending ? 'bg-gray-300 text-gray-500' :
                  'bg-leaf-600 text-white hover:bg-leaf-500 active:scale-[0.98]'
                }`}>
                {sent ? '✓ Sent to ' + segment : sending ? 'Sending...' : 'Send message →'}
              </button>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Message History</p>
              {ADMIN_MESSAGES.map(m => (
                <div key={m.name} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-700">{m.name}</p>
                    <p className="text-xs text-gray-500">{m.time} · {m.channel}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-leaf-600">{m.open}% open</p>
                    <p className="text-xs text-gray-500">{m.tap}% tapped</p>
                  </div>
                </div>
              ))}
              <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between">
                <span className="text-xs text-gray-500">Avg open rate this week</span>
                <span className="text-xs font-bold text-leaf-600">84%</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="space-y-4 animate-fade-up" role="tabpanel" id="panel-leaderboard" aria-labelledby="tab-leaderboard">
            <h2 className="text-lg font-bold text-leaf-600">Group Leaderboard</h2>
            <p className="text-xs text-gray-500">Week 8 standings · Updated live</p>

            {GROUPS.map(g => (
              <div key={g.rank} className={`bg-white rounded-xl p-4 shadow-sm border ${g.rank === 1 ? 'border-gold-400' : 'border-gray-100'} flex items-center gap-4`}>
                <span className={`w-10 h-10 rounded-full ${g.rank === 1 ? 'bg-gold-400 text-leaf-700' : g.color + ' text-white'} flex items-center justify-center text-lg font-bold`}>
                  {g.rank}
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-700">{g.name}</p>
                  <p className="text-xs text-gray-500">{g.streak}-day streak</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-leaf-600">{g.pts.toLocaleString()}</p>
                  <p className="text-xs text-green-700">{g.today} today</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'sdg' && (
          <div className="space-y-4 animate-fade-up" role="tabpanel" id="panel-sdg" aria-labelledby="tab-sdg">
            <h2 className="text-lg font-bold text-leaf-600">SDG Reports</h2>
            <p className="text-xs text-gray-500">Outcomes mapped to your sustainability commitments</p>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-500">SDG 3 — Good Health</p>
                <p className="text-2xl font-bold text-green-600">72%</p>
                <p className="text-xs text-green-700">↑ +6pts since launch</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-500">SDG 12 — Consumption</p>
                <p className="text-2xl font-bold text-amber-600">64%</p>
                <p className="text-xs text-green-700">↑ +3pts since launch</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Cohort Breakdown</p>
              {SDG_COHORTS.map(c => (
                <div key={c.name} className="flex items-center gap-3 py-2">
                  <span className="text-xs text-gray-600 w-24">{c.name}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden" aria-hidden="true">
                    <div className="h-full bg-leaf-500 rounded-full" style={{ width: `${c.pct}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-gray-600 w-8 text-right">{c.pct}%</span>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Total Meals Logged</p>
              <p className="text-3xl font-bold text-leaf-600">24,103</p>
              <p className="text-xs text-gray-500">Week 8 of 12</p>
            </div>

            <button type="button" className="w-full bg-leaf-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-leaf-500 transition-all">
              Export Full SDG Report <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
