import React, { useMemo, useState } from 'react';
import {
  Page,
  Navbar,
  NavTitle,
  NavTitleLarge,
  List,
  ListItem,
  Block,
  Button,
  Card,
  CardContent,
} from 'framework7-react';

const summitDate = '2026-06-20';

const meetings = [
  {
    id: 'registration',
    title: 'Registration',
    description: 'Expo Floor',
    location: 'Expo Floor',
    start: `${summitDate}T09:00:00`,
    end: `${summitDate}T10:00:00`,
  },
  {
    id: 'keynote-ai-control-tower',
    title: 'Keynote: The AI Control Tower for Business Reinvention',
    description: 'Dave Wright, Chief Innovation Officer, ServiceNow\nPaul Odelberg, Senior Product Owner, IKEA\nJanet William Ibrahim, Manager, Partner Solution Consulting – EMEA NORTH, ServiceNow\nMartin Lindahl, VP Country Leader, ServiceNow',
    location: 'Keynote Room',
    start: `${summitDate}T10:00:00`,
    end: `${summitDate}T10:45:00`,
  },
  {
    id: 'aftermarket-at-scale',
    title: 'Industry Session: Aftermarket at Scale - Closing the Gap Between Customer Expectations, Workforce Delivery, and Untapped Margins',
    description: 'Peter Gerhardsson, Business Development CRM Manufacturing, Servicenow\nJohn Jackson, Advisory Solution Consultant, ServiceNow',
    location: 'Breakout 2',
    start: `${summitDate}T11:15:00`,
    end: `${summitDate}T11:45:00`,
  },
  {
    id: 'operational-resilience',
    title: 'Industry Session: Leveraging Operational Resilience to deliver competitive advantage',
    description: 'Anna Mazzone, EMEA AVP, Operational Resilience, Risk & Security Leader, ServiceNow',
    location: 'Breakout 1',
    start: `${summitDate}T11:15:00`,
    end: `${summitDate}T11:45:00`,
  },
  {
    id: 'vibe-code-enterprise-apps',
    title: 'Product Session: Vibe Code Enterprise Apps From Idea to Production',
    description: 'David Romehed, Solution sales specialist, ServiceNow',
    location: 'Breakout 5',
    start: `${summitDate}T11:15:00`,
    end: `${summitDate}T11:45:00`,
  },
  {
    id: 'government-human-led-ai-operated',
    title: 'Industry Session: Government that is Human-led and AI-operated',
    description: 'Alexander Olofsson, Enterprise Account Executive, ServiceNow',
    location: 'Breakout 3',
    start: `${summitDate}T11:15:00`,
    end: `${summitDate}T11:45:00`,
  },
  {
    id: 'employeeworks-ai-front-door',
    title: 'Product Session: ServiceNow EmployeeWorks - The AI front door for employees',
    description: 'Fredrik Aldestrom, Autonomous Employee Workflows Specialist, ServiceNow\nRikard Neidenmark, Moveworks Solution Sales, ServiceNow',
    location: 'Breakout 4',
    start: `${summitDate}T11:15:00`,
    end: `${summitDate}T11:45:00`,
  },
  {
    id: 'agentic-experience-orchestration',
    title: 'Round Table: From AI Assistants to Autonomous Outcomes: Agentic Experience Orchestration with Genesys Cloud and ServiceNow',
    description: 'Joakim Skalberg, Sr Principal Solutions Consultant, Genesys',
    location: 'Round Table',
    start: `${summitDate}T11:55:00`,
    end: `${summitDate}T12:25:00`,
  },
  {
    id: 'ai-control-tower-govern-secure',
    title: 'Product Session: AI Control Tower - From AI Chaos to Control: Govern and Secure ANY AI',
    description: 'Dale Cheeseman, EMEA Director AI & Data Architects, ServiceNow\nØyvind Fosse, Senior AI Solutions Architect, ServiceNow',
    location: 'Breakout 2',
    start: `${summitDate}T11:55:00`,
    end: `${summitDate}T12:25:00`,
  },
  {
    id: 'veza-security-vector',
    title: 'Product Session: Managing the expanding security vector with Veza',
    description: 'Anna Mazzone, EMEA AVP, Operational Resilience, Risk & Security Leader, ServiceNow',
    location: 'Breakout 1',
    start: `${summitDate}T11:55:00`,
    end: `${summitDate}T12:25:00`,
  },
  {
    id: 'retail-connected-operations',
    title: 'Industry Session: ServiceNow for Retail - Connected Operations, Exceptional Experiences',
    description: 'Martin Wallen, Account Executive, ServiceNow',
    location: 'Breakout 5',
    start: `${summitDate}T11:55:00`,
    end: `${summitDate}T12:25:00`,
  },
  {
    id: 'recap-from-knowledge',
    title: 'Recap from Knowledge',
    description: 'Kerem Aktas, Director, Solution Consulting, ServiceNow',
    location: 'Breakout 4',
    start: `${summitDate}T11:55:00`,
    end: `${summitDate}T12:25:00`,
  },
  {
    id: 'lunch',
    title: 'Lunch',
    description: 'Expo Floor',
    location: 'Expo Floor',
    start: `${summitDate}T12:25:00`,
    end: `${summitDate}T13:20:00`,
  },
  {
    id: 'identity-access-governance-at-ncc',
    title: 'Partner Session: Building Unified Identity & Access Governance at NCC',
    description: 'Faisal Al-Wehliye, Product Owner, NCC AB\nJohan Sandberg, Enterprise Architect, NCC AB',
    location: 'Breakout 3',
    start: `${summitDate}T13:20:00`,
    end: `${summitDate}T13:50:00`,
  },
  {
    id: 'operational-technology',
    title: 'Product Session: Operational Technology - Reduce Downtime Without Adding Complexity to Your Shop Floor',
    description: 'Robert Rash, Product Management Director – Operational Technology, ServiceNow',
    location: 'Breakout 5',
    start: `${summitDate}T13:20:00`,
    end: `${summitDate}T13:50:00`,
  },
  {
    id: 'risk-compliance-connected-defense',
    title: 'Product Session: Enterprise-wide Risk & Compliance - Build a Connected Risk Defense Across Your Business, Fueled by AI',
    description: 'Magnus Wettainen, Advisory Solution Consultant Risk & Security, Servicenow',
    location: 'Breakout 1',
    start: `${summitDate}T13:20:00`,
    end: `${summitDate}T13:50:00`,
  },
  {
    id: 'autonomous-it-focus-people',
    title: 'Solution Spotlight: Autonomous IT - Focus People on What Matters',
    description: 'Peter Lau Mjoeen, Senior Solution Sales Executive, Technology Workflows, ServiceNow\nKim Rasmussen, Principle Solution Consultant, ServiceNow',
    location: 'Breakout 2',
    start: `${summitDate}T13:20:00`,
    end: `${summitDate}T13:50:00`,
  },
  {
    id: 'ifs-institutional-knowledge',
    title: 'Partner Session: Scaling IF’s Institutional Knowledge through AI Augmentation',
    description: 'Oscar Hjelmer, ServiceNow Solution Architect, The Cloud People\nBjørn Rasmussen, Architect, IF Insurance\nSami Rantanen, Head of Quality & Support Finland, If Vahinkovakuutus Oy\nSuvi Lampinen, Product Owner, If Insurance',
    location: 'Breakout 4',
    start: `${summitDate}T13:20:00`,
    end: `${summitDate}T13:50:00`,
  },
  {
    id: 'stena-autonomous-it',
    title: 'Partner Session: Stena’s Journey to Autonomous IT',
    description: 'Elmer de Valk, CEO, Plat4mation\nPernilla Aponte, Head of Stratagy & Governance, Stena',
    location: 'Breakout 1',
    start: `${summitDate}T14:00:00`,
    end: `${summitDate}T14:30:00`,
  },
  {
    id: 'secure-ai-use-cases',
    title: 'Partner Session: Identify and secure the AI use cases that matter for YOU',
    description: 'Sébastien Fix, Risk, Security & Trusted AI Lead, KPMG',
    location: 'Breakout 4',
    start: `${summitDate}T14:00:00`,
    end: `${summitDate}T14:30:00`,
  },
  {
    id: 'strategic-portfolio-management',
    title: 'Product Session: Strategic Portfolio Management - Leverage Strategic Portfolio Management AI to move from Roadmap to Reality',
    description: 'Hampus Ohlén, Advisory Solution Consultant, ServiceNow',
    location: 'Breakout 5',
    start: `${summitDate}T14:00:00`,
    end: `${summitDate}T14:30:00`,
  },
  {
    id: 'autonomous-crm',
    title: 'Solution Spotlight: Autonomous CRM - Smarter Service, Faster Sales',
    description: 'Atilla Onur, SC, Servicenow\nNeil Kostecki, Director, Product Outbound Product Management, ServiceNow',
    location: 'Breakout 2',
    start: `${summitDate}T14:00:00`,
    end: `${summitDate}T14:30:00`,
  },
  {
    id: 'swedbank-supplier-risk',
    title: 'Partner session: Listen to Swedbank’s Supplier Risk and Contract Management journey',
    description: 'Siddharth Bhansali, Associate Partner, Ey\nHanna-Li Malmström, Head of TPRM Assurance Office, Swedbank',
    location: 'Breakout 3',
    start: `${summitDate}T14:00:00`,
    end: `${summitDate}T14:30:00`,
  },
  {
    id: 'armis-centrix',
    title: 'Product Session: Armis Centrix - Turning Asset Data into Security Action',
    description: 'Hampus Hedvall, Solution Architect, Armis',
    location: 'Breakout 4',
    start: `${summitDate}T14:40:00`,
    end: `${summitDate}T15:10:00`,
  },
  {
    id: 'securing-ai-workforce',
    title: 'Solution Spotlight: Securing the Invisible AI Workforce - Are You Ready?',
    description: 'David Hyborn, Director Solution Sales - Risk & Security, ServiceNow\nNiklas Eklöv, Senior Security Engineer, ServiceNow',
    location: 'Breakout 2',
    start: `${summitDate}T14:40:00`,
    end: `${summitDate}T15:10:00`,
  },
  {
    id: 'autonomous-it-microsoft',
    title: 'Partner Session: Autonomous IT with ServiceNow and Microsoft',
    description: 'Anders Risberg, EPS Lead Sweden, Microsoft',
    location: 'Breakout 1',
    start: `${summitDate}T14:40:00`,
    end: `${summitDate}T15:10:00`,
  },
  {
    id: 'nowassist-first-120-days',
    title: 'Customer session: From Pilot to Daily Use: What We Learned in Our First 120 Days with NowAssist',
    description: 'Anshuman Anshuman, Head, AI Enabled Services, Business Automation, H&M\nSajan Cherian, Area Manager, H&M',
    location: 'Breakout 3',
    start: `${summitDate}T14:40:00`,
    end: `${summitDate}T15:10:00`,
  },
  {
    id: 'sales-order-management-cpq',
    title: 'Product Session: Sales Order Management, CPQ - Accelerate Sales Workflows with AI: From Lead to Quote to Order',
    description: 'Nigel Ruddell, CPQ Lead North, ServiceNow\nBrian O\'Grady, Solution Consultant, ServiceNow\nKamryn McKell, Director, Sales CRM Solution Consulting, ServiceNow',
    location: 'Breakout 5',
    start: `${summitDate}T14:40:00`,
    end: `${summitDate}T15:10:00`,
  },
  {
    id: 'coffee-break',
    title: 'Coffee Break',
    description: 'Expo Floor',
    location: 'Expo Floor',
    start: `${summitDate}T15:10:00`,
    end: `${summitDate}T15:20:00`,
  },
  {
    id: 'road-to-autonomous-workflows',
    title: 'Partner session: Customer Session - Road to Autonomous Workflows - How to Get Started and Scale AI',
    description: 'Juha Kujala, Executive CTO, Sofigate\nJenny Ljungqvist, Head of Service Management, Coor',
    location: 'Breakout 4',
    start: `${summitDate}T15:30:00`,
    end: `${summitDate}T16:00:00`,
  },
  {
    id: 'manufacturing-sales-service',
    title: 'Industry Session: Manufacturing Sales and Service',
    description: 'Abhi Rele, Head of Product, Manufacturing, ServiceNow',
    location: 'Breakout 3',
    start: `${summitDate}T15:30:00`,
    end: `${summitDate}T16:00:00`,
  },
  {
    id: 'third-party-risk-management',
    title: 'Partner Session: From Manual to Intelligent: AI in Third-Party Risk Management',
    description: 'Jørgen Kongsberg, Senior Engineer, Sopra Steria\nAina Wangsmo, Senior ServiceNow Developer, Sopra Steria',
    location: 'Breakout 1',
    start: `${summitDate}T15:30:00`,
    end: `${summitDate}T16:00:00`,
  },
  {
    id: 'ditch-the-busywork',
    title: 'Solution spotlight: Ditch the Busywork. Free Your People',
    description: 'Fredrik Aldestrom, Autonomous Employee Workflows Specialist, ServiceNow\nMaija Mettälä, Advisory Solution Consultant, ServiceNow\nSybille Mortensen, Solution Sales Director, Employee Experience and HR Workflows (Nordics and Benelux), ServiceNow',
    location: 'Breakout 2',
    start: `${summitDate}T15:30:00`,
    end: `${summitDate}T16:00:00`,
  },
  {
    id: 'security-operations',
    title: 'Product Session: Security Operations - Drive Cyber Resilience and Automate Exposure Management',
    description: 'Niklas Eklöv, Senior Security Engineer, ServiceNow\nKim Lunden, Sr Solution Sales Risk and Security, ServiceNow Inc',
    location: 'Breakout 5',
    start: `${summitDate}T15:30:00`,
    end: `${summitDate}T16:00:00`,
  },
  {
    id: 'locknote',
    title: 'Locknote',
    description: 'Elin Hauge, Tech and Business Strategist, Elin Hauge AS',
    location: 'Keynote Room',
    start: `${summitDate}T16:30:00`,
    end: `${summitDate}T17:15:00`,
  },
  {
    id: 'drinks-reception',
    title: 'Drinks @ Reception',
    description: 'Expo Floor',
    location: 'Expo Floor',
    start: `${summitDate}T17:15:00`,
    end: `${summitDate}T18:00:00`,
  },
];

