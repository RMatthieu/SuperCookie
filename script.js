SCookie = document.getElementById("Cookie");
SPlayground = document.getElementById("Playground");
Samogus1 = document.getElementById("Amogus1");
H2Text = document.getElementById("ScoreH2");

coords = getOffset(SPlayground);


Cookie = {x: 0, y: 0, Terrain: SCookie}
Amogus1 = {x: 0, y: 0, Terrain: Samogus1}


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
            x=0;
            
        }
        if (y < 0) {
            y=0;
        }
        if (x > SPlayground.offsetWidth - this.largeur) {
            x = SPlayground.offsetWidth - this.largeur;
            
        }
        if (y > SPlayground.clientHeight - this.hauteur) {
            y=SPlayground.clientHeight - this.hauteur;
        }            
        this.dom.style.left = x + "px";
        this.dom.style.top = y + "px";
        this.x = x;
        this.y = y;
    }
    isCollision(newX,newY,sprite) {

        //Compute rate
        if (newX != sprite.x) {
            this.delta = (newY - sprite.y)/(newX - sprite.x);
        } else {
            this.delta = 0;
        }


        //Check for every x of amongus
        if(newX > sprite.x) {
            for(this.abs = 0; this.abs < newX-sprite.x-1; this.abs++){
                this.ord = this.abs * this.delta + sprite.y;
                this.isOverCookie(this.abs, this.ord);
            }
        } else {
            for(this.abs = 0; this.abs < sprite.x-newX-1; this.abs++){
                this.ord = newY + this.abs * this.delta ;
                this.isOverCookie(this.abs, this.ord);
            }
        }


    }
    isOverCookie(x,y) {

        //Compute Cookie Coords
        this.domaine = document.getElementById("Cookie");
        this.phg = {x: cookie.x, y: cookie.y};
        this.pbd = {x: cookie.x + this.domaine.offsetWidth, y: cookie.y + this.domaine.offsetHeight};

        //Check if Amongus over Cookie
/*         console.log("x " + x + " " + this.phg.x + " " + this.pbd.x);
        console.log("y " + y + " " + this.phg.y + " " + this.pbd.y); */
        if (x > this.phg.x && x < this.pbd.x && y > this.phg.y && y < this.pbd.y) {
            console.log("Crash");
        }

    }
}

score = 0;

H2Text.setScore = function(score) {
    this.textContent = "Score : " + score;
}

cookie = new Sprite("Cookie");

amogus = [];

for (i=0; i < 5; i++) {
    amogus[i] = new Sprite("Amogus" + (i + 1));
}
action1=0
document.onclick = function(e ) {

    //Action 1 = Cookie move
    if(action1 == 0) {
    //Taille Cookie
    domai = document.getElementById("Cookie");
    hauteur = domai.offsetHeight/2;
    largeur = domai.offsetWidth/2;

    //Coords Cookie
    Cx = Cookie.x; 
    Cy = Cookie.y; 
    //Coords souris
    xs = e.clientX - coords.left;
    ys = e.clientY - coords.top;

    //Calcul
    goX = (xs - Cx - largeur);
    goY = (ys - Cy - hauteur);

    cookie.move(goX, goY);
    score++;
    H2Text.setScore(score);
    action1 = 1;
} else {
    //Amogus move
    action1 = 0;
    for(amoNo = 0; amoNo <5; amoNo++){
        amoX=Math.random()*SPlayground.offsetWidth;
        AmoY=Math.random()*SPlayground.clientHeight;
        amogus[amoNo].isCollision(amoX,AmoY,amogus[amoNo]);
        amogus[amoNo].move(amoX,AmoY);
    }
}
}
function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }