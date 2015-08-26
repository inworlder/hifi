var SELECTION_OVERLAY = {
    position: {
        x: 0,
        y: 0,
        z: 0
    },
    color: {
        red: 255,
        green: 255,
        blue: 0
    },
    alpha: 1,
    size: 1.0,
    solid: false,
    //colorPulse: 1.0,
    //pulseMin: 0.5,
    //pulseMax: 1.0,
    visible: false,
    lineWidth: 1.0,
    borderSize: 1.4,
};

Highlighter = function() {
    this.highlightCube = Overlays.addOverlay("cube", this.SELECTION_OVERLAY);
    this.hightlighted = null;
    var _this = this;
    Script.scriptEnding.connect(function() {
        _this.onCleanup();
    });
};

Highlighter.prototype.onCleanup = function() {
    Overlays.deleteOverlay(this.highlightCube);
}

Highlighter.prototype.highlight = function(entityId) {
    if (entityId != this.hightlighted) {
        this.hightlighted = entityId;
        this.updateHighlight();
    }
}

Highlighter.prototype.setSize = function(newSize) {
    Overlays.editOverlay(this.highlightCube, {
        size: newSize
    });
}

Highlighter.prototype.updateHighlight = function() {
    if (this.hightlighted) {
        var properties = Entities.getEntityProperties(this.hightlighted);
        // logDebug("Making highlight " + this.highlightCube + " visible @ " + vec3toStr(properties.position));
        Overlays.editOverlay(this.highlightCube, {
            position: properties.position,
            visible: true
        });
    } else {
        // logDebug("Making highlight invisible");
        Overlays.editOverlay(this.highlightCube, {
            visible: false
        });
    }
}