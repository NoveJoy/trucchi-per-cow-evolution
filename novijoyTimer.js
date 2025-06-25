/**
 * NoviJoyTimer - Simple Countdown Timer
 * Author: NoviJoy
 * License: Custom
 */

class NoviJoyTimer {
    /**
     * Creates a countdown timer.
     * @param {number} seconds - Duration of the countdown in seconds.
     * @param {Function} onTick - Callback executed every second.
     * @param {Function} onComplete - Callback executed when countdown ends.
     */
    constructor(seconds, onTick, onComplete) {
        if (typeof seconds !== 'number' || seconds <= 0) {
            throw new Error('[NoviJoyTimer] Invalid duration.');
        }
        this.remaining = seconds;
        this.onTick = typeof onTick === 'function' ? onTick : () => {};
        this.onComplete = typeof onComplete === 'function' ? onComplete : () => {};
        this.intervalId = null;
    }

    /**
     * Starts the countdown.
     */
    start() {
        if (this.intervalId) return;
        this.onTick(this.remaining);
        this.intervalId = setInterval(() => {
            this.remaining--;
            if (this.remaining > 0) {
                this.onTick(this.remaining);
            } else {
                this.stop();
                this.onComplete();
            }
        }, 1000);
    }

    /**
     * Stops the countdown.
     */
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}

// Example usage:
// const timer = new NoviJoyTimer(5, 
//     (sec) => console.log(`Remaining: ${sec}s`), 
//     () => console.log('Countdown complete!')
// );
// timer.start();

module.exports = NoviJoyTimer;
