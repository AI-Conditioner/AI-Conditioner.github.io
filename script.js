(function () {
  var config = window.SITE_CONFIG;
  if (!config) return;

  var UI_TEXT = {
    en: {
      navAbout: "About",
      navInterests: "Interests",
      navPapers: "Publications",
      navCv: "CV",
      navScores: "Scores",
      navContact: "Contact",
      locationLabel: "Location",
      emailLabel: "Email",
      newsHeading: "News",
      interestsHeading: "Research & Personal Interests",
      interestsSub: "Core academic problems I investigate, alongside interests outside the lab.",
      researchTitle: "Research Interests",
      personalTitle: "Personal Interests (Misc)",
      papersHeading: "Publications & arXiv Preprints",
      papersSub: "Filter by topic or keyword, inspect abstracts, open PDFs, or copy BibTeX.",
      papersEmptyDefault: "No arXiv preprints listed yet — coming soon.",
      cvHeading: "Curriculum Vitae",
      cvSub: "Academic CV and full research background.",
      cvEmpty: "Curriculum Vitae is currently being prepared and will be added soon.",
      viewCvPdf: "View CV (PDF)",
      scoresHeading: "Education, Transcript & Standardized Test Scores",
      scoresSub: "Academic degrees, official graduate transcript, GRE, and TOEFL iBT records.",
      contactHeading: "Contact",
      contactSub: "Feel free to reach out regarding Ph.D. openings, preprints, or research collaborations.",
      copyEmailBtn: "Copy Email",
      copyBibBtn: "Copy BibTeX",
      searchPlaceholder: "Search title, author, or arXiv ID...",
      allTopics: "All",
      emptyPapers: "No preprints match your filter.",
      showAbstract: "Abstract",
      hideAbstract: "Hide Abstract",
      copiedEmail: "Copied email: ",
      copiedBib: "BibTeX copied to clipboard",
      viewReportPdf: "View Official PDF"
    }
  };

  try {
    localStorage.removeItem("site-ui-lang");
  } catch (e) {
    // ignore storage access errors
  }

  var state = {
    lang: "en",
    activeTopic: "__ALL__",
    searchQuery: "",
    lastTriggerEl: null,
    toastTimer: null
  };

  function t(key) {
    return UI_TEXT.en[key] || "";
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  }

  function showToast(message) {
    var toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    if (state.toastTimer) clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(function () {
      toast.hidden = true;
    }, 2400);
  }

  function copyText(text, successMsg) {
    if (!text) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast(successMsg);
      }).catch(function () {
        fallbackCopy(text, successMsg);
      });
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    var area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    try {
      document.execCommand("copy");
      showToast(successMsg);
    } catch (e) {
      showToast("Copy failed");
    }
    document.body.removeChild(area);
  }

  function applyUiLanguage() {
    document.documentElement.lang = "en";
    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      var key = node.getAttribute("data-i18n");
      if (key) node.textContent = t(key);
    });
    var search = document.getElementById("paper-search");
    if (search) search.placeholder = t("searchPlaceholder");
  }

  function initTheme() {
    var toggle = document.getElementById("theme-toggle");
    var icon = document.getElementById("theme-icon");

    function syncIcon() {
      var current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
      if (icon) icon.textContent = current === "dark" ? "☀" : "☾";
    }

    syncIcon();
    if (toggle) {
      toggle.addEventListener("click", function () {
        var next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem("site-theme", next);
        } catch (e) {
          // 忽略隐私存储限制
        }
        syncIcon();
      });
    }
  }

  function initMobileMenu() {
    var btn = document.getElementById("menu-toggle");
    var nav = document.getElementById("site-nav");
    if (!btn || !nav) return;

    btn.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  }

  function renderProfile() {
    document.title = config.site.title || "Academic Homepage";
    var descMeta = document.querySelector('meta[name="description"]');
    if (descMeta && config.site.description) {
      descMeta.setAttribute("content", config.site.description);
    }

    document.getElementById("brand-link").textContent = config.site.brand;

    var profile = config.profile;
    document.getElementById("status-badge").textContent = profile.statusBadge;
    document.getElementById("profile-name").textContent = profile.name;
    document.getElementById("profile-native-name").textContent = profile.nativeName || "";
    document.getElementById("profile-headline").textContent = profile.headline;
    document.getElementById("profile-affiliation").textContent = profile.affiliation;
    document.getElementById("profile-location").textContent = profile.location;
    var heroEmailBtn = document.getElementById("hero-copy-email");
    var emailTextEl = document.getElementById("profile-email-text");
    if (profile.email) {
      if (emailTextEl) emailTextEl.textContent = profile.email;
      if (heroEmailBtn && heroEmailBtn.parentElement) heroEmailBtn.parentElement.style.display = "";
    } else {
      if (emailTextEl) emailTextEl.textContent = "";
      if (heroEmailBtn && heroEmailBtn.parentElement) heroEmailBtn.parentElement.style.display = "none";
    }

    var bioBox = document.getElementById("profile-bio");
    bioBox.innerHTML = "";
    (profile.bioParagraphs || []).forEach(function (para) {
      bioBox.appendChild(el("p", "", para));
    });

    var portraitFrame = document.getElementById("portrait-frame");
    portraitFrame.innerHTML = "";
    if (profile.avatarUrl) {
      var img = document.createElement("img");
      img.src = profile.avatarUrl;
      img.alt = profile.name + " portrait";
      portraitFrame.appendChild(img);
    } else {
      portraitFrame.appendChild(el("span", "portrait-monogram", profile.monogram || "PhD"));
    }

    var heroLinks = document.getElementById("hero-links");
    var socialLinks = document.getElementById("social-links");
    heroLinks.innerHTML = "";
    socialLinks.innerHTML = "";

    (profile.heroLinks || []).forEach(function (item) {
      if (!item.url) return;
      var pill = el("a", "link-pill", item.label);
      pill.href = item.url;
      if (item.url.charAt(0) !== "#") {
        pill.target = "_blank";
        pill.rel = "noopener noreferrer";
      }
      heroLinks.appendChild(pill);

      var btn = el("a", "btn btn-secondary btn-sm", item.label);
      btn.href = item.url;
      if (item.url.charAt(0) !== "#") {
        btn.target = "_blank";
        btn.rel = "noopener noreferrer";
      }
      socialLinks.appendChild(btn);
    });

    var newsList = document.getElementById("news-list");
    newsList.innerHTML = "";
    (config.news || []).forEach(function (item) {
      var li = el("li", "news-item");
      li.appendChild(el("span", "news-date", item.date));
      li.appendChild(el("span", "news-text", item.text));
      newsList.appendChild(li);
    });

    document.getElementById("footer-year").textContent = new Date().getFullYear();
    document.getElementById("footer-owner").textContent = config.site.footerOwner || profile.name;
    document.getElementById("footer-updated").textContent = config.site.lastUpdated || "";

    var copyEmailHandler = function () {
      if (!profile.email) return;
      copyText(profile.email, t("copiedEmail") + profile.email);
    };
    var contactCopyBtn = document.getElementById("copy-email-btn");
    if (contactCopyBtn) {
      contactCopyBtn.style.display = profile.email ? "" : "none";
      contactCopyBtn.addEventListener("click", copyEmailHandler);
    }
    if (heroEmailBtn) heroEmailBtn.addEventListener("click", copyEmailHandler);
  }

  function renderInterests() {
    var researchBox = document.getElementById("research-interests");
    researchBox.innerHTML = "";
    (config.interests.research || []).forEach(function (item) {
      var card = el("article", "card");
      card.appendChild(el("h4", "", item.title));
      card.appendChild(el("p", "", item.description));

      var tags = el("div", "tag-row");
      (item.tags || []).forEach(function (tag) {
        tags.appendChild(el("span", "tag", tag));
      });
      card.appendChild(tags);
      researchBox.appendChild(card);
    });

    var personalBox = document.getElementById("personal-interests");
    personalBox.innerHTML = "";
    (config.interests.personal || []).forEach(function (item) {
      var card = el("div", "personal-item");
      card.appendChild(el("span", "personal-name", item.name));
      card.appendChild(el("span", "personal-detail", item.detail));
      personalBox.appendChild(card);
    });
  }

  function appendHighlightedAuthors(parent, authorsText, targetName) {
    if (!targetName || !authorsText || authorsText.indexOf(targetName) === -1) {
      parent.textContent = authorsText || "";
      return;
    }
    var parts = authorsText.split(targetName);
    parts.forEach(function (part, idx) {
      parent.appendChild(document.createTextNode(part));
      if (idx < parts.length - 1) {
        parent.appendChild(el("span", "author-highlight", targetName));
      }
    });
  }

  function openBibtexModal(paper, triggerEl) {
    var modal = document.getElementById("bibtex-modal");
    if (!modal) return;
    state.lastTriggerEl = triggerEl || document.activeElement;
    document.getElementById("modal-paper-name").textContent = paper.title;
    document.getElementById("modal-bibtex-text").textContent = paper.bibtex || "";
    modal.hidden = false;
    document.getElementById("modal-close").focus();
  }

  function closeBibtexModal() {
    var modal = document.getElementById("bibtex-modal");
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    if (state.lastTriggerEl && typeof state.lastTriggerEl.focus === "function") {
      state.lastTriggerEl.focus();
    }
  }

  function renderPaperFilters() {
    var bar = document.getElementById("paper-filters");
    var searchWrap = document.querySelector(".paper-controls");
    bar.innerHTML = "";
    var papers = config.papers || [];
    if (papers.length === 0) {
      bar.style.display = "none";
      if (searchWrap) searchWrap.style.display = "none";
      return;
    }
    bar.style.display = "";
    if (searchWrap) searchWrap.style.display = "";

    var topics = ["__ALL__"];
    papers.forEach(function (p) {
      if (p.topic && topics.indexOf(p.topic) === -1) {
        topics.push(p.topic);
      }
    });

    topics.forEach(function (topic) {
      var label = topic === "__ALL__" ? t("allTopics") : topic;
      var btn = el("button", "filter-btn" + (state.activeTopic === topic ? " active" : ""), label);
      btn.type = "button";
      btn.addEventListener("click", function () {
        state.activeTopic = topic;
        renderPaperFilters();
        renderPapers();
      });
      bar.appendChild(btn);
    });
  }

  function renderPapers() {
    var list = document.getElementById("paper-list");
    var sub = document.querySelector("#papers .section-head p");
    list.innerHTML = "";
    var papers = config.papers || [];
    if (papers.length === 0) {
      if (sub) sub.style.display = "none";
      list.appendChild(el("div", "empty-state", t("papersEmptyDefault")));
      return;
    }
    if (sub) sub.style.display = "";
    var query = state.searchQuery.trim().toLowerCase();

    var filtered = papers.filter(function (paper) {
      var matchTopic = state.activeTopic === "__ALL__" || paper.topic === state.activeTopic;
      if (!matchTopic) return false;
      if (!query) return true;
      var haystack = [paper.title, paper.authors, paper.venue, paper.arxivId, paper.topic, paper.tldr]
        .join(" ")
        .toLowerCase();
      return haystack.indexOf(query) !== -1;
    });

    if (filtered.length === 0) {
      list.appendChild(el("div", "empty-state", t("emptyPapers")));
      return;
    }

    filtered.forEach(function (paper) {
      var row = el("article", "paper-row");

      var left = el("div", "paper-left");
      left.appendChild(el("span", "venue-badge", paper.badge || ("arXiv " + (paper.year || ""))));
      if (paper.topic) left.appendChild(el("span", "topic-label", paper.topic));
      row.appendChild(left);

      var right = el("div", "paper-right");
      var title = el("h3", "paper-title");
      var primaryUrl = paper.arxivUrl || (paper.arxivId ? "https://arxiv.org/abs/" + paper.arxivId : "#");
      var titleLink = el("a", "", paper.title);
      titleLink.href = primaryUrl;
      titleLink.target = "_blank";
      titleLink.rel = "noopener noreferrer";
      title.appendChild(titleLink);
      right.appendChild(title);

      var authors = el("p", "paper-authors");
      appendHighlightedAuthors(authors, paper.authors, paper.highlightAuthor);
      right.appendChild(authors);

      if (paper.venue) {
        right.appendChild(el("p", "paper-venue-line", paper.venue));
      }

      if (paper.tldr) {
        right.appendChild(el("p", "paper-tldr", paper.tldr));
      }

      var actions = el("div", "paper-actions");

      if (paper.arxivUrl || paper.arxivId) {
        var absLink = el("a", "btn btn-secondary btn-sm", "arXiv");
        absLink.href = paper.arxivUrl || ("https://arxiv.org/abs/" + paper.arxivId);
        absLink.target = "_blank";
        absLink.rel = "noopener noreferrer";
        actions.appendChild(absLink);
      }

      if (paper.pdfUrl || paper.arxivId) {
        var pdfLink = el("a", "btn btn-secondary btn-sm", "PDF");
        pdfLink.href = paper.pdfUrl || ("https://arxiv.org/pdf/" + paper.arxivId);
        pdfLink.target = "_blank";
        pdfLink.rel = "noopener noreferrer";
        actions.appendChild(pdfLink);
      }

      if (paper.codeUrl) {
        var codeLink = el("a", "btn btn-ghost btn-sm", "Code");
        codeLink.href = paper.codeUrl;
        codeLink.target = "_blank";
        codeLink.rel = "noopener noreferrer";
        actions.appendChild(codeLink);
      }

      var abstractEl = null;
      if (paper.abstract) {
        var toggleAbsBtn = el("button", "btn btn-ghost btn-sm", t("showAbstract"));
        toggleAbsBtn.type = "button";
        abstractEl = el("div", "paper-abstract", paper.abstract);
        abstractEl.hidden = true;
        toggleAbsBtn.addEventListener("click", function () {
          var willShow = abstractEl.hidden;
          abstractEl.hidden = !willShow;
          toggleAbsBtn.textContent = willShow ? t("hideAbstract") : t("showAbstract");
        });
        actions.appendChild(toggleAbsBtn);
      }

      if (paper.bibtex) {
        var bibBtn = el("button", "btn btn-ghost btn-sm", "BibTeX");
        bibBtn.type = "button";
        bibBtn.addEventListener("click", function () {
          openBibtexModal(paper, bibBtn);
        });
        actions.appendChild(bibBtn);
      }

      right.appendChild(actions);
      if (abstractEl) right.appendChild(abstractEl);
      row.appendChild(right);
      list.appendChild(row);
    });
  }

  function renderEducationAndScores() {
    var eduGrid = document.getElementById("education-grid");
    eduGrid.innerHTML = "";
    (config.education || []).forEach(function (edu) {
      var card = el("div", "edu-card");
      var top = el("div", "edu-top");
      top.appendChild(el("h3", "edu-degree", edu.degree));
      top.appendChild(el("span", "edu-period", edu.period));
      card.appendChild(top);
      card.appendChild(el("p", "edu-inst", edu.institution));
      if (edu.detail) card.appendChild(el("p", "edu-detail", edu.detail));
      eduGrid.appendChild(card);
    });

    var grid = document.getElementById("score-grid");
    grid.innerHTML = "";
    var visibleScores = (config.scores || []).filter(function (item) {
      return item.visible !== false;
    });

    visibleScores.forEach(function (score) {
      var card = el("article", "card score-card");

      var top = el("div", "score-top");
      top.appendChild(el("h3", "score-name", score.name));
      if (score.date) top.appendChild(el("span", "score-date", score.date));
      card.appendChild(top);

      var overallBox = el("div", "score-overall");
      overallBox.appendChild(el("span", "score-number", score.overall));
      overallBox.appendChild(el("span", "score-label", score.overallLabel || "Total"));
      card.appendChild(overallBox);

      var dl = el("dl", "score-breakdown");
      (score.breakdown || []).forEach(function (sub) {
        var row = el("div", "score-row");
        row.appendChild(el("dt", "", sub.label));
        row.appendChild(el("dd", "", sub.value));
        dl.appendChild(row);
      });
      card.appendChild(dl);

      if (score.note) {
        card.appendChild(el("p", "score-note", score.note));
      }

      if (score.reportPdfUrl) {
        var scoreActions = el("div", "score-actions");
        var pdfBtn = el("a", "btn btn-secondary btn-sm", score.reportPdfLabel || t("viewReportPdf"));
        pdfBtn.href = score.reportPdfUrl;
        pdfBtn.target = "_blank";
        pdfBtn.rel = "noopener noreferrer";
        scoreActions.appendChild(pdfBtn);
        card.appendChild(scoreActions);
      }

      grid.appendChild(card);
    });
  }

  function renderCv() {
    var box = document.getElementById("cv-content");
    if (!box) return;
    box.innerHTML = "";
    var cv = config.cv || {};
    if (cv.pdfUrl) {
      var btn = el("a", "btn btn-primary", t("viewCvPdf"));
      btn.href = cv.pdfUrl;
      btn.target = "_blank";
      btn.rel = "noopener noreferrer";
      box.appendChild(btn);
    } else {
      box.appendChild(el("div", "empty-state", t("cvEmpty")));
    }
  }

  function initPaperSearch() {
    var input = document.getElementById("paper-search");
    if (!input) return;
    input.addEventListener("input", function () {
      state.searchQuery = input.value;
      renderPapers();
    });
  }

  function initModal() {
    var modal = document.getElementById("bibtex-modal");
    var closeBtn = document.getElementById("modal-close");
    var copyBtn = document.getElementById("modal-copy-btn");
    if (!modal) return;

    closeBtn.addEventListener("click", closeBibtexModal);
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeBibtexModal();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeBibtexModal();
    });
    copyBtn.addEventListener("click", function () {
      var text = document.getElementById("modal-bibtex-text").textContent;
      copyText(text, t("copiedBib"));
    });
  }

  function loadOptionalOpenAlex() {
    var authorId = config.site && config.site.openAlexAuthorId;
    if (!authorId) return;
    var box = document.getElementById("openalex-box");
    var stats = document.getElementById("openalex-stats");
    if (!box || !stats) return;

    var cleanId = encodeURIComponent(authorId.replace(/^https?:\/\/openalex\.org\//i, ""));
    var endpoint = "https://api.openalex.org/authors/" + cleanId;
    if (config.profile && config.profile.email) {
      endpoint += "?mailto=" + encodeURIComponent(config.profile.email);
    }

    fetch(endpoint)
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (data) {
        if (typeof data.works_count === "number") {
          stats.textContent = data.works_count + " works · " + (data.cited_by_count || 0) + " citations";
          box.hidden = false;
        }
      })
      .catch(function () {
        // 离线或限流时静默保持纯静态展示
      });
  }

  initTheme();
  initMobileMenu();
  renderProfile();
  applyUiLanguage();
  renderInterests();
  renderPaperFilters();
  renderPapers();
  renderCv();
  renderEducationAndScores();
  initPaperSearch();
  initModal();
  loadOptionalOpenAlex();
})();
