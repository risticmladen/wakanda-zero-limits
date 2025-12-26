// ===================================
// LOADER
// ===================================

class Loader {
    constructor() {
        this.loader = document.querySelector('.loader');
        this.progressBar = document.querySelector('.loader__progress__bar__percent');
        this.progressIndicator = document.querySelector('.loader__progress-indicator');
        this.progress = 0;
        this.duration = 2500; // 2.5 seconds
        this.startTime = null;
        
        if (this.loader && this.progressBar) {
            this.startLoading();
        }
    }
    
    startLoading() {
        // Start the animation
        this.startTime = performance.now();
        this.animateProgress();
    }
    
    animateProgress() {
        const currentTime = performance.now();
        const elapsed = currentTime - this.startTime;
        
        // Calculate progress (0 to 100)
        this.progress = Math.min((elapsed / this.duration) * 100, 100);
        
        // Ease out function for smoother animation
        const easeProgress = this.easeOutQuad(this.progress / 100) * 100;
        
        // Update progress bar
        this.progressBar.style.transform = `scaleX(${easeProgress / 100})`;
        
        // Update percentage text
        if (this.progressIndicator) {
            this.progressIndicator.setAttribute('data-progress', Math.floor(easeProgress));
        }
        
        // Continue animation or complete
        if (this.progress < 100) {
            requestAnimationFrame(() => this.animateProgress());
        } else {
            this.completeLoading();
        }
    }
    
    easeOutQuad(t) {
        return t * (2 - t);
    }
    
    completeLoading() {
        // Wait a moment at 100% before hiding
        setTimeout(() => {
            this.hideLoader();
        }, 500);
    }
    
    hideLoader() {
        // Remove is-active class to trigger fade out
        if (this.loader) {
            this.loader.classList.remove('is-active');
            
            // Remove from DOM after animation completes
            setTimeout(() => {
                const sectionLoader = document.querySelector('.section-loader');
                if (sectionLoader) {
                    sectionLoader.style.display = 'none';
                }
            }, 500);
        }
    }
}

// ===================================
// HERO PARALLAX
// ===================================

class HeroParallax {
    constructor() {
        this.heroSection = document.querySelector('.hero-section');
        if (!this.heroSection) return;
        
        this.mouseX = 0.5;
        this.mouseY = 0.5;
        this.targetX = 0.5;
        this.targetY = 0.5;
        
        // Parallax depth intensity (pixels movement)
        this.maxMovement = 30; // Maximum pixels to move
        
        this.setupEventListeners();
        this.animate();
    }
    
    setupEventListeners() {
        this.heroSection.addEventListener('mousemove', (e) => {
            const rect = this.heroSection.getBoundingClientRect();
            this.targetX = (e.clientX - rect.left) / rect.width;
            this.targetY = (e.clientY - rect.top) / rect.height;
        });
        
        // Reset on mouse leave
        this.heroSection.addEventListener('mouseleave', () => {
            this.targetX = 0.5;
            this.targetY = 0.5;
        });
    }
    