const pad = (value) => String(value).padStart(2, '0');
const toIcsDate = (input) => {
  const date = new Date(input);
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
};
const escapeIcsText = (value) => value
  .replaceAll('\\', '\\\\')
  .replaceAll(';', '\\;')
  .replaceAll(',', '\\,')
  .replaceAll('\n', '\\n');

const buildIcs = (meeting) => {
  const stamp = toIcsDate(new Date().toISOString());
  const uid = `${meeting.id}@sn-ai-summit`;
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//SN AI Summit//Meetings//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${toIcsDate(meeting.start)}`,
    `DTEND:${toIcsDate(meeting.end)}`,
    `SUMMARY:${escapeIcsText(meeting.title)}`,
    `DESCRIPTION:${escapeIcsText(meeting.description)}`,
    `LOCATION:${escapeIcsText(meeting.location)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
};

const HomePage = () => {
  const [selectedId, setSelectedId] = useState(meetings[0]?.id ?? '');
  const selectedMeeting = useMemo(
    () => meetings.find((meeting) => meeting.id === selectedId),
    [selectedId],
  );

  const calendarUrl = useMemo(() => {
    if (!selectedMeeting) return '#';
    const ics = buildIcs(selectedMeeting);
    return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
  }, [selectedMeeting]);

  return (
    <Page name="home">
      <Navbar large>
        <NavTitle>SN AI Summit</NavTitle>
        <NavTitleLarge>SN AI Summit</NavTitleLarge>
      </Navbar>
      <Block strong inset>
        <p>Select a session from the full event agenda and add it to your iOS Calendar.</p>
      </Block>
      <List mediaList inset strongIos dividersIos>
        {meetings.map((meeting) => (
          <ListItem
            key={meeting.id}
            title={meeting.title}
            subtitle={`${new Date(meeting.start).toLocaleString()} - ${new Date(meeting.end).toLocaleTimeString()}`}
            text={meeting.location}
            radio
            checked={selectedId === meeting.id}
            name="meeting"
            onChange={() => setSelectedId(meeting.id)}
          />
        ))}
      </List>
      {selectedMeeting && (
        <Card inset>
          <CardContent padding>
            <p><strong>Selected:</strong> {selectedMeeting.title}</p>
            <p style={{ whiteSpace: 'pre-line' }}>{selectedMeeting.description}</p>
            <p><strong>Location:</strong> {selectedMeeting.location}</p>
            <Button
              fill
              external
              target="_blank"
              rel="noopener noreferrer"
              href={calendarUrl}
              download={`${selectedMeeting.id}.ics`}
            >
              Add to iOS Calendar
            </Button>
          </CardContent>
        </Card>
      )}
    </Page>
  );
};

export default HomePage;
