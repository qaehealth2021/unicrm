Ext.ns('Ext.ux.form');

Ext.ux.form.TimePickerField = Ext.extend(Ext.form.Field, {
    defaultAutoCreate: {
        tag: 'div'
    },
    cls: 'x-form-timepickerfield',
    hoursSpinner: null,
    minutesSpinner: null,
    secondsSpinner: null,
    spinnerCfg: {
        width: 40
    },
    initComponent:function(){
    	Ext.ux.form.TimePickerField.superclass.initComponent.call(this);
    },
    spinnerFixBoundries: function(value){
        if (value < this.field.minValue) {
            value = this.field.maxValue;
        }
        if (value > this.field.maxValue) {
            value = this.field.minValue;
        }
        return this.fixPrecision(value);
    },
    onRender: function(ct, position){
        Ext.ux.form.TimePickerField.superclass.onRender.call(this, ct, position);
        this.rendered = false;
        this.date = new Date();
        var values = {};
        if (this.value) {
            values = this._valueSplit(this.value);
            this.date.setHours(values.h);
            this.date.setMinutes(values.m);
            this.date.setSeconds(values.s);
            delete this.value;
        }
        else {
            values = {
                h: this.date.getHours(),
                m: this.date.getMinutes(),
                s: this.date.getSeconds()
            };
        }
        var spinnerWrap = Ext.DomHelper.append(this.el, {
            tag: 'div'
        });
        var cfg = Ext.apply({}, this.spinnerCfg, {
            renderTo: spinnerWrap,
            readOnly: this.readOnly,
            disabled: this.disabled,
            listeners: {
                spin: {
                    fn: this.onSpinnerChange,
                    scope: this
                },
                valid: {
                    fn: this.onSpinnerChange,
                    scope: this
                },
                afterrender: {
                    fn: function(spinner){
                        spinner.wrap.applyStyles('float: left');
                    },
                    single: true
                }
            }
        });
        this.hoursSpinner = new Ext.ux.form.SpinnerField(Ext.apply({}, cfg, {
            minValue: 0,
            maxValue: 23,
            cls: 'first',
            value: values.h
        }));
        this.minutesSpinner = new Ext.ux.form.SpinnerField(Ext.apply({}, cfg, {
            minValue: 0,
            maxValue: 59,
            value: values.m
        }));
        this.secondsSpinner = new Ext.ux.form.SpinnerField(Ext.apply({}, cfg, {
            minValue: 0,
            maxValue: 59,
            value: values.s
        }));
        Ext.DomHelper.append(spinnerWrap, {
            tag: 'div',
            cls: 'x-form-clear-left'
        });
        this.rendered = true;
    },
    _valueSplit: function(v){
        var split = v.split(':');
        return {
            h: split.length > 0 ? split[0] : 0,
            m: split.length > 1 ? split[1] : 0,
            s: split.length > 2 ? split[2] : 0
        };
    },
    onSpinnerChange: function(){
        if (!this.rendered) {
            return;
        }
        this.fireEvent('change', this, this.getRawValue());
    },
    disable: function(){
        Ext.ux.form.TimePickerField.superclass.disable.call(this);
        this.hoursSpinner.disable();
        this.minutesSpinner.disable();
        this.secondsSpinner.disable();
    },
    enable: function(){
        Ext.ux.form.TimePickerField.superclass.enable.call(this);
        this.hoursSpinner.enable();
        this.minutesSpinner.enable();
        this.secondsSpinner.enable();
    },
    setReadOnly: function(r){
        Ext.ux.form.TimePickerField.superclass.setReadOnly.call(this, r);
        this.hoursSpinner.setReadOnly(r);
        this.minutesSpinner.setReadOnly(r);
        this.secondsSpinner.setReadOnly(r);
    },
    clearInvalid: function(){
        Ext.ux.form.TimePickerField.superclass.clearInvalid.call(this);
        this.hoursSpinner.clearInvalid();
        this.minutesSpinner.clearInvalid();
        this.secondsSpinner.clearInvalid();
    },
    getRawValue: function(){
        if (!this.hoursSpinner) {
            this.date = new Date();
            return {
                h: this.date.getHours(),
                m: this.date.getMinutes(),
                s: this.date.getSeconds()
            };
        }
        else {
            return {
                h: this.hoursSpinner.getValue(),
                m: this.minutesSpinner.getValue(),
                s: this.secondsSpinner.getValue()
            };
        }
    },
    setRawValue: function(v){
        this.hoursSpinner.setValue(v.h);
        this.minutesSpinner.setValue(v.m);
        this.secondsSpinner.setValue(v.s);
    },
    isValid: function(preventMark){
        return this.hoursSpinner.isValid(preventMark) &&
        this.minutesSpinner.isValid(preventMark) &&
        this.secondsSpinner.isValid(preventMark);
    },
    validate: function(){
        return this.hoursSpinner.validate() &&
        this.minutesSpinner.validate() &&
        this.secondsSpinner.validate();
    },
    getValue: function(){
        var v = this.getRawValue();
        return String.leftPad(v.h, 2, '0') + ':' +
        String.leftPad(v.m, 2, '0') +
        ':' +
        String.leftPad(v.s, 2, '0');
    },
    setValue: function(value){
        if (!this.rendered) {
            this.value = value;
            return;
        }
        value = this._valueSplit(value);
        this.setRawValue(value);
        this.validate();
    }
});