    animate() {
        // Smooth interpolation
        this.mouseX += (this.targetX - this.mouseX) * 0.1;
        this.mouseY += (this.targetY - this.mouseY) * 0.1;
        
        // Calculate offset from center (0.5, 0.5)
        const offsetX = (this.mouseX - 0.5) * this.maxMovement;
        const offsetY = (this.mouseY - 0.5) * this.maxMovement;
        
        // Apply transform to background (::before pseudo-element)
        // We use scale to create perspective
        const scale = 1.1; // Slight scale to allow movement without edge gaps
        this.heroSection.style.setProperty('--parallax-x', `${offsetX}px`);
        this.heroSection.style.setProperty('--parallax-y', `${offsetY}px`);
        
        // Update background transform via custom property
        const bgElement = this.heroSection;
        if (bgElement) {
            bgElement.style.setProperty('--bg-transform', 
                `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`);
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// ===================================
// SECTION MANAGER
// ===================================

class SectionManager {
    constructor() {
        this.heroSection = document.querySelector('.hero-section');
        this.storySection = document.querySelector('#story-1');
        this.enterButton = document.querySelector('.button--enter');
        
        if (this.enterButton) {
            this.enterButton.addEventListener('click', (e) => this.handleEnter(e));
        }
    }
    
    handleEnter(e) {
        e.preventDefault();
        
        // Fade out hero section
        if (this.heroSection) {
            this.heroSection.style.transition = 'opacity 0.8s ease';
            this.heroSection.style.opacity = '0';
            
            setTimeout(() => {
                this.heroSection.style.display = 'none';
                this.showStorySection();
            }, 800);
        }
    }
    
    showStorySection() {
        if (this.storySection) {
            this.storySection.classList.add('is-active');
            
            // Show background immediately by adding has-parallax class
            this.storySection.classList.add('has-parallax');
            
            // Scroll to section smoothly
            this.storySection.scrollIntoView({ behavior: 'smooth' });
            
            // Show wisdom guide after a delay
            setTimeout(() => {
                if (window.wisdomGuide) {
                    window.wisdomGuide.show();
                }
            }, 1000);
        }
    }
}

// ===================================
// WISDOM GUIDE
// ===================================

class WisdomGuide {
    constructor() {
        this.guide = document.querySelector('.wisdom-guide');
        this.slides = [
            document.querySelector('.wisdom-guide--p1'),
            document.querySelector('.wisdom-guide--p2')
        ];
        this.currentSlide = 0;
        this.controls = document.querySelector('.wisdom-guide__controls');
        
        if (this.guide) {
            this.createControls();
            this.showSlide(0);
        }
    }
    
    createControls() {
        if (!this.controls) return;
        
        // Create navigation HTML
        this.controls.innerHTML = `
            <button class="prev-btn" aria-label="Previous">
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 2L2 8L8 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <div class="pagination">
                ${this.slides.map((_, i) => `<span data-index="${i}"></span>`).join('')}
            </div>
            <button class="next-btn" aria-label="Next">
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2L8 8L2 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        `;
        
        // Add event listeners
        this.controls.querySelector('.prev-btn').addEventListener('click', () => this.prev());
        this.controls.querySelector('.next-btn').addEventListener('click', () => this.next());
        
        // Add pagination dot listeners
        this.controls.querySelectorAll('.pagination span').forEach((dot, i) => {
            dot.addEventListener('click', () => this.showSlide(i));
        });
    }
    
    showSlide(index) {
        // Hide all slides
        this.slides.forEach(slide => {
            if (slide) {
                slide.classList.remove('is-active');
            }
        });
        
        // Show current slide
        if (this.slides[index]) {
            this.slides[index].classList.add('is-active');
            this.currentSlide = index;
        }
        
        // Update pagination
        this.updatePagination();
        this.updateButtons();
    }
    
    updatePagination() {
        if (!this.controls) return;
        
        const dots = this.controls.querySelectorAll('.pagination span');
        dots.forEach((dot, i) => {
            if (i === this.currentSlide) {
                dot.classList.add('is-active');
            } else {
                dot.classList.remove('is-active');
            }
        });
    }
    
    updateButtons() {
        if (!this.controls) return;
        
        const prevBtn = this.controls.querySelector('.prev-btn');
        const nextBtn = this.controls.querySelector('.next-btn');
        
        // Disable prev button on first slide
        prevBtn.disabled = this.currentSlide === 0;
        
        // Keep next button enabled - it will trigger tutorial on last slide
        // nextBtn.disabled = this.currentSlide === this.slides.length - 1;
    }
    
    prev() {
        if (this.currentSlide > 0) {
            this.showSlide(this.currentSlide - 1);
        }
    }
    
    next() {
        if (this.currentSlide < this.slides.length - 1) {
            this.showSlide(this.currentSlide + 1);
        } else {
            // On last slide, clicking next shows tutorial
            this.showTutorial();
        }
    }
    
    showTutorial() {
        // Hide wisdom guide
        this.hide();
        
        // Show tutorial panel
        const tutorialPanel = document.querySelector('.tutorial-panel');
        if (tutorialPanel) {
            tutorialPanel.classList.add('is-visible');
            
            // Setup tutorial close button
            const closeBtn = tutorialPanel.querySelector('.tutorial__symbol');
            const beginBtn = tutorialPanel.querySelector('button');
            
            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.closeTutorial());
            }
            
            if (beginBtn) {
                beginBtn.addEventListener('click', () => this.closeTutorial());
            }
        }
    }
    
    closeTutorial() {
        const tutorialPanel = document.querySelector('.tutorial-panel');
        if (tutorialPanel) {
            tutorialPanel.classList.remove('is-visible');
            
            // Initialize horizontal parallax
            const storySection = document.querySelector('#story-1');
            if (storySection && !window.horizontalParallax) {
                window.horizontalParallax = new HorizontalParallax(storySection);
            }
        }
    }
    
    show() {
        if (this.guide) {
            this.guide.classList.add('is-visible');
        }
    }
    
    hide() {
        if (this.guide) {
            this.guide.classList.remove('is-visible');
        }
    }
}

// ===================================
// HORIZONTAL PARALLAX
// ===================================

class HorizontalParallax {
    constructor(section) {
        this.section = section;
        this.container = section.querySelector('.story-content');
        this.leftArrow = section.querySelector('.contol-arrows--left');
        this.rightArrow = section.querySelector('.contol-arrows--right');
        this.videoCardsGrid = section.querySelector('.video-cards-grid');
        
        this.scrollPosition = 0; // 0 to 1 (0% to 100%)
        this.targetPosition = 0;
        this.panoramaPosition = 0; // Smoothed background position
        this.isMouseControl = true;
        this.mouseX = 0.5; // Normalized mouse X position (0 to 1)
        this.mouseY = 0.5; // Normalized mouse Y position (0 to 1)
        this.videoCardsVisible = false;
        
        if (!this.container) return;
        
        // Create quality enhancement layer
        this.createQualityLayer();
        
        // Create sun rays
        this.createSunRays();
        
        // Create progress indicator
        this.createProgressIndicator();
        
        // Setup event listeners
        this.setupMouseControl();
        this.setupArrowControls();
        this.setupAnimation();
    }
    
