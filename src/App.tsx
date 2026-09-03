/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Calendar,
  FileText,
  Mail,
  Menu,
  X,
  Mic,
  Info,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ORGANIZERS = [
  {
    name: "Christos Korgialas",
    photo: "/photo-korgialas.webp",
    role: "",
    affiliation: "Department of Informatics, Aristotle University of Thessaloniki; NOEMAC PC, Greece",
    email: "ckorgial@csd.auth.gr",
    website: "https://www.linkedin.com/in/christos-korgialas-4b169a187/",
    bio: "Ph.D. candidate in the Artificial Intelligence and Information Analysis Laboratory, Department of Informatics, Aristotle University of Thessaloniki, and Senior Software Engineer and Project Manager at NOEMAC PC. His work spans multimedia forensics, transferable black-box adversarial attacks, explainable AI, and multimodal information analysis. He has contributed to funded national and European projects, co-organized the AEGIS summer school, served on technical committees, and reviews for IEEE venues."
  },
  {
    name: "Pai Chet Ng",
    photo: "/photo-pai.webp",
    role: "",
    affiliation: "Infocomm Technology Cluster, Singapore Institute of Technology, Singapore",
    email: "paichet.ng@singaporetech.edu.sg",
    website: "https://www.singaporetech.edu.sg/directory/faculty/pai-chet-ng",
    bio: "Assistant Professor in the Infocomm Technology Cluster at the Singapore Institute of Technology. Her research covers computational hyperspectral imaging, applied AI for IoT, multimodal sensing, federated learning, wireless sensing, and human-robot interaction. She has organized hyperspectral data challenges at ICASSP and workshops on privacy-preserving and trustworthy AI, providing direct experience in programme design, participant engagement, and challenge governance."
  },
  {
    name: "Xiaoxiao Miao",
    photo: "/photo-xiaoxiao.webp",
    role: "",
    affiliation: "Division of Natural and Applied Sciences, Duke Kunshan University, Kunshan, China",
    email: "xiaoxiao.miao@dukekunshan.edu.cn",
    website: "https://xiaoxiaomiao323.github.io",
    bio: "Assistant Professor of Computer Science at Duke Kunshan University, previously Assistant Professor at the Singapore Institute of Technology (2023-2025) and postdoctoral researcher at the National Institute of Informatics, Japan (2021-2023). Her research addresses speech privacy, speaker anonymisation, and trustworthy speech processing, published in IEEE/ACM TASLP, IEEE TIFS, Neural Networks, Computer Speech and Language, ICASSP, and INTERSPEECH. She co-organized the VoicePrivacy Challenges (2022, 2024) and the VoicePrivacy Attacker Challenge at ICASSP 2025, bringing direct experience in challenge design, evaluation protocols, and participant coordination."
  },
  {
    name: "Arash Mohammadi",
    photo: "/photo-arash.webp",
    role: "",
    affiliation: "Concordia Institute for Information Systems Engineering, Concordia University, Canada",
    email: "arash.mohammadi@concordia.ca",
    website: "https://www.concordia.ca/faculty/arash-mohammadi.html",
    bio: "Associate Professor at the Concordia Institute for Information Systems Engineering and a registered Professional Engineer in Ontario. His research includes statistical signal processing, information fusion, state estimation, machine learning, and cyber-physical systems. He has served as IEEE SPS Director of Membership Development, ICASSP Challenge Co-Chair, IEEE ICHMS Program Chair, IEEE ICAS General Co-Chair, and IEEE ICIP Special Session Chair, and has led work on trustworthy human-autonomy teaming."
  },
  {
    name: "Konstantinos N. Plataniotis",
    photo: "/photo-plataniotis.webp",
    role: "Scientific Advisor",
    affiliation: "Department of Electrical and Computer Engineering, University of Toronto, Canada",
    email: "kostas@ece.utoronto.ca",
    website: "https://www.ece.utoronto.ca/people/plataniotis-k-n/",
    bio: "Professor and Bell Canada Endowed Chair in Multimedia at the University of Toronto, where he directs the Multimedia Laboratory. An IEEE Fellow and Fellow of the Canadian Academy of Engineering, his research spans signal and image processing, machine learning, adaptive systems, multimedia, and biometrics. He has served as IEEE Signal Processing Society President and as General Co-Chair of ICASSP 2021 and ICIP 2018, bringing extensive scientific leadership and conference-governance experience."
  }
];

