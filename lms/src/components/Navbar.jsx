import React, { useState, useEffect, useRef } from 'react';
import { 
  Monitor, 
  Code2, 
  Compass, 
  Search, 
  Sun, 
  Moon, 
  Radio, 
  CheckCircle2, 
  X,
  Menu,
  User,
  HelpCircle
} from 'lucide-react';

export function Navbar({ 
  onNavigateHub, 
  onSelectLesson, 
  lessons, 
  studentInfo,
  connectionStatus, 
  workshopName,
  onOpenSyncModal,
  onOpenHelpModal,
  theme,
  onToggleTheme,
  onToggleSidebarMobile
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Global hotkey: '/' focuses search, 'Esc' closes search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchOpen(true);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter lessons
  const filteredLessons = searchQuery.trim() 
    ? lessons.filter(l => 
        l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.num_str.includes(searchQuery) ||
        (l.focus && l.focus.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 8)
    : [];

  return (
    <header className="app-navbar">
      <div className="navbar-left">
        <button 
          className="mobile-menu-btn" 
          onClick={onToggleSidebarMobile}
          aria-label="Toggle Navigation Sidebar"
        >
          <Menu size={20} />
        </button>

        <a 
          href="https://botforge.in" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="company-logo-link"
          title="Botforge Robotics - botforge.in"
        >
          <img 
            src="assets/images/botforge_black.png" 
            alt="Botforge Robotics" 
            className="company-logo" 
          />
        </a>

        <div className="navbar-divider"></div>

        <button 
          onClick={onNavigateHub} 
          className="brand-link-btn"
          title="Return to Level 1 Course Hub"
        >
          <img 
            src="assets/images/ros2_logo.svg" 
            alt="ROS 2" 
            className="ros2-logo" 
          />
          <div className="brand-text">
            <span className="brand-title">NavPro Learning Hub</span>
            <span className="brand-badge">Level 1 &bull; ROS 2 Jazzy</span>
          </div>
        </button>
      </div>

      {/* Global Search Center */}
      <div className="navbar-center" ref={searchContainerRef}>
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search lessons, nodes, topics... (Press /)"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            className="search-input-field"
          />
          {searchQuery && (
            <button 
              className="search-clear-btn" 
              onClick={() => {
                setSearchQuery('');
                setIsSearchOpen(false);
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {isSearchOpen && searchQuery.trim() && (
          <div className="search-results-dropdown fade-in">
            {filteredLessons.length > 0 ? (
              filteredLessons.map(l => (
                <button
                  key={l.id}
                  className="search-result-item"
                  onClick={() => {
                    onSelectLesson(l.id);
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                >
                  <span className="search-res-num">{l.num_str}</span>
                  <div className="search-res-info">
                    <span className="search-res-title">{l.title}</span>
                    <span className="search-res-module">{l.module}</span>
                  </div>
                </button>
              ))
            ) : (
              <div className="search-no-results">
                No lessons matched "{searchQuery}"
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons Right */}
      <div className="navbar-right">
        {/* Quick Launch Buttons */}
        <a 
          href="http://localhost:6080/vnc.html" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="nav-action-btn desktop-btn"
          title="Open Ubuntu Desktop GUI via noVNC (Gazebo / RViz2 on port 6080)"
        >
          <Monitor size={16} />
          <span>Desktop GUI</span>
        </a>

        <a 
          href="http://localhost:8443/?folder=/home/student/ros2_ws" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="nav-action-btn vscode-btn"
          title="Open in-browser VS Code Editor on port 8443"
        >
          <Code2 size={16} />
          <span>VS Code</span>
        </a>

        {/* Hub Link */}
        <button 
          onClick={onNavigateHub} 
          className="nav-action-btn hub-btn"
          title="Course Hub Overview"
        >
          <Compass size={16} />
          <span>Hub</span>
        </button>

        {/* Student Login / Attendance Button */}
        <button 
          onClick={onOpenSyncModal} 
          className={`student-login-nav-btn ${studentInfo?.registered ? 'registered' : 'unregistered'} ${connectionStatus}`}
          title={studentInfo?.registered ? `Logged in: ${studentInfo.name} (${connectionStatus}) - Click to edit` : "Click to log in and submit workshop attendance"}
        >
          <User size={15} />
          <span>
            {studentInfo?.name 
              ? `${studentInfo.name.split(' ')[0]} (${connectionStatus === 'connected' ? 'Synced' : 'Local'})` 
              : 'Student Login'}
          </span>
        </button>

        {/* Help & FAQ Button */}
        <button 
          onClick={onOpenHelpModal} 
          className="nav-action-btn help-btn"
          title="Curriculum Help, Docker Reset & Storage FAQ"
        >
          <HelpCircle size={16} />
          <span>Help</span>
        </button>

        {/* Theme Toggle */}
        <button 
          onClick={onToggleTheme} 
          className="theme-toggle-btn"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </div>
    </header>
  );
}
