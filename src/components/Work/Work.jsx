import { useEffect, useRef, useState, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Work.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    num: '01',
    title: 'StewardLive',
    category: 'Event Platform · Web App',
    color: '#1a1a3e',
    accent: '#F5F5DC',
    url: 'https://stewardlive.com/',
  },
  {
    num: '02',
    title: 'Trot Media',
    category: 'Creative Agency · Branding',
    color: '#1e2a1e',
    accent: '#22c55e',
    link: 'https://www.trotmedia.in/',
  },
  {
    num: '03',
    title: 'Prism Analytics',
    category: 'SaaS · Dashboard',
    color: '#2a1a1a',
    accent: '#F5A623',
  },
  {
    num: '04',
    title: 'Lumina Health',
    category: 'Healthcare · Mobile',
    color: '#1a2a2a',
    accent: '#06b6d4',
  },
];

const WorkCard = memo(function WorkCard({ project, isMobile }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="work-card" 
      data-cursor="view"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        const target = project.url || project.link;
        if (target) window.open(target, '_blank');
      }}
      style={{ cursor: (project.url || project.link) ? 'pointer' : 'default' }}
    >
      <div
        className="work-card-image"
        style={{ background: project.color }}
      >
        <div
          className="work-card-image-inner"
          style={{
            background: `linear-gradient(135deg, ${project.color}, ${project.accent}, ${project.color}, ${project.accent})`,
          }}
        />
        {/* Only render iframe on Desktop AND when hovered to prevent massive CPU/GPU lag */}
        {!isMobile && project.url && isHovered && (
          <iframe 
            src={project.url} 
            className="work-card-iframe" 
            loading="lazy" 
            tabIndex="-1"
            title={`${project.title} Preview`}
          />
        )}
      </div>
      <div className="work-card-info">
        <span className="work-card-num">{project.num}</span>
        <h3 className="work-card-title">{project.title}</h3>
        <span className="work-card-category">{project.category}</span>
      </div>
    </div>
  );
});

export default function Work() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  
  // Phase 15: Determine if device is mobile to avoid rendering heavy iframes
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const totalWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => '+=' + totalWidth,
          invalidateOnRefresh: true,
        },
      });

      // Subtle parallax on each card image
      const images = track.querySelectorAll('.work-card-image-inner');
      images.forEach((img) => {
        gsap.to(img, {
          x: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => '+=' + totalWidth,
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="work-section" id="work" ref={sectionRef}>
      <div className="work-header">
        <div className="container">
          <div className="work-label">Selected Work</div>
          <h2 className="work-heading">Featured Projects</h2>
        </div>
      </div>
      <div className="work-track" ref={trackRef}>
        {projects.map((project) => (
          <WorkCard key={project.num} project={project} isMobile={isMobile} />
        ))}
      </div>
    </section>
  );
}
