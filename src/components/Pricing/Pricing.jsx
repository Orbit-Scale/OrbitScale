import { useEffect, useRef, useState, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Pricing.css';

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_URL = 'https://wa.me/919000730352';

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const plans = [
  {
    tier: 'Launch Plan',
    price: '₹3,999',
    regularPrice: '₹4,999',
    savings: 'Save ₹1,000',
    desc: 'Attractive entry price to help you close deals with small businesses',
    featured: false,
    features: [
      'Up to 3 Website Pages',
      'Website Hosting (1 Year)',
      'Mobile Responsive Website',
      '1 Premium NFC Business Card',
      '2 Design Revisions',
      '7 Days Dedicated Support',
      'SSL Certificate Included',
      'WhatsApp Chat Integration',
      'Contact Form & Google Maps',
      'Basic Security Setup',
    ],
    cta: 'Get started',
  },
  {
    tier: 'Growth Plan',
    price: '₹6,999',
    regularPrice: '₹8,499',
    savings: 'Save ₹1,500',
    desc: 'Our best-selling package. Perfect for serious businesses looking for high value',
    featured: true,
    features: [
      'Up to 5 Website Pages',
      'Custom Domain (1 Year)',
      'Website Hosting (1 Year)',
      'Mobile Responsive Website',
      '2 Premium NFC Business Cards',
      '1 NFC Contact Card',
      'Basic SEO Optimization',
      'Google Business Profile Setup',
      'Basic Analytics Integration',
      '5 Design Revisions',
      '30 Days Dedicated Support',
      'SSL Certificate Included',
      'WhatsApp Chat & Contact Form',
    ],
    cta: 'Get started',
  },
  {
    tier: 'Scale Plan',
    price: '₹10,999',
    regularPrice: '₹12,999',
    savings: 'Save ₹2,000',
    desc: 'For businesses wanting to grow online and collect reviews',
    featured: false,
    features: [
      'Up to 10 Website Pages',
      'Custom Domain (1 Year)',
      'Website Hosting (1 Year)',
      'Mobile Responsive Website',
      '5 Premium NFC Business Cards',
      '3 NFC Contact Cards',
      '3 Google Review Tap Cards',
      'Basic SEO Optimization',
      'Google Business Profile Setup',
      'Advanced Analytics Integration',
      '10 Design Revisions',
      '90 Days Dedicated Support',
      'SSL Certificate Included',
      'WhatsApp Chat & Contact Form',
    ],
    cta: 'Get started',
  },
  {
    tier: 'Elite Plan',
    price: '₹17,999+',
    regularPrice: '₹21,999+',
    savings: 'Save ₹4,000+',
    desc: 'Custom package for larger businesses with advanced requirements',
    featured: false,
    features: [
      'Unlimited Website Pages*',
      'Custom Domain (1 Year)',
      'Website Hosting (1 Year)',
      'Mobile Responsive Website',
      '10 Premium NFC Business Cards',
      '5 NFC Contact Cards',
      '10 Google Review Tap Cards',
      'Basic SEO Optimization',
      'Google Business Profile Setup',
      'Advanced Analytics Integration',
      'Unlimited Design Revisions*',
      '1 Year Priority Support',
      'SSL Certificate Included',
      'WhatsApp Chat & Contact Form',
    ],
    cta: 'Let\'s Talk',
  },
];

const includedFeatures = [
  'Mobile Responsive Website',
  'SSL Certificate (HTTPS)',
  'Website Hosting (1 Year)',
  'WhatsApp Integration',
  'Contact Form',
  'Google Maps Integration',
  'Social Media Links Integration',
  'Fast Loading Website Performance',
  'Premium NFC Business Card',
  'Basic Security Protection',
];

const PricingCard = memo(function PricingCard({ tier, price, regularPrice, savings, desc, featured, features, cta }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayFeatures = isExpanded ? features : features.slice(0, 5);
  const hasMore = features.length > 5;

  return (
    <div className={`pricing-card${featured ? ' pricing-card--featured' : ''}`}>
      {featured && (
        <div className="pricing-card-bg-effect">
          <svg className="pricing-star pricing-star-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0l2.5 7.5 7.5 2.5-7.5 2.5-2.5 7.5-2.5-7.5-7.5-2.5 7.5-2.5 2.5-7.5z"/>
          </svg>
          <svg className="pricing-star pricing-star-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0l1.5 4.5 4.5 1.5-4.5 1.5-1.5 4.5-1.5-4.5-4.5-1.5 4.5-1.5 1.5-4.5z"/>
          </svg>
          <svg className="pricing-star pricing-star-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z"/>
          </svg>
        </div>
      )}

      <div className="pricing-card-header">
        <div className="pricing-tier-row">
          <div className="pricing-tier">{tier}</div>
          {featured && <div className="pricing-badge">Popular</div>}
        </div>
        <div className="pricing-price-container">
          <div className="pricing-original-row">
            <span className="pricing-regular-price">{regularPrice}</span>
            <span className="pricing-savings-badge">{savings}</span>
          </div>
          <div className="pricing-current-row">
            <span className="pricing-amount">{price}</span>
            <span className="pricing-launch-badge">Launch Offer</span>
          </div>
        </div>
        <p className="pricing-desc">{desc}</p>
        
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`pricing-cta ${featured ? 'pricing-cta--gradient' : 'pricing-cta--ghost'}`}
        >
          {cta}
        </a>
      </div>

      <div className="pricing-features-section">
        <div className="pricing-features-title">FEATURES</div>
        <ul className="pricing-features">
          {displayFeatures.map((f, i) => (
            <li className="pricing-feature" key={i}>
              <span className="pricing-feature-icon">
                <CheckIcon />
              </span>
              <span className="pricing-feature-text">
                <span className="pricing-feature-main">{f}</span>
              </span>
            </li>
          ))}
        </ul>
        {hasMore && (
          <button 
            className="pricing-expand-btn" 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show less' : `+ ${features.length - 5} more features`}
          </button>
        )}
          <div className="pricing-expand-btn"></div>
      </div>
    </div>
  );
});