const IMPORTANT_DATES = [
  { label: "Workshop paper submission deadline", date: "November 11, 2026" },
  { label: "Workshop paper acceptance notification", date: "December 16, 2026" },
  { label: "Workshop final paper submission deadline", date: "January 6, 2027" },
  { label: "Workshop day", date: "TBD \u00b7 ICASSP 2027, 16-21 May 2027" }
];

const DECLARATION = [
  { field: "Attacker Access", detail: "physical, digital, or semantic vector control." },
  { field: "Injection Point", detail: "the entry stage within the processing pipeline." },
  { field: "Stages Affected", detail: "downstream propagation across perception and tracking." },
  { field: "Measurement Point", detail: "sensor, perception, planner, or closed-loop trajectory level." }
];

const TOPICS = [
  "Physical-layer attacks: adversarial patches, optical interference, and light projection",
  "FMCW and 4D imaging radar spoofing, jamming, and interference mitigation",
  "LiDAR point-cloud injection, signal suppression, and relay attacks",
  "Hardware vulnerabilities, clock desynchronization, and firmware-level manipulation",
  "Robust multi-modal fusion across camera, LiDAR, and radar",
  "Cross-modal vulnerability transfer and shared-representation attacks",
  "Adversarial resilience of BEV, 3D occupancy, and vector-map representations",
  "Sensor redundancy bounds and fail-operational degraded modes",
  "Threat propagation across association, tracking, and trajectory prediction",
  "Prompt injection, jailbreaking, and semantic attacks on VLA and world models",
  "Physical-consistency verification, runtime monitoring, and spoof detection",
  "Closed-loop safety-referred evaluation and hardware-in-the-loop threat testing"
];

// Tentative schedule from the accepted proposal. Kept here for reference;
// the public program is announced as TBD until the review process is complete.
const PROGRAM: { time: string; title: string; speaker?: string }[] = [
  // { time: "08:30 - 08:45", title: "Opening: scope, threat taxonomy, reporting convention", speaker: "C. Korgialas; P. C. Ng" },
  // { time: "08:45 - 09:35", title: "Invited plenary keynote", speaker: "TBD" },
  // { time: "09:35 - 10:00", title: "Coffee and poster set-up" },
  // { time: "10:00 - 11:20", title: "Contributed Session I: sensing-chain attacks", speaker: "C. Korgialas" },
  // { time: "11:20 - 12:40", title: "Contributed Session II: robust multimodal fusion", speaker: "P. C. Ng" },
  // { time: "12:40 - 13:40", title: "Lunch" },
  // { time: "13:40 - 14:40", title: "Contributed Session III: language-conditioned and VLA drivers", speaker: "X. Miao" },
  // { time: "14:40 - 15:30", title: "Poster session and coffee", speaker: "Organizers" },
  // { time: "15:30 - 16:10", title: "Roundtable: Does Redundancy Buy Robustness?", speaker: "K. N. Plataniotis" },
  // { time: "16:10 - 16:50", title: "Executive panel: benchmark and standards roadmap", speaker: "A. Mohammadi" },
  // { time: "16:50 - 17:00", title: "Closing, outputs, and next steps", speaker: "Organizers" }
];

// TODO: paste the ICASSP 2027 workshop submission URL here once it is announced.
const SUBMISSION_URL = "";

