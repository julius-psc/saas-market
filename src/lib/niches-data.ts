import type { Niche } from './types'

export const NICHES: Niche[] = [
  {
    id: 'trades',
    name: 'Trades',
    description: 'Plumbers, electricians, HVAC, and other trade contractors',
    icon: '🔧',
    templates: [
      {
        id: 'trades-linkedin-connect',
        nicheId: 'trades',
        type: 'linkedin_connect',
        body: `Hi {{name}}, I'm doing research into how trade businesses manage their day-to-day operations — would love to connect and learn from someone running a real business in this space.`,
      },
      {
        id: 'trades-linkedin-dm',
        nicheId: 'trades',
        type: 'linkedin_dm',
        body: `Hi {{name}}, thanks for connecting. I'm currently researching the biggest operational headaches for trade businesses like {{company}}. No pitch here — I'm genuinely trying to understand where time and money get lost. What's the one thing that consistently slows your business down or costs you more than it should?`,
      },
      {
        id: 'trades-cold-email',
        nicheId: 'trades',
        type: 'cold_email',
        subject: 'Quick question about running {{company}}',
        body: `Hi {{name}},

I'm doing independent research into how trade businesses like yours handle the operational side of things — quoting, scheduling, invoicing, chasing payments — and where the biggest friction points are.

I'm not selling anything. I'm trying to understand what's genuinely broken before I consider building anything.

Would you be open to answering one question: what's the part of running {{company}} that takes the most time or causes the most headaches?

Appreciate any insight.`,
      },
    ],
  },
  {
    id: 'legal',
    name: 'Legal',
    description: 'Law firms, solo practitioners, and legal service providers',
    icon: '⚖️',
    templates: [
      {
        id: 'legal-linkedin-connect',
        nicheId: 'legal',
        type: 'linkedin_connect',
        body: `Hi {{name}}, I'm researching the operational and admin challenges facing law firms today — would love to connect with someone on the ground running a practice.`,
      },
      {
        id: 'legal-linkedin-dm',
        nicheId: 'legal',
        type: 'linkedin_dm',
        body: `Hi {{name}}, thanks for connecting. I'm doing research into how legal practices handle the non-billable side of work — intake, document management, client follow-ups, billing. Not pitching anything, genuinely curious: what administrative tasks eat the most of your or your team's time each week?`,
      },
      {
        id: 'legal-cold-email',
        nicheId: 'legal',
        type: 'cold_email',
        subject: 'Research: admin burden in legal practices',
        body: `Hi {{name}},

I'm doing research into the operational side of running a law firm — specifically the non-billable hours that eat into profitability and partner time.

No product to pitch. I'm trying to understand the real problems before deciding whether to build anything.

If you had to name the single biggest admin or operational drag on {{company}}, what would it be?

Happy to share what I'm learning from others in the industry if useful.`,
      },
    ],
  },
  {
    id: 'recruitment',
    name: 'Recruitment',
    description: 'Recruitment agencies and staffing firms',
    icon: '🤝',
    templates: [
      {
        id: 'recruitment-linkedin-connect',
        nicheId: 'recruitment',
        type: 'linkedin_connect',
        body: `Hi {{name}}, I'm researching how recruitment agencies handle the volume and quality challenges in candidate sourcing and placement — would love to connect with someone running a desk or a firm.`,
      },
      {
        id: 'recruitment-linkedin-dm',
        nicheId: 'recruitment',
        type: 'linkedin_dm',
        body: `Hi {{name}}, thanks for connecting. I'm doing research into what slows recruitment agencies down — whether it's sourcing, screening, client communication, or back-office admin. Not here to sell anything. What's the part of the job that's most frustrating or inefficient right now at {{company}}?`,
      },
      {
        id: 'recruitment-cold-email',
        nicheId: 'recruitment',
        type: 'cold_email',
        subject: 'Quick research question for {{company}}',
        body: `Hi {{name}},

I'm researching the key friction points for recruitment agencies — where time and revenue gets lost in the process from job brief to placement.

This is purely research — I'm not selling anything.

I'm curious: where does the most time get wasted in your current workflow at {{company}}? And is it on the candidate side, the client side, or internally?

Appreciate any honest take.`,
      },
    ],
  },
  {
    id: 'property-management',
    name: 'Property Management',
    description: 'Residential and commercial property management companies',
    icon: '🏠',
    templates: [
      {
        id: 'property-management-linkedin-connect',
        nicheId: 'property-management',
        type: 'linkedin_connect',
        body: `Hi {{name}}, I'm researching operational challenges in property management — tenant comms, maintenance coordination, reporting. Would love to connect with someone managing properties at scale.`,
      },
      {
        id: 'property-management-linkedin-dm',
        nicheId: 'property-management',
        type: 'linkedin_dm',
        body: `Hi {{name}}, thanks for connecting. I'm doing research into what property managers find most operationally painful — maintenance requests, lease renewals, tenant disputes, owner reporting. No pitch here. At {{company}}, what consistently takes more time or effort than it should?`,
      },
      {
        id: 'property-management-cold-email',
        nicheId: 'property-management',
        type: 'cold_email',
        subject: 'Research question — managing properties at {{company}}',
        body: `Hi {{name}},

I'm researching the day-to-day operational challenges facing property management businesses like {{company}}.

Not selling anything — I'm in research mode, trying to understand where things break down before I decide whether to build anything.

Quick question: what's the most time-consuming or frustrating recurring task your team deals with? Is it tenant communication, maintenance coordination, owner reporting, or something else entirely?

Any candid insight is genuinely appreciated.`,
      },
    ],
  },
  {
    id: 'accounting',
    name: 'Accounting',
    description: 'Accounting firms and bookkeeping practices',
    icon: '📊',
    templates: [
      {
        id: 'accounting-linkedin-connect',
        nicheId: 'accounting',
        type: 'linkedin_connect',
        body: `Hi {{name}}, I'm researching how accounting practices manage client work, compliance deadlines, and the admin load that comes with running a firm — would love to connect.`,
      },
      {
        id: 'accounting-linkedin-dm',
        nicheId: 'accounting',
        type: 'linkedin_dm',
        body: `Hi {{name}}, thanks for connecting. I'm doing research into the operational pain points for accounting practices — client onboarding, document collection, deadline management, capacity planning. Nothing to sell. What's the biggest operational bottleneck at {{company}} right now?`,
      },
      {
        id: 'accounting-cold-email',
        nicheId: 'accounting',
        type: 'cold_email',
        subject: 'Research: running an accounting practice',
        body: `Hi {{name}},

I'm doing research into how accounting and bookkeeping firms handle the operational side of the business — not the technical work, but everything around it: client communication, document chasing, deadline tracking, capacity.

Pure research, no product to pitch.

If you could fix one thing about how {{company}} currently operates, what would it be?

Even a one-line answer would be really useful.`,
      },
    ],
  },
  {
    id: 'logistics',
    name: 'Logistics',
    description: 'Courier, freight, and last-mile delivery operators',
    icon: '🚚',
    templates: [
      {
        id: 'logistics-linkedin-connect',
        nicheId: 'logistics',
        type: 'linkedin_connect',
        body: `Hi {{name}}, I'm researching operational challenges in logistics and delivery businesses — routing, driver management, customer comms. Would love to connect with someone in the thick of it.`,
      },
      {
        id: 'logistics-linkedin-dm',
        nicheId: 'logistics',
        type: 'linkedin_dm',
        body: `Hi {{name}}, thanks for connecting. I'm doing research into what costs logistics businesses the most in terms of time, margin, or customer satisfaction. No sales pitch. What's the most painful operational problem at {{company}} that you haven't fully solved yet?`,
      },
      {
        id: 'logistics-cold-email',
        nicheId: 'logistics',
        type: 'cold_email',
        subject: 'Research question for {{company}}',
        body: `Hi {{name}},

I'm researching the operational challenges that logistics operators face — things like route efficiency, driver scheduling, proof-of-delivery, exception handling, and customer notifications.

Purely research — not selling anything.

What's the biggest recurring operational headache at {{company}}? And is it more of an internal efficiency problem or a customer expectation problem?

Appreciate you taking a minute to respond.`,
      },
    ],
  },
  {
    id: 'insurance',
    name: 'Insurance',
    description: 'Insurance brokers, agents, and MGAs',
    icon: '🛡️',
    templates: [
      {
        id: 'insurance-linkedin-connect',
        nicheId: 'insurance',
        type: 'linkedin_connect',
        body: `Hi {{name}}, I'm doing research into how insurance brokers handle the admin and client management side of the business — would love to connect with someone actively running a brokerage.`,
      },
      {
        id: 'insurance-linkedin-dm',
        nicheId: 'insurance',
        type: 'linkedin_dm',
        body: `Hi {{name}}, thanks for connecting. I'm researching where insurance brokers lose the most time — renewals, client follow-ups, compliance paperwork, claims handling. Not here to pitch anything. What's the admin or process problem that costs {{company}} the most right now?`,
      },
      {
        id: 'insurance-cold-email',
        nicheId: 'insurance',
        type: 'cold_email',
        subject: 'Quick research question — insurance brokerage ops',
        body: `Hi {{name}},

I'm researching the operational and admin challenges facing insurance brokers — renewal management, compliance documentation, client communication, and everything in between.

This is pure research. I'm not selling anything.

One honest question: what's the single most time-consuming or frustrating aspect of running {{company}} that technology hasn't adequately solved for you?

Would genuinely value your perspective.`,
      },
    ],
  },
  {
    id: 'healthcare-admin',
    name: 'Healthcare Admin',
    description: 'Medical clinics, allied health practices, and healthcare administrators',
    icon: '🏥',
    templates: [
      {
        id: 'healthcare-admin-linkedin-connect',
        nicheId: 'healthcare-admin',
        type: 'linkedin_connect',
        body: `Hi {{name}}, I'm researching the administrative and operational challenges in healthcare settings — appointments, billing, patient comms. Would love to connect with someone managing this day-to-day.`,
      },
      {
        id: 'healthcare-admin-linkedin-dm',
        nicheId: 'healthcare-admin',
        type: 'linkedin_dm',
        body: `Hi {{name}}, thanks for connecting. I'm doing research into what healthcare admin teams find most inefficient — scheduling, patient no-shows, insurance claims, compliance documentation. No pitch. What's the admin problem that costs {{company}} the most time or money each week?`,
      },
      {
        id: 'healthcare-admin-cold-email',
        nicheId: 'healthcare-admin',
        type: 'cold_email',
        subject: 'Research: admin challenges in healthcare practices',
        body: `Hi {{name}},

I'm doing research into the operational and administrative burden on healthcare practices — scheduling, billing, patient follow-ups, compliance, and staff coordination.

Not selling anything. I'm trying to understand the real problems first.

What's the biggest admin inefficiency at {{company}} right now? Is it on the patient-facing side, the billing side, or something internal?

Any insight appreciated.`,
      },
    ],
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Private tutoring centres, training providers, and vocational schools',
    icon: '🎓',
    templates: [
      {
        id: 'education-linkedin-connect',
        nicheId: 'education',
        type: 'linkedin_connect',
        body: `Hi {{name}}, I'm researching the operational and admin side of running private education and training businesses — enrolments, scheduling, student communication. Would love to connect.`,
      },
      {
        id: 'education-linkedin-dm',
        nicheId: 'education',
        type: 'linkedin_dm',
        body: `Hi {{name}}, thanks for connecting. I'm doing research into what education businesses find most operationally challenging — student acquisition, enrolment admin, scheduling, compliance, parent/employer comms. Not pitching anything. What's the part of running {{company}} that drains the most time or causes the most friction?`,
      },
      {
        id: 'education-cold-email',
        nicheId: 'education',
        type: 'cold_email',
        subject: 'Research: running a training or education business',
        body: `Hi {{name}},

I'm doing research into the operational challenges for private education and training providers — enrolment management, scheduling, compliance, communication with students or employers.

Pure research — nothing to sell.

What's the biggest operational or admin challenge at {{company}} that you're dealing with right now?

Even a short response would be really valuable.`,
      },
    ],
  },
  {
    id: 'construction',
    name: 'Construction',
    description: 'General contractors, subcontractors, and construction project managers',
    icon: '🏗️',
    templates: [
      {
        id: 'construction-linkedin-connect',
        nicheId: 'construction',
        type: 'linkedin_connect',
        body: `Hi {{name}}, I'm researching how construction businesses handle project coordination, subcontractors, and the admin side of running jobs — would love to connect with someone in the industry.`,
      },
      {
        id: 'construction-linkedin-dm',
        nicheId: 'construction',
        type: 'linkedin_dm',
        body: `Hi {{name}}, thanks for connecting. I'm doing research into what causes the most pain running a construction business — project communication, quoting, variations, subcontractor management, or compliance. Not selling anything. What's the operational headache at {{company}} that keeps coming back?`,
      },
      {
        id: 'construction-cold-email',
        nicheId: 'construction',
        type: 'cold_email',
        subject: 'Research question — running projects at {{company}}',
        body: `Hi {{name}},

I'm doing research into the operational challenges for construction businesses — project coordination, quoting accuracy, variation management, subcontractor comms, and site compliance.

Not selling anything — I'm in research mode.

What's the part of running jobs at {{company}} that creates the most wasted time, cost blowouts, or client problems?

Appreciate any candid insight.`,
      },
    ],
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    description: 'Small and mid-size manufacturers and production facilities',
    icon: '🏭',
    templates: [
      {
        id: 'manufacturing-linkedin-connect',
        nicheId: 'manufacturing',
        type: 'linkedin_connect',
        body: `Hi {{name}}, I'm researching the operational and production challenges facing manufacturers — scheduling, quality control, supply chain, labour. Would love to connect with someone running a facility.`,
      },
      {
        id: 'manufacturing-linkedin-dm',
        nicheId: 'manufacturing',
        type: 'linkedin_dm',
        body: `Hi {{name}}, thanks for connecting. I'm researching the biggest operational pain points for manufacturers — production planning, supply chain disruptions, quality issues, downtime, or workforce management. No sales agenda. What's the problem that costs {{company}} the most right now?`,
      },
      {
        id: 'manufacturing-cold-email',
        nicheId: 'manufacturing',
        type: 'cold_email',
        subject: 'Research: operational challenges in manufacturing',
        body: `Hi {{name}},

I'm doing research into the operational challenges small and mid-size manufacturers face — production scheduling, inventory management, quality control, supplier reliability, and workforce coordination.

Nothing to sell. Trying to understand real problems first.

What's the operational or process challenge at {{company}} that has the biggest impact on output or profitability?

A candid response would be very useful to me.`,
      },
    ],
  },
  {
    id: 'retail-ops',
    name: 'Retail Ops',
    description: 'Retailers with physical or omnichannel operations',
    icon: '🛍️',
    templates: [
      {
        id: 'retail-ops-linkedin-connect',
        nicheId: 'retail-ops',
        type: 'linkedin_connect',
        body: `Hi {{name}}, I'm researching how retail businesses manage the operational complexity of running stores — staffing, inventory, customer experience. Would love to connect.`,
      },
      {
        id: 'retail-ops-linkedin-dm',
        nicheId: 'retail-ops',
        type: 'linkedin_dm',
        body: `Hi {{name}}, thanks for connecting. I'm doing research into what causes the most operational friction in retail — inventory management, staff scheduling, shrinkage, supplier issues, or customer experience. Not selling anything. What's the operational challenge that costs {{company}} the most in time or margin?`,
      },
      {
        id: 'retail-ops-cold-email',
        nicheId: 'retail-ops',
        type: 'cold_email',
        subject: 'Research: running retail operations at {{company}}',
        body: `Hi {{name}},

I'm researching the day-to-day operational challenges for retail businesses — staff scheduling, inventory accuracy, supplier management, returns, and the cost of getting things wrong.

Pure research, no product pitch.

What's the operational problem at {{company}} that you wish you'd solved sooner — or still haven't cracked?

Appreciate your time.`,
      },
    ],
  },
  {
    id: 'hospitality',
    name: 'Hospitality',
    description: 'Hotels, restaurants, cafes, and event venues',
    icon: '🍽️',
    templates: [
      {
        id: 'hospitality-linkedin-connect',
        nicheId: 'hospitality',
        type: 'linkedin_connect',
        body: `Hi {{name}}, I'm researching operational challenges in hospitality — staffing, reservations, supplier management, and the day-to-day of running venues. Would love to connect.`,
      },
      {
        id: 'hospitality-linkedin-dm',
        nicheId: 'hospitality',
        type: 'linkedin_dm',
        body: `Hi {{name}}, thanks for connecting. I'm researching what causes the most operational pain in hospitality businesses — staff no-shows, rostering, reservation systems, supplier reliability, food cost control. Not pitching anything. What consistently creates the most chaos or cost at {{company}}?`,
      },
      {
        id: 'hospitality-cold-email',
        nicheId: 'hospitality',
        type: 'cold_email',
        subject: 'Quick research question — {{company}}',
        body: `Hi {{name}},

I'm doing research into the operational and staffing challenges for hospitality businesses — staff management, cost control, reservations, and keeping customers happy.

Not selling anything — purely research at this stage.

What's the biggest recurring operational problem at {{company}}? And is it more of a people problem, a systems problem, or a cost problem?

Appreciate any honest answer.`,
      },
    ],
  },
  {
    id: 'marketing-agencies',
    name: 'Marketing Agencies',
    description: 'Digital and full-service marketing agencies',
    icon: '📣',
    templates: [
      {
        id: 'marketing-agencies-linkedin-connect',
        nicheId: 'marketing-agencies',
        type: 'linkedin_connect',
        body: `Hi {{name}}, I'm doing research into how marketing agencies manage delivery, client relationships, and team capacity — would love to connect with someone running a real agency.`,
      },
      {
        id: 'marketing-agencies-linkedin-dm',
        nicheId: 'marketing-agencies',
        type: 'linkedin_dm',
        body: `Hi {{name}}, thanks for connecting. I'm researching the operational pain points for agencies — scope creep, reporting overhead, client communication, team utilisation, and profit margins. Nothing to sell. What's the part of running {{company}} that creates the most hidden cost or friction?`,
      },
      {
        id: 'marketing-agencies-cold-email',
        nicheId: 'marketing-agencies',
        type: 'cold_email',
        subject: 'Research: how agencies handle delivery and client management',
        body: `Hi {{name}},

I'm doing research into the operational challenges for marketing agencies — client reporting, managing scope, team capacity, retainer profitability, and the cost of churn.

No sales pitch. I'm trying to understand real problems.

What's the operational or delivery challenge at {{company}} that has the biggest impact on your margin or team health?

Candid answers only — I'm not here to judge, just to learn.`,
      },
    ],
  },
  {
    id: 'financial-advisors',
    name: 'Financial Advisors',
    description: 'Financial planning and wealth management practices',
    icon: '💰',
    templates: [
      {
        id: 'financial-advisors-linkedin-connect',
        nicheId: 'financial-advisors',
        type: 'linkedin_connect',
        body: `Hi {{name}}, I'm researching the compliance and admin burden on financial advice practices — would love to connect with someone running a planning business or practice.`,
      },
      {
        id: 'financial-advisors-linkedin-dm',
        nicheId: 'financial-advisors',
        type: 'linkedin_dm',
        body: `Hi {{name}}, thanks for connecting. I'm researching what creates the most operational drag for financial advisors — compliance documentation, SOA preparation, client review cycles, or fee justification. Nothing to sell. At {{company}}, what administrative or compliance burden costs you the most time per client?`,
      },
      {
        id: 'financial-advisors-cold-email',
        nicheId: 'financial-advisors',
        type: 'cold_email',
        subject: 'Research: admin and compliance burden in financial advice',
        body: `Hi {{name}},

I'm doing research into the operational and compliance challenges for financial advisors and planning practices — particularly the time cost of SOA preparation, client review processes, AFSL obligations, and admin relative to revenue.

Not selling anything. Pure research.

What's the part of running {{company}} that takes the most time relative to the value it delivers to clients or the practice?

Appreciate your honesty.`,
      },
    ],
  },
  {
    id: 'event-management',
    name: 'Event Management',
    description: 'Event planning companies and production agencies',
    icon: '🎪',
    templates: [
      {
        id: 'event-management-linkedin-connect',
        nicheId: 'event-management',
        type: 'linkedin_connect',
        body: `Hi {{name}}, I'm researching how event companies manage supplier coordination, logistics, and client communication under deadline pressure — would love to connect with someone running events.`,
      },
      {
        id: 'event-management-linkedin-dm',
        nicheId: 'event-management',
        type: 'linkedin_dm',
        body: `Hi {{name}}, thanks for connecting. I'm researching the operational challenges in event management — supplier coordination, brief management, on-site logistics, post-event reporting, and client communication. Not pitching anything. What's the operational problem at {{company}} that costs you the most stress, time, or margin?`,
      },
      {
        id: 'event-management-cold-email',
        nicheId: 'event-management',
        type: 'cold_email',
        subject: 'Research question — event operations at {{company}}',
        body: `Hi {{name}},

I'm doing research into the operational challenges event businesses face — supplier management, client communication, run sheets, budget tracking, and dealing with last-minute changes.

Nothing to sell — just research.

What's the part of delivering events at {{company}} that causes the most pain or eats into your margin the most?

Any insight is genuinely appreciated.`,
      },
    ],
  },
  {
    id: 'security-firms',
    name: 'Security Firms',
    description: 'Physical security, guarding, and monitoring companies',
    icon: '🔒',
    templates: [
      {
        id: 'security-firms-linkedin-connect',
        nicheId: 'security-firms',
        type: 'linkedin_connect',
        body: `Hi {{name}}, I'm researching the operational and staffing challenges for security companies — rostering, compliance, incident reporting. Would love to connect with someone running a security business.`,
      },
      {
        id: 'security-firms-linkedin-dm',
        nicheId: 'security-firms',
        type: 'linkedin_dm',
        body: `Hi {{name}}, thanks for connecting. I'm researching the operational pain points for security firms — staff rostering, licensing compliance, incident reporting, shift no-shows, and client communication. Not pitching anything. What's the operational challenge at {{company}} that costs you the most right now?`,
      },
      {
        id: 'security-firms-cold-email',
        nicheId: 'security-firms',
        type: 'cold_email',
        subject: 'Research: running a security business',
        body: `Hi {{name}},

I'm doing research into the operational challenges for security companies — workforce management, licensing compliance, incident documentation, client reporting, and shift scheduling.

Not selling anything — pure research at this stage.

What's the biggest operational problem at {{company}} that you haven't fully solved? Is it on the workforce side, the compliance side, or the client management side?

Appreciate you taking the time.`,
      },
    ],
  },
  {
    id: 'cleaning-companies',
    name: 'Cleaning Companies',
    description: 'Commercial and residential cleaning service operators',
    icon: '🧹',
    templates: [
      {
        id: 'cleaning-companies-linkedin-connect',
        nicheId: 'cleaning-companies',
        type: 'linkedin_connect',
        body: `Hi {{name}}, I'm researching how cleaning businesses manage staff, scheduling, and quality control at scale — would love to connect with someone building in this space.`,
      },
      {
        id: 'cleaning-companies-linkedin-dm',
        nicheId: 'cleaning-companies',
        type: 'linkedin_dm',
        body: `Hi {{name}}, thanks for connecting. I'm researching what causes the most operational pain for cleaning businesses — staff reliability, scheduling, quality complaints, pricing pressure, and client retention. Nothing to sell. What's the biggest challenge at {{company}} right now?`,
      },
      {
        id: 'cleaning-companies-cold-email',
        nicheId: 'cleaning-companies',
        type: 'cold_email',
        subject: 'Quick research question — {{company}}',
        body: `Hi {{name}},

I'm researching the operational challenges cleaning businesses face — staff scheduling, quality assurance, client communication, payroll, and managing growth without things falling apart.

Not selling anything.

What's the part of running {{company}} that creates the most problems or limits your ability to grow?

Even a quick answer would be really helpful.`,
      },
    ],
  },
  {
    id: 'dental-medical',
    name: 'Dental / Medical Practices',
    description: 'Dental clinics, GP practices, and specialist medical offices',
    icon: '🦷',
    templates: [
      {
        id: 'dental-medical-linkedin-connect',
        nicheId: 'dental-medical',
        type: 'linkedin_connect',
        body: `Hi {{name}}, I'm researching the admin and patient management challenges facing dental and medical practices — appointments, billing, compliance. Would love to connect.`,
      },
      {
        id: 'dental-medical-linkedin-dm',
        nicheId: 'dental-medical',
        type: 'linkedin_dm',
        body: `Hi {{name}}, thanks for connecting. I'm doing research into what creates the most admin or operational burden in dental and medical practices — appointment management, no-shows, billing, recalls, and compliance. Not pitching anything. What's the admin problem at {{company}} that takes the most time or costs the most?`,
      },
      {
        id: 'dental-medical-cold-email',
        nicheId: 'dental-medical',
        type: 'cold_email',
        subject: 'Research: admin challenges in dental/medical practices',
        body: `Hi {{name}},

I'm doing research into the administrative and operational challenges for dental and medical practices — appointment management, patient communication, billing, recalls, and compliance requirements.

Nothing to sell. Pure research.

What's the admin or operational challenge at {{company}} that wastes the most staff time or directly impacts patient experience?

A candid answer would be very useful.`,
      },
    ],
  },
  {
    id: 'freight-customs',
    name: 'Freight / Customs Brokers',
    description: 'Freight forwarders, customs brokers, and import/export agents',
    icon: '🚢',
    templates: [
      {
        id: 'freight-customs-linkedin-connect',
        nicheId: 'freight-customs',
        type: 'linkedin_connect',
        body: `Hi {{name}}, I'm researching the operational and compliance challenges for freight and customs businesses — documentation, tracking, client communication. Would love to connect.`,
      },
      {
        id: 'freight-customs-linkedin-dm',
        nicheId: 'freight-customs',
        type: 'linkedin_dm',
        body: `Hi {{name}}, thanks for connecting. I'm researching what creates the most pain for freight and customs brokers — documentation management, compliance, shipment tracking, client updates, and managing exceptions. Not pitching anything. What's the operational problem that costs {{company}} the most right now?`,
      },
      {
        id: 'freight-customs-cold-email',
        nicheId: 'freight-customs',
        type: 'cold_email',
        subject: 'Research: operational pain points in freight and customs',
        body: `Hi {{name}},

I'm doing research into the operational challenges for freight forwarders and customs brokers — documentation, compliance, client communication, exception management, and keeping shipments on track.

Nothing to sell — genuinely just trying to understand the problems.

What's the operational or compliance challenge at {{company}} that causes the most friction or cost?

Appreciate any candid insight.`,
      },
    ],
  },
]

