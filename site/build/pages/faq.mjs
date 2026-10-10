import { pageHero, intro, faq, related, quoteCta } from '../lib/components.mjs';

export default {
  path: '/faq/',
  title: 'Temporary Fence Rental Questions | Fence Wizards Indianapolis',
  description: 'Lead times, eight-foot fencing, payment terms, service area and what the flat fee covers. Temporary fence answers from Fence Wizards, Greenwood, Indiana.',
  ogImage: 'distribution-warehouse-panels',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Questions' }],
      eyebrow: 'Questions',
      title: 'Temporary fence rental *questions.*',
      lede: 'The answers a project manager, an event planner or a restoration contractor usually needs before the first call.',
      image: 'distribution-warehouse-panels',
      imageAlt: 'Panel fence on sandbagged stands across a paved lot in front of a warehouse loading dock',
    }),

    intro({
      lead: 'Almost every one of these comes from a project manager, an event planner or a restoration contractor who is about to spend money and wants to know what they are buying. Richard answers them the same way on the phone.',
    }),

    faq({
      eyebrow: 'Questions',
      heading: 'What it *costs.*',
      tone: 'white',
      items: [
        { q: 'How much does temporary fence rental cost in Indianapolis?', a: [
          'There\'s no one-size price. The number comes from five things: where the project is, what style of fence, how many linear feet, how many gates, and how long you need it.',
          'Give Richard those five and he will price it on the call. If you would rather not talk to anyone yet, the [estimator](/estimate/) lets you draw the run on a map and shows a preliminary price.',
        ] },
        { q: 'Do you charge rent by the month?', a: [
          'No, and this is the main thing that separates us from the national companies. The price is a [flat fee](/#pricing) agreed before the first panel goes in.',
          'If your schedule slips and the job runs long, the number doesn\'t move. There is no meter running on the fence.',
        ] },
        { q: 'Is taking the fence back down included?', a: 'Yes. The removal is already inside the number you agreed at the start, and we pull it on your schedule rather than ours. There is no collection charge at the end.' },
        { q: 'Are there damage fees?', a: 'We don\'t charge excessive damage fees. Fencing on a live construction site gets knocked, and treating that as a revenue line is a national company habit rather than a real cost.' },
        { q: 'What are your payment terms?', a: 'Net 30 is normal for clients we have worked with before. Smaller or unvetted accounts pay up front, and we say that plainly on the first call rather than at the invoice.' },
        { q: 'How quickly can I get a number I can put in a bid?', a: 'Verbally the same day, on the phone, because an estimator usually needs the figure for a bid before they need it in writing. The written proposal follows after that.' },
      ],
    }),

    faq({
      eyebrow: 'Questions',
      heading: 'Lead time and *scheduling.*',
      tone: 'steel',
      items: [
        { q: 'How much notice do you need?', a: '24 to 48 hours is the normal window and it covers most jobs. More notice always makes the install cleaner, because we can plan the run rather than improvise it.' },
        { q: 'Can you move faster than that in an emergency?', a: 'Yes. [Emergency work](/emergency-fencing/) is a regular part of this business. Timing depends on where the site is and what is already on the truck that day. Call and we will give you a real time, and if we can\'t make it work we will say so on that call.' },
        { q: 'Can you install at night or early in the morning?', a: 'Yes. Tell us your load-in window and we work to it, including overnight and before dawn.' },
        { q: 'What happens if the fence ends up in the way?', a: 'You call and we come out. Fencing is in somebody\'s way at least once on every project, and general contractors get same-day service on moves. That is the part of the job most companies are bad at, and it is the reason people call back.' },
        { q: 'Who actually does the install?', a: 'Our own crew. Richard owns the company, his father and his brother work in it, and the trucks and the material are ours rather than allocated out of a regional pool.' },
        { q: 'What are your hours?', a: 'Seven thirty in the morning to nine at night, seven days. Richard answers the phone himself for sales and for service.' },
      ],
    }),

    faq({
      eyebrow: 'Questions',
      heading: 'What we *carry.*',
      tone: 'white',
      items: [
        { q: 'What is the difference between panels and post-driven chain link?', a: [
          '[Panels](/fence/panels-and-stands/) sit in sandbagged stands on top of the ground. They go in fastest, and two people can shift a section by hand when the site plan changes.',
          '[Post-driven chain link](/fence/post-driven-chain-link/) has posts driven into the ground with chain link hung on them. It takes longer to install and it is much harder to move, which is the whole point when a perimeter has to stay shut overnight.',
        ] },
        { q: 'Do you carry eight-foot fencing?', a: 'Eight-foot fencing is available as a special order, in panels and stands and in post-driven chain link. Tell us early if the job needs it and we will confirm availability when we quote.' },
        { q: 'Can my own crew move a section?', a: 'Yes, and most of them do. That portability is the reason to choose panels over a driven fence. If a whole run needs relocating rather than a section, call us and we will come out.' },
        { q: 'Do you set gates into the run?', a: 'Yes, pedestrian gates and drive gates both. Tell us where deliveries come in, because gates in the right places save your crew an hour a day.' },
        { q: 'Is windscreen rented or sold?', a: '[Windscreen](/fence/windscreen/) is sold, not rented, and that is deliberate. It comes plain or custom printed with your own mark, which turns a perimeter into signage the length of the site.' },
        { q: 'Can you print our logo or a sponsor on the windscreen?', a: 'Yes. Custom printed windscreen is a normal order for us, and on an event or a large development it is usually the cheapest large-format signage on the job.' },
        { q: 'Can I rent barricades without any fence?', a: 'Yes, and plenty of events do. [Barricades](/fence/barricades/) are their own line. Tell us the linear footage of the queue line or the stage front and we can price it quickly.' },
        { q: 'Will panels work on asphalt or concrete?', a: 'Yes. Panels sit in stands weighted with sandbags, so they don\'t need ground that takes a driven post. That is usually the deciding factor on a paved lot or a downtown site.' },
      ],
    }),

    faq({
      eyebrow: 'Questions',
      heading: 'Where we *work.*',
      tone: 'steel',
      items: [
        { q: 'What area do you cover?', a: 'We are based in Greenwood and cover the Indianapolis metro plus roughly 80 miles around downtown. That reaches Bloomington to the south, Lafayette to the northwest, Muncie and Anderson to the northeast, Terre Haute to the west and Richmond to the east.' },
        { q: 'Does distance change the price?', a: 'Yes, for sites more than 50 driving miles from downtown Indianapolis. The distance charge shows up as its own line in the number, and we say so on the call.' },
        { q: 'What if my project is outside the 80 miles?', a: 'Call and ask. The answer is usually yes and it costs nothing to find out.' },
      ],
    }),

    faq({
      eyebrow: 'Questions',
      heading: 'Working *with us.*',
      tone: 'white',
      items: [
        { q: 'Are you insured, and can you send a certificate?', a: 'Yes to both. The commercial package is a full one: umbrella, general liability, commercial auto and workers\' compensation. Restoration companies and property managers ask for certificates before they let anyone on a site, and ours are in order.' },
        { q: 'Do you do residential fencing?', a: 'No. Ninety-nine percent of what we do is business to business, and we would rather say that on the call than after you have waited for a quote.' },
        { q: 'Do you install permanent fence?', a: [
          'No. We don\'t install permanent fence, do gate automation, do fence repairs, or sell fence material. Temporary fence rental is the whole business, on purpose.',
          'The ten-plus years of permanent fence work behind this company is the reason the temporary installs go in properly, but it is not a service we sell.',
        ] },
        { q: 'Who answers the phone?', a: 'Richard, the owner. There is no dispatch queue between you and the person who prices the job.' },
        { q: 'Where has your fence been used?', a: 'Our temporary fencing has been on sites including the NBA All-Star Game Google Pixel Event, the Final Four, Ball State University, Veterans Affairs, the Social Security Administration and White River State Park. We are naming sites our fence has stood on, not claiming the venues as customers, because on work at this scale the venue is the end user and the company that hired us is somebody else.' },
        { q: 'What kind of companies do you usually work with?', a: 'Project managers and superintendents on construction sites, demolition contractors, event planners and event companies, procurement agents buying for a municipality, a university, a corporate campus or a commercial property, and emergency restoration companies.' },
      ],
    }),

    related({ current: '/faq/', cities: ['speedway', 'plainfield', 'avon', 'brownsburg', 'franklin', 'columbus'], tone: 'paper' }),

    quoteCta({
      heading: 'Still need *a number?*',
      text: 'Answer a few questions and Richard will get back to you with a price and a date.',
    }),
  ].join('\n'),
};
