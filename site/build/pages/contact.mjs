import { pageHero, faq, related, quoteCta, md, paras, turnstileWidget, heardAboutField } from '../lib/components.mjs';
import { SITE } from '../lib/site.mjs';

const contactMain = `<section class="section tone-white contact-section">
  <div class="container contact-grid">
    <div class="contact-copy">
      <p class="intro-lead">If the job is urgent, call rather than write.</p>
      ${paras([
        'Richard Warren owns Fence Wizards and handles every inquiry himself. He treats almost all of them as urgent, because in this trade the ones that aren\'t are the exception. If you call, he answers or calls straight back, and he\'ll quote the job verbally on that call rather than making you wait for the written proposal. That follows.',
        'Service calls get the same treatment. A fence in the way of a delivery, a gate that has to move, a run that needs extending because the site plan changed. Those calls are a normal part of the job, and general contractors get same-day service on them.',
        'For anything that isn\'t urgent, email is fine, and it\'s better for site plans, drawings and photos. Use the form and attach the file, or write directly, and include the site address so it\'s easy to match up.',
      ])}
      <ul class="contact-methods">
        <li><a href="tel:${SITE.tel}"><span class="cm-label">Phone</span><strong>${SITE.phone}</strong><small>Sales and service, answered live or called straight back.</small></a></li>
        <li><a href="mailto:${SITE.email}"><span class="cm-label">Email</span><strong>${SITE.email}</strong><small>Fine for plans, drawings and anything that isn't urgent.</small></a></li>
        <li><div><span class="cm-label">Yard</span><strong>Greenwood, IN</strong><small>Just south of Indianapolis.</small></div></li>
        <li><a href="/service-area/"><span class="cm-label">Service area</span><strong>Indy + 80 miles</strong><small>The Indianapolis metro and roughly 80 miles around downtown.</small></a></li>
      </ul>
      <div class="contact-tool">
        <h3>Price it yourself first</h3>
        <p>If you'd rather not talk yet, draw the fence on a map and the tool measures the run and shows a preliminary price you can use as a reference for a bid.</p>
        <a href="/estimate/" class="btn btn-red">Price your fence online</a>
      </div>
    </div>

    <form class="quote-form js-inquiry contact-form" data-kind="contact" novalidate>
      <h2>Send Richard <em>a message.</em></h2>
      <div class="form-row">
        <label>Name<input type="text" name="name" autocomplete="name" required maxlength="120"></label>
        <label>Phone number<input type="tel" name="phone" autocomplete="tel" required maxlength="40"></label>
      </div>
      <label>Email<input type="email" name="email" autocomplete="email" required maxlength="200"></label>
      <label><span>Project address <i class="opt-label">(optional)</i></span><input type="text" name="location" maxlength="300" placeholder="Street, city"></label>
      <label>What's the job?<textarea name="message" rows="5" maxlength="5000" required placeholder="Dates, footage, gates, anything we should know."></textarea></label>
      <label class="file-drop">
        <input type="file" name="files" multiple accept=".pdf,.png,.jpg,.jpeg,.heic,.webp,.gif,.dwg,.dxf,.kmz,.kml,.doc,.docx,.xls,.xlsx,.csv,.txt,.zip">
        <strong>Attach site plans or photos</strong>
        <span>Drag files here or click to choose. Up to 5 files, 15 MB total.</span>
        <span class="file-list"></span>
      </label>
      ${heardAboutField()}
      <label class="hp" aria-hidden="true">Leave empty<input type="text" name="fw_hp" tabindex="-1" autocomplete="off" data-1p-ignore data-lpignore="true" data-bwignore data-form-type="other"></label>
      ${turnstileWidget()}
      <button type="submit" class="btn btn-red btn-lg btn-block">Send it to Richard</button>
      <p class="form-status" role="status" aria-live="polite"></p>
      <p class="form-note">Richard reaches out within 24 hours, usually the same day. Files stay on your device until you send. If an upload gives you trouble, email it to <a href="mailto:${SITE.email}">${SITE.email}</a> with your name. <a href="/privacy/">Privacy policy</a></p>
    </form>
  </div>
</section>

<section class="section tone-dark find-us">
  <div class="container find-grid">
    <div>
      <p class="eyebrow"><span class="slash" aria-hidden="true"></span>Find us</p>
      <h2>Based in Greenwood, <em>just south of Indy.</em></h2>
      <p>Call before you drive out, because the trucks are usually on a job.</p>
      <dl class="find-facts">
        <div><dt>Address</dt><dd>${SITE.street}<br>${SITE.city}, ${SITE.region} ${SITE.zip}</dd></div>
        <div><dt>Hours</dt><dd>Open 7:30am to 9pm, seven days</dd></div>
        <div><dt>Phone</dt><dd><a href="tel:${SITE.tel}">${SITE.phone}</a></dd></div>
        <div><dt>On Google</dt><dd><a href="${SITE.mapsUrl}" target="_blank" rel="noopener">${SITE.rating.value} from ${SITE.rating.count} reviews</a></dd></div>
      </dl>
    </div>
    <div class="map-embed">
      <iframe title="Map to Fence Wizards in Greenwood, Indiana" src="https://www.google.com/maps?q=Fence+Wizards+Rent+A+Fence,+1176+Newark+Ct,+Greenwood,+IN+46143&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
    </div>
  </div>
</section>`;

export default {
  path: '/contact/',
  title: 'Contact Fence Wizards | Temporary Fence Rental Greenwood IN',
  description: 'Call (317) 296-4015. Fence Wizards rents temporary fencing, windscreen and crowd-control barricades across Indianapolis and 80 miles around downtown.',
  ogImage: 'truck-trailer-load',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Contact' }],
      eyebrow: 'Contact',
      title: 'Talk to *Richard.*',
      lede: 'He answers his own phone, for sales and for service.',
      image: 'truck-trailer-load',
      imageAlt: 'Fence Wizards truck pulling a trailer loaded with fence panels',
    }),
    contactMain,
    faq({
      heading: 'Three things *worth knowing first.*',
      intro: 'So the call is a short one and you get a number on it.',
      items: [
        { q: 'What is the fastest way to get a price?', a: 'The phone, for anything urgent. Richard answers it himself between 7:30 in the morning and 9 at night, seven days. The form on this page reaches him just as directly if it isn\'t urgent, and the [estimator](/estimate/) will give you a number without either.' },
        { q: 'What should I have ready when I call?', a: 'Where the project is, what style of fence you think you need, roughly how many linear feet, how many gates, and how long you need it. Rough is fine on all five. That\'s everything needed to price it.' },
        { q: 'Do I have to know what kind of fence I need?', a: 'No. Describe the site and what you\'re trying to keep in or out, and Richard will tell you which of the four is the right call, including when the cheaper one is the better answer.' },
      ],
    }),
    related({ current: '/contact/', cities: ['muncie', 'anderson', 'terre-haute', 'richmond', 'indianapolis', 'greenwood'] }),
    quoteCta({ eyebrow: 'Quick quote', heading: 'Or send the basics *in one go.*', text: 'Richard quotes verbally on the call, because you usually need the number before you need it in writing.' }),
  ].join('\n'),
};