export const NICHE_APOLLO_KEYWORDS: Record<string, string[]> = {
  trades: ['plumbing', 'electrical contractor', 'hvac', 'trade services', 'field service'],
  legal: ['law firm', 'legal services', 'attorney', 'solicitor', 'law practice'],
  recruitment: ['staffing agency', 'recruitment', 'executive search', 'talent acquisition'],
  'property-management': ['property management', 'real estate management', 'residential property'],
  accounting: ['accounting', 'bookkeeping', 'CPA firm', 'chartered accountant'],
  logistics: ['logistics', 'courier', 'freight', 'last mile delivery', 'transportation'],
  insurance: ['insurance brokerage', 'insurance agency', 'insurance broker'],
  'healthcare-admin': ['medical clinic', 'healthcare', 'allied health', 'outpatient clinic'],
  education: ['tutoring', 'vocational training', 'training provider', 'private education'],
  construction: ['general contractor', 'construction', 'subcontractor', 'building contractor'],
  manufacturing: ['manufacturing', 'production facility', 'industrial manufacturing'],
  'retail-ops': ['retail', 'omnichannel retail', 'brick and mortar retail'],
  hospitality: ['hotel', 'restaurant', 'food and beverage', 'hospitality'],
  'marketing-agencies': ['marketing agency', 'digital marketing', 'advertising agency'],
  'financial-advisors': ['financial planning', 'wealth management', 'financial advisory'],
  'event-management': ['event planning', 'event management', 'event production'],
  'security-firms': ['security services', 'security guard', 'physical security'],
  'cleaning-companies': ['cleaning services', 'commercial cleaning', 'janitorial services'],
  'dental-medical': ['dental', 'dentistry', 'dental clinic', 'medical practice'],
  'freight-customs': ['freight forwarding', 'customs broker', 'import export', 'trade compliance'],
}

export const APOLLO_DEFAULT_TITLES = [
  'Founder',
  'CEO',
  'Chief Executive Officer',
  'Owner',
  'Managing Director',
  'Director of Operations',
  'Head of Operations',
  'CTO',
  'VP Product',
  'General Manager',
  'Operations Manager',
]

export function getNicheById(id: string): Niche | undefined {
  return NICHES.find((n) => n.id === id)
}

export function getAllNicheIds(): string[] {
  return NICHES.map((n) => n.id)
}
