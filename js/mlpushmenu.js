/**
 * mlpushmenu.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
;
(function(window) {
    'use strict';
    var getElementsByClassName = function(className, tag, elm) {
            if(document.getElementsByClassName) {
                getElementsByClassName = function(className, tag, elm) {
                    elm = elm || document;
                    var elements = elm.getElementsByClassName(className),
                        nodeName = (tag) ? new RegExp("\\b" + tag + "\\b", "i") : null,
                        returnElements = [],
                        current;
                    for(var i = 0, il = elements.length; i < il; i += 1) {
                        current = elements[i];
                        if(!nodeName || nodeName.test(current.nodeName)) {
                            returnElements.push(current);
                        }
                    }
                    return returnElements;
                };
            } else if(document.evaluate) {
                getElementsByClassName = function(className, tag, elm) {
                    tag = tag || "*";
                    elm = elm || document;
                    var classes = className.split(" "),
                        classesToCheck = "",
                        xhtmlNamespace = "http://www.w3.org/1999/xhtml",
                        namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace) ? xhtmlNamespace : null,
                        returnElements = [],
                        elements,
                        node;
                    for(var j = 0, jl = classes.length; j < jl; j += 1) {
                        classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
                    }
                    try {
                        elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
                    } catch(e) {
                        elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
                    }
                    while((node = elements.iterateNext())) {
                        returnElements.push(node);
                    }
                    return returnElements;
                };
            } else {
                getElementsByClassName = function(className, tag, elm) {
                    tag = tag || "*";
                    elm = elm || document;
                    var classes = className.split(" "),
                        classesToCheck = [],
                        elements = (tag === "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag),
                        current,
                        returnElements = [],
                        match;
                    for(var k = 0, kl = classes.length; k < kl; k += 1) {
                        classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
                    }
                    for(var l = 0, ll = elements.length; l < ll; l += 1) {
                        current = elements[l];
                        match = false;
                        for(var m = 0, ml = classesToCheck.length; m < ml; m += 1) {
                            match = classesToCheck[m].test(current.className);
                            if(!match) {
                                break;
                            }
                        }
                        if(match) {
                            returnElements.push(current);
                        }
                    }
                    return returnElements;
                };
            }
            return getElementsByClassName(className, tag, elm);
            //console.log(getElementsByClassName('mp-level', null, this.el));
        }, A = function() {},
        G = function(id) {return(document.getElementById(id))},
        R = function() {},
        C = function() {};

    function extend(a, b) {
        for(var key in b) {
            if(b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    };
    // taken from https://github.com/inuyaksa/jquery.nicescroll/blob/master/jquery.nicescroll.js
    function hasParent(e, id) {
        if(!e) return false;
        var el = e.target || e.srcElement || e || false;
        while(el && el.id != id) {
            el = el.parentNode || false;
        }
        return (el !== false);
    };
    // returns the depth of the element "e" relative to element with id=id
    // for this calculation only parents with classname = waypoint are considered
    function getLevelDepth(e, id, waypoint, cnt) {
        cnt = cnt || 0;
        if(e.id.indexOf(id) >= 0) return cnt;
        if(classie.has(e, waypoint))++cnt;
        return e.parentNode && getLevelDepth(e.parentNode, id, waypoint, cnt);
    };
    // http://coveroverflow.com/a/11381730/989439
    function mobilecheck() {
        var check = false;
        (function(a) {if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))check = true})(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };
    // returns the closest element to 'e' that has class "classname"
    function closest(e, classname) {
        if(classie.has(e, classname))return e;
        return e.parentNode && closest(e.parentNode, classname);
    };
    function mlPushMenu(el, trigger, options) {
        this.el = el;
        this.trigger = trigger;
        this.options = extend(this.defaults, options);
        // support 3d transforms
        this.support = Modernizr.csstransforms;
        if(this.support) {
            this._init();
        }
    };
    mlPushMenu.prototype = {
        defaults: {
            // overlap: there will be a gap between open levels
            // cover: the open levels will be on top of any previous open level
            type: 'overlap', // overlap || cover
            // space between each overlaped level
            levelSpacing: 40,
            // classname for the element (if any) that when clicked closes the current level
            backClass: 'mp-back',
            //how long the menu slide in (ms)
            slideTime: 300
        },
        _init: function() {
            // if menu is open or not
            this.open = false;
            // level depth
            this.level = 0;
            // the moving wrapper
            this.wrapper = this.el.parentNode;
            // the mp-level elements
            this.levels = Array.prototype.slice.call(this.el.querySelectorAll('div.mp-level'));
            // save the depth of each of these mp-level elements
            var self = this;
            this.levels.forEach(function(el, i) { el.setAttribute('data-level', getLevelDepth(el, self.el.id, 'mp-level')); });
            // the menu items
            this.menuItems = Array.prototype.slice.call(this.el.querySelectorAll('li'));
            // if type == "cover" these will serve as hooks to move back to the previous level
            this.levelBack = Array.prototype.slice.call(this.el.querySelectorAll('.' + this.options.backClass));
            // event type (if mobile use touch events)
            this.eventtype = mobilecheck() ? 'touchstart' : 'click';
            // add the class mp-overlap or mp-cover to the main element depending on options.type
            classie.add(this.el, 'mp-' + this.options.type);
            //managing CSS
            this._initCSS();
            // initialize / bind the necessary events
            this._initEvents();
        },
        _initCSS: function() {
            function preFix(tag, value) {
                return '-webkit-' + tag + ':' + value + ';-moz-' + tag + ':' + value + ';' + tag + ':' + value + ';';
            };
            if(!G('mlPushMenuStyles')) {
                var styleTag = document.createElement('STYLE');
                styleTag.id = 'mlPushMenuStyles';
                document.documentElement.appendChild(styleTag);
            }
            var CSS = '';
            CSS += ".mp-pusher { position : relative; left : 0; height : 100%; }";
            CSS += ".mp-menu { position : absolute; /* we can't use fixed here :( */ top : 0; left : 0; z-index : 1; width : 300px; height : 100%; "+preFix("transform", "translateX(-100%)")+" }";
            CSS += ".mp-level { position : absolute; top : 0; left : 0; width : 100%; height : 100%; background : #336CA6; "+preFix("transform", "translateX(-100%)")+" }";
            /* overlays for pusher and for level that gets covered */
            CSS += ".mp-pusher::after, .mp-level::after, .mp-level::before { position : absolute; top : 0; right : 0; width : 0; height : 0; content : ''; opacity : 0; }";
            CSS += ".mp-pusher::after, .mp-level::after { background : rgba(0, 0, 0, 0.3); "+preFix("transition", "opacity 0.3s, width 0.1s 0.3s, height 0.1s 0.3s")+" }";
            CSS += ".mp-level::after { z-index : -1; }";
            /* asynchronous shadow the document when the menu slided in */
            CSS += ".mp-pusher.mp-pushed::after, .mp-level.mp-level-overlay::after { width : 100%; height : 100%; opacity : 1; "+preFix('transition','opacity 0.3s ease '+(this.options.slideTime-0+50)+'ms')+" }";
            CSS += ".mp-level.mp-level-overlay { cursor : pointer; }";
            CSS += ".mp-level.mp-level-overlay.mp-level::before { width : 100%; height : 100%; background : transparent; opacity : 1; }";
            /* make the menu slide in */
            CSS += ".mp-pusher, .mp-level { "+preFix("transition", "all "+this.options.slideTime+"ms")+" }";
            /* overlap */
            CSS += ".mp-overlap .mp-level.mp-level-open { box-shadow : 1px 0 1px rgba(0, 0, 0, 0.2); "+preFix("transform", "translateX(-40px)")+" }";
            /* First level */
            CSS += ".mp-menu > .mp-level, .mp-menu > .mp-level.mp-level-open, .mp-menu.mp-overlap > .mp-level, .mp-menu.mp-overlap > .mp-level.mp-level-open { box-shadow : none; "+preFix("transform", "translateX(0)")+" }";
            /* slide menu cover mode */
            CSS += ".mp-cover .mp-level.mp-level-open { "+preFix("transform", "translateX(0)")+" }";
            CSS += ".mp-cover .mp-level.mp-level-open > ul > li > .mp-level:not(.mp-level-open) { "+preFix("transform", "translateX(-100%)")+" }";
            /* content style */
            CSS += ".mp-menu ul { margin : 0; padding : 0; list-style : none; }";
            CSS += ".mp-menu h2 { margin : 0; padding : 1em; color : rgba(0, 0, 0, 0.4); text-shadow : 0 0 2px rgba(0, 0, 0, 0.1); font-weight : 300; font-size : 2em; }";
            CSS += ".mp-menu.mp-overlap h2::before { position : absolute; top : 0; right : 0; margin-right : 8px; font-size : 75%; line-height : 1.8; opacity : 0; -webkit-transition : opacity 0.3s, -webkit-transform 0.1s 0.3s; -moz-transition : opacity 0.3s, -moz-transform 0.1s 0.3s; transition : opacity 0.3s, transform 0.1s 0.3s; "+preFix("transform", "translateX(-100%)")+" }";
            CSS += ".mp-menu.mp-cover h2 { text-transform : uppercase; font-weight : 700; letter-spacing : 1px; font-size : 1em; }";
            CSS += ".mp-overlap .mp-level.mp-level-overlay > h2::before { opacity : 1; -webkit-transition : -webkit-transform 0.3s, opacity 0.3s; -moz-transition : -moz-transform 0.3s, opacity 0.3s; transition : transform 0.3s, opacity 0.3s; "+preFix("transform", "translateX(0)")+" }";
            CSS += ".mp-menu ul li > a { display : block; padding : 0.7em 1em 0.7em 1.8em; outline : none; box-shadow : inset 0 -1px rgba(0, 0, 0, 0.2); text-shadow : 0 0 2px rgba(255, 255, 255, 0.1); font-size : 1.4em; -webkit-transition : background 0.3s, box-shadow 0.3s; -moz-transition : background 0.3s, box-shadow 0.3s; transition : background 0.3s, box-shadow 0.3s; }";
            CSS += ".mp-menu ul li::before { position : absolute; left : 10px; z-index : -1; color : rgba(0, 0, 0, 0.2); line-height : 3.5; }";
            CSS += ".mp-level > ul > li:first-child > a { box-shadow : inset 0 -1px rgba(0, 0, 0, 0.2), inset 0 1px rgba(0, 0, 0, 0.2); }";
            CSS += ".mp-menu ul li a:hover, .mp-level > ul > li:first-child > a:hover { background : rgba(0, 0, 0, 0.2); box-shadow : inset 0 -2px rgba(0, 0, 0, 0); }";
            CSS += ".mp-menu .mp-level.mp-level-overlay > ul > li > a, .mp-level.mp-level-overlay > ul > li:first-child > a { box-shadow : inset 0 -1px rgba(0, 0, 0, 0); }";
            CSS += ".mp-back { background : rgba(0, 0, 0, 0.1); outline : none; color : #FFFFFF; text-transform : uppercase; letter-spacing : 1px; font-weight : 700; display : block; font-size : 0.8em; padding : 1em; position : relative; box-shadow : inset 0 1px rgba(0, 0, 0, 0.1); -webkit-transition : background 0.3s; -moz-transition : background 0.3s; transition : background 0.3s; }";
            CSS += ".mp-back::after { font-family : 'linecons'; position : absolute; content : \"\\e037\"; right : 10px; font-size : 1.3em; color : rgba(0, 0, 0, 0.3); }";
            CSS += ".mp-menu .mp-level.mp-level-overlay > .mp-back, .mp-menu .mp-level.mp-level-overlay > .mp-back::after { background : transparent; box-shadow : none; color : transparent; }";
            G('mlPushMenuStyles').innerHTML = CSS;
        },
        _initEvents: function() {
            var self = this;

            // the menu should close if clicking somewhere on the body
            var bodyClickFn = function(el) {
                self._resetMenu();
                el.removeEventListener(self.eventtype, bodyClickFn);
            };

            // open (or close) the menu
            this.trigger.addEventListener(this.eventtype, function(ev) {
                ev.stopPropagation();
                ev.preventDefault();
                if(self.open) {
                    self._resetMenu();
                } else {
                    self._openMenu();
                    // the menu should close if clicking somewhere on the body (excluding clicks on the menu)
                    document.addEventListener(self.eventtype, function(ev) {
                        if(self.open && !hasParent(ev.target, self.el.id)) {
                            bodyClickFn(this);
                        }
                    });
                }
            });
            // opening a sub level menu
            this.menuItems.forEach(function(el, i) {
                // check if it has a sub level
                var subLevel = el.querySelector('div.mp-level');
                if(subLevel) {
                    el.querySelector('a').addEventListener(self.eventtype, function(ev) {
                        ev.preventDefault();
                        var level = closest(el, 'mp-level').getAttribute('data-level');
                        if(self.level <= level) {
                            ev.stopPropagation();
                            classie.add(closest(el, 'mp-level'), 'mp-level-overlay');
                            self._openMenu(subLevel);
                        }
                    });
                }
            });
            // closing the sub levels :
            // by clicking on the visible part of the level element
            this.levels.forEach(function(el, i) {
                el.addEventListener(self.eventtype, function(ev) {
                    ev.stopPropagation();
                    var level = el.getAttribute('data-level');
                    if(self.level > level) {
                        self.level = level;
                        self._closeMenu();
                    }
                });
            });
            // by clicking on a specific element
            this.levelBack.forEach(function(el, i) {
                el.addEventListener(self.eventtype, function(ev) {
                    ev.preventDefault();
                    var level = closest(el, 'mp-level').getAttribute('data-level');
                    if(self.level <= level) {
                        ev.stopPropagation();
                        self.level = closest(el, 'mp-level').getAttribute('data-level') - 1;
                        self.level === 0 ? self._resetMenu() : self._closeMenu();
                    }
                });
            });
        },
        _openMenu: function(subLevel) {
            // increment level depth
            ++this.level;

            // move the main wrapper
            var levelFactor = ( this.level - 1 ) * this.options.levelSpacing,
                translateVal = this.options.type === 'overlap' ? this.el.offsetWidth + levelFactor : this.el.offsetWidth;
            //console.log('_openMenu _setTransform');
            this._setTransform('translateX(' + translateVal + 'px)');

            if(subLevel) {
                // reset transform for sublevel
                //console.log('_openMenu if _setTransform');
                subLevel.style.transitionDuration = '';
                subLevel.style.visibility = '';
                this._setTransform('', subLevel);
                // need to reset the translate value for the level menus that have the same level depth and are not open
                for(var i = 0, len = this.levels.length; i < len; ++i) {
                    var levelEl = this.levels[i];
                    if(levelEl != subLevel && !classie.has(levelEl, 'mp-level-open')) {
                        //console.log('_openMenu if for _setTransform');
                        levelEl.style.transitionDuration = '0ms';
                        levelEl.style.visibility = 'hidden';
                        this._setTransform('translateX(-100%) translateX(' + -1 * levelFactor + 'px)', levelEl);
                    }
                }
            }
            // add class mp-pushed to main wrapper if opening the first time
            if(this.level === 1) {
                classie.add(this.wrapper, 'mp-pushed');
                this.open = true;
            }
            // add class mp-level-open to the opening level element
            classie.add(subLevel || this.levels[0], 'mp-level-open');
        },
        // close the menu
        _resetMenu: function() {
            this._setTransform('translateX(0)');
            this.level = 0;
            // remove class mp-pushed from main wrapper
            classie.remove(this.wrapper, 'mp-pushed');
            this._toggleLevels();
            this.open = false;
        },
        // close sub menus
        _closeMenu: function() {
            var translateVal = this.options.type === 'overlap' ? this.el.offsetWidth + ( this.level - 1 ) * this.options.levelSpacing : this.el.offsetWidth;
            this._setTransform('translateX(' + translateVal + 'px)');
            this._toggleLevels();
        },
        // translate the el
        _setTransform: function(val, el) {
            el = el || this.levels[0];
            el.style.WebkitTransform = val;
            el.style.MozTransform = val;
            el.style.transform = val;
        },
        // removes classes mp-level-open from closing levels
        _toggleLevels: function() {
            for(var i = 0, len = this.levels.length; i < len; ++i) {
                var levelEl = this.levels[i];
                if(levelEl.getAttribute('data-level') >= this.level + 1) {
                    classie.remove(levelEl, 'mp-level-open');
                    classie.remove(levelEl, 'mp-level-overlay');
                } else if(Number(levelEl.getAttribute('data-level')) == this.level) {
                    classie.remove(levelEl, 'mp-level-overlay');
                }
            }
        }
    }
    // add to global namespace
    window.mlPushMenu = mlPushMenu;

})(window);