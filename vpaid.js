const Vpaid = class {
  buttonReduceSwitch = "<svg id=\"bliink-switch\" style=\"width:20px;height:20px;position:absolute;top:5px;z-index:50;right:10px;cursor: pointer;\" version=\"1.1\"\n id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n viewBox=\"0 0 170.8 113.3\" style=\"enable-background:new 0 0 170.8 113.3;\" xml:space=\"preserve\">\n <style type=\"text/css\">\n   .st0 {\n     opacity: 0.7;\n   }\n\n   .st1 {\n     fill: #FFFFFF;\n   }\n </style>\n <rect class=\"st0\" width=\"170.8\" height=\"113.3\" />\n <path class=\"st1\"\n   d=\"M88.8,63c-9.4,0-18.7,0-28.1,0c-5.1,0-8.5-3.4-6.6-6.7c1.1-1.9,3.6-3,6.8-3c11,0,22.1,0,33.1,0\nc7.7,0,15.5,0,23.2,0c3.5,0,6.5,1.9,6.8,4.2c0.4,2.5-1.9,4.8-5.4,5.3c-0.8,0.1-1.6,0.1-2.4,0.1C107.2,63,98,63,88.8,63z\" />\n</svg>"
  buttonCloseSwitch = "<svg id=\"bliink-switch-close\" style=\"width:35px;height:35px;position:absolute;bottom:35%;z-index:50;right:0px;cursor: pointer;\" version=\"1.1\" id=\"Calque_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\nviewBox=\"0 0 338 302\" style=\"enable-background:new 0 0 338 302;\" xml:space=\"preserve\">\n<path d=\"M168.6,240.9c-49.7-0.2-89.7-40.6-89.5-90.4c0.2-49.7,40.5-89.6,90.4-89.5c49.2,0.1,89.5,40.7,89.4,90.1\nC258.8,200.8,218.2,241.1,168.6,240.9z M184.8,150.7c6.9-6.7,13.6-12.9,20-19.4c4.6-4.7,4.4-11.3,0.1-15.8\nc-4.4-4.6-11.2-4.8-16.2-0.4c-1.6,1.4-3.1,3-4.6,4.6c-5,5.1-9.9,10.1-15,15.4c-7-7.1-13.3-13.6-19.7-19.8c-3.9-3.7-9-4.3-13.4-1.9\nc-4.4,2.4-7.1,7.4-5.7,12.2c0.8,2.7,2.5,5.4,4.5,7.5c5.9,6.1,12.1,11.8,18.5,18c-7.2,7.1-13.7,13.3-20,19.7c-3.7,3.8-4.3,9.1-2,13.4\nc2.3,4.3,7,7,11.6,5.9c2.7-0.7,5.5-2.3,7.6-4.3c6.3-5.9,12.2-12.1,18.6-18.5c6.5,6.6,12.4,12.6,18.4,18.6c5.6,5.5,12.4,5.9,17.2,1.1\nc5-4.9,4.6-11.6-0.9-17.2C197.7,163.4,191.6,157.5,184.8,150.7z\"/>\n</svg>"
  vpaidDom = "\n        <div\n            \n            \n            \n            data-wrapperId=\"6225d3b65cf8960018fe6644\"\n            data-id=\"6225d3b65cf8960018fe6644\"\n            data-index=\"1\"\n            class=\"full-image hide\"\n            style=\"z-index: 1; transition: all .8s ease-in-out; position: absolute; left: 0.00%; top: 0.00%; width: 100.00%; height: 100.00%; transition: all ease-in-out 0.3s;\"\n        >   \n            <div style=\"width:100%; height:100%; position: absolute; bottom: 0;overflow: hidden;\">\n                <div data-type=\"image\" style=\"background: url(https://creative-stg.bliink.io/6225d36f5cf8960018fe6624/PaNWW6y.jpeg) no-repeat center center; background-size: cover;position: absolute; width: 101%; height: auto !important; top: 0%; bottom: 1%; left: -1%; right: 0%; ; z-index: 0;\"></div><div  data-type=\"image\" style=\"position: absolute; width: 35%; height: 10%; top: 83%; bottom: 6%; left: 33%; right: 33%; ;\"> <img  src=\"data:image/png;base64,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\" alt=\"\" style=\"z-index: 1; height: 100%; width: 100%;\"/></div><div  data-type=\"image\" style=\"position: absolute; width: 63%; height: 23%; top: 0%; bottom: 77%; left: 18%; right: 18%; ;\"> <img  src=\"https://creative-stg.bliink.io/6225d36f5cf8960018fe6624/8q7pQ8r.png\" alt=\"\" style=\"z-index: 2; height: 100%; width: 100%;\"/></div>\n            </div>\n    </div>"
  vpaidDomInImage = undefined
  videoStylesFormat = 'position: absolute; width: 59%; height: 45%; top: 29%; bottom: 26%; left: 41%; right: 0%; ';
  adDuration = 9000
  constructor() {
    /**
     * The slot is the div element on the main page that the ad is supposed to
     * occupy.
     * @private {Object}
     */
    this.slot_ = null;

    /**
     * The video slot is the video element used by the ad to render video
     * content.
     * @private {Object}
     */
    this.videoSlot_ = null;

    /**
     * An object containing all registered events. These events are all
     * callbacks for use by the VPAID ad.
     * @private {Object}
     */
    this.eventsCallbacks_ = {};

    /**
     * A list of getable and setable attributes.
     * @private {Object}
     */
    this.attributes_ = {
      companions: '',
      desiredBitrate: 256,
      duration: 10,
      expanded: false,
      height: 0,
      icons: '',
      linear: false,
      skippableState: false,
      viewMode: 'normal',
      width: 0,
      volume: 1.0,
    };

    /**
     * When the ad was started.
     * @private {number}
     */
    this.startTime_ = 0;

    /**
     * A set of ad playback events to be reported.
     * @private {Object}
     */
    this.quartileEvents_ = [
      { event: 'AdImpression', value: 0 },
      { event: 'AdVideoStart', value: 0 },
      { event: 'AdVideoFirstQuartile', value: 25 },
      { event: 'AdVideoMidpoint', value: 50 },
      { event: 'AdVideoThirdQuartile', value: 75 },
      { event: 'AdVideoComplete', value: 100 },
    ];

    /**
     * @private {number} An index into what quartile was last reported.
     */
    this.nextQuartileIndex_ = 0;

    /**
     * Parameters passed in from the AdParameters section of the VAST.
     * Used for video URL and MIME type.
     * @private {!Object}
     */
    this.parameters_ = {};
  }
  clickAd_() {
    if ('AdClickThru' in this.eventsCallbacks_) {
      this.eventsCallbacks_['AdClickThru']('', '0', true);
    }
  }
  /**
   * Returns the supported VPAID verion.
   * @param {string} version
   * @return {string}
   */
  handshakeVersion() {
    return '2.0';
  }

  /**
   * Initializes all attributes in the ad. The ad will not start until startAd
   * is called.
   * @param {number} width The ad width.
   * @param {number} height The ad height.
   * @param {string} viewMode The ad view mode.
   * @param {number} desiredBitrate The desired bitrate.
   * @param {Object} creativeData Data associated with the creative.
   * @param {Object} environmentVars Runtime variables associated with the
   *     creative like the slot and video slot.
   */
  initAd(width, height, viewMode, desiredBitrate, creativeData, environmentVars) {
    this.attributes_['width'] = width;
    this.attributes_['height'] = height;
    this.attributes_['viewMode'] = viewMode;
    this.attributes_['desiredBitrate'] = desiredBitrate;

    // slot and videoSlot are passed as part of the environmentVars
    this.slot_ = environmentVars.slot;
    this.videoSlot_ = environmentVars.videoSlot;

    // Parse the incoming ad parameters.
    this.parameters_ = JSON.parse(creativeData['AdParameters']);

    this.log('initAd ' + width + 'x' + height + ' ' + viewMode + ' ' + desiredBitrate);

    this.videoSlot_.addEventListener('loadedmetadata', this.loadedMetadata_.bind(this), false);
    this.videoSlot_.addEventListener('timeupdate', this.timeUpdateHandler_.bind(this), false);
    this.videoSlot_.addEventListener('ended', this.stopAd.bind(this), false);
    this.slot_.addEventListener('click', this.clickAd_.bind(this), false);
    const vpaidType = this.parameters_.vpaidType;
    if (vpaidType === 'linear') {
      this.updateVideoSlot_();
    } else {
      console.log('no linear typ');
    }
    this.callEvent_('AdLoaded');
  }

  updateVideoSlot_ = () => {
    console.log("updateVideoSlot_ called!!!")
    if (this.videoSlot_ == null) {
      this.videoSlot_ = document.createElement('video');
      this.log('Warning: No video element passed to ad, creating element.');
      this.slot_.appendChild(this.videoSlot_);
    }
    this.updateVideoPlayerSize_();
    let foundSource = false;
    const videos = this.parameters_.mediaFiles || [];
    for (let i = 0; i < videos.length; i++) {
      // Choose the first video with a supported mimetype.
      if (this.videoSlot_.canPlayType(videos[i].type) != '') {
        console.log("videos[i].uri", videos[i].uri)
        this.videoSlot_.setAttribute('src', videos[i].uri);
        foundSource = true;
        if (videos[i].styles) {
          this.videoSlot_.style.cssText = videos[i].styles;
        }
        break;
      }
    }
    if (!foundSource) {
      // Unable to find a source video.
      this.callEvent_('AdError');
    }
  };

  /**
   * Helper function to update the size of the video player.
   * @private
   */

  /**
   * Helper function to update the size of the video player.
   * @private
   */
  updateVideoPlayerSize_() {
    this.videoSlot_.setAttribute('width', this.attributes_['width']);
    this.videoSlot_.setAttribute('height', this.attributes_['height']);
  }

  /**
   * Called by the wrapper to start the ad.
   */
  startAd() {
    const vpaidType = this.parameters_.vpaidType;
    this.log('Starting ad');
    if (vpaidType === 'linear') {
      this.videoSlot_?.play();
      if (this.adDuration && !this.videoStylesFormat) {
        setTimeout(() => {
          this.stopAd();
        }, this.adDuration);
      }
    }
    const date = new Date();
    this.startTime_ = date.getTime();

    // Create an img tag and populate it with the image passed in to the ad
    // parameters.

    if (this.videoSlot_.nodeName) {
      if (vpaidType === 'linear') {
        const domSlot = this.slot_;
        domSlot.classList.add('percentage');
        if (this.videoStylesFormat) {
          this.videoSlot_.style.transition = 'width 1s ease-in-out';
          this.videoSlot_.style.cssText = this.videoStylesFormat;
          this.videoSlot_.style.zIndex = 10;
          this.videoSlot_.parentElement.parentElement.classList.add('percentage');
        }
        if (this.vpaidDom) {
          domSlot.insertAdjacentHTML('beforeend', this.vpaidDom);
          if (this.vpaidDomInImage) {
            domSlot.insertAdjacentHTML('beforeend', this.vpaidDomInImage);
          }
          if (this.buttonReduceSwitch && this.vpaidDomInImage) {
            domSlot.insertAdjacentHTML('beforeend', this.buttonReduceSwitch);
          } else if (this.buttonCloseSwitch) {
            const inImageWrapper = domSlot.parentElement.querySelector(
              '.in-image'
          )
          if(inImageWrapper) {
            inImageWrapper.style.top = 'auto'
            inImageWrapper.style.bottom = '0'
              domSlot.insertAdjacentHTML(
                  'beforeend',
                  this.buttonCloseSwitch
              )
              const closeSwitchButton = domSlot.parentElement.querySelector(
                  '#bliink-switch-close'
              )
              closeSwitchButton.addEventListener(
                  'click',
                  function () {
                      const inImageWrapper = domSlot.parentElement.querySelector(
                          '.in-image'
                      )
                      this.remove()
                      inImageWrapper.remove()
                  }
              )
          }
          }
          if (this.vpaidDomInImage) {
            const wrapper = domSlot.parentElement.querySelector('.full-image');
            const reduceSwitchButton = domSlot.parentElement.querySelector('#bliink-switch');
            if (reduceSwitchButton) {
              const that = this;
              const inImageWrapper = domSlot.parentElement.querySelector('.in-image');
              reduceSwitchButton.addEventListener('click', function () {
                wrapper.style.top = '100%';
                wrapper.style.opacity = 0;
                wrapper.style.display = 'none';
                inImageWrapper.style.opacity = 1;
                this.style.display = 'none';
                domSlot.insertAdjacentHTML('beforeend', that.buttonCloseSwitch);
                const closeSwitchButton =
                  domSlot.parentElement.querySelector('#bliink-switch-close');
                closeSwitchButton.addEventListener('click', function () {
                  const inImageWrapper =
                    domSlot.parentElement.querySelector('.in-image');
                  this.remove();
                  inImageWrapper.remove();
                });
              });
            }
            const inImageWrapper = domSlot.parentElement.querySelector('.in-image');
            const timing = +wrapper.dataset.transitionTiming;
            setTimeout(() => {
              const closeSwitchButton_ =
                domSlot.parentElement.querySelector('#bliink-switch-close');
              wrapper.style.top = '100%';
              wrapper.style.opacity = 0;
              wrapper.style.display = 'none';
              inImageWrapper.style.opacity = 1;
              const reduceSwitchButton =
              domSlot.parentElement.querySelector('#bliink-switch');
              if (reduceSwitchButton) {
                reduceSwitchButton.remove();
              }
              if (!closeSwitchButton_) {
                domSlot.insertAdjacentHTML('beforeend', this.buttonCloseSwitch);
                const closeSwitchButton =
                  domSlot.parentElement.querySelector('#bliink-switch-close');
                closeSwitchButton.addEventListener('click', function () {
                  const inImageWrapper =
                    domSlot.parentElement.querySelector('.in-image');
                  this.remove();
                  inImageWrapper.remove();
                });
              }
            }, timing);
          }
        }
      } else {
        const container = this.videoSlot_?.parentElement?.parentElement.parentElement.parentElement;
        const video = container.querySelector('video');
        const boundingClientRect = video.parentElement.getBoundingClientRect()
        const minHeight = boundingClientRect.height
        video.parentElement.style.minHeight = minHeight + 'px';
        video.parentElement.style.maxHeight = '360px';
        if (this.videoStylesFormat) {
          video.style.cssText = this.videoStylesFormat;
          video.style.zIndex = 10;
        }

        video.parentElement.insertAdjacentHTML('beforeend', this.vpaidDom);
        if (this.buttonReduceSwitch && this.vpaidDomInImage) {
          video.parentElement.insertAdjacentHTML('beforeend', this.buttonReduceSwitch);
        } else if (this.buttonCloseSwitch) {
          const inImageWrapper = video.parentElement.parentElement.querySelector(
            '.in-image'
        )
        if(inImageWrapper) {
          inImageWrapper.style.top = 'auto'
          inImageWrapper.style.bottom = '0'
            video.parentElement.insertAdjacentHTML(
                'beforeend',
                this.buttonCloseSwitch
            )
            const closeSwitchButton = video.parentElement.parentElement.querySelector(
                '#bliink-switch-close'
            )
            closeSwitchButton.addEventListener(
                'click',
                function () {
                    this.remove()
                    inImageWrapper.remove()
                }
            )
        }
          
        }
        if (this.vpaidDomInImage) {
          video.parentElement.insertAdjacentHTML('beforeend', this.vpaidDomInImage);
          const wrapper = video.parentElement.parentElement.querySelector('.full-image');
          const inImageWrapper = video.parentElement.parentElement.querySelector('.in-image');
          const reduceSwitchButton =
            video.parentElement.parentElement.querySelector('#bliink-switch');
          if (reduceSwitchButton) {
            const that = this;
            reduceSwitchButton.addEventListener('click', function () {
              wrapper.style.top = '100%';
              wrapper.style.opacity = 0;
              wrapper.style.display = 'none';
              inImageWrapper.style.opacity = 1;
              this.style.display = 'none';
              video.style.top = 0;
              video.style.left = 0;
              video.style.right = 0;
              video.style.bottom = 0;
              video.style.height = 'auto';
              video.style.width = '100%';
              video.style.zIndex = 0;
              if (that.buttonCloseSwitch) {
                video.parentElement.insertAdjacentHTML('beforeend', that.buttonCloseSwitch);
                const closeSwitchButton =
                  video.parentElement.parentElement.querySelector('#bliink-switch-close');
                closeSwitchButton.addEventListener('click', function () {
                  const inImageWrapper =
                    video.parentElement.parentElement.querySelector('.in-image');
                  this.remove();
                  inImageWrapper.remove();
                });
              }
            });
          }
          const timing = +wrapper.dataset.transitionTiming;
          setTimeout(() => {
            wrapper.style.top = '100%';
            wrapper.style.opacity = 0;
            wrapper.style.display = 'none';
            inImageWrapper.style.opacity = 1;
            const reduceSwitchButton =
              video.parentElement.parentElement.querySelector('#bliink-switch');
            if (reduceSwitchButton) {
              video.style.top = 0;
              video.style.left = 0;
              video.style.right = 0;
              video.style.bottom = 0;
              video.style.height = 'auto';
              video.style.width = '100%';
              video.style.zIndex = 0;
              reduceSwitchButton.remove();
            }
            const closeSwitchButton_ =
              video.parentElement.parentElement.querySelector('#bliink-switch-close');
            if (!closeSwitchButton_) {
              video.parentElement.insertAdjacentHTML('beforeend', this.buttonCloseSwitch);
              const closeSwitchButton =
                video.parentElement.parentElement.querySelector('#bliink-switch-close');
              closeSwitchButton.addEventListener('click', function () {
                const inImageWrapper = video.parentElement.parentElement.querySelector('.in-image');
                this.remove();
                inImageWrapper.remove();
              });
            }
          }, timing);
        }
      }
    } else {
      this.slot_.insertAdjacentHTML('beforeend', this.vpaidDom);
      // Handle case no DOM access
      if (this.vpaidDomInImage) {
        this.slot_.insertAdjacentHTML('beforeend', this.vpaidDomInImage);
      }
    }

    this.callEvent_('AdStarted');
    this.callEvent_('AdImpression');
  }

  /**
   * Called when the non-linear ad is clicked.
   * @private
   */
  adClick_() {
    if ('AdClickThru' in this.eventsCallbacks_) {
      this.eventsCallbacks_['AdClickThru']('', '0', true);
    }
  }

  /**
   * Called by the video element when the video reaches specific points during
   * playback.
   * @private
   */
  timeUpdateHandler_() {
    if (this.nextQuartileIndex_ >= this.quartileEvents_.length) {
      return;
    }
    const percentPlayed = (this.videoSlot_.currentTime * 100.0) / this.videoSlot_.duration;
    const nextQuartile = this.quartileEvents_[this.nextQuartileIndex_];
    if (percentPlayed >= nextQuartile.value) {
      this.eventsCallbacks_[nextQuartile.event]();
      this.nextQuartileIndex_ += 1;
    }
    if (this.videoSlot_.duration > 0) {
      this.attributes_['remainingTime'] = this.videoSlot_.duration - this.videoSlot_.currentTime;
    }
  }

  /**
   * Called by the video element when video metadata is loaded.
   * @private
   */
  loadedMetadata_() {
    // The ad duration is not known until the media metadata is loaded.
    // Then, update the player with the duration change.
    this.attributes_['duration'] = this.videoSlot_.duration;
    this.callEvent_('AdDurationChange');
  }

  /**
   * Called by the wrapper to stop the ad.
   */
  stopAd() {
    this.log('Stopping ad');
    // Calling AdStopped immediately terminates the ad. Setting a timeout allows
    // events to go through.
    const callback = this.callEvent_.bind(this);
    setTimeout(callback, 75, ['AdStopped']);
  }

  /**
   * Called when the video player changes the width/height of the container.
   * @param {number} width The new width.
   * @param {number} height A new height.
   * @param {string} viewMode A new view mode.
   */
  resizeAd(width, height, viewMode) {
    this.log('resizeAd ' + width + 'x' + height + ' ' + viewMode);
    this.attributes_['width'] = width;
    this.attributes_['height'] = height;
    this.attributes_['viewMode'] = viewMode;
    this.updateVideoPlayerSize_();
    this.callEvent_('AdSizeChange');
  }

  /**
   * Pauses the ad.
   */
  pauseAd() {
    this.log('pauseAd');
    this.videoSlot_.pause();
    this.callEvent_('AdPaused');
  }

  /**
   * Resumes the ad.
   */
  resumeAd() {
    this.log('resumeAd');
    this.videoSlot_.play();
    this.callEvent_('AdPlaying');
  }

  /**
   * Expands the ad.
   */
  expandAd() {
    this.log('expandAd');
    this.attributes_['expanded'] = true;
    this.callEvent_('AdExpanded');
  }

  /**
   * Collapses the ad.
   */
  collapseAd() {
    this.log('collapseAd');
    this.attributes_['expanded'] = false;
  }

  /**
   * Skips the ad.
   */
  skipAd() {
    this.log('skipAd');
    if (this.attributes_['skippableState']) {
      this.callEvent_('AdSkipped');
    }
  }

  /**
   * Registers a callback for an event.
   * @param {Function} callback The callback function.
   * @param {string} eventName The callback type.
   * @param {Object} context The context for the callback.
   */

  subscribe(callback, eventName, context) {
    this.log('Subscribe ' + eventName);
    this.eventsCallbacks_[eventName] = callback.bind(context);
  }

  /**
   * Removes a callback based on the eventName.
   * @param {string} eventName The callback type.
   */
  unsubscribe(eventName) {
    this.log('unsubscribe ' + eventName);
    this.eventsCallbacks_[eventName] = null;
  }

  /**
   * Returns whether the ad is linear.
   * @return {boolean} True if the ad is a linear, false for non linear.
   */
  getAdLinear() {
    return this.attributes_['linear'];
  }

  /**
   * Returns ad width.
   * @return {number} The ad width.
   */
  getAdWidth() {
    return this.attributes_['width'];
  }

  /**
   * Returns ad height.
   * @return {number} The ad height.
   */
  getAdHeight() {
    return this.attributes_['height'];
  }

  /**
   * Returns true if the ad is expanded.
   * @return {boolean}
   */
  getAdExpanded() {
    this.log('getAdExpanded');
    return this.attributes_['expanded'];
  }

  /**
   * Returns the skippable state of the ad.
   * @return {boolean}
   */
  getAdSkippableState() {
    this.log('getAdSkippableState');
    return this.attributes_['skippableState'];
  }

  /**
   * Returns the remaining ad time, in seconds.
   * @return {number} The time remaining in the ad.
   */
  getAdRemainingTime() {
    const date = new Date();
    const currentTime = date.getTime();
    const remainingTime = this.attributes_.duration - (currentTime - this.startTime_) / 1000.0;
    return remainingTime;
  }

  /**
   * Returns the duration of the ad, in seconds.
   * @return {number} The duration of the ad.
   */
  getAdDuration() {
    return this.attributes_['duration'];
  }

  /**
   * Returns the ad volume.
   * @return {number} The volume of the ad.
   */
  getAdVolume() {
    this.log('getAdVolume');
    return this.attributes_['volume'];
  }

  /**
   * Sets the ad volume.
   * @param {number} value The volume in percentage.
   */
  setAdVolume(value) {
    this.attributes_['volume'] = value;
    this.log('setAdVolume ' + value);
    this.callEvent_('AdVolumeChange');
  }

  /**
   * Returns a list of companion ads for the ad.
   * @return {string} List of companions in VAST XML.
   */
  getAdCompanions() {
    return this.attributes_['companions'];
  }

  /**
   * Returns a list of icons.
   * @return {string} A list of icons.
   */
  getAdIcons() {
    return this.attributes_['icons'];
  }

  /**
   * Logs events and messages.
   * @param {string} message
   */
  log(message) {
    console.log(message);
  }

  /**
   * Calls an event if there is a callback.
   * @param {string} eventType
   * @private
   */
  callEvent_(eventType) {
    if (eventType in this.eventsCallbacks_) {
      this.eventsCallbacks_[eventType]();
    }
  }
};

/**
 * Main function called by wrapper to get the VPAID ad.
 * @return {Object} The VPAID compliant ad.
 */
var getVPAIDAd = function () {
  return new Vpaid();
};
      