const addons = [
  { name: 'Additional Website Page', price: '₹999', period: 'per page', desc: 'Add extra custom pages to any design bundle' },
  { name: 'Premium NFC Business Card', price: '₹799', period: 'per card', desc: 'Durable smart business card with chip integration' },
  { name: 'NFC Contact Card', price: '₹1,199', period: 'per card', desc: 'Instantly share phone numbers and business details on tap' },
  { name: 'Google Review Tap Card', price: '₹1,199', period: 'per card', desc: 'Get reviews instantly by tapping cards on customer phones' },
  { name: 'Custom Domain (.com / .in)', price: '₹999', period: 'per year', desc: 'Include a custom name for your brand' },
  { name: 'Website Hosting Renewal', price: '₹1,999', period: 'per year', desc: 'Reliable hosting with SSL certificate & high speed' },
  { name: 'Extra Design Revision', price: '₹499', period: 'per revision', desc: 'Additional design tweak round beyond your plan limit' },
  { name: 'Google Business Profile Setup', price: '₹1,499', period: 'one-time', desc: 'Optimize your business for local Google maps search' },
];

export default function Pricing() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current.querySelectorAll('.pricing-card');

      gsap.set(cards, { y: 60, opacity: 0 });
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current.querySelector('.pricing-grid'),
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });

      /* Heading reveal */
      const heading = sectionRef.current.querySelector('.pricing-heading');
      const sub = sectionRef.current.querySelector('.pricing-subheading');

      gsap.set([heading, sub], { y: 30, opacity: 0 });
      gsap.to([heading, sub], {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });

      /* Addons cards reveal */
      const addonCards = sectionRef.current.querySelectorAll('.pricing-addon-card');
      if (addonCards.length > 0) {
        gsap.set(addonCards, { y: 40, opacity: 0 });
        gsap.to(addonCards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current.querySelector('.pricing-addons-grid'),
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="pricing-section" id="pricing" ref={sectionRef}>
      <div className="container">
        <div className="pricing-label">Pricing</div>
        <h2 className="pricing-heading">Simple, Transparent Pricing</h2>
        <p className="pricing-subheading">
          Choose the plan that fits your vision. Every project is crafted with precision and care.
        </p>
        <div className="pricing-grid">
          {plans.map((plan) => (
            <PricingCard key={plan.tier} {...plan} />
          ))}
        </div>

        {/* ── Add-ons & Individual Pricing ── */}
        <div className="pricing-addons-container">
          <h3 className="pricing-addons-title">🛠️ A La Carte & Individual Add-ons</h3>
          <div className="pricing-addons-grid">
            {addons.map((addon, i) => (
              <div className="pricing-addon-card" key={i}>
                <div className="pricing-addon-header">
                  <span className="pricing-addon-name">{addon.name}</span>
                  <div className="pricing-addon-price-group">
                    <span className="pricing-addon-price">{addon.price}</span>
                    <span className="pricing-addon-period">{addon.period}</span>
                  </div>
                </div>
                <p className="pricing-addon-desc">{addon.desc}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pricing-included">
          <h3 className="pricing-included-title">🌟 Included in Every Plan</h3>
          <ul className="pricing-included-list">
            {includedFeatures.map((f, i) => (
              <li className="pricing-included-item" key={i}>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
