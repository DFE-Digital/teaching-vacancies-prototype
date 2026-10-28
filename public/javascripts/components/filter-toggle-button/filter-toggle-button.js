AppFrontend.FilterToggleButton = function(options) {
  this.options = options;
  this.container = this.options.toggleButton.container;
  this.createToggleButton();
  this.setupResponsiveChecks();
  this.options.filter.container.attr('tabindex', '-1');
  if(this.options.startHidden) {
    this.hideMenu();
  }
};

AppFrontend.FilterToggleButton.prototype.setupResponsiveChecks = function() {
  this.mq = window.matchMedia(this.options.bigModeMediaQuery);
  this.mq.addListener($.proxy(this, 'checkMode'));
  this.checkMode(this.mq);
};

AppFrontend.FilterToggleButton.prototype.createToggleButton = function() {
  var classes = this.options.toggleButton.classes || '';
  if (this.options.toggleButton.useLink) {
    this.menuButton = $('<a href="#" role="button" class="govuk-link govuk-link--no-visited-state ' + classes + '" aria-haspopup="true" aria-expanded="false">' + this.options.toggleButton.showText + '</a>');
  } else {
    this.menuButton = $('<button class="govuk-button ' + classes + '" type="button" aria-haspopup="true" aria-expanded="false">' + this.options.toggleButton.showText + '</button>');
  }
  this.menuButton.on('click', $.proxy(this, 'onMenuButtonClick'));
  this.options.toggleButton.container.append(this.menuButton);
};

AppFrontend.FilterToggleButton.prototype.checkMode = function(mq) {
  if(mq.matches) {
    this.enableBigMode();
  } else {
    this.enableSmallMode();
  }
};

AppFrontend.FilterToggleButton.prototype.enableBigMode = function() {
  this.showMenu();
  this.removeCloseButton();
};

AppFrontend.FilterToggleButton.prototype.enableSmallMode = function() {
  this.hideMenu();
  this.addCloseButton();
};

AppFrontend.FilterToggleButton.prototype.addCloseButton = function() {
  if(this.options.closeButton) {
    this.closeButton = $('<button class="app-filter__close" type="button">'+this.options.closeButton.text+'</button>');
    this.closeButton.on('click', $.proxy(this, 'onCloseClick'));
    this.options.closeButton.container.append(this.closeButton);
  }
};

AppFrontend.FilterToggleButton.prototype.onCloseClick = function() {
  this.hideMenu();
  this.menuButton.focus();
};

AppFrontend.FilterToggleButton.prototype.removeCloseButton = function() {
  if(this.closeButton) {
    this.closeButton.remove();
    this.closeButton = null;
  }
};

AppFrontend.FilterToggleButton.prototype.hideMenu = function() {
  this.menuButton.attr('aria-expanded', 'false');
  this.options.filter.container.addClass('app-js-hidden');
  this.menuButton.text(this.options.toggleButton.showText);
};

AppFrontend.FilterToggleButton.prototype.showMenu = function() {
  this.menuButton.attr('aria-expanded', 'true');
  this.options.filter.container.removeClass('app-js-hidden');
  this.menuButton.text(this.options.toggleButton.hideText);
};

AppFrontend.FilterToggleButton.prototype.onMenuButtonClick = function(event) {
  if (event && event.preventDefault) {
    event.preventDefault();
  }
  this.toggle();
};

AppFrontend.FilterToggleButton.prototype.toggle = function() {
  if(this.menuButton.attr('aria-expanded') == 'false') {
    this.showMenu();
    this.options.filter.container.focus();
  } else {
    this.hideMenu();
  }
};
