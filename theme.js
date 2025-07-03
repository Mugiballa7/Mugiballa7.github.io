// Theme management script
(function() {
    'use strict';
    
    // Theme management object
    const ThemeManager = {
        init: function() {
            this.html = document.documentElement;
            this.themeToggle = null;
            this.currentTheme = localStorage.getItem('theme') || 'light';
            
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setup());
            } else {
                this.setup();
            }
        },
        
        setup: function() {
            this.themeToggle = document.getElementById('themeToggle');
            this.applyTheme(this.currentTheme);
            this.bindEvents();
        },
        
        applyTheme: function(theme) {
            if (theme === 'dark') {
                this.html.setAttribute('data-theme', 'dark');
                if (this.themeToggle) {
                    this.themeToggle.textContent = 'light';
                }
            } else {
                this.html.removeAttribute('data-theme');
                if (this.themeToggle) {
                    this.themeToggle.textContent = 'dark';
                }
            }
            this.currentTheme = theme;
            localStorage.setItem('theme', theme);
        },
        
        toggleTheme: function() {
            const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
            this.applyTheme(newTheme);
        },
        
        bindEvents: function() {
            if (this.themeToggle) {
                this.themeToggle.addEventListener('click', () => this.toggleTheme());
            }
        }
    };
    
    // Initialize theme manager
    ThemeManager.init();
    
    // Make it globally available if needed
    window.ThemeManager = ThemeManager;
})(); 