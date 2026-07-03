import { useEffect, useRef, useState } from 'react';
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

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const plans = [
  {
    tier: 'Launch Plan',
    price: '₹3,999',
    desc: 'Perfect for freelancers & personal brands',
    featured: false,
    features: [
      '1-Page Premium Website',
      'Mobile Responsive',
      'Contact Form',
      'WhatsApp Chat Integration',
      'Google Maps Integration',
      'Social Media Links',
      'Basic SEO Setup',
      'SSL Security',
      'Fast Loading Optimization',
      '1 Revision',
    ],
    cta: 'Get started',
  },
  {
    tier: 'Growth Plan',
    price: '₹8,999',
    desc: 'Perfect for small businesses & startups',
    featured: true,
    features: [
      'Up to 5 Custom Pages',
      'Custom UI/UX Design',
      'Fully Responsive Design',
      'Contact & Quote Forms',
      'WhatsApp Chat Integration',
      'Google Maps Integration',
      'Social Media Integration',
      'Google Analytics Setup',
      'Basic On-Page SEO',
      'Image & Speed Optimization',
      'Domain & Hosting Setup',
      '2 Revisions',
    ],
    cta: 'Get started',
  },
  {
    tier: 'Scale Plan',
    price: '₹17,999',
    desc: 'Perfect for growing & established brands',
    featured: false,
    features: [
      'Up to 10 Custom Pages',
      'Premium UI/UX Design',
      'Content Management System (CMS)',
      'Blog Integration',
      'Booking/Appointment System',
      'Lead Generation Forms',
      'Advanced Contact Forms',
      'Analytics & Search Console',
      'Advanced SEO Optimization',
      'Newsletter Integration',
      'Business Email Integration',
      'Performance Optimization',
      'Social Media Integration',
      '4 Revisions',
    ],
    cta: 'Get started',
  },
  {
    tier: 'Enterprise Plan',
    price: 'Starting ₹39,999',
    desc: 'Perfect for advanced functionality needs',
    featured: false,
    features: [
      'Unlimited Custom Pages',
      'Custom Web Application',
      'Admin Dashboard',
      'User Login & Authentication',
      'E-commerce Store',
      'Payment Gateway Integration',
      'Inventory & Order Management',
      'Database Integration',
      'Third-Party API Integrations',
      'Role-Based User Access',
      'Advanced Security Features',
      'Unlimited Revisions',
      'Priority Support',
      'Training & Handover',
    ],
    cta: 'Let\'s Talk',
  },
];

const includedFeatures = [
  'Modern & Professional Design',
  'Mobile, Tablet & Desktop Responsive',
  'SSL Security (HTTPS)',
  'Fast Loading Performance',
  'Cross-Browser Compatibility',
  'WhatsApp & Contact Form Integration',
  'SEO-Friendly Website Structure',
  'Deployment Assistance',
  'Scalable Architecture',
];

function PricingCard({ tier, price, desc, featured, features, cta }) {
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
        <div className="pricing-price">
          <span className="pricing-amount">{price}</span>
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
      </div>
    </div>
  );
}

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
