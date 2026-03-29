/* ════════════════════════════════════════════
   script.js  —  منصة عقاراتي
   الجافاسكريبت الخاص بـ index2.htm
   ════════════════════════════════════════════ */

// ─── تهيئة الصفحة عند التحميل ───────────────
document.addEventListener('DOMContentLoaded', function () {

    // تهيئة AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true, offset: 100 });
    }

    // البحث في العقارات
    window.performSearch = function () {
        const input = document.getElementById('searchInput').value.toLowerCase();
        const type = document.getElementById('searchType').value;
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            const badge = card.querySelector('.card-badge');
            const badgeText = badge ? badge.textContent : '';

            const matchText = input === '' || text.includes(input);
            const matchType = type === 'all' || badgeText.includes(type);

            card.style.display = (matchText && matchType) ? 'flex' : 'none';
        });
    };

    // ─── Particles.js ─────────────────────────
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 60, density: { enable: true, value_area: 800 } },
                color: { value: '#00ffff' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true, distance: 150,
                    color: '#00ffff', opacity: 0.4, width: 1
                },
                move: {
                    enable: true, speed: 2, direction: 'none',
                    random: true, straight: false,
                    out_mode: 'out', bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                }
            },
            retina_detect: true
        });
    }

    // ─── تبديل الثيم ──────────────────────────
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            document.body.classList.remove('theme-golden', 'theme-light');
            const theme = this.getAttribute('data-theme');
            if (theme !== 'default') {
                document.body.classList.add(`theme-${theme}`);
            }
        });
    });

    // ─── نموذج التواصل ────────────────────────
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const msg = document.getElementById('message').value;

            if (name && email && msg) {
                alert('شكراً لك يا ' + name + '!\nتم إرسال رسالتك بنجاح وسيتواصل معك الفريق على ' + email + ' قريباً.');
                this.reset();
            } else {
                alert('يرجى ملء جميع الحقول المطلوبة (الاسم، البريد، والرسالة).');
            }
        });
    }

    // ─── تأثير الهيدر عند التمرير ─────────────
    window.addEventListener('scroll', function () {
        const header = document.getElementById('navbar');
        if (!header) return;
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(10,25,47,0.97)';
            header.style.padding = '10px 8%';
        } else {
            header.style.backgroundColor = 'transparent';
            header.style.padding = '20px 8%';
        }
    });

    // ─── الشات ────────────────────────────────
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.getElementById('sendChat');
    const chatMessages = document.getElementById('chatMessages');

    function sendChatMessage() {
        const msg = chatInput.value.trim();
        if (!msg) return;

        // رسالة المستخدم
        const userMsg = document.createElement('div');
        userMsg.className = 'message user';
        userMsg.textContent = msg;
        chatMessages.appendChild(userMsg);
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // رد البوت
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'message bot';
            botMsg.textContent = 'شكراً على رسالتك! سأتواصل معك قريباً.';
            chatMessages.appendChild(botMsg);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }

    if (sendChatBtn) sendChatBtn.addEventListener('click', sendChatMessage);
    if (chatInput) chatInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') sendChatMessage();
    });

}); // نهاية DOMContentLoaded
