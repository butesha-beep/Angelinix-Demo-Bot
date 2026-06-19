module.exports = {
  start: [
    '<b>Angelinix Demo Bot</b>',
    '',
    'This is a safe scripted preview of how an agency workflow can look in Telegram.',
    'Choose a section below to explore the demo.'
  ].join('\n'),
  menu: {
    demo: 'Start 2-Minute Demo',
    dashboard: 'Dashboard Preview',
    clients: 'Clients',
    projects: 'Projects',
    analytics: 'Analytics',
    automation: 'Automation Flow',
    pricing: 'Pricing / Packages',
    contact: 'Contact Angelinix',
    language: 'Language EN/RU',
    back: '⬅ Back to Menu'
  },
  demo: {
    intro: 'Here is a quick 2-minute walkthrough of the workflow:',
    step1: 'Step 1: New lead arrives from the website inquiry form.',
    step2: 'Step 2: The lead is added to the CRM with a sanitized demo profile.',
    step3: 'Step 3: A project card is created with a sample timeline and owner.',
    step4: 'Step 4: Automation status updates are sent to the team.',
    step5: 'Step 5: Analytics summary appears with sample KPIs.',
    final: 'Want this for your business? Contact Angelinix.'
  },
  sections: {
    dashboard: [
      'Dashboard Preview',
      '',
      'Sample metrics:',
      '- Leads: 24',
      '- Conversion: 12.8%',
      '- Active projects: 7'
    ].join('\n'),
    clients: [
      'Clients',
      '',
      'Demo client list:',
      '- Northline Retail',
      '- Studio Nova',
      '- Brightworks'
    ].join('\n'),
    projects: [
      'Projects',
      '',
      'Demo project summary:',
      '- Website redesign',
      '- Automation setup',
      '- Launch campaign'
    ].join('\n'),
    analytics: [
      'Analytics',
      '',
      'Sample analytics snapshot:',
      '- Avg. response time: 18 min',
      '- Weekly reach: 1,240',
      '- Approval rate: 94%'
    ].join('\n'),
    automation: [
      'Automation Flow',
      '',
      'Automations in preview:',
      '- Auto-follow-up after 2 hours',
      '- Task reminders',
      '- Status notifications'
    ].join('\n'),
    pricing: [
      'Pricing / Packages',
      '',
      'Sample packages:',
      '- Starter: $499',
      '- Growth: $999',
      '- Custom: Contact sales'
    ].join('\n'),
    contact: 'Contact Angelinix for a custom walkthrough.'
  },
  languageChanged: 'Language set to English.'
};
