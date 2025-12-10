// تأثيرات التمرير الاحترافية
document.addEventListener('DOMContentLoaded', function() {
    // إضاءة احترافية للعناصر عند التمرير
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // مراقبة الأقسام والبطاقات
    document.querySelectorAll('.section, .card, .course-card, .event-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.320, 1)';
        observer.observe(el);
    });

    // تأثير الهيدر عند التمرير
    let lastScrollTop = 0;
    const topBar = document.querySelector('.top-bar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            topBar.classList.add('scrolled');
        } else {
            topBar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });

    // تأثير التمرير الناعم للروابط
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // تأثيرات التفاعل مع الأزرار
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.01)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // تأثيرات التفاعل مع البطاقات
    document.querySelectorAll('.card, .course-card, .event-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-6px)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // تأثيرات التفاعل مع الإحصائيات
    document.querySelectorAll('.stat-box').forEach(stat => {
        stat.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.03)';
        });
        
        stat.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // عداد الأرقام المتحرك الاحترافي
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(statNumber => {
            const text = statNumber.textContent;
            const match = text.match(/(\d+)/);
            if (!match) return;
            
            const target = parseInt(match[1]);
            const suffix = text.replace(match[1], '');
            const increment = target / 80;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    statNumber.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    statNumber.textContent = Math.floor(current) + suffix;
                }
            }, 16);
        });
    }

    // تشغيل العداد عند ظهور الإحصائيات
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    // تحميل الصور بتأثير ناعم
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.6s ease-out';
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.display = 'none';
            if (this.parentNode) this.parentNode.classList.add('no-image');
        });
    });

    // Mobile nav toggle مع أداء محسّن
    const navToggle = document.getElementById('nav-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavClose = document.getElementById('mobile-nav-close');

    if (navToggle && mobileNav) {
        navToggle.addEventListener('click', function() {
            mobileNav.classList.add('open');
            document.body.style.overflow = 'hidden';
        });

        if (mobileNavClose) {
            mobileNavClose.addEventListener('click', function() {
                mobileNav.classList.remove('open');
                document.body.style.overflow = '';
            });
        }

        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('open');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', function(e) {
            if (!mobileNav.contains(e.target) && !navToggle.contains(e.target) && mobileNav.classList.contains('open')) {
                mobileNav.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    console.log('✨ Professional animations loaded successfully!');
});