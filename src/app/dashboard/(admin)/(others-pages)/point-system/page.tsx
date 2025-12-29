"use client";

import React from 'react';
import { 
  Users, 
  Share2, 
  PenTool, 
  Bug, 
  Briefcase, 
  Zap, 
  ShieldCheck, 
  Gift, 
  Coins, 
  ArrowRight, 
  TrendingUp 
} from 'lucide-react';

const MandoPointsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
           {/* Abstract Background Gradients */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/20 dark:bg-emerald-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-8">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span className="text-sm font-semibold tracking-wide uppercase">Introducing The Growth Engine</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Turn Your Impact <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500 dark:from-blue-400 dark:to-emerald-400">
              Into Real Value
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
            MANDO Points (MP) aren't just a number. They are a transparent, dollar-pegged representation of your contribution to the ecosystem—redeemable for services or future tokens.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold hover:scale-105 transition-transform shadow-lg shadow-blue-500/25">
              Start Earning MP
            </button>
            <div className="px-6 py-4 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 font-mono font-medium flex items-center gap-2">
              <span className="text-emerald-500">★</span> 100 MP = $1.00 USD
            </div>
          </div>
        </div>
      </section>

      {/* --- INFOGRAPHIC: THE GROWTH ENGINE --- */}
      <section className="py-20 bg-white dark:bg-slate-900 border-y border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How The Engine Works</h2>
            <p className="text-gray-500 dark:text-gray-400">A transparent loop verifying your value</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop Only) */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-500/20 via-emerald-500/20 to-purple-500/20 -z-0" />

            {/* Step 1 */}
            <div className="relative group text-center">
              <div className="w-24 h-24 mx-auto bg-blue-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border-4 border-white dark:border-slate-900 shadow-xl">
                <Zap className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">1. Contribute</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 px-4">
                Complete quests, refer users, or find bugs to save MANDO costs.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative group text-center">
              <div className="w-24 h-24 mx-auto bg-emerald-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border-4 border-white dark:border-slate-900 shadow-xl">
                <TrendingUp className="w-10 h-10 text-emerald-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">2. Quantify</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 px-4">
                We calculate the USD value of your action based on real Customer Acquisition Cost (CAC) savings.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative group text-center">
              <div className="w-24 h-24 mx-auto bg-purple-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border-4 border-white dark:border-slate-900 shadow-xl">
                <Coins className="w-10 h-10 text-purple-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">3. Earn MP</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 px-4">
                Value is converted to MANDO Points at a base conversion rate of 100 MP per $1.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative group text-center">
              <div className="w-24 h-24 mx-auto bg-amber-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border-4 border-white dark:border-slate-900 shadow-xl">
                <Gift className="w-10 h-10 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">4. Redeem</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 px-4">
                Spend on subscriptions or Token Generation Event (TGE).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- QUESTS SECTION --- */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Active Quests</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Category: Community */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-lg text-pink-600 dark:text-pink-400">
                <Users size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Community & Social</h3>
                <p className="text-sm text-gray-500">Simple actions, instant rewards.</p>
              </div>
            </div>
            <ul className="space-y-4">
              <QuestItem title="Follow & Join Discord" reward="200 MP" value="$2.00"/>
              <QuestItem title="Share Announcements" reward="500 MP" value="$5.00" />
              <QuestItem title="Community Champion" reward="2,500 MP" value="$25/mo" />
            </ul>
          </div>

          {/* Category: Content */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                <PenTool size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Content & Advocacy</h3>
                <p className="text-sm text-gray-500">Create tutorials and case studies.</p>
              </div>
            </div>
            <ul className="space-y-4">
              <QuestItem title="Detailed Blog Post" reward="25,000 MP" value="$250" isHot />
              <QuestItem title="Video Tutorial (>5m)" reward="50,000 MP" value="$500" />
              <QuestItem title="Enterprise Case Study" reward="100,000 MP" value="$1,000" />
            </ul>
          </div>

          {/* Category: Technical */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400">
                <Bug size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Technical & Bounties</h3>
                <p className="text-sm text-gray-500">Save R&D and Security costs.</p>
              </div>
            </div>
            <ul className="space-y-4">
              <QuestItem title="Feature Implemented" reward="100,000 MP" value="$1,000" />
              <QuestItem title="Bug Report (Low)" reward="25,000 MP" value="$250" />
              <QuestItem title="Bug Report (Critical)" reward="1.3M+ MP" value="$13k+" isHot />
            </ul>
          </div>

           {/* Category: Biz Dev */}
           <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                <Briefcase size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Business Development</h3>
                <p className="text-sm text-gray-500">Refer paying customers.</p>
              </div>
            </div>
            <ul className="space-y-4">
              <QuestItem title="Refer Freemium User" reward="1,000 MP" value="$10" />
              <QuestItem title="Refer Pro Dev" reward="15,000 MP" value="$150" />
              <QuestItem title="Refer Enterprise" reward="70,000 MP" value="$700" isHot />
            </ul>
          </div>

        </div>
      </section>

      {/* --- REDEMPTION SECTION --- */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        {/* Decorative BG */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 skew-x-12 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Choose Your Reward Path</h2>
            <p className="text-xl text-gray-400">Immediate utility or future potential? You decide.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Option 1: Services */}
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="text-emerald-400 w-8 h-8" />
                <h3 className="text-2xl font-bold text-emerald-400">Option 1: Ecosystem Utility</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Redeem points immediately for MANDO products. Active contributors can effectively use the platform for free.
              </p>
              <div className="space-y-4 font-mono text-sm">
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span>MANDO Pro Sub</span>
                  <span className="text-emerald-400">2,000 MP / month</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span>MANDO Team Sub</span>
                  <span className="text-emerald-400">10,000 MP / month</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span>"Mando Secured" Audit</span>
                  <span className="text-emerald-400">150,000 MP</span>
                </div>
              </div>
              <button className="w-full mt-8 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors font-semibold">
                Redeem Services
              </button>
            </div>

            {/* Option 2: Token */}
            <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 p-8 rounded-2xl border border-blue-500/30 backdrop-blur-sm relative">
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                High Potential
              </div>
              <div className="flex items-center gap-3 mb-6">
                <Share2 className="text-blue-400 w-8 h-8" />
                <h3 className="text-2xl font-bold text-blue-400">Option 2: Token Airdrop</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Your points ledger acts as an on-chain record of value added. Hold your points to convert them during the future Token Generation Event (TGE).
              </p>
              
              <div className="bg-blue-950/50 p-4 rounded-lg border border-blue-800 mb-6">
                <p className="text-sm text-blue-200 italic">
                  "Unlike standard airdrops farmed by bots, this system ensures tokens go to genuine, long-term contributors."
                </p>
              </div>

              <button className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors font-semibold flex items-center justify-center gap-2">
                Join Waitlist <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </div>
      </section>
      
      {/* Footer / CTA */}
      <section className="py-12 text-center bg-gray-50 dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          MANDO Ecosystem © 2025. All conversion rates and rewards subject to TGE governance.
        </p>
      </section>

    </div>
  );
};

// --- Helper Component for Quest Items ---
const QuestItem = ({ title, reward, value, isHot = false, highlight = false }) => (
  <li className={`flex items-center justify-between p-3 rounded-lg ${highlight ? 'bg-gray-50 dark:bg-slate-800 border border-blue-100 dark:border-blue-900' : ''}`}>
    <div className="flex items-center gap-2">
      <span className="font-medium text-gray-700 dark:text-gray-200">{title}</span>
      {isHot && <span className="text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">HOT</span>}
    </div>
    <div className="text-right">
      <div className="font-bold text-blue-600 dark:text-blue-400">{reward}</div>
      <div className="text-xs text-gray-400">{value} Value</div>
    </div>
  </li>
);

export default MandoPointsPage;