const PLENARY = {
  name: "Prof. Panos Nasiopoulos",
  photo: "/photo-nasiopoulos.webp",
  affiliation: "Department of Electrical and Computer Engineering, University of British Columbia, Canada",
  website: "https://ece.ubc.ca/panos-nasiopoulos/",
  title: "TBD",
  abstract: "TBD",
  bio: "Dr. Panos Nasiopoulos earned a Bachelor's degree in physics from the Aristotle University of Thessaloniki, Greece, and his Bachelor's, Master's, and Ph.D. degrees in electrical and computer engineering from the University of British Columbia (UBC), Canada. He is a professor with the Department of Electrical and Computer Engineering and the former Director of the Institute for Computing, Information and Cognitive Systems and the Master of Software Systems at UBC. Before joining UBC, he was the President of Daikin Comtec US (co-founder of DVD) and Executive Vice President of Sonic Solutions. His research interests are primarily in the area of Digital Video Processing and Coding, he is the author or co-author of more than 250 research publications, and holds several patents. Dr. Nasiopoulos is a registered member of the Association of Professional Engineers and Geoscientists of British Columbia (APEGBC), Canada. He is a Fellow of IEEE, a Fellow of the Canadian Academy of Engineering, and has been an active member of the Standards Council of Canada, MPEG, SMPTE and IEEE."
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#topics", label: "Topics" },
    { href: "#program", label: "Program" },
    { href: "#plenary", label: "Plenary" },
    { href: "#organizers", label: "Organizers" },
    { href: "#dates", label: "Dates" },
    { href: "#submission", label: "Submission" }
  ];

  return (
    <div className="min-h-screen bg-[#f4f7f9] font-sans text-[#333]">
      {/* Top Header - White with Logos */}
      <div className="bg-white border-b border-gray-100 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            <a href="https://2027.ieeeicassp.org/">
              <img
                src="/icassp27-logo-small.webp"
                alt="2027 IEEE International Conference on Acoustics, Speech, and Signal Processing"
                className="h-14 sm:h-[74px] w-auto flex-none object-contain"
              />
            </a>
            <div className="min-w-0">
              <h1 className="text-[#016495] font-display font-extrabold leading-tight sm:leading-none">
                <span className="sm:hidden text-lg">IEEE ICASSP 2027</span>
                <span className="hidden sm:inline sm:text-xl lg:text-2xl">
                  2027 IEEE International Conference on Acoustics, Speech, and Signal Processing
                </span>
              </h1>
              <p className="text-[#74bd44] text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] mt-1">
                16-21 May 2027, Toronto, Canada
              </p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-4 flex-none">
            <img src="/sps-ieee-logo.svg" alt="IEEE Signal Processing Society" className="w-auto flex-none max-w-none object-contain" style={{ height: 68 }} />
          </div>
        </div>
      </div>

      {/* Main Navigation - Blue */}
      <header className="sticky top-0 z-50 bg-[#016495] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <nav className="hidden lg:flex items-center">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-white hover:bg-white/10 px-4 py-4 text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="lg:hidden flex items-center h-full">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2" aria-label="Toggle menu">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            <div className="flex items-center">
              <a
                href="#submission"
                className="bg-[#74bd44] text-[#01415f] px-3 sm:px-6 py-2 rounded-sm font-bold text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest hover:bg-white transition-colors whitespace-nowrap"
              >
                Submit Paper
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden bg-[#01415f] border-t border-white/10"
            >
              <div className="flex flex-col p-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white p-4 text-xs font-bold uppercase tracking-widest"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero / Banner Area */}
      <section className="relative h-[300px] sm:h-[360px] lg:h-[400px] flex items-center justify-center overflow-hidden bg-[#01415f]">
        <div className="absolute inset-0 z-0">
          <img
            src="/banner-autonomous-driving.webp"
            alt="Connected and automated vehicles in an urban environment"
            className="banner-slide brightness-[0.35]"
          />
          <img
            src="/banner-toronto.webp"
            alt="Toronto skyline, host city of ICASSP 2027"
            className="banner-slide brightness-[0.35]"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <h2 className="text-white font-display font-black text-4xl md:text-6xl uppercase tracking-tighter mb-4">
              TPAD 2027
            </h2>
            <div className="h-1 w-24 bg-[#74bd44] mx-auto mb-6"></div>
            <p className="text-white text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
              Trustworthy Perception for Autonomous Driving: Adversarial Robustness, Multimodal Fusion, and Foundation Models
            </p>
            <p className="text-gray-300 mt-4 text-sm uppercase tracking-[0.3em]">
              Satellite Workshop @ IEEE ICASSP 2027
            </p>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb / Page Title Bar */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <a href="https://2027.ieeeicassp.org/" className="hover:text-[#016495]">Home</a>
          <ChevronRight size={12} />
          <a href="https://2027.ieeeicassp.org/call-for-satellite-workshops/" className="hover:text-[#016495]">Satellite Workshops</a>
          <ChevronRight size={12} />
          <span className="text-[#016495]">TPAD 2027</span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-12">

            {/* About Section */}
            <section id="about" className="bg-white p-6 sm:p-8 lg:p-12 rounded-sm shadow-sm border border-gray-100">
              <h3 className="text-[#016495] text-2xl font-display font-bold mb-8 flex items-center gap-3">
                <span className="w-1 h-8 bg-[#74bd44]"></span>
                Scope and Motivation
              </h3>
              <div className="prose max-w-none text-gray-600 leading-relaxed space-y-6">
                <p className="text-lg font-medium text-[#016495]">
                  Trust in automated driving is a claim about failure bounds, not average accuracy. A trustworthy
                  perception system keeps errors bounded, detectable at runtime, and traceable to evidence, so the
                  motion planner can identify untrusted inputs.
                </p>
                <p>
                  Cameras, LiDAR, and frequency-modulated continuous-wave radar measure physical environments directly,
                  so an adversary who manipulates physical phenomena controls system inputs - through printed patches,
                  light projections, spoofed radar chirps, or injected LiDAR returns. At the digitisation boundary these
                  arrive as physically valid measurements that bypass software integrity checks.
                </p>
                <p>
                  Perturbations then propagate through calibration, data association, multi-modal fusion, and object
                  tracking: a suppressed detection yields a missing track, and a missing track yields a trajectory that
                  does not brake. Multi-modal representations and vision-language-action models extend this attack
                  surface across semantic boundaries.
                </p>
                <p>
                  Conventional robustness metrics report model output accuracy and cannot quantify closed-loop safety
                  impact. <strong>TPAD</strong> establishes an end-to-end signal processing and assurance perspective.
                  Submissions must explicitly define four structural parameters:
                </p>
                <ul className="list-none space-y-2 my-6">
                  {DECLARATION.map((d, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="text-[#74bd44] font-bold mt-px">&#9642;</span>
                      <span><strong className="text-gray-800">{d.field}</strong> - {d.detail}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  Standardizing these parameters enables direct cross-study alignment. The programme includes
                  peer-reviewed papers, a plenary keynote, a poster session, a technical roundtable on sensor
                  redundancy, and an executive panel on benchmarks. Accepted papers will be published in the{' '}
                  <a href="https://ieeexplore.ieee.org/Xplore/home.jsp" className="text-[#016495] font-semibold hover:underline">
                    IEEE <em>Xplore</em> Digital Library
                  </a>
                  .
                </p>
              </div>
            </section>

            {/* Topics Section */}
            <section id="topics" className="bg-white p-6 sm:p-8 lg:p-12 rounded-sm shadow-sm border border-gray-100">
              <h3 className="text-[#016495] text-2xl font-display font-bold mb-8 flex items-center gap-3">
                <span className="w-1 h-8 bg-[#74bd44]"></span>
                Topics of Interest
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We invite original contributions across the perception-to-action chain, including but not limited to:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {TOPICS.map((topic, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-sm border border-gray-100">
                    <div className="mt-1 text-[#016495]">&#10003;</div>
                    <span className="text-sm font-semibold text-gray-700">{topic}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Program Section */}
            <section id="program" className="bg-white p-6 sm:p-8 lg:p-12 rounded-sm shadow-sm border border-gray-100">
              <h3 className="text-[#016495] text-2xl font-display font-bold mb-8 flex items-center gap-3">
                <span className="w-1 h-8 bg-[#74bd44]"></span>
                Technical Program (TBD)
              </h3>
              {PROGRAM.length === 0 ? (
                <p className="text-gray-600 leading-relaxed">
                  TPAD 2027 is a full-day event combining peer-reviewed oral papers, a plenary keynote, a poster session, a
                  roundtable, and an executive panel. The detailed schedule will be published here once the review process is complete.
                </p>
              ) : (
                <div className="space-y-6">
                  {PROGRAM.map((item, i) => (
                    <div key={i} className="group border-l-2 border-gray-100 hover:border-[#0089c7] pl-6 py-2 transition-colors">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="text-[10px] font-black text-[#016495] uppercase tracking-widest bg-blue-50 px-2 py-1 rounded-sm">
                          {item.time}
                        </span>
                        <h4 className="text-gray-900 font-bold">{item.title}</h4>
                      </div>
                      {item.speaker && <p className="text-xs text-[#016495] font-bold">{item.speaker}</p>}
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Plenary Section */}
            <section id="plenary" className="bg-white p-6 sm:p-8 lg:p-12 rounded-sm shadow-sm border border-gray-100">
              <h3 className="text-[#016495] text-2xl font-display font-bold mb-8 flex items-center gap-3">
                <span className="w-1 h-8 bg-[#74bd44]"></span>
                Plenary Keynote
              </h3>
              <div className="flex flex-col sm:flex-row gap-8">
                <img
                  src={PLENARY.photo}
                  alt={PLENARY.name}
                  className="w-44 h-44 flex-shrink-0 object-cover rounded-sm border border-gray-200 shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-xl flex items-center gap-2">
                    <Mic size={18} className="text-[#016495]" />
                    {PLENARY.name}
                  </h4>
                  <p className="text-xs text-[#016495] font-medium mt-1">{PLENARY.affiliation}</p>
                  <a href={PLENARY.website} className="text-[10px] text-gray-400 hover:text-[#016495] flex items-center gap-1 mt-2">
                    <ExternalLink size={10} />
                    {PLENARY.website}
                  </a>
                  <p className="text-sm text-gray-600 mt-5"><strong className="text-gray-800">Title:</strong> {PLENARY.title}</p>
                  <p className="text-sm text-gray-600 mt-3"><strong className="text-gray-800">Abstract:</strong> {PLENARY.abstract}</p>
                  <p className="text-sm text-gray-600 leading-relaxed mt-5">
                    <strong className="text-gray-800">Bio:</strong> {PLENARY.bio}
                  </p>
                </div>
              </div>
            </section>

            {/* Organizers Section */}
            <section id="organizers" className="bg-white p-6 sm:p-8 lg:p-12 rounded-sm shadow-sm border border-gray-100">
              <h3 className="text-[#016495] text-2xl font-display font-bold mb-8 flex items-center gap-3">
                <span className="w-1 h-8 bg-[#74bd44]"></span>
                Organizing Committee
              </h3>
              <div className="space-y-10">
                {ORGANIZERS.map((org, i) => (
                  <div key={i} className="flex flex-col sm:flex-row gap-6">
                    <img
                      src={org.photo}
                      alt={org.name}
                      className="w-28 h-28 flex-shrink-0 object-cover rounded-sm border border-gray-200 shadow-sm"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">
                        {org.name}
                        {org.role && (
                          <span className="text-xs font-medium text-gray-400 uppercase tracking-widest ml-2">{org.role}</span>
                        )}
                      </h4>
                      <p className="text-xs text-[#016495] font-medium mb-1">{org.affiliation}</p>
                      <p className="text-[10px] text-gray-400 mb-3 flex items-center gap-3">
                        <a href={`mailto:${org.email}`} className="hover:text-[#016495] flex items-center gap-1">
                          <Mail size={10} />
                          {org.email}
                        </a>
                        <a href={org.website} className="hover:text-[#016495] flex items-center gap-1">
                          <ExternalLink size={10} />
                          Website
                        </a>
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">{org.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column - Sidebar */}
          <aside className="space-y-8">

            {/* Important Dates Sidebar */}
            <section id="dates" className="bg-[#016495] text-white p-6 sm:p-8 rounded-sm shadow-lg">
              <h3 className="text-[#74bd44] text-lg font-display font-bold mb-6 uppercase tracking-widest flex items-center gap-2">
                <Calendar size={18} />
                Important Dates
              </h3>
              <div className="space-y-6">
                {IMPORTANT_DATES.map((item, i) => (
                  <div key={i} className="border-b border-white/10 pb-4 last:border-0">
                    <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="font-bold text-white">{item.date}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Submission Sidebar */}
            <section id="submission" className="bg-white p-6 sm:p-8 rounded-sm shadow-sm border border-gray-100">
              <h3 className="text-[#016495] text-2xl font-display font-bold mb-8 flex items-center gap-3">
                <span className="w-1 h-8 bg-[#74bd44]"></span>
                Submission
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                Submitted papers must follow the ICASSP 2027 paper style, format, and length, as specified in the{' '}
                <a href="https://2027.ieeeicassp.org/call-for-papers/" className="text-[#016495] font-semibold hover:underline">
                  ICASSP 2027 Call for Papers
                </a>
                . Papers are reviewed on the same platform as the main conference and, if accepted, published in the{' '}
                <a href="https://ieeexplore.ieee.org/Xplore/home.jsp" className="text-[#016495] font-semibold hover:underline">
                  IEEE <em>Xplore</em> Digital Library
                </a>{' '}
                with a separate workshop record number. Each accepted paper must be presented in person by one of its authors.
              </p>
              {SUBMISSION_URL ? (
                <a
                  href={SUBMISSION_URL}
                  className="w-full bg-[#0089c7] text-white py-3 rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-[#016495] transition-colors flex items-center justify-center gap-2"
                >
                  <FileText size={14} />
                  Submit Paper
                </a>
              ) : (
                <div
                  aria-disabled="true"
                  className="w-full bg-[#0089c7]/70 text-white py-3 rounded-sm font-bold text-xs uppercase tracking-widest cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <FileText size={14} />
                  Submission Link - TBD
                </div>
              )}
            </section>

            {/* At a Glance Sidebar */}
            <section id="glance" className="bg-white p-6 sm:p-8 rounded-sm shadow-sm border border-gray-100">
              <h3 className="text-[#016495] text-2xl font-display font-bold mb-8 flex items-center gap-3">
                <span className="w-1 h-8 bg-[#74bd44]"></span>
                At a Glance
              </h3>
              <div className="space-y-5 text-sm">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Format</p>
                  <p className="text-gray-700 font-semibold">Full-day satellite workshop (08:30-17:00)</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Venue</p>
                  <p className="text-gray-700 font-semibold">ICASSP 2027, Toronto, Canada</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Proceedings</p>
                  <a href="https://ieeexplore.ieee.org/Xplore/home.jsp" className="text-[#016495] font-semibold hover:underline">IEEE Xplore Digital Library</a>
                </div>
                <div className="flex items-start gap-2">
                  <Info size={14} className="text-[#016495] mt-1 flex-shrink-0" />
                  <a href="mailto:ckorgial@csd.auth.gr" className="text-[#016495] font-semibold hover:underline">
                    ckorgial@csd.auth.gr
                  </a>
                </div>
              </div>
            </section>

          </aside>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#01415f] text-white py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 border-b border-white/10 pb-12 mb-12">
            <div>
              <img
                src="/icassp27-logo.webp"
                alt="ICASSP 2027 Logo"
                className="h-20 object-contain brightness-0 invert opacity-90 mb-6"
              />
              <p className="text-xs text-gray-400 leading-relaxed">
                IEEE ICASSP is the world's largest and most comprehensive technical conference on signal processing and its
                applications, held 16-21 May 2027 in Toronto, Canada.
              </p>
            </div>
            <div>
              <h5 className="text-[#74bd44] font-display font-bold text-sm uppercase tracking-widest mb-6">Quick Links</h5>
              <ul className="text-xs text-gray-400 space-y-3">
                <li><a href="https://2027.ieeeicassp.org/" className="hover:text-white">ICASSP 2027 Official Site</a></li>
                <li><a href="https://2027.ieeeicassp.org/call-for-satellite-workshops/" className="hover:text-white">Call for Satellite Workshops</a></li>
                <li><a href="#about" className="hover:text-white">About TPAD</a></li>
                <li><a href="#dates" className="hover:text-white">Important Dates</a></li>
                <li><a href="#submission" className="hover:text-white">Call for Papers</a></li>
                <li><a href="https://ieeexplore.ieee.org/Xplore/home.jsp" className="hover:text-white">IEEE Xplore Digital Library</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[#74bd44] font-display font-bold text-sm uppercase tracking-widest mb-6">Contact</h5>
              <p className="text-xs text-gray-400 mb-4">For inquiries regarding the TPAD workshop:</p>
              <a href="mailto:ckorgial@csd.auth.gr" className="text-xs font-bold text-white hover:text-[#74bd44] flex items-center gap-2">
                <Mail size={14} />
                ckorgial@csd.auth.gr
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            <p>&copy; 2027 IEEE Signal Processing Society. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="https://www.ieee.org/about/help/site-terms-conditions.html" className="hover:text-white">Terms</a>
              <a href="https://www.ieee.org/security-privacy.html" className="hover:text-white">Privacy</a>
              <a href="https://www.ieee.org/about/corporate/governance/p9-26.html" className="hover:text-white">Nondiscrimination</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
