import React, { useState, useEffect } from 'react';

const TestimonialCarousel = ({ 
  title = "TRUE PARTNERS",
  testimonials = [
    {
      quote: "Project Partnership helped us navigate complex energy transition challenges; their expertise was invaluable, and they truly understood our constraints while standing by us as genuine partners.",
      author: "Sarah Mitchell",
      role: "VP of Engineering, North Sea Energy",
      image: "/src/imgs/testimonial-1.jpg"
    },
    {
      quote: "Their expertise and understanding of the offshore wind market helped us make over 50 key technical decisions. They consistently provided high-quality insights and have been a valued partner.",
      author: "David Thompson",
      role: "Head of Development, Atlantic Renewables",
      image: "/src/imgs/testimonial-2.jpg"
    },
    {
      quote: "Project Partnership were able to make a key contribution to our decommissioning project. They outperformed other consultancies and we see them as a top-tier partner.",
      author: "Emma Richardson",
      role: "Operations Director, Subsea Solutions",
      image: "/src/imgs/testimonial-3.jpg"
    },
    {
      quote: "They understand the energy market well, build relationships and pushed to understand our business which has led to multiple successful projects together.",
      author: "James Wilson",
      role: "Lead Engineer, Offshore Dynamics",
      image: "/src/imgs/testimonial-4.jpg"
    }
  ],
  autoPlay = true,
  autoPlayInterval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, testimonials.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <section className="testimonial-carousel-section">
      <div className="testimonial-carousel-container">
        <h2 className="testimonial-carousel-title">{title}</h2>
        
        <div className="testimonial-carousel">
          <button 
            className="testimonial-nav testimonial-nav-prev"
            onClick={goToPrevious}
            aria-label="Previous testimonial"
          >
            ‹
          </button>
          
          <div className="testimonial-content">
            <div className="testimonial-quote">
              "{testimonials[currentIndex].quote}"
            </div>
            
            <div className="testimonial-author">
              <div className="testimonial-author-info">
                <div className="testimonial-author-name">
                  {testimonials[currentIndex].author}
                </div>
                <div className="testimonial-author-role">
                  {testimonials[currentIndex].role}
                </div>
              </div>
              <div className="testimonial-author-image">
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].author}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
          
          <button 
            className="testimonial-nav testimonial-nav-next"
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            ›
          </button>
        </div>
        
        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`testimonial-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
