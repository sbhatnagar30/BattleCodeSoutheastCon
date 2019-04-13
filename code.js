import { BCAbstractRobot, SPECS } from 'battlecode';

let a = 0;

class MyRobot extends BCAbstractRobot {
    turn() {
        if (this.me.unit === SPECS.VOYAGER) {
            while (true) {
                let choice = this.getChoice();
                if (this.isValidMove(choice)) {
                    return this.move(choice[0], choice[1]);
                }
            }
        }
        else if (this.me.unit === SPECS.PLANET) {
            let b = this.robots.length - a - 1;
            this.log(b);
            if (this.orbs >= 65536 && this.me.turn < 180) {
                while (true) {
                    let choice = this.getChoice();
                    this.log("CHOICE IS");
                    this.log(choice);
                    if (this.isValidMove(choice) && a < b || this.me.turn < 3) {
                        a++;
                        return this.buildVoyager(choice);
                    }
                }
            }
        }
        this.roundInfo();
        return null;
        // this.log(JSON.stringify(this.robots));
    }
}

MyRobot.prototype.getNumberVoyagers = function() {
    this.log("NUMBER OF VOYAGERS IS");
    this.log(this.robots.length);
    return this.robots.length;
}

MyRobot.prototype.roundInfo = function() {
    this.log("ROUND IS " + this.me.turn + "   ORB COUNT IS " + this.orbs.toString());
    // this.log(this.orbs);
    return null;
}

MyRobot.prototype.totalOrbs = function() {
    let sum = 0;
    for (i = 0; i < this.n; i++) {
        for (j = 0; j < this.n; j++) {
            sum += this.orbs_map[i][j];
        }
    }
    
    return sum;
}

MyRobot.prototype.buildVoyager = function(choice) {
    this.log("Unit Built *****************************");
    return this.buildUnit(choice[0], choice[1]);
}

MyRobot.prototype.getChoice = function () {
    const choices = [[0, -1], [1, 0], [0, 1], [-1, 0]];
    return choices[Math.floor(Math.random() * choices.length)];
}

MyRobot.prototype.isValidMove = function(choice) {
        let newR = this.me.r + choice[0];
        let newC = this.me.c + choice[1];

        let passable = this.map[newR][newC];
        let edgable = true;
        if (newR < 0 || newC < 0 || newR > this.n || newC > this.n) {
            edgable = false;
        }
        return passable && edgable;
}

var robot = new MyRobot();

