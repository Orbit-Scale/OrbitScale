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
import './ServiceDetail.css';

gsap.registerPlugin(ScrollTrigger);

const serviceData = {
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

export default function ServiceDetail({ id, onBack }) {
  const data = serviceData[id];
  const containerRef = useRef(null);

  useEffect(() => {
    // Reset scroll to top immediately
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Intro animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.back-btn-container', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 });
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
      {/* Background glow elements */}
      <div className="detail-glow-blob blob-left" />
      <div className="detail-glow-blob blob-right" />

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
  );
}
