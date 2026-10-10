/**
 * ====================================================================
 * OPERIS AI ASSISTANT (operis-bot.js)
 * Intelligent interactive assistant powered by the Operis website knowledge base.
 * ====================================================================
 */

(function () {
  'use strict';

  // --- Configuration ---
  const BOT_CONFIG = {
    botName: 'Operis AI Assistant',
    avatarImg: 'logo-circle.png',
    companyName: 'Operis Management Solutions',
    phoneOffice: '04842000204',
    phoneMobile: '+91 8891501203',
    phoneMobileRaw: '8891501203',
    whatsapp: '+91 8281961203',
    whatsappRaw: '918281961203',
    email: 'info.operis@gmail.com',
    hours: 'Mon–Sat: 9:30 AM – 5:30 PM',
    locationText: 'Door No. 2/226E, 1st Floor Thomas Arcade, NH 66, Near Kerala Gramin Bank, Varapuzha, Kochi, Kerala 683517',
    coords: '10°05\'19.6"N 76°16\'01.9"E',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=10.088778,76.267194'
  };

  // --- Website Knowledge Base & Response Handlers ---
  const KNOWLEDGE_RESPONSES = [
    {
      id: 'greeting',
      patterns: [/^(hi|hello|hey|hola|namaste|good\s*(morning|afternoon|evening)|halo|start)/i],
      response: () => `
        <p>Hello! 👋 Welcome to <strong>${BOT_CONFIG.companyName}</strong>.</p>
        <p>I am your AI assistant. I can answer questions about our service portfolios, office location, job opportunities, or help you connect with our team.</p>
        <p>What would you like to know today?</p>
      `,
      chips: ['What services do you offer?', 'Where is your office?', 'Contact numbers', 'How do I apply for a job?']
    },
    {
      id: 'services_overview',
      patterns: [/(services|what do you do|what do you offer|portfolio|capabilities|solutions|business areas)/i],
      response: () => `
        <p><strong>Operis Management Solutions</strong> delivers operational excellence across 4 core portfolios:</p>
        <ul>
          <li><strong>Integrated Facility Management</strong> — Janitorial, property maintenance, security, landscaping & MEP support.</li>
          <li><strong>HR & Workforce Management</strong> — Recruitment, talent acquisition, manpower deployment & payroll compliance.</li>
          <li><strong>Business Management</strong> — Hotel classification, revenue consulting, OTA management & brand growth.</li>
          <li><strong>Skill Development & Career Training</strong> — Practical, industry-oriented professional courses & institutional programs.</li>
        </ul>
        <div class="bot-action-links">
          <a class="bot-action-pill" onclick="window.operisBot.jumpTo('#services')">View Services Section ↓</a>
          <a class="bot-action-pill" onclick="window.operisBot.sendChip('Facility Management')">Facility Scope</a>
          <a class="bot-action-pill" onclick="window.operisBot.sendChip('HR & Workforce')">HR Scope</a>
          <a class="bot-action-pill" onclick="window.operisBot.sendChip('Hotel Classification')">Hotel Consulting</a>
        </div>
      `,
      chips: ['Facility Management', 'HR & Workforce', 'Hotel Classification', 'Skill Development']
    },
    {
      id: 'facility_management',
      patterns: [/(facility|housekeeping|janitorial|cleaning|maintenance|pest control|fumigation|security|valet|pantry|cafeteria|landscaping|gardening|stores|distribution|home care)/i],
      response: () => `
        <p>🏢 <strong>Integrated Facility Management Portfolio:</strong></p>
        <ul>
          <li>Housekeeping & Janitorial Services</li>
          <li>Facility Scheduled Services & Staff Management</li>
          <li>Property Maintenance & Technical MEP Support</li>
          <li>Pantry & Cafeteria Management</li>
          <li>Garden & Landscaping Maintenance</li>
          <li>Help Desk & Service Counter Operations</li>
          <li>Security & Valet Service</li>
          <li>Pest Control & Fumigation Services</li>
          <li>Home Care & Caretaker Services</li>
          <li>Stores & Distribution Management</li>
        </ul>
        <div class="bot-action-links">
          <a class="bot-action-pill" onclick="window.operisBot.jumpTo('#contact')">Request Facility Proposal ↓</a>
          <a class="bot-action-pill" href="tel:${BOT_CONFIG.phoneOffice}">Call Office Desk: ${BOT_CONFIG.phoneOffice}</a>
        </div>
      `,
      chips: ['Contact numbers', 'Where is your office?', 'HR Services']
    },
    {
      id: 'hr_management',
      patterns: [/(human resource|hr|workforce|recruitment|talent acquisition|manpower|deployment|staffing|payroll|attendance|compliance|labor relations|dispute)/i],
      response: () => `
        <p>👥 <strong>Human Resource & Workforce Management Portfolio:</strong></p>
        <ul>
          <li>Recruitment & Talent Acquisition</li>
          <li>Manpower Deployment Services</li>
          <li>Payroll & Attendance Management</li>
          <li>Employee Documentation & Onboarding</li>
          <li>Statutory Compliance Management</li>
          <li>Training & Performance Management</li>
          <li>Labor Relations & Dispute Resolutions</li>
        </ul>
        <p>We supply verified, trained personnel and handle full compliance lifecycle for enterprises.</p>
        <div class="bot-action-links">
          <a class="bot-action-pill" onclick="window.operisBot.jumpTo('#contact')">Hire Manpower ↓</a>
          <a class="bot-action-pill" href="mailto:${BOT_CONFIG.email}">Email HR Desk</a>
        </div>
      `,
      chips: ['Job Applications', 'Facility Management', 'Contact numbers']
    },
    {
      id: 'business_consulting',
      patterns: [/(hotel classification|classification consultancy|stars|revenue management|ota|central reservation|f&b|restaurant consulting|tourism|travel|banquet|events|brand development|digital marketing)/i],
      response: () => `
        <p>📈 <strong>Business Management & Hospitality Consulting Portfolio:</strong></p>
        <ul>
          <li><strong>Hotel Classification Consultancy</strong> (Star classification audit & preparation)</li>
          <li>Revenue Management & Profitability Consulting</li>
          <li>OTA & Central Reservation Management</li>
          <li>Brand Development & Digital Marketing Solutions</li>
          <li>F&B Revenue & Restaurant Consulting</li>
          <li>Tourism & Travel Business Solutions</li>
          <li>Hospitality Business Process Consulting</li>
          <li>Events & Banquet Business Development</li>
          <li>Customer Experience & Reputation Consulting</li>
          <li>Referral Network & Partnership Facilitation</li>
        </ul>
        <div class="bot-action-links">
          <a class="bot-action-pill" onclick="window.operisBot.jumpTo('#contact')">Book Consultation ↓</a>
          <a class="bot-action-pill" href="tel:${BOT_CONFIG.phoneOffice}">Call ${BOT_CONFIG.phoneOffice}</a>
        </div>
      `,
      chips: ['Skill Development', 'Contact Us', 'Our Location']
    },
    {
      id: 'skills_training',
      patterns: [/(skill|training|course|institution|career skill|college|school|internship|employability|practical training|mentorship|student|ethics)/i],
      response: () => `
        <p>🎓 <strong>Skill Development & Career Training Portfolio:</strong></p>
        <ul>
          <li><strong>Professional & Industry-Specific Courses:</strong> Human Resources & Administration, Accounting & Finance, Hospitality & Hotel Operations, Customer Service, Sales & Marketing.</li>
          <li>Digital & Workplace Skills Training</li>
          <li>Soft Skills & Professional Development</li>
          <li>Job Readiness & Interview Preparation</li>
          <li>Internship & Career Development Programs</li>
          <li>School & College Employability Sessions</li>
          <li>Corporate Training & Employee Development</li>
          <li>Industry-Oriented Practical Training & Career Guidance</li>
        </ul>
        <div class="bot-action-links">
          <a class="bot-action-pill" onclick="window.operisBot.jumpTo('#careers')">View Career Institution ↓</a>
          <a class="bot-action-pill" href="mailto:${BOT_CONFIG.email}">Inquire Courses</a>
        </div>
      `,
      chips: ['How do I apply for a job?', 'Contact numbers', 'Facility Scope']
    },
    {
      id: 'contact_details',
      patterns: [/(contact|phone|mobile|call|landline|number|reach|telephone|hotline|desk|dial)/i],
      response: () => `
        <p>📞 <strong>Official Contact Points for Operis:</strong></p>
        <ul>
          <li><strong>Office Desk (Landline):</strong> <a href="tel:${BOT_CONFIG.phoneOffice}">${BOT_CONFIG.phoneOffice}</a></li>
          <li><strong>Mobile / Direct Call:</strong> <a href="tel:${BOT_CONFIG.phoneMobileRaw}">${BOT_CONFIG.phoneMobile}</a></li>
          <li><strong>WhatsApp Chat:</strong> <a href="https://wa.me/${BOT_CONFIG.whatsappRaw}" target="_blank" rel="noopener">Chat on WhatsApp ↗</a></li>
          <li><strong>Email Enquiries:</strong> <a href="mailto:${BOT_CONFIG.email}">${BOT_CONFIG.email}</a></li>
          <li><strong>Operating Hours:</strong> ${BOT_CONFIG.hours}</li>
        </ul>
        <div class="bot-action-links">
          <a class="bot-action-pill" href="tel:${BOT_CONFIG.phoneOffice}">Call Office Desk</a>
          <a class="bot-action-pill" href="https://wa.me/${BOT_CONFIG.whatsappRaw}" target="_blank">Open WhatsApp</a>
        </div>
      `,
      chips: ['Where is your office?', 'Email Address', 'What services do you offer?']
    },
    {
      id: 'email',
      patterns: [/(email|mail|inbox|send email|write to you)/i],
      response: () => `
        <p>✉️ Our primary email address is:</p>
        <p><strong><a href="mailto:${BOT_CONFIG.email}">${BOT_CONFIG.email}</a></strong></p>
        <p>Feel free to send enquiry letters, project requests, service requirements, or job resumes directly to this inbox.</p>
        <div class="bot-action-links">
          <a class="bot-action-pill" href="mailto:${BOT_CONFIG.email}">Send Email Now ↗</a>
        </div>
      `,
      chips: ['Contact numbers', 'Where is your office?', 'Submit Enquiry Form']
    },
    {
      id: 'location_address',
      patterns: [/(location|address|where|office|headquarters|hq|directions|map|gps|coordinates|varapuzha|kochi|ernakulam|kerala)/i],
      response: () => `
        <p>📍 <strong>Headquarters & Office Location:</strong></p>
        <p>${BOT_CONFIG.locationText}</p>
        <p><strong>GPS Coordinates:</strong> <code>${BOT_CONFIG.coords}</code></p>
        <div class="bot-action-links">
          <a class="bot-action-pill" href="${BOT_CONFIG.mapsUrl}" target="_blank" rel="noopener">Open in Google Maps ↗</a>
          <a class="bot-action-pill" onclick="window.operisBot.jumpTo('#contact')">View Map on Page ↓</a>
        </div>
      `,
      chips: ['Contact numbers', 'Working Hours', 'What services do you offer?']
    },
    {
      id: 'operating_hours',
      patterns: [/(hours|timing|timings|open|schedule|time|days|sunday|saturday)/i],
      response: () => `
        <p>⏰ <strong>Office Operating Hours:</strong></p>
        <p><strong>Monday to Saturday:</strong> 9:30 AM – 5:30 PM<br>
        <strong>Sunday:</strong> Closed</p>
        <p>You can also leave us a message anytime via email at <a href="mailto:${BOT_CONFIG.email}">${BOT_CONFIG.email}</a> or WhatsApp.</p>
        <div class="bot-action-links">
          <a class="bot-action-pill" href="tel:${BOT_CONFIG.phoneOffice}">Call ${BOT_CONFIG.phoneOffice}</a>
        </div>
      `,
      chips: ['Contact numbers', 'Where is your office?']
    },
    {
      id: 'careers_jobs',
      patterns: [/(career|job|apply|hiring|vacancy|work with|recruitment for job|resume|cv|application|interview)/i],
      response: () => `
        <p>💼 <strong>Join Operis / Job Applications:</strong></p>
        <p>We are consistently seeking passionate professionals across facility operations, housekeeping, hospitality, technical maintenance, and corporate staffing.</p>
        <p>To apply:</p>
        <ul>
          <li>Email your resume/CV to: <strong><a href="mailto:${BOT_CONFIG.email}">${BOT_CONFIG.email}</a></strong> with subject line <em>"Job Application - [Your Field]"</em>.</li>
          <li>Or call our recruitment desk at <strong><a href="tel:${BOT_CONFIG.phoneMobileRaw}">${BOT_CONFIG.phoneMobile}</a></strong>.</li>
        </ul>
        <div class="bot-action-links">
          <a class="bot-action-pill" href="mailto:${BOT_CONFIG.email}?subject=Job%20Application">Email Resume ↗</a>
          <a class="bot-action-pill" href="tel:${BOT_CONFIG.phoneMobileRaw}">Call HR Mobile</a>
        </div>
      `,
      chips: ['Skill Development Training', 'Contact numbers', 'About Operis']
    },
    {
      id: 'about_company',
      patterns: [/(about|who are you|what is operis|history|background|why trust|credibility|values)/i],
      response: () => `
        <p>✨ <strong>About Operis Management Solutions:</strong></p>
        <p>Operis is an operational management and consulting firm designed to empower businesses through operational excellence. We bridge high-standards facility maintenance, skilled manpower deployment, strategic hospitality revenue guidance, and practical career development.</p>
        <div class="bot-action-links">
          <a class="bot-action-pill" onclick="window.operisBot.jumpTo('#about')">Read About Us Section ↓</a>
          <a class="bot-action-pill" onclick="window.operisBot.jumpTo('#why-trust')">Why Trust Operis ↓</a>
        </div>
      `,
      chips: ['What services do you offer?', 'Where is your office?', 'Contact numbers']
    }
  ];

  // Fallback response for unhandled questions
  function getFallbackResponse(query) {
    return `
      <p>I would be delighted to assist you with that! While I am continuously expanding my knowledge base, here is what I can quickly help you with:</p>
      <ul>
        <li>Full details on our <strong>4 Service Portfolios</strong></li>
        <li>Office location & directions in <strong>Varapuzha, Kochi</strong></li>
        <li>Connecting directly with our team by <strong>Phone, WhatsApp, or Email</strong></li>
        <li>How to <strong>apply for jobs or career courses</strong></li>
      </ul>
      <p>Would you like to connect directly with an Operis consultant?</p>
      <div class="bot-action-links">
        <a class="bot-action-pill" href="tel:${BOT_CONFIG.phoneOffice}">Call ${BOT_CONFIG.phoneOffice}</a>
        <a class="bot-action-pill" href="https://wa.me/${BOT_CONFIG.whatsappRaw}" target="_blank">Chat on WhatsApp</a>
        <a class="bot-action-pill" href="mailto:${BOT_CONFIG.email}">Send Email</a>
      </div>
    `;
  }

  // --- Bot UI Controller ---
  class OperisBotWidget {
    constructor() {
      this.isOpen = false;
      this.isTyping = false;
      this.messages = [];
      this.init();
    }

    init() {
      this.injectDOM();
      this.bindEvents();
      this.addInitialGreeting();
    }

    injectDOM() {
      if (document.getElementById('operisBotLauncher')) return;

      // 1. Launcher button
      const launcher = document.createElement('div');
      launcher.id = 'operisBotLauncher';
      launcher.className = 'operis-bot-launcher';
      launcher.setAttribute('aria-label', 'Open Operis AI Assistant');
      launcher.innerHTML = `
        <div class="launcher-avatar">
          <img src="${BOT_CONFIG.avatarImg}" alt="Operis AI Assistant">
          <span class="launcher-online"></span>
        </div>
        <div class="launcher-text">
          <div class="launcher-title">
            <span>Operis AI</span>
            <svg class="sparkle-icon" viewBox="0 0 24 24"><path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"/></svg>
          </div>
          <div class="launcher-sub">Ask Anything</div>
        </div>
      `;
      document.body.appendChild(launcher);

      // 2. Chat Panel
      const panel = document.createElement('div');
      panel.id = 'operisBotPanel';
      panel.className = 'operis-bot-panel';
      panel.setAttribute('role', 'dialog');
      panel.setAttribute('aria-modal', 'true');
      panel.setAttribute('aria-label', 'Operis AI Chat');
      panel.innerHTML = `
        <div class="operis-bot-header">
          <div class="operis-bot-header-left">
            <div class="bot-header-avatar">
              <img src="${BOT_CONFIG.avatarImg}" alt="Operis Logo">
            </div>
            <div>
              <div class="bot-header-title">${BOT_CONFIG.botName}</div>
              <div class="bot-header-status">
                <span class="live-pip"></span>
                <span>Online • Website Guide</span>
              </div>
            </div>
          </div>
          <div class="operis-bot-header-actions">
            <button class="bot-icon-btn" id="operisBotClear" title="Clear chat history" aria-label="Clear chat">↻</button>
            <button class="bot-icon-btn" id="operisBotClose" title="Close assistant" aria-label="Close assistant">✕</button>
          </div>
        </div>

        <div class="operis-bot-messages" id="operisBotMessages"></div>

        <form class="operis-bot-input-area" id="operisBotForm">
          <input 
            type="text" 
            id="operisBotInput" 
            class="operis-bot-input" 
            placeholder="Ask about services, office, jobs..." 
            autocomplete="off"
            aria-label="Type your message"
          >
          <button type="submit" class="operis-bot-send" aria-label="Send message">
            <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </form>
      `;
      document.body.appendChild(panel);

      this.launcher = launcher;
      this.panel = panel;
      this.messagesContainer = document.getElementById('operisBotMessages');
      this.input = document.getElementById('operisBotInput');
      this.form = document.getElementById('operisBotForm');
    }

    bindEvents() {
      this.launcher.addEventListener('click', () => this.toggle());
      document.getElementById('operisBotClose').addEventListener('click', () => this.close());
      document.getElementById('operisBotClear').addEventListener('click', () => this.clearChat());

      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = this.input.value.trim();
        if (text) {
          this.handleUserMessage(text);
          this.input.value = '';
        }
      });

      // Close on Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      });
    }

    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }

    open() {
      this.isOpen = true;
      this.panel.classList.add('active');
      setTimeout(() => this.input.focus(), 200);
    }

    close() {
      this.isOpen = false;
      this.panel.classList.remove('active');
    }

    clearChat() {
      this.messagesContainer.innerHTML = '';
      this.addInitialGreeting();
    }

    addInitialGreeting() {
      const greetingItem = KNOWLEDGE_RESPONSES.find(k => k.id === 'greeting');
      this.appendBotMessage(greetingItem.response(), greetingItem.chips);
    }

    handleUserMessage(text) {
      this.appendUserMessage(text);
      this.showTypingIndicator();

      // Realistic conversational delay
      setTimeout(() => {
        this.hideTypingIndicator();
        this.respondTo(text);
      }, 550);
    }

    respondTo(query) {
      let matched = null;

      for (const item of KNOWLEDGE_RESPONSES) {
        if (item.patterns.some(regex => regex.test(query))) {
          matched = item;
          break;
        }
      }

      if (matched) {
        this.appendBotMessage(matched.response(), matched.chips);
      } else {
        this.appendBotMessage(getFallbackResponse(query), [
          'What services do you offer?',
          'Where is your office?',
          'Contact numbers'
        ]);
      }
    }

    appendUserMessage(text) {
      const msg = document.createElement('div');
      msg.className = 'bot-msg user';
      msg.innerHTML = `
        <div class="bot-bubble">
          ${this.escapeHTML(text)}
        </div>
      `;
      this.messagesContainer.appendChild(msg);
      this.scrollToBottom();
    }

    appendBotMessage(htmlContent, chips = []) {
      const msg = document.createElement('div');
      msg.className = 'bot-msg bot';

      let chipsHTML = '';
      if (chips && chips.length > 0) {
        chipsHTML = `
          <div class="bot-chips-wrap">
            ${chips.map(chip => `<button type="button" class="bot-chip" onclick="window.operisBot.sendChip('${this.escapeQuotes(chip)}')">${chip}</button>`).join('')}
          </div>
        `;
      }

      msg.innerHTML = `
        <div class="bot-msg-avatar">
          <img src="${BOT_CONFIG.avatarImg}" alt="Bot">
        </div>
        <div class="bot-bubble">
          ${htmlContent}
          ${chipsHTML}
        </div>
      `;

      this.messagesContainer.appendChild(msg);
      this.scrollToBottom();
    }

    showTypingIndicator() {
      if (this.isTyping) return;
      this.isTyping = true;
      const typing = document.createElement('div');
      typing.id = 'botTyping';
      typing.className = 'bot-msg bot';
      typing.innerHTML = `
        <div class="bot-msg-avatar">
          <img src="${BOT_CONFIG.avatarImg}" alt="Bot">
        </div>
        <div class="bot-bubble bot-typing">
          <span class="bot-typing-dot"></span>
          <span class="bot-typing-dot"></span>
          <span class="bot-typing-dot"></span>
        </div>
      `;
      this.messagesContainer.appendChild(typing);
      this.scrollToBottom();
    }

    hideTypingIndicator() {
      const typing = document.getElementById('botTyping');
      if (typing) typing.remove();
      this.isTyping = false;
    }

    sendChip(text) {
      this.handleUserMessage(text);
    }

    jumpTo(selector) {
      const el = document.querySelector(selector);
      if (el) {
        this.close();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }

    scrollToBottom() {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    escapeHTML(str) {
      return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag));
    }

    escapeQuotes(str) {
      return str.replace(/'/g, "\\'");
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.operisBot = new OperisBotWidget();
    });
  } else {
    window.operisBot = new OperisBotWidget();
  }
})();
