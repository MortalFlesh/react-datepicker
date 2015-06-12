var React = require('react');
var Popover = require('./popover');
var DateUtil = require('./util/date');
var Calendar = require('./calendar');
var DateInput = require('./date_input');
var moment = require('moment');
var immutable = require('immutable');

var DatePicker = React.createClass({
  getDefaultProps: function() {
    return {
      weekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      locale: 'en',
      dateFormatCallendar: "MMMM YYYY",
      moment: moment,
      callendarProps: {},
      dateInputProps: {},
    };
  },

  getInitialState: function() {
    return {
      focus: false
    };
  },

  handleFocus: function() {
    this.setState({
      focus: true
    });
  },

  hideCalendar: function() {
    setTimeout(function() {
      this.setState({
        focus: false
      });
    }.bind(this), 0);
  },

  handleSelect: function(date) {
    this.setSelected(date);

    setTimeout(function(){
      this.hideCalendar();
    }.bind(this), 200);
  },

  setSelected: function(date) {
    this.props.onChange(date.moment());
  },

  clearSelected: function() {
    this.props.onChange(null);
  },

  onInputClick: function() {
    this.setState({
      focus: true
    });
  },

  calendar: function() {
    if (this.state.focus) {
      var callendarProps = new Map({
        weekdays: this.props.weekdays,
        locale: this.props.locale,
        moment: this.props.moment,
        dateFormat: this.props.dateFormatCallendar,
        selected: this.props.selected,
        onSelect: this.handleSelect,
        hideCalendar: this.hideCalendar,
        minDate: this.props.minDate,
        maxDate: this.props.maxDate,
        excludeDates: this.props.excludeDates,
        weekStart: this.props.weekStart
      }).merge(new Map(this.props.callendarProps));
        
      return (
        <Popover>
          <Calendar {...callendarProps.toJS()}/>
        </Popover>
      );
    }
  },

  render: function() {
    var dateInputProps = new immutable.Map({
      name: this.props.name,
      date: this.props.selected,
      dateFormat: this.props.dateFormat,
      focus: this.state.focus,
      onFocus: this.handleFocus,
      handleClick: this.onInputClick,
      handleEnter: this.hideCalendar,
      setSelected: this.setSelected,
      clearSelected: this.clearSelected,
      hideCalendar: this.hideCalendar,
      placeholderText: this.props.placeholderText
    }).merge(new Map(this.props.dateInputProps));

    return (
      <div>
        <DateInput {...dateInputProps.toJS()}/>
        {this.calendar()}
      </div>
    );
  }
});

module.exports = DatePicker;