Ext.form.TimePickerField = Ext.ux.form.TimePickerField;

Ext.reg('timepickerfield', Ext.form.TimePickerField);

Ext.ns('Ext.ux.form');
Ext.DateTimePicker = Ext.extend(Ext.DatePicker, {
    timeFormat: 'g:i:s A',
    timeLabel: '时间',
    timeWidth: 100,
    initComponent: function(){
        Ext.DateTimePicker.superclass.initComponent.call(this);
        this.id = Ext.id();
    },
    onRender: function(container, position){
        Ext.DateTimePicker.superclass.onRender.apply(this, arguments);
        var table = Ext.get(Ext.DomQuery.selectNode('table tbody', container.dom));
        var tfEl = Ext.DomHelper.insertBefore(table.last(), {
            tag: 'tr',
            children: [{
                tag: 'td',
                cls: 'x-date-bottom',
                html: this.timeLabel,
                style: 'width:30;font-size:12px;'
            }, {
                tag: 'td',
                cls: 'x-date-bottom ux-timefield',
                colspan: '2'
            }]
        }, true);
        this.tf.render(table.child('td.ux-timefield'));
        var p = this.getEl().parent('div.x-layer');
        if (p) {
            p.setStyle("height", p.getHeight() + 31);
        }
    },
    setValue: function(value){
        var old = this.value;
        if (!this.tf) {
            this.tf = new Ext.ux.form.TimePickerField();
            this.tf.ownerCt = this;
        }
        this.value = this.getDateTime(value);
        this.update(this.value);
    },
    getDateTime: function(value){
        if (this.tf) {
            var timeval = this.tf.getValue();
            value = Date.parseDate(value.format(this.dateFormat) + ' ' + timeval, this.format);
        }
        return value;
    },
    selectToday: function(){
        if (this.todayBtn && !this.todayBtn.disabled) {
            this.value = this.getDateTime(new Date());
            this.fireEvent("select", this, this.value);
        }
    },
    update : function(date, forceRefresh){
        if(this.rendered){
            var vd = this.activeDate, vis = this.isVisible();
            this.activeDate = date;
            if(!forceRefresh && vd && this.el){
                var t = date.getTime();
                if(vd.getMonth() == date.getMonth() && vd.getFullYear() == date.getFullYear()){
                    this.cells.removeClass('x-date-selected');
                    this.cells.each(function(c){
                       if(c.dom.firstChild.dateValue == t){
                           c.addClass('x-date-selected');
                           if(vis && !this.cancelFocus){
                               Ext.fly(c.dom.firstChild).focus(50);
                           }
                           return false;
                       }
                    }, this);
                    return;
                }
            }
            var days = date.getDaysInMonth(),
                firstOfMonth = date.getFirstDateOfMonth(),
                startingPos = firstOfMonth.getDay()-this.startDay;

            if(startingPos < 0){
                startingPos += 7;
            }
            days += startingPos;

            var pm = date.add('mo', -1),
                prevStart = pm.getDaysInMonth()-startingPos,
                cells = this.cells.elements,
                textEls = this.textNodes,
                // convert everything to numbers so it's fast
                d = (new Date(pm.getFullYear(), pm.getMonth(), prevStart, this.initHour)),
                today = new Date().clearTime().getTime(),
                sel = date.clearTime(true).getTime(),
                min = this.minDate ? this.minDate.clearTime(true) : Number.NEGATIVE_INFINITY,
                max = this.maxDate ? this.maxDate.clearTime(true) : Number.POSITIVE_INFINITY,
                ddMatch = this.disabledDatesRE,
                ddText = this.disabledDatesText,
                ddays = this.disabledDays ? this.disabledDays.join('') : false,
                ddaysText = this.disabledDaysText,
                format = this.format;

            if(this.showToday){
                var td = new Date().clearTime(),
                    disable = (td < min || td > max ||
                    (ddMatch && format && ddMatch.test(td.dateFormat(format))) ||
                    (ddays && ddays.indexOf(td.getDay()) != -1));

                if(!this.disabled){
                    this.todayBtn.setDisabled(disable);
                    this.todayKeyListener[disable ? 'disable' : 'enable']();
                }
            }

            var setCellClass = function(cal, cell){
                cell.title = '';
                var t = d.clearTime(true).getTime();
                cell.firstChild.dateValue = t;
                if(t == today){
                    cell.className += ' x-date-today';
                    cell.title = cal.todayText;
                }
                if(t == sel){
                    cell.className += ' x-date-selected';
                    if(vis){
                        Ext.fly(cell.firstChild).focus(50);
                    }
                }
                // disabling
                if(t < min) {
                    cell.className = ' x-date-disabled';
                    cell.title = cal.minText;
                    return;
                }
                if(t > max) {
                    cell.className = ' x-date-disabled';
                    cell.title = cal.maxText;
                    return;
                }
                if(ddays){
                    if(ddays.indexOf(d.getDay()) != -1){
                        cell.title = ddaysText;
                        cell.className = ' x-date-disabled';
                    }
                }
                if(ddMatch && format){
                    var fvalue = d.dateFormat(format);
                    if(ddMatch.test(fvalue)){
                        cell.title = ddText.replace('%0', fvalue);
                        cell.className = ' x-date-disabled';
                    }
                }
            };

            var i = 0;
            for(; i < startingPos; i++) {
                textEls[i].innerHTML = (++prevStart);
                d.setDate(d.getDate()+1);
                cells[i].className = 'x-date-prevday';
                setCellClass(this, cells[i]);
            }
            for(; i < days; i++){
                var intDay = i - startingPos + 1;
                textEls[i].innerHTML = (intDay);
                d.setDate(d.getDate()+1);
                cells[i].className = 'x-date-active';
                setCellClass(this, cells[i]);
            }
            var extraDays = 0;
            for(; i < 42; i++) {
                 textEls[i].innerHTML = (++extraDays);
                 d.setDate(d.getDate()+1);
                 cells[i].className = 'x-date-nextday';
                 setCellClass(this, cells[i]);
            }

            this.mbtn.setText(this.monthNames[date.getMonth()] + ' ' + date.getFullYear());

            if(!this.internalRender){
                var main = this.el.dom.firstChild,
                    w = main.offsetWidth;
                this.el.setWidth(w + this.el.getBorderWidth('lr'));
                Ext.fly(main).setWidth(w);
                this.internalRender = true;
                // opera does not respect the auto grow header center column
                // then, after it gets a width opera refuses to recalculate
                // without a second pass
                if(Ext.isOpera && !this.secondPass){
                    main.rows[0].cells[1].style.width = (w - (main.rows[0].cells[0].offsetWidth+main.rows[0].cells[2].offsetWidth)) + 'px';
                    this.secondPass = true;
                    this.update.defer(10, this, [date]);
                }
            }
        }
    }
});
Ext.reg('datetimepickerfield', Ext.DateTimePicker);

