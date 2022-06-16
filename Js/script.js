SCookie = document.getElementById("Cookie");
SPlayground = document.getElementById("Playground");
Samogus1 = document.getElementById("Amogus1");
H2Text = document.getElementById("ScoreH2");


coords = getOffset(SPlayground);
function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
}


Cookie = {x: 0, y: 0, Terrain: SCookie}

isGameOver = 0;
class Sprite {
    constructor(id) {
        this.id = id;
        this.dom = document.getElementById(id);
        this.hauteur = this.dom.offsetHeight;
        this.largeur = this.dom.offsetWidth;
        this.x = 0;
        this.y = 0;
    }
    move(x,y) {
        if (x < 0) {
            x = 0;
            
        }
        if (y < 0) {
            y = 0;
        }
        if (x > SPlayground.offsetWidth - this.largeur - coords.left) {
            x = SPlayground.offsetWidth - this.largeur - coords.left;
            
        }
        if (y > SPlayground.offsetHeight - this.hauteur) {
            y = SPlayground.offsetHeight - this.hauteur;
        }            
        this.dom.style.left = x + "px";
        this.dom.style.top = y + "px";
        this.x = x;
        this.y = y;
    }
    isCollision(newX,newY) {

        //Compute rate
        if (newX != this.x) {
            this.delta = (newY - this.y)/(newX - this.x);
        }
        //Check for every x of amongus
        if (newX == this.x) {
            if (newY >= this.y) {
                for (this.ord = this.y; this.ord <= newY; this.ord++) {
                    this.isOverCookie(this.x,this.ord)
                }
            } else {
                for (this.ord = this.y; this.ord >= newY; this.ord--) {
                    this.isOverCookie(this.x,this.ord)
                }
            }
        } else if(newX > this.x) {
            for(this.abs = this.x; this.abs <= newX; this.abs++){
                this.ord = (this.abs - this.x) * this.delta + this.y;
                this.isOverCookie(this.abs, this.ord);
            }
        } else {
            for(this.abs = this.x; this.abs >= newX; this.abs--){
                this.ord = (this.abs - this.x) * this.delta + this.y;
                this.isOverCookie(this.abs, this.ord);
            }
        }
        this.move(newX,newY);
    
    
    }
    isOverCookie(x,y) {

        //Compute Cookie Coords
        this.domaine = document.getElementById("Cookie");
        this.phg = {x: cookie.x, y: cookie.y};
        this.pbd = {x: cookie.x + this.domaine.offsetWidth, y: cookie.y + this.domaine.offsetHeight};

        if (x > this.phg.x && x < this.pbd.x && y > this.phg.y && y < this.pbd.y) {
            H2Text.textContent = "GAME OVER, press F5 to play again.";
            H2Text.style.color="red";
            isGameOver = 1;
        }

    }
}

score = 0;

H2Text.setScore = function(score) {
    this.textContent = "Score : " + score;
}

cookie = new Sprite("Cookie");

amogus = [];

for (i=0; i < 3; i++) {
    amogus[i] = new Sprite("Amogus" + (i + 1));
}
action1=0


document.onclick = function(e ) {
    if (isGameOver == 0) {
        //Action 1 = Cookie move
        if(action1 == 0) {
            //Taille Cookie
            domai = document.getElementById("Cookie");
            hauteur = domai.offsetHeight/2;
            largeur = domai.offsetWidth/2;

            //Coords souris
            xs = e.clientX - coords.left;
            ys = e.clientY - coords.top;

            //Calcul
            goX = (xs - largeur);
            goY = (ys - hauteur);

            cookie.move(goX, goY);
            score++;
            H2Text.setScore(score);
            action1 = 1;
        } else {
            //Amogus move
            action1 = 0;
            for(amoNo = 0; amoNo < 3; amoNo++){
                amoX=Math.random()*SPlayground.offsetWidth;
                amoY=Math.random()*SPlayground.offsetHeight;
                amogus[amoNo].isCollision(amoX,amoY);
            }
        }
    }
}


