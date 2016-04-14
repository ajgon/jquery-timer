# jquery.timer

A simple, lightweight jQuery plugin for timer management.

## Installation

Include script *after* the jQuery library (unless you are packaging scripts somehow else):

    <script src="/path/to/jquery.timer.js"></script>

## Usage

Create timer:

    $.timer('my_timer', function() { /* my Callback Code */ }, 10);

Get timer:

    $.timer('my_timer');

Start/pause/resume/stop timer:

    $.timer('my_timer').start();
    $.timer('my_timer').pause();
    $.timer('my_timer').resume();
    $.timer('my_timer').stop();

Get timer status:

    $.timer('my_timer').status(); // => "stopped"

Return timers list:

    $.timer(); // => ["my_timer"]

Delete timer:

    $.timer('my_timer', null);

Create timer with 1 second interval and working 1 minute

    $.timer('other_timer', function() { /* my Callback Code */ }, 1000, {timeout: 60000});

Function definition:

    $.timer(name, callback, interval, options);

## Parameters

    name: <mandatory>

Defines a unique name of a timer. It has to start from a letter and contain only letters, numbers or underscore characters.

    callback: <mandatory>

A callback function which will be passed to setTimeout/setInterval function.

    interval: <mandatory>

Interval (in milliseconds) after which callback should be invoked.

    options: {}

Hash of additional options for Timer class.

## Options

    useSetTimeout: false

If set to true JS setTimeout() function will be used instead of setInterval(). This is not recommended, consider using "timeout" option.

    timeout: false

If set to integer, timer function will stop after specified milliseconds.

    startCallback/pauseCallback/resumeCallback/stopCallback: function() {}

Callbacks called after corresponding actions are finished.

    finishCallback: function() {}

Callback working only with "timeout" option. It is called when timer is finished.

## Methods

    start(); // $.timer('name').start()

Starts timer

    pause(); // $.timer('name').pause();

Pauses timer

    resume(fullFrame = false); // $.timer('name').resume();

Resumes timer. It takes into consideration the time of the cycle when timer was paused. So for example - if you set your timer to 10 seconds, and then paused it after 6 - resume will invoke next callback after 4 seconds. Pass fullFrame = true, to avoid this and use default period of time.

    stop(); // $.timer('name').stop();

Stops timer. Also fires finishCallback() if timeout option is set.

    kill(); // $.timer('name').kill();

Similiar to stop(), but no callbacks are called.

    status(); // $.timer('name').status();

Returns status of the timer. Available responses are "stopped", "paused", "running" and "finished".

## Development

- Source hosted at [GitHub](https://github.com/ajgon/jquery-timer)
- Report issues, questions, feature requests on [GitHub Issues](https://github.com/ajgon/jquery-timer/issues)

Pull requests are very welcome! Make sure your patches are well tested.

## Authors

[Igor Rzegocki](https://github.com/ajgon)