Ext.menu.DateTimeMenu = function(config){
    Ext.menu.DateTimeMenu.superclass.constructor.call(this, config);
    this.plain = true;
    var di = new Ext.DateTimePicker(config);
    this.add(di);
    this.picker = di;
    this.relayEvents(di, ["select"]);
    this.on('beforeshow', function(){
        if (this.picker) {
            this.picker.hideMonthPicker(true);
        }
    }, this);
};
Ext.extend(Ext.menu.DateTimeMenu, Ext.menu.Menu, {
    cls: 'x-date-menu',
    style:'height:201px;',
    beforeDestroy: function(){
        this.picker.destroy();
    },
    hide: function(deep){
        if (this.picker.tf.innerList) {
            if ((Ext.EventObject.within(this.picker.tf.innerList)) || (Ext.get(Ext.EventObject.getTarget()) == this.picker.tf.innerList)) 
                return false;
        }
        if (this.el && this.isVisible()) {
            this.fireEvent("beforehide", this);
            if (this.activeItem) {
                this.activeItem.deactivate();
                this.activeItem = null;
            }
            this.el.hide();
            this.hidden = true;
            this.fireEvent("hide", this);
        }
        if (deep === true && this.parentMenu) {
            this.parentMenu.hide(true);
        }
    }
});