    createQualityLayer() {
        const qualityLayer = document.createElement('div');
        qualityLayer.className = 'quality-enhancement';
        this.section.insertBefore(qualityLayer, this.section.firstChild);
    }
    
    createSunRays() {
        const raysContainer = document.createElement('div');
        raysContainer.className = 'sun-rays';
        
        // Create 9 sun rays
        for (let i = 0; i < 9; i++) {
            const ray = document.createElement('div');
            ray.className = 'sun-ray';
            ray.dataset.index = i;
            raysContainer.appendChild(ray);
        }
        
        this.section.insertBefore(raysContainer, this.section.firstChild);
        this.sunRays = raysContainer.querySelectorAll('.sun-ray');
    }
    
    createProgressIndicator() {
        const progress = document.createElement('div');
        progress.className = 'parallax-progress';
        progress.innerHTML = `
            <span class="parallax-progress__label">Explore</span>
            <div class="parallax-progress__track">
                <div class="parallax-progress__bar"></div>
            </div>
            <span class="parallax-progress__label">0%</span>
        `;
        this.section.appendChild(progress);
        
        this.progressBar = progress.querySelector('.parallax-progress__bar');
        this.progressLabel = progress.querySelectorAll('.parallax-progress__label')[1];
    }
    
    setupMouseControl() {
        // Track mouse for sun rays on all devices
        this.section.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            // Store normalized mouse position
            this.mouseX = x / width;
            this.mouseY = y / height;
            
            // Only scroll on desktop
            if ('ontouchstart' in window) {
                return;
            }
            
            // Dead zone in the center (20%)
            const deadZoneSize = 0.2;
            const deadZoneStart = (0.5 - deadZoneSize / 2) * width;
            const deadZoneEnd = (0.5 + deadZoneSize / 2) * width;
            
            if (x > deadZoneStart && x < deadZoneEnd) {
                // In dead zone - no scroll
                return;
            }
            
            // Calculate target position (0 to 1)
            if (x < deadZoneStart) {
                // Left side - scroll left
                const relativeX = x / deadZoneStart;
                this.targetPosition = relativeX * 0.5; // 0 to 0.5
            } else {
                // Right side - scroll right
                const relativeX = (x - deadZoneEnd) / (width - deadZoneEnd);
                this.targetPosition = 0.5 + relativeX * 0.5; // 0.5 to 1
            }
        });
    }
    
    setupArrowControls() {
        if (this.leftArrow) {
            this.leftArrow.addEventListener('click', () => {
                this.targetPosition = Math.max(0, this.targetPosition - 0.5);
            });
        }
        
        if (this.rightArrow) {
            this.rightArrow.addEventListener('click', () => {
                this.targetPosition = Math.min(1, this.targetPosition + 0.5);
            });
        }
    }
    
    setupAnimation() {
        const animate = () => {
            // Smooth lerp to target position
            const diff = this.targetPosition - this.scrollPosition;
            this.scrollPosition += diff * 0.02; // Very slow content movement
            
            // Update transform
            const translateX = -this.scrollPosition * 200; // 0% to -200% (3 screens = 200% movement)
            this.container.style.transform = `translateX(${translateX}vw)`;
            
            // Update progress bar
            const progress = this.scrollPosition * 100;
            if (this.progressBar) {
                this.progressBar.style.width = `${progress}%`;
            }
            if (this.progressLabel) {
                this.progressLabel.textContent = `${Math.round(progress)}%`;
            }
            
            // Update background parallax
            this.updateBackgroundParallax();
            
            // Update sun rays based on mouse position
            this.updateSunRays();
            
            // Update arrow states
            this.updateArrowStates();
            
            // Update video cards visibility
            this.updateVideoCardsVisibility();
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    updateSunRays() {
        if (!this.sunRays) return;
        
        this.sunRays.forEach((ray, index) => {
            const baseRotation = (index - 4) * 10; // -40 to 40 degrees
            
            // Add mouse influence
            const mouseInfluence = (this.mouseX - 0.5) * 20; // -10 to 10 degrees
            const verticalInfluence = (this.mouseY - 0.5) * 10; // Subtle vertical movement
            
            const finalRotation = baseRotation + mouseInfluence;
            const finalScale = 0.8 + (1 - this.mouseY) * 0.4; // Scale based on Y position
            
            ray.style.transform = `rotate(${finalRotation}deg) scaleY(${finalScale})`;
            ray.style.setProperty('--base-rotation', `${finalRotation}deg`);
        });
    }
    
    updateArrowStates() {
        if (this.leftArrow) {
            if (this.scrollPosition <= 0.01) {
                this.leftArrow.classList.add('is-disabled');
            } else {
                this.leftArrow.classList.remove('is-disabled');
            }
        }
        
        if (this.rightArrow) {
            if (this.scrollPosition >= 0.99) {
                this.rightArrow.classList.add('is-disabled');
            } else {
                this.rightArrow.classList.remove('is-disabled');
            }
        }
    }
    
    updateVideoCardsVisibility() {
        if (!this.videoCardsGrid) return;
        
        // Show video cards when scroll position is < 0.15 (on the left side)
        if (this.scrollPosition < 0.15 && !this.videoCardsVisible) {
            this.videoCardsGrid.classList.add('is-visible');
            this.videoCardsVisible = true;
        } else if (this.scrollPosition >= 0.15 && this.videoCardsVisible) {
            this.videoCardsGrid.classList.remove('is-visible');
            this.videoCardsVisible = false;
        }
    }
    
    updateBackgroundParallax() {
        // Panoramic panning system with slower, smoothed movement
        // The background lags behind the scroll for a more cinematic feel
        
        // Smooth the panorama position (much slower than content scroll)
        const diff = this.scrollPosition - this.panoramaPosition;
        this.panoramaPosition += diff * 0.008; // Ultra slow panorama movement (0.8% per frame)
        
        // Map panorama position (0 to 1) to background position (0% to 100%)
        const panoramaPan = this.panoramaPosition * 100; // 0% to 100%
        
        // Set background position for smooth panning
        this.section.style.setProperty('--panorama-position', `${panoramaPan}%`);
    }
}

// ===================================
// VIDEO LIGHTBOX
// ===================================

class VideoLightbox {
    constructor() {
        this.lightbox = document.querySelector('.video-lightbox');
        this.backdrop = document.querySelector('.video-lightbox__backdrop');
        this.container = document.querySelector('.video-lightbox__container');
        this.player = document.querySelector('.video-lightbox__player');
        this.closeBtn = document.querySelector('.video-lightbox__close');
        this.videoSource = this.player.querySelector('source');
        this.videoCards = document.querySelectorAll('.video-card');
        
        if (!this.lightbox) return;
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Click on video cards
        this.videoCards.forEach(card => {
            card.addEventListener('click', () => {
                const videoPath = card.dataset.video;
                if (videoPath) {
                    this.openVideo(videoPath);
                }
            });
        });
        
        // Close button
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }
        
        // Click backdrop to close
        if (this.backdrop) {
            this.backdrop.addEventListener('click', () => this.close());
        }
        
        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.lightbox.classList.contains('is-active')) {
                this.close();
            }
        });
    }
    
    openVideo(videoPath) {
        if (!this.lightbox || !this.player || !this.videoSource) return;
        
        // Set video source
        this.videoSource.src = videoPath;
        this.player.load();
        
        // Show lightbox
        this.lightbox.classList.add('is-active');
        
        // Play video after a short delay
        setTimeout(() => {
            this.player.play().catch(error => {
                console.log('Video autoplay prevented:', error);
            });
        }, 100);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
    
    close() {
        if (!this.lightbox || !this.player) return;
        
        // Pause video
        this.player.pause();
        this.player.currentTime = 0;
        
        // Hide lightbox
        this.lightbox.classList.remove('is-active');
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

// ===================================
// INITIALIZE
// ===================================

function init() {
    // Initialize loader
    new Loader();
    
    // Initialize hero parallax
    window.heroParallax = new HeroParallax();
    
    // Initialize section manager
    new SectionManager();
    
    // Initialize wisdom guide
    window.wisdomGuide = new WisdomGuide();
    
    // Initialize video lightbox
    window.videoLightbox = new VideoLightbox();
    
    console.log('🌟 Wakanda Forever - All Systems Initialized');
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
