SCookie = document.getElementById("Cookie")
SPlayground = document.getElementById("Playground")
Samogus1 = document.getElementById("Amogus1")
H2Text = document.getElementById("ScoreH2");

coords = getOffset(SPlayground)


Cookie = {x: 0, y: 0, Terrain: SCookie}
Amogus1 = {x: 0, y: 0, Terrain: Samogus1}


class Sprite {
    constructor(id) {
        this.id = id;
        this.dom = document.getElementById(id);
        this.hauteur = this.dom.offsetHeight;
        this.largeur = this.dom.offsetWidth;
    }
    setPos(x,y) {
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
    move(x,y) {
        this.x += x;
        this.y += y;
        this.setPos(x,y);
    }
}

score = 0;

H2Text.setScore = function(score) {
    this.textContent = "Score : " + score;
}

cookie = new Sprite("Cookie")

amogus = [] 

for (i=0; i < 4; i++) {
    amogus[i] = new Sprite("Amogus" + (i + 1))
}

document.onclick = function(e ) {


/* 
    //Coords souris
    x = e.clientX - coords.left;
    y = e.clientY - coords.top;

    //Calcule
    goX = (xs - x - largeur)/100;
    goY = (ys - y - hauteur)/100;

    agoX = (xs - ax - largeur)/100;
    agoY = (ys - ay - hauteur)/100;

    while (i < 100) {
        Cookie.move(goX,goY)
        Amogus1.move(agoX,agoY)
        i++
    } */
    score++;
    H2Text.setScore(score);
}

n = 10;
Test = function() {
Cookie.move(10,10);
n--;
if (n > 0) {
    setTimeout(Test,10)
}
n = 10;
}


function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }