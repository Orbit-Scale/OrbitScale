import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowLeft, 
  Star, 
  MessageSquare, 
  ShieldCheck, 
  Smartphone, 
  Share2, 
  Compass, 
  TrendingUp, 
  Search, 
  MapPin, 
  Layout, 
  Zap, 
  Award, 
  MousePointer, 
  Globe 
} from 'lucide-react';
import { useLenis } from '../../contexts/LenisContext';
import './ServiceDetail.css';

gsap.registerPlugin(ScrollTrigger);

export const serviceData = {
  'google-reviews-boosting': {
    title: 'Google Reviews Boosting',
    subtitle: 'Dominate Google Maps & Rank #1 in Local Search',
    description: 'Turn happy customers into your most powerful marketing channel. Our automated Google Review boosting system simplifies the feedback loop, enhances local SEO, and shields your business from negative ratings.',
    whyTitle: 'Why Ratings Matter',
    whyDesc: '93% of consumers say online reviews influence their purchasing decisions. Higher ratings directly translate into better local pack placements on Google Maps and search results, driving free organic leads to your doorstep daily.',
    whyMetrics: [
      { value: '4.8★', label: 'Average Target Rating' },
      { value: '+250%', label: 'Local Map Views' },
      { value: '3.6x', label: 'Conversion Lift' },
    ],
    features: [
      {
        icon: <MessageSquare className="feature-icon" />,
        title: 'Smart Request System',
        desc: 'Reach customers via automated, personalized WhatsApp or SMS campaigns at the perfect moment post-purchase.'
      },
      {
        icon: <ShieldCheck className="feature-icon" />,
        title: 'Private Feedback Shield',
        desc: 'Direct happy customers to Google Maps, while routing unhappy customers to a private form to resolve issues internally.'
      },
      {
        icon: <Zap className="feature-icon" />,
        title: 'NFC Tap-to-Review',
        desc: 'Custom physical NFC plaques or cards that invite customers to leave a review with a single tap of their phone.'
      },
      {
        icon: <TrendingUp className="feature-icon" />,
        title: 'Ranking Analytics',
        desc: 'Monitor review growth, rating statistics, and map visibility improvements in one single dashboard.'
      }
    ],
    process: [
      {
        num: '01',
        title: 'Connection & Setup',
        desc: 'We securely integrate your Google Business Profile with our intelligent feedback routing software.'
      },
      {
        num: '02',
        title: 'Custom QR & NFC Material',
        desc: 'We design and ship custom-branded NFC stands, badges, and print-ready QR codes for your physical storefront.'
      },
      {
        num: '03',
        title: 'Automated Triggers',
        desc: 'Connect your POS or CRM to automatically prompt clients after a purchase or visit completion.'
      },
      {
        num: '04',
        title: 'Monitor & Rise',
        desc: 'Manage reviews, reply with AI-suggested responses, and watch your business rise in local searches.'
      }
    ],
    visualType: 'google-review'
  },
  'nfcs': {
    title: "NFC's",
    subtitle: 'Bridge the Physical & Digital Worlds Instantly',
    description: 'Make a lasting impression with Near Field Communication. Enable clients to access your contact cards, menu, social profiles, or app download page with a simple tap—no app installation or camera scanning required.',
    whyTitle: 'The Future of Connectivity',
    whyDesc: 'Traditional paper business cards and paper menus are easily lost, outdated, and wasteful. NFC technology offers a dynamic, interactive, and sustainable way to share information instantly, track engagement, and update details on the fly.',
    whyMetrics: [
      { value: '1 Tap', label: 'To Share Details' },
      { value: '100%', label: 'Eco-Friendly' },
      { value: 'Infinite', label: 'Updates Anytime' },
    ],
    features: [
      {
        icon: <Smartphone className="feature-icon" />,
        title: 'Digital Contact Sharing',
        desc: 'Share contact details, portfolio links, and social profiles in 1 second. Save directly to their contact book.'
      },
      {
        icon: <Award className="feature-icon" />,
        title: 'Premium Smart Hardware',
        desc: 'Choose from premium matte metal cards, wooden stands, wall plaques, or waterproof coasters.'
      },
      {
        icon: <Globe className="feature-icon" />,
        title: 'Dynamic Profiles',
        desc: 'Manage and update the destination URL of your physical cards instantly, without ever reprinting.'
      },
      {
        icon: <Share2 className="feature-icon" />,
        title: 'Engagement Tracking',
        desc: 'Monitor tap locations, device types, and click-through rates in real time via your analytics board.'
      }
    ],
    process: [
      {
        num: '01',
        title: 'Choose Your Hardware',
        desc: 'Select from matte black metal cards, wooden counters, tags, or custom branded keyrings.'
      },
      {
        num: '02',
        title: 'Custom Brand Styling',
        desc: 'Send your logo and custom layout files; we design and laser-engrave or UV print with premium finishes.'
      },
      {
        num: '03',
        title: 'Profile Landing Page',
        desc: 'Set up your dynamic virtual business card, listing contact buttons, files, map coordinates, and social handles.'
      },
      {
        num: '04',
        title: 'Tap to Connect',
        desc: 'We link, program, and ship your hardware. Start creating instant physical connections out in the wild.'
      }
    ],
    visualType: 'nfc-tap'
  },
  'boosting-online-presence': {
    title: 'Boosting Online Presence',
    subtitle: 'Expand Your Digital Footprint & Capture More Leads',
    description: 'Stop losing customers to visible competitors. We optimize your local listings, launch custom SEO campaigns, and manage search indexing to ensure your business stands out wherever customers are searching.',
    whyTitle: 'Get Discovered',
    whyDesc: 'If you do not exist on the first page of Google, you do not exist for 75% of searchers. Boosting your online presence builds organic authority, trust, and continuous inbound calls without reliance on expensive ads.',
    whyMetrics: [
      { value: '+180%', label: 'Search Traffic' },
      { value: 'Top 3', label: 'Local Map Pack' },
      { value: '50+', label: 'Search Engines Synced' },
    ],
    features: [
      {
        icon: <Search className="feature-icon" />,
        title: 'Local SEO Mastery',
        desc: 'Claim, merge, and optimize your listings on Google Maps, Apple Maps, Bing, and Yelp for maximum authority.'
      },
      {
        icon: <Compass className="feature-icon" />,
        title: 'Directory Synchronization',
        desc: 'Sync and update business details across 50+ high-authority global business directories instantly.'
      },
      {
        icon: <TrendingUp className="feature-icon" />,
        title: 'Search Intent Targeting',
        desc: 'Identify and rank for high-intent search queries that potential customers use when ready to buy.'
      },
      {
        icon: <MapPin className="feature-icon" />,
        title: 'Geofenced Dominance',
        desc: 'Build coordinate-specific citation clusters to rank in surrounding neighborhoods and target service areas.'
      }
    ],
    process: [
      {
        num: '01',
        title: 'Comprehensive Audit',
        desc: 'We scan your directory citations, page indexing, search ranks, and competitor presence.'
      },
      {
        num: '02',
        title: 'Profile Optimization',
        desc: 'We clean up listing inaccuracies, claim active profiles, and update high-converting metadata.'
      },
      {
        num: '03',
        title: 'Authority Link Building',
        desc: 'Generate map citations and high-quality directory mentions to signal trust to search engines.'
      },
      {
        num: '04',
        title: 'Growth Tracking',
        desc: 'Access clean monthly performance reports showing traffic sources, keyword placements, and lead conversions.'
      }
    ],
    visualType: 'presence-grow'
  },
  'website-designing': {
    title: 'Website Designing',
    subtitle: 'Bespoke Digital Art That Converts Visitors Into Clients',
    description: 'Your website is your ultimate brand ambassador. We design and develop premium, glassmorphic websites featuring fluid animations, optimal layout architecture, and lightning-fast loading speeds.',
    whyTitle: 'Designed for Growth',
    whyDesc: 'A poorly designed website costs you sales. A premium, modern web experience keeps users engaged longer, communicates your brand value instantly, and leads to massive conversion rate boosts.',
    whyMetrics: [
      { value: '100%', label: 'Google PageSpeed Score' },
      { value: '<1s', label: 'Load Time Goal' },
      { value: '2.4x', label: 'Average CTR Boost' },
    ],
    features: [
      {
        icon: <Layout className="feature-icon" />,
        title: 'Glassmorphic Design',
        desc: 'A gorgeous, futuristic look featuring blur backdrops, fine border lines, neon accents, and dark modes.'
      },
      {
        icon: <Zap className="feature-icon" />,
        title: 'Fluid GSAP Animations',
        desc: 'Incredible scroll-driven reveals, parallax segments, and hovering animations that feel alive.'
      },
      {
        icon: <MousePointer className="feature-icon" />,
        title: 'Engineered for Performance',
        desc: 'Optimized build files, fast image loading, semantic HTML, and accessibility compliance.'
      },
      {
        icon: <Globe className="feature-icon" />,
        title: 'Responsive Perfection',
        desc: 'Flawless design on desktop, tablet, and mobile with strict grid matching and fluid typographies.'
      }
    ],
    process: [
      {
        num: '01',
        title: 'Concept & Architecture',
        desc: 'Define structure, user flows, content outline, and reference visual references.'
      },
      {
        num: '02',
        title: 'Premium UI Mockups',
        desc: 'Create highly detailed screen mockups showcasing visual typography, dark-themes, and interactive nodes.'
      },
      {
        num: '03',
        title: 'Vite & React Development',
        desc: 'Program with high-performance frameworks, clean CSS structure, and customized components.'
      },
      {
        num: '04',
        title: 'Auditing & Deployment',
        desc: 'Run comprehensive search engine, accessibility, speed, and cross-browser quality checks before release.'
      }
    ],
    visualType: 'design-web'
  }
};

const CheckIcon = () => (
  <svg
    className="check-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const pricingData = {
  'google-reviews-boosting': {
    plans: [
      {
        name: 'Scale Plan',
        price: '₹10,999',
        regularPrice: '₹12,999',
        featured: false,
        features: [
          '3 Google Review Tap Cards included',
          'Google Business Profile Setup & Optimization',
          'Intelligent Feedback Routing System',
          'Automatic WhatsApp Post-Purchase Prompts',
          'Private Negative Feedback Shielding',
          '90 Days Dedicated Setup Support',
        ],
      },
      {
        name: 'Elite Plan',
        price: '₹17,999+',
        regularPrice: '₹21,999+',
        featured: true,
        features: [
          '10 Google Review Tap Cards included',
          'Google Business Profile Setup & Optimization',
          'Intelligent Feedback Routing System',
          'Automatic WhatsApp Post-Purchase Prompts',
          'Private Negative Feedback Shielding',
          '1 Year Priority Dedicated Support',
          'AI-Suggested Response Dashboard',
        ],
      },
    ],
    addons: [
      { name: 'Google Review Tap Card', price: '₹1,199', period: 'per card', desc: 'Durable custom printed card to get reviews on tap' },
      { name: 'Google Business Profile Setup', price: '₹1,499', period: 'one-time', desc: 'Verify, optimize, and list your business on local maps' },
    ],
  },
  'nfcs': {
    plans: [
      {
        name: 'Launch Plan',
        price: '₹3,999',
        regularPrice: '₹4,999',
        featured: false,
        features: [
          '1 Premium NFC Business Card included',
          'Custom Brand Logo Laser Engraving',
          'Dynamic Link Redirection Profile',
          'Fast Loading Landing Page Profile',
          '7 Days Setup Support',
        ],
      },
      {
        name: 'Growth Plan',
        price: '₹6,999',
        regularPrice: '₹8,499',
        featured: true,
        features: [
          '2 Premium NFC Business Cards included',
          '1 NFC Contact Card included',
          'Custom Brand Logo & Layout Styling',
          'Dynamic Link Redirection Profile',
          'Interactive Digital Business Card Profile',
          '30 Days Dedicated Setup Support',
        ],
      },
      {
        name: 'Scale Plan',
        price: '₹10,999',
        regularPrice: '₹12,999',
        featured: false,
        features: [
          '5 Premium NFC Business Cards included',
          '3 NFC Contact Cards included',
          '3 Google Review Tap Cards included',
          'Custom Laser Engraving or UV Printing',
          'Dynamic Link Redirection Profiles',
          '90 Days Dedicated Support',
        ],
      },
      {
        name: 'Elite Plan',
        price: '₹17,999+',
        regularPrice: '₹21,999+',
        featured: false,
        features: [
          '10 Premium NFC Business Cards included',
          '5 NFC Contact Cards included',
          '10 Google Review Tap Cards included',
          'Premium Hardware Finishes & Custom Layouts',
          'Dynamic Profiles & Campaign Management',
          '1 Year Priority Support',
        ],
      },
    ],
    addons: [
      { name: 'Premium NFC Business Card', price: '₹799', period: 'per card', desc: 'Durable smart business card with chip integration' },
      { name: 'NFC Contact Card', price: '₹1,199', period: 'per card', desc: 'Instantly share phone numbers and business details on tap' },
      { name: 'Google Review Tap Card', price: '₹1,199', period: 'per card', desc: 'Get reviews instantly by tapping cards on customer phones' },
    ],
  },
  'boosting-online-presence': {
    plans: [
      {
        name: 'Growth Plan',
        price: '₹6,999',
        regularPrice: '₹8,499',
        featured: true,
        features: [
          'Basic SEO Optimization',
          'Google Business Profile Setup & Optimization',
          'Local Directory Syncing (Top 10 directories)',
          'Basic Performance Analytics Setup',
          '30 Days Dedicated Setup Support',
        ],
      },
      {
        name: 'Scale Plan',
        price: '₹10,999',
        regularPrice: '₹12,999',
        featured: false,
        features: [
          'Basic SEO Optimization',
          'Google Business Profile Setup & Optimization',
          'Directory Synchronization (Top 30 directories)',
          'Advanced Web Analytics Integration',
          'Lead Generation citation creation',
          '90 Days Dedicated Support',
        ],
      },
      {
        name: 'Elite Plan',
        price: '₹17,999+',
        regularPrice: '₹21,999+',
        featured: false,
        features: [
          'Basic SEO Optimization',
          'Google Business Profile Setup & Optimization',
          'Full Directory Synchronization (50+ directories)',
          'Advanced Web Analytics Integration',
          'Geofenced citation building',
          '1 Year Priority Dedicated Support',
        ],
      },
    ],
    addons: [
      { name: 'Google Business Profile Setup', price: '₹1,499', period: 'one-time', desc: 'Optimize your business for local Google maps search' },
      { name: 'Custom Domain (.com / .in)', price: '₹999', period: 'per year', desc: 'Include a custom name for your brand' },
      { name: 'Website Hosting Renewal', price: '₹1,999', period: 'per year', desc: 'Reliable hosting with SSL certificate & high speed' },
    ],
  },
  'website-designing': {
    plans: [
      {
        name: 'Launch Plan',
        price: '₹3,999',
        regularPrice: '₹4,999',
        featured: false,
        features: [
          'Up to 3 Website Pages',
          'Website Hosting (1 Year) & SSL',
          'Mobile Responsive Website',
          '1 Premium NFC Business Card included',
          '2 Design Revisions',
          '7 Days Dedicated Support',
        ],
      },
      {
        name: 'Growth Plan',
        price: '₹6,999',
        regularPrice: '₹8,499',
        featured: true,
        features: [
          'Up to 5 Website Pages',
          'Custom Domain (1 Year)',
          'Website Hosting (1 Year) & SSL',
          'Mobile Responsive Website',
          '2 Premium NFC Business Cards & 1 Contact Card',
          '5 Design Revisions',
          '30 Days Dedicated Support',
        ],
      },
      {
        name: 'Scale Plan',
        price: '₹10,999',
        regularPrice: '₹12,999',
        featured: false,
        features: [
          'Up to 10 Website Pages',
          'Custom Domain (1 Year)',
          'Website Hosting (1 Year) & SSL',
          'Mobile Responsive Website',
          '5 Premium NFC Business Cards & 3 Contact Cards',
          '10 Design Revisions',
          '90 Days Dedicated Support',
        ],
      },
      {
        name: 'Elite Plan',
        price: '₹17,999+',
        regularPrice: '₹21,999+',
        featured: false,
        features: [
          'Unlimited Website Pages*',
          'Custom Domain (1 Year)',
          'Website Hosting (1 Year) & SSL',
          'Mobile Responsive Website',
          '10 Premium NFC Business Cards & 5 Contact Cards',
          'Unlimited Design Revisions*',
          '1 Year Priority Dedicated Support',
        ],
      },
    ],
    addons: [
      { name: 'Additional Website Page', price: '₹999', period: 'per page', desc: 'Add extra custom pages to any design bundle' },
      { name: 'Extra Design Revision', price: '₹499', period: 'per revision', desc: 'Additional design tweak round beyond your plan limit' },
      { name: 'Website Hosting Renewal', price: '₹1,999', period: 'per year', desc: 'Reliable hosting with SSL certificate & high speed' },
      { name: 'Custom Domain (.com / .in)', price: '₹999', period: 'per year', desc: 'Include a custom name for your brand' },
    ],
  },
};

export default function ServiceDetail({ id, onBack }) {
  const data = serviceData[id];
  const containerRef = useRef(null);
  const lenis = useLenis();

  useEffect(() => {
    // Reset scroll to top immediately using Lenis if available
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    const ctx = gsap.context(() => {
      // Intro animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Fade in the texture overlay
      tl.to('.detail-texture-overlay', { opacity: 0.8, duration: 1.5, ease: 'power2.out' }, 0);
      
      // Animate the content wrapper in
      tl.fromTo('.detail-content-wrapper', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 0.2);

      tl.fromTo('.back-btn-container', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, '-=0.5');
      tl.fromTo('.detail-hero-title', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.4');
      tl.fromTo('.detail-hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 0.7, duration: 0.8 }, '-=0.6');
      tl.fromTo('.detail-hero-desc', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6');
      tl.fromTo('.detail-visual', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }, '-=0.8');

      // Scroll triggers for sections
      gsap.from('.why-stat-card', {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.detail-why-section',
          start: 'top 80%',
        }
      });

      gsap.from('.detail-feature-card', {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.detail-features-grid',
          start: 'top 80%',
        }
      });

      gsap.from('.detail-step-card', {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.detail-process-grid',
          start: 'top 80%',
        }
      });

      // Animations for pricing & addons
      gsap.from('.detail-pricing-card', {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.detail-pricing-grid',
          start: 'top 80%',
        }
      });

      gsap.from('.detail-addon-item', {
        x: -40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.detail-addons-grid',
          start: 'top 85%',
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [id]);

  if (!data) return null;

  const renderVisual = () => {
    switch (data.visualType) {
      case 'google-review':
        return (
          <div className="visual-wrapper google-review-visual">
            <div className="review-glow-ring" />
            <div className="review-card-panel">
              <div className="review-card-header">
                <div className="avatar-placeholder" />
                <div>
                  <div className="avatar-name">Verified Customer</div>
                  <div className="star-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="star-icon fill-gold stroke-gold" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="review-card-text">"Outstanding service! Using their system was incredibly smooth. Highly recommended."</p>
              <div className="review-google-logo">
                <span className="g-blue">G</span>
                <span className="g-red">o</span>
                <span className="g-yellow">o</span>
                <span className="g-blue">g</span>
                <span className="g-green">l</span>
                <span className="g-red">e</span>
                <span className="review-label">Review</span>
              </div>
            </div>
            <div className="floating-bubble bubble-1">+15% Local Rank</div>
            <div className="floating-bubble bubble-2">5.0 Rating</div>
          </div>
        );
      case 'nfc-tap':
        return (
          <div className="visual-wrapper nfc-visual">
            <div className="nfc-card-glow" />
            <div className="nfc-card-body">
              <div className="nfc-chip" />
              <div className="nfc-logo">OrbitScale</div>
              <div className="nfc-contact-info">
                <div className="nfc-bar" />
                <div className="nfc-bar short" />
              </div>
              <div className="nfc-tap-label">TAP TO CONNECT</div>
            </div>
            <div className="nfc-phone-hand">
              <Smartphone className="nfc-phone-icon" />
              <div className="wave wave-1" />
              <div className="wave wave-2" />
            </div>
          </div>
        );
      case 'presence-grow':
        return (
          <div className="visual-wrapper presence-visual">
            <div className="graph-grid">
              <div className="graph-col col-1"><div className="graph-bar" style={{height: '30%'}} /></div>
              <div className="graph-col col-2"><div className="graph-bar" style={{height: '50%'}} /></div>
              <div className="graph-col col-3"><div className="graph-bar" style={{height: '45%'}} /></div>
              <div className="graph-col col-4"><div className="graph-bar" style={{height: '75%'}} /></div>
              <div className="graph-col col-5"><div className="graph-bar active" style={{height: '95%'}}><div className="active-dot" /></div></div>
            </div>
            <div className="presence-stats">
              <div className="presence-stat-item">
                <Search className="presence-icon" />
                <span>Google Pack #1</span>
              </div>
              <div className="presence-stat-item">
                <Compass className="presence-icon" />
                <span>Maps Traffic +180%</span>
              </div>
            </div>
          </div>
        );
      case 'design-web':
        return (
          <div className="visual-wrapper design-visual">
            <div className="browser-mock">
              <div className="browser-header">
                <span className="dot dot-r" />
                <span className="dot dot-y" />
                <span className="dot dot-g" />
              </div>
              <div className="browser-content">
                <div className="mock-hero">
                  <div className="mock-text-large" />
                  <div className="mock-text-sub" />
                  <div className="mock-btn" />
                </div>
                <div className="mock-grid">
                  <div className="mock-card"><div className="mock-img" /></div>
                  <div className="mock-card"><div className="mock-img" /></div>
                </div>
              </div>
            </div>
            <div className="glass-indicator">Responsive React</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="service-detail-container" ref={containerRef}>
      {/* Texture overlay for distinct new page feel */}
      <div className="detail-texture-overlay" />

      {/* Background glow elements */}
      <div className="detail-glow-blob blob-left" />
      <div className="detail-glow-blob blob-right" />

      <div className="detail-content-wrapper">
        {/* Navigation Header bar */}
      <div className="container back-header">
        <div className="back-btn-container">
          <button onClick={onBack} className="back-link">
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="detail-hero-section">
        <div className="container">
          <div className="detail-hero-grid">
            <div className="detail-hero-info">
              <h1 className="detail-hero-title">{data.title}</h1>
              <p className="detail-hero-subtitle">{data.subtitle}</p>
              <p className="detail-hero-desc">{data.description}</p>
              <a 
                href="https://wa.me/919000730352" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="detail-cta-btn"
              >
                <span>Get Started Now</span>
                <Zap size={16} />
              </a>
            </div>
            <div className="detail-visual-container">
              <div className="detail-visual">
                {renderVisual()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="detail-why-section">
        <div className="container">
          <div className="detail-why-grid">
            <div className="detail-why-content">
              <h2 className="detail-section-title">{data.whyTitle}</h2>
              <p className="detail-why-desc">{data.whyDesc}</p>
            </div>
            <div className="detail-why-stats">
              {data.whyMetrics.map((metric, i) => (
                <div key={i} className="why-stat-card">
                  <div className="why-stat-value">{metric.value}</div>
                  <div className="why-stat-label">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="detail-features-section">
        <div className="container">
          <h2 className="detail-section-title centered">Core Features</h2>
          <div className="detail-features-grid">
            {data.features.map((feature, i) => (
              <div key={i} className="detail-feature-card">
                <div className="feature-icon-container">
                  {feature.icon}
                </div>
                <h3 className="feature-card-title">{feature.title}</h3>
                <p className="feature-card-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step by Step Process */}
      <section className="detail-process-section">
        <div className="container">
          <h2 className="detail-section-title centered">How It Works</h2>
          <div className="detail-process-grid">
            {data.process.map((step, i) => (
              <div key={i} className="detail-step-card">
                <div className="detail-step-header">
                  <span className="detail-step-num">{step.num}</span>
                  <div className="detail-step-line" />
                </div>
                <h3 className="detail-step-title">{step.title}</h3>
                <p className="detail-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dynamic Service Pricing Section ── */}
      {pricingData[id] && (
        <section className="detail-pricing-section">
          <div className="container">
            <h2 className="detail-section-title centered">Flexible Packages & Add-ons</h2>
            
            <div className="detail-pricing-grid">
              {pricingData[id].plans.map((plan, i) => (
                <div key={i} className={`detail-pricing-card ${plan.featured ? 'featured' : ''}`}>
                  {plan.featured && <div className="featured-badge">Best Value</div>}
                  <div className="plan-tier">{plan.name}</div>
                  <div className="plan-price-group">
                    {plan.regularPrice && <span className="plan-regular-price">{plan.regularPrice}</span>}
                    <span className="plan-price">{plan.price}</span>
                  </div>
                  <ul className="plan-features">
                    {plan.features.map((f, idx) => (
                      <li key={idx}>
                        <CheckIcon />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="detail-addons-wrapper">
              <h3 className="addons-title">Add-on Services</h3>
              <div className="detail-addons-grid">
                {pricingData[id].addons.map((addon, i) => (
                  <div key={i} className="detail-addon-item">
                    <div className="addon-meta">
                      <span className="addon-name">{addon.name}</span>
                      <span className="addon-desc">{addon.desc}</span>
                    </div>
                    <div className="addon-price-group">
                      <span className="addon-price">{addon.price}</span>
                      <span className="addon-period">{addon.period}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA Banner */}
      <section className="detail-footer-cta">
        <div className="container">
          <div className="cta-banner-panel">
            <div className="cta-banner-content">
              <h2>Let's Scale Your Business</h2>
              <p>Ready to integrate this solution? Connect with us on WhatsApp for a custom audit and tailormade setup strategy.</p>
              <a 
                href="https://wa.me/919000730352" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="cta-banner-btn"
              >
                <span>Connect on WhatsApp</span>
                <MessageSquare size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
