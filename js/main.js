const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
});

// Download CV functionality
const downloadCV = document.getElementById('downloadCV');
const downloadModal = document.getElementById('downloadModal');

if (downloadCV && downloadModal) {
  downloadCV.addEventListener('click', async () => {
    downloadModal.classList.add('active');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const link = document.createElement('a');
      link.href = 'media/Casper_Moyo_CV.pdf';
      link.download = 'Casper_Moyo_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      downloadModal.classList.remove('active');
      
    } catch (error) {
      console.error('Download failed:', error);
      downloadModal.classList.remove('active');
    }
  });
  
  // Close modal on background click
  downloadModal.addEventListener('click', (e) => {
    if (e.target === downloadModal) {
      downloadModal.classList.remove('active');
    }
  });
}