Ext.ux.form.DateTimeField = Ext.extend(Ext.form.DateField, {
    dateFormat: 'Y-m-d',
    timeFormat: 'H:i:s',
    defaultAutoCreate: {
        tag: "input",
        type: "text",
        size: "20",
        autocomplete: "off"
    },
    initComponent: function(){
        Ext.ux.form.DateTimeField.superclass.initComponent.call(this);
        this.format = this.dateFormat + ' ' + this.timeFormat;
        this.afterMethod('afterRender', function(){
            this.getEl().applyStyles('top:0');
        });
    },
    getValue: function(){
        return this.parseDate(Ext.form.DateField.superclass.getValue.call(this)) || '';
    },
    onTriggerClick: function(){
        if (this.disabled) {
            return;
        }
        if (this.menu == null) {
            this.menu = new Ext.menu.DateTimeMenu();
        }
        Ext.apply(this.menu.picker, {
            minDate: this.minValue,
            maxDate: this.maxValue,
            disabledDatesRE: this.ddMatch,
            disabledDatesText: this.disabledDatesText,
            disabledDays: this.disabledDays,
            disabledDaysText: this.disabledDaysText,
            format: this.format,
            timeFormat: this.timeFormat,
            dateFormat: this.dateFormat,
            showToday: this.showToday,
            minText: String.format(this.minText, this.formatDate(this.minValue)),
            maxText: String.format(this.maxText, this.formatDate(this.maxValue))
        });
        if (this.menuEvents) {
            this.menuEvents('on');
        }
        else {
            this.menu.on(Ext.apply({}, this.menuListeners, {
                scope: this
            }));
        }
        var dateValue = this.getValue() || new Date();
        this.menu.picker.setValue(dateValue);
       this.menu.picker.tf.setValue(dateValue.format(this.timeFormat));
        this.menu.show(this.el, "tl-bl?");
    }
});
Ext.reg('datetimefield', Ext.ux.form.DateTimeField);